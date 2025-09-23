import { Router } from "express";
import { asyncHandler } from "../../utils/error handling/asynchandler.js";
import { validation } from "../../middleware/validation.middleware.js";
import { isAuthenticated } from "../../middleware/authentication.middleware.js";
import { uploadCloud } from "../../utils/file uploading/multerCloud.js";
import * as service from "./story.service.js";
import * as schema from "./story.validation.js";

const router = Router();

/**
 * @route   POST /stories
 * @desc    Create a new story (image or video).
 *          The story will automatically expire after 24 hours from creation.
 *          Requires file upload (image/video) in 'storyMedia'.
 */
router.post(
  "/",
  isAuthenticated,
  uploadCloud().single("story"),
  validation(schema.createStory),
  asyncHandler(service.createStory)
);

/**
 * @route   GET /stories
 * @desc    Get all active stories from the current user and their friends.
 *          Only returns stories that are not expired.
 */
router.get(
  "/",
  isAuthenticated,
  asyncHandler(service.getStories)
);

/**
 * @route   GET /stories/:username
 * @desc    Get a single story by its username.
 *          Useful for fetching one specific story and its details.
 */
router.get(
  "/:username",
  isAuthenticated,
  asyncHandler(service.getStoryByName)
);

/** 
 * @route   GET /stories/active-stories/grouped
 * @desc    Get all active (non-expired) stories from friends, grouped by user.
 *          Each group contains the user's info and their active stories.
 */
router.get(
  "/active-stories/grouped",
  isAuthenticated,
  asyncHandler(service.getActiveStories)
);

/**
 * @route   PATCH /stories/:storyId/view
 * @desc    Mark a story as viewed by the current user.
 *          Saves the user ID and timestamp inside 'viewedBy'.
 */
router.patch(
  "/:storyId/view",
  isAuthenticated,
  asyncHandler(service.viewStory)
);

/**
 * @route   DELETE /stories/:storyId
 * @desc    Delete a story created by the current user.
 *          Removes the story media from Cloudinary as well.
 */
router.delete(
  "/:storyId",
  isAuthenticated,
  asyncHandler(service.deleteStory)
);

/**
 * @route   GET /stories/:storyId/viewers
 * @desc    Get the list of users who viewed a specific story.
 *          Returns user info (username, profilePic, status, etc.).
 */
router.get(
  "/:storyId/viewers",
  isAuthenticated,
  asyncHandler(service.getStoryViewers)
);


export default router;
