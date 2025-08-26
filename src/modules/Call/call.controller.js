import { Router } from "express";
import { asyncHandler } from "../../utils/error handling/asynchandler.js";
import { validation } from "../../middleware/validation.middleware.js";
import { isAuthenticated } from "../../middleware/authentication.middleware.js";
import * as service from "./call.service.js";
import * as schema from "./call.validation.js";

const router = Router();

/**
 * @route   POST /calls/start
 * @desc    Start a new call
 */
router.post(
  "/start",
  isAuthenticated,
  validation(schema.startCall),
  asyncHandler(service.startCall)
);

/**
 * @route   POST /calls/:id/end
 * @desc    End an ongoing call
 */
router.post(
  "/:id/end",
  isAuthenticated,
  validation(schema.endCall),
  asyncHandler(service.endCall)
);

/**
 * @route   GET /calls/logs
 * @desc    Get call logs
 */
router.get(
  "/logs",
  isAuthenticated,
  validation(schema.getCallLogs),
  asyncHandler(service.getCallLogs)
);

/**
 * @route   GET /calls/:id
 * @desc    Get call by ID
 */
router.get(
  "/:id",
  isAuthenticated,
  validation(schema.getCallById),
  asyncHandler(service.getCallById)
);

export default router;
