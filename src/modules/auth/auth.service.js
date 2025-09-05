import User from "./../../DB/models/user.model.js";
import randomstring from "randomstring";
import { eventEmitter } from "./../../utils/emails/email.event.js";
import { compareHash, hash } from "../../utils/hashing/hash.js";
import { generateToken, verifyToken } from "../../utils/token/token.js";
import { OTP_TYPES, subjects } from "../../utils/constants/subjects.js";
import e from "express";

export const signup = async (req, res, next) => {
  const { email } = req.body;
  const isUser = await User.findOne({ email });

  if (isUser) return next(new Error("User already exists!"), { cause: 400 });

  const OTP = randomstring.generate({ length: 6, charset: "numeric" });
  eventEmitter.emit("SIGNUP", email, OTP, subjects.signup);

  const hashedOTP = hash({ plainText: OTP });

  const user = await User.create({
    ...req.body,
    isActivated: false,
    OTP: [
      {
        code: hashedOTP,
        type: OTP_TYPES.SIGNUP,
        expiresIn: new Date(Date.now() + 10 * 60 * 1000),
      },
    ],
  });

  return res.json({ success: true, message: "User created successfully!" });
};

export const confirmOTP = async (req, res, next) => {
  const { email, otp, type } = req.body;

  const user = await User.findOne({ email });
  if (!user) return next(new Error("User not found!"), { cause: 404 });

  const otpRecord = user.OTP.find(
    (otp) => otp.type === type && otp.expiresIn > new Date()
  );

  if (!otpRecord) {
    const newOTP = randomstring.generate({ length: 6, charset: "numeric" });
    const hashedOTP = hash({ plainText: newOTP });

    user.OTP = user.OTP.filter(otp => otp.type !== type);

    user.OTP.push({
      code: hashedOTP,
      type: type,
      expiresIn: new Date(Date.now() + 10 * 60 * 1000),  
    });

    await user.save();

    let emailSubject;
    switch (type) {
      case OTP_TYPES.SIGNUP:
        emailSubject = subjects.signup;
        eventEmitter.emit("SIGNUP", email, newOTP, emailSubject);
        break;
      case OTP_TYPES.CONFIRM_EMAIL:
        emailSubject = subjects.confirmEmail;
        eventEmitter.emit("CONFIRM_EMAIL", email, newOTP, emailSubject);
        break;
      case OTP_TYPES.FORGET_PASSWORD:
        emailSubject = subjects.forgetPassword;
        eventEmitter.emit("sendForgetPasswordCode", email, newOTP, emailSubject);
        break;
    }

    return res.status(200).json({
      success: true,
      message: "OTP has expired. New OTP has been sent to your email.",
    });
  }

  if (!compareHash({ plainText: otp, hash: otpRecord.code })) {
    return next(new Error("Invalid OTP!", { cause: 400 }));
  }

  if (type === OTP_TYPES.CONFIRM_EMAIL) {
    user.isConfirmed = true;
    user.isActivated = true;
  }

  await user.save();

  return res.status(200).json({
    success: true,
    message: "OTP confirmed successfully.",
  });
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email });
  if (!user) return next(new Error("Invalid email!"), { cause: 400 });

  if (!compareHash({ plainText: password, hash: user.password }))
    return next(new Error("Invalid password!"), { cause: 400 });

  if (!user.isActivated) {
    return next(new Error("Please confirm your email first!"), { cause: 403 });
  }

  user.isLoggedIn = true;
  await user.save();

  return res.status(200).json({
    success: true,
    access_token: generateToken({
      payload: { id: user._id, email: user.email },
      options: { expiresIn: process.env.ACCESS_TOKEN_EXPIRE },
    }),
    refresh_token: generateToken({
      payload: { id: user._id, email: user.email },
      options: { expiresIn: process.env.REFRESH_TOKEN_EXPIRE },
    }),
  });
};

export const signupOrLoginWithGoogle = async (req, res, next) => {};

export const sendForgetPasswordCode = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return next(new Error("User with this email does not exist!"), {
      cause: 400,
    });

  const code = randomstring.generate({
    length: 6,
    charset: "numeric",
  });

  user.OTP.push({
    code: hash({ plainText: code }),
    type: OTP_TYPES.FORGET_PASSWORD,
    expiresIn: new Date(Date.now() + 1000 * 60 * 2),
  });

  await user.save();

  eventEmitter.emit(
    "sendForgetPasswordCode",
    email,
    code,
    subjects.forgetPassword
  );

  res.status(200).json({
    success: true,
    message: "Password reset code sent to email",
  });
};

export const forgetPassword = async (req, res, next) => {
  const { email, code } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return next(new Error("User with this email does not exist!"), {
      cause: 400,
    });

  const otpRecord = user.OTP.find(
    (otp) =>
      otp.type === OTP_TYPES.FORGET_PASSWORD && otp.expiresIn > new Date()
  );

  if (!otpRecord)
    return next(new Error("Invalid or expired OTP!", { cause: 400 }));

  if (!compareHash({ plainText: code, hash: otpRecord.code })) {
    return next(new Error("Invalid OTP!", { cause: 400 }));
  }

  return res.status(200).json({
    success: true,
    message: "OTP verified successfully, you can now reset your password",
  });
};

export const resetPassword = async (req, res, next) => {
  const { newPassword, confirmPassword } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return next(new Error("User with this email does not exist!"), {
      cause: 400,
    });

  if (newPassword !== confirmPassword)
    return next(new Error("Passwords do not match!", { cause: 400 }));

  const hashedPassword = hash({ plainText: newPassword });

  user.password = hashedPassword;
  user.isLoggedIn = false;
  user.OTP = [];
  await user.save();

  return res.status(200).json({
    success: true,
    message: "Password reset successfully",
  });
};

export const refreshToken = async (req, res, next) => {
  const { refreshToken } = req.body;

  const payload = verifyToken({ token: refreshToken });
  if (!payload)
    return next(new Error("Invalid refresh token!", { cause: 401 }));

  const user = await User.findById(payload.id);
  if (!user) return next(new Error("User not found!", { cause: 404 }));

  const tokenIssuedAt = new Date(payload.iat * 1000);
  if (user.changeCredentialTime && user.changeCredentialTime > tokenIssuedAt) {
    return next(
      new Error("Token expired, please login again!", { cause: 401 })
    );
  }

  return res.status(200).json({
    success: true,
    access_token: generateToken({
      payload: { id: user._id, email: user.email },
      options: { expiresIn: process.env.ACCESS_TOKEN_EXPIRE },
    }),
  });
};
