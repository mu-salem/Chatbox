import { Router } from "express";
import { asyncHandler } from "../../utils/error handling/asynchandler.js";
import { validation } from "../../middleware/validation.middleware.js";
import { isAuthenticated } from "../../middleware/authentication.middleware.js";
import { uploadCloud } from "../../utils/file uploading/multerCloud.js";
import * as service from "./user.service.js";
import * as schema from "./user.validation.js";

const router = Router();

/**
 * @route   GET /user/profile
 * @desc    Get current user profile
 */
router.get(
  "/profile",
  isAuthenticated,
  asyncHandler(service.getLoginUserProfile)
);

/**
 * @route   PATCH /user/profile
 * @desc    Update current user profile
 
 */
router.patch(
  "/profile",
  isAuthenticated,
  validation(schema.updateProfile),
  asyncHandler(service.updateProfile)
);

/**
 * @route   PATCH /user/update-password
 * @desc    Update user password
 */
router.patch(
  "/update-password",
  isAuthenticated,
  validation(schema.updatePassword),
  asyncHandler(service.updatePassword)
);

/**
 * @route   PATCH /user/profile-pic
 * @desc    Update user profile picture
 */
router.patch(
  "/profile-pic",
  isAuthenticated,
  uploadCloud().single("image"),
  validation(schema.updateProfilePic),
  asyncHandler(service.updateProfilePic)
);

/**
 * @route   GET /user/username/:username
 * @desc    Get user by name
 */
router.get(
  "/username/:username",
  validation(schema.getUserByName),
  asyncHandler(service.getUserByName)
);

/**
 * @route   GET /user/search?search=VALUE
 * @desc    Search users
 */
router.get(
  "/search",
  validation(schema.searchUsers),
  asyncHandler(service.searchUsers)
);

/**
 * @route   POST /user/:username/add-friend
 * @desc    Add user to friends
 */
router.post(
  "/:username/add-friend",
  isAuthenticated,
  validation(schema.addFriend),
  asyncHandler(service.addFriend)
);

/**
 * @route   DELETE /user/:id/remove-friend
 * @desc    Remove user from friends
 */
router.delete(
  "/:id/remove-friend",
  isAuthenticated,
  validation(schema.removeFriend),
  asyncHandler(service.removeFriend)
);

/**
 * @route   GET /user/friends
 * @desc    Get user friends list
 
 */
router.get(
  "/friends",
  isAuthenticated,
  validation(schema.getFriends),
  asyncHandler(service.getFriends)
);

export default router;
