import { Router } from "express";
import { asyncHandler } from "../../utils/error handling/asynchandler.js";
import { validation } from "../../middleware/validation.middleware.js";
import { isAuthenticated } from "../../middleware/authentication.middleware.js";
import { isAuthorized } from "../../middleware/authorization.middleware.js";
import { uploadCloud, fileValidation } from "../../utils/file uploading/multerCloud.js";
import * as service from "./notification.service.js";
import * as schema from "./notification.validation.js";
import { notificationEndpoints } from "../../utils/constants/endpoints.js";

const router = Router();

/**
 * @route   GET /notifications
 * @desc    Get user notifications
 
 */
router.get(
  "/",
  isAuthenticated,
  validation(schema.getNotifications),
  asyncHandler(service.getNotifications)
);

/**
 * @route   PATCH /notifications/:id/read
 * @desc    Mark notification as read
 
 */
router.patch(
  "/:id/read",
  isAuthenticated,
  validation(schema.markNotificationAsRead),
  asyncHandler(service.markNotificationAsRead)
);

/**
 * @route   PATCH /notifications/read-all
 * @desc    Mark all notifications as read
 
 */
router.patch(
  "/read-all",
  isAuthenticated,
  validation(schema.markAllAsRead),
  asyncHandler(service.markAllAsRead)
);

export default router;
