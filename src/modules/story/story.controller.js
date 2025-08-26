import { Router } from "express";
import { asyncHandler } from "../../utils/error handling/asynchandler.js";
import { validation } from "../../middleware/validation.middleware.js";
import { isAuthenticated } from "../../middleware/authentication.middleware.js";
import { isAuthorized } from "../../middleware/authorization.middleware.js";
import { uploadCloud, fileValidation } from "../../utils/file uploading/multerCloud.js";
import * as service from "./story.service.js";
import * as schema from "./story.validation.js";
import { storyEndpoints } from "../../utils/constants/endpoints.js";

const router = Router();

/**
 * @route   POST /stories
 * @desc    Create a new story
 
 */
router.post(
  "/",
  isAuthenticated,
  uploadCloud(fileValidation.image).single("storyMedia"),
  validation(schema.createStory),
  asyncHandler(service.createStory)
);

/**
 * @route   GET /stories
 * @desc    Get stories from contacts
 
 */
router.get(
  "/",
  isAuthenticated,
  validation(schema.getStoriesFromContacts),
  asyncHandler(service.getStoriesFromContacts)
);

/**
 * @route   GET /stories/me
 * @desc    Get current user's stories
 
 */
router.get(
  "/me",
  isAuthenticated,
  validation(schema.getMyStories),
  asyncHandler(service.getMyStories)
);

/**
 * @route   GET /stories/:id
 * @desc    Get story by ID
 
 */
router.get(
  "/:id",
  isAuthenticated,
  validation(schema.getStoryById),
  asyncHandler(service.getStoryById)
);

/**
 * @route   DELETE /stories/:id
 * @desc    Delete a story
 
 */
router.delete(
  "/:id",
  isAuthenticated,
  validation(schema.deleteStory),
  asyncHandler(service.deleteStory)
);

/**
 * @route   POST /stories/:id/view
 * @desc    Mark story as viewed
 
 */
router.post(
  "/:id/view",
  isAuthenticated,
  validation(schema.viewStory),
  asyncHandler(service.viewStory)
);

export default router;
