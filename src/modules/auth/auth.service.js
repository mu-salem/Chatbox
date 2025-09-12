import User from "./../../DB/models/user.model.js";
import randomstring from "randomstring";
import { eventEmitter } from "./../../utils/emails/email.event.js";
import { compareHash, hash } from "../../utils/hashing/hash.js";
import { generateToken, verifyToken } from "../../utils/token/token.js";
import { OTP_TYPES, subjects } from "../../utils/constants/subjects.js";

export const register = async (req, res, next) => {
  const { email } = req.body;

  const isUser = await User.findOne({ email });

  if (isUser) return next(new Error("User already exists!"), { cause: 400 });

  const OTP = randomstring.generate({ length: 6, charset: "numeric" });
  eventEmitter.emit("SIGNUP", email, OTP, subjects.signup);

  const hashedOTP = hash({ plainText: OTP });

  const user = await User.create({
    ...req.body,
    isActivated: true,
    isLoggedIn: true,
    OTP: [
      {
        code: hashedOTP,
        type: OTP_TYPES.SIGNUP,
        expiresIn: new Date(Date.now() + 10 * 60 * 1000),
      },
    ],
  });

  return res.json({
    success: true,
    message: "User created successfully!",
    Token: generateToken({
      payload: { id: user._id, email: user.email },
    }),
  });
};

export const login = async (req, res, next) => {
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
    message: "Logged in successfully",
    Token: generateToken({
      payload: { id: user._id, email: user.email },
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

  user.OTP = user.OTP.filter((otp) => otp.type !== OTP_TYPES.FORGET_PASSWORD);

  user.OTP.push({
    code: hash({ plainText: code }),
    type: OTP_TYPES.FORGET_PASSWORD,
    expiresIn: new Date(Date.now() + 1000 * 60 * 2),
  });

  await user.save();

  eventEmitter.emit("FORGOT_PASSWORD", email, code, subjects.forgetPassword);

  res.status(200).json({
    success: true,
    message: "Password reset code sent to email",
  });
};

export const verifyForgetPasswordCode = async (req, res, next) => {
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
  const { email, newPassword, confirmPassword } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return next(new Error("User with this email does not exist!"), {
      cause: 400,
    });

  if (newPassword !== confirmPassword)
    return next(new Error("Passwords do not match!", { cause: 400 }));

  user.password = newPassword;
  user.isLoggedIn = false;
  user.OTP = [];
  await user.save();

  return res.status(200).json({
    success: true,
    message: "Password reset successfully",
  });
};
