import { Router } from "express";
import { asyncHandler } from "../../utils/error handling/asynchandler.js";
import { validation } from "../../middleware/validation.middleware.js";
import { isAuthenticated } from "../../middleware/authentication.middleware.js";
import { uploadCloud, fileValidation } from "../../utils/file uploading/multerCloud.js";
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
  validation(userScheme.updatePassword),
  asyncHandler(userService.updatePassword)
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
 * @route   GET /user/name/:name
 * @desc    Get user by name
 */
router.get(
  "/name/:name",
  isAuthenticated,
  validation(schema.getUserByName), 
  asyncHandler(service.getUserByName)
);

/**
 * @route   GET /user/search
 * @desc    Search users
 */
router.get(
  "/search",
  isAuthenticated,
  validation(schema.searchUsers),
  asyncHandler(service.searchUsers)
);

/**
 * @route   POST /user/:id/add-contact
 * @desc    Add user to contacts
 */
router.post(
  "/:id/add-contact",
  isAuthenticated,
  validation(schema.addContact),
  asyncHandler(service.addContact)
);

/**
 * @route   DELETE /user/:id/remove-contact
 * @desc    Remove user from contacts
 */
router.delete(
  "/:id/remove-contact",
  isAuthenticated,
  validation(schema.removeContact),
  asyncHandler(service.removeContact)
);

/**
 * @route   GET /user/contacts
 * @desc    Get user contacts
 
 */
router.get(
  "/contacts",
  isAuthenticated,
  validation(schema.getContacts),
  asyncHandler(service.getContacts)
);

export default router;
