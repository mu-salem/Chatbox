import { Router } from "express";
import { asyncHandler } from "../../utils/error handling/asynchandler.js";
import { validation } from "../../middleware/validation.middleware.js";
import { isAuthenticated } from "../../middleware/authentication.middleware.js";
import {
  uploadCloud,
  fileValidation,
} from "../../utils/file uploading/multerCloud.js";
import * as service from "./message.service.js";
import * as schema from "./message.validation.js";
import { messageEndpoints } from "../../utils/constants/endpoints.js";

const router = Router();

/**
 * @route   POST /messages/:chatId
 * @desc    Send a message to a chat
 */
router.post(
  "/:chatId",
  isAuthenticated,
  uploadCloud(fileValidation.media).single("file"),
  validation(schema.sendMessage),
  asyncHandler(service.sendMessage)
);

/**
 * @route   GET /messages/:chatId
 * @desc    Get messages from a chat
 */
router.get(
  "/:chatId",
  isAuthenticated,
  validation(schema.getMessages),
  asyncHandler(service.getMessages)
);

/**
 * @route   GET /messages/:id
 * @desc    Get message by ID
 */
router.get(
  "/:id",
  isAuthenticated,
  validation(schema.getMessageById),
  asyncHandler(service.getMessageById)
);

/**
 * @route   DELETE /messages/:id
 * @desc    Delete a message
 */
router.delete(
  "/:id",
  isAuthenticated,
  validation(schema.deleteMessage),
  asyncHandler(service.deleteMessage)
);

/**
 * @route   PATCH /messages/:id
 * @desc    Update a message
 */
router.patch(
  "/:id",
  isAuthenticated,
  validation(schema.updateMessage),
  asyncHandler(service.updateMessage)
);

export default router;
