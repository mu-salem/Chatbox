import { Router } from "express";
import { asyncHandler } from "../../utils/error handling/asynchandler.js";
import { validation } from "../../middleware/validation.middleware.js";
import { isAuthenticated } from "../../middleware/authentication.middleware.js";
import * as service from "./chat.service.js";
import * as schema from "./chat.validation.js";

const router = Router();

/**
 * @route   POST /chats
 * @desc    Create a new chat
 */
router.post(
  "/",
  isAuthenticated,
  validation(schema.createChat),
  asyncHandler(service.createChat)
);

/**
 * @route   GET /chats
 * @desc    Get all chats for current user
 */
router.get(
  "/",
  isAuthenticated,
  validation(schema.getMyChats),
  asyncHandler(service.getMyChats)
);

/**
 * @route   GET /chats/:id
 * @desc    Get chat by ID
 */
router.get(
  "/:id",
  isAuthenticated,
  validation(schema.getChatById),
  asyncHandler(service.getChatById)
);

/**
 * @route   DELETE /chats/:id
 * @desc    Delete chat by ID
 */
router.delete(
  "/:id",
  isAuthenticated,
  validation(schema.deleteChat),
  asyncHandler(service.deleteChat)
);

export default router;
