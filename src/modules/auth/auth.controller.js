import { Router } from "express";
import { asyncHandler } from "../../utils/error handling/asynchandler.js";
import * as service from "./auth.service.js";
import * as schema from "./auth.validation.js";
import { validation } from "../../middleware/validation.middleware.js";

const router = Router();

/**
 * @route   POST /auth/register
 * @desc    Sign up a new user
 */
router.post("/register", validation(schema.register), asyncHandler(service.register));

/**
 * @route   POST /auth/login
 * @desc    Sign in existing user
 */
router.post("/login", validation(schema.login), asyncHandler(service.login));

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
 * @route   POST /auth/send-forget-password-code
 * @desc    Send OTP for forget password
 */
router.post(
    "/send-forget-password-code",
    validation(schema.sendForgetPasswordCode),
    asyncHandler(service.sendForgetPasswordCode)
);

/**
 * @route   POST /auth/verify-forget-password-code
 * @desc    Verify OTP for forget password
 */
router.post(
  "/verify-forget-password-code",
  validation(schema.verifyForgetPasswordCode),
  asyncHandler(service.verifyForgetPasswordCode)
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


export default router;
