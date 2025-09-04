import { Router } from "express";
import { asyncHandler } from "../../utils/error handling/asynchandler.js";
import * as service from "./auth.service.js";
import * as schema from "./auth.validation.js";
import { validation } from "../../middleware/validation.middleware.js";

const router = Router();

/**
 * @route   POST /auth/signup
 * @desc    Sign up a new user
 */
router.post("/signup", validation(schema.signup), asyncHandler(service.signup));

/**
 * @route   POST /auth/confirm-otp
 * @desc    Confirm OTP for user verification
 */
router.post(
  "/confirm-otp",
  validation(schema.confirmOTP),
  asyncHandler(service.confirmOTP)
);

/**
 * @route   POST /auth/signin
 * @desc    Sign in existing user
 */
router.post("/signin", validation(schema.signin), asyncHandler(service.signin));

/**
 * @route   POST /auth/signup-with-google
 * @desc    Sign up or login with Google
 */
router.post(
  "/signup-with-google",
  validation(schema.googleAuth),
  asyncHandler(service.signupOrLoginWithGoogle)
);

/**
 * @route   POST /auth/login-with-google
 * @desc    Sign up or login with Google
 */
router.post(
  "/login-with-google",
  validation(schema.googleAuth),
  asyncHandler(service.signupOrLoginWithGoogle)
);

/** 
 * @route   POST /auth/sendForgetPasswordCode
 * @desc    Send OTP for forget password
 */
router.post(
    "/send-forget-password-code",
    validation(schema.sendForgetPasswordCode),
    asyncHandler(service.sendForgetPasswordCode)
);

/**
 * @route   POST /auth/forget-password
 * @desc    Request password reset
 */
router.post(
  "/forget-password",
  validation(schema.forgetPassword),
  asyncHandler(service.forgetPassword)
);

/**
 * @route   POST /auth/reset-password
 * @desc    Reset user password
 */
router.post(
  "/reset-password",
  validation(schema.resetPassword),
  asyncHandler(service.resetPassword)
);

/**
 * @route   POST /auth/refresh-token
 * @desc    Get new access token using refresh token
 */
router.post(
  "/refresh-token",
  validation(schema.refreshToken),
  asyncHandler(service.refreshToken)
);

export default router;
