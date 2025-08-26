import { Router } from "express";
import { asyncHandler } from "../../utils/error handling/asynchandler.js";
import { validation } from "../../middleware/validation.middleware.js";
import { isAuthenticated } from "../../middleware/authentication.middleware.js";
import { uploadCloud, fileValidation } from "../../utils/file uploading/multerCloud.js";
import * as service from "./user.service.js";
import * as schema from "./user.validation.js";

const router = Router();

/**
 * @route   GET /users/me
 * @desc    Get current user profile
 
 */
router.get(
  "/me",
  isAuthenticated,
  validation(schema.getMe),
  asyncHandler(service.getMe)
);

/**
 * @route   PATCH /users/me
 * @desc    Update current user profile
 
 */
router.patch(
  "/me",
  isAuthenticated,
  validation(schema.updateMe),
  asyncHandler(service.updateMe)
);

/**
 * @route   PATCH /users/me/profile-pic
 * @desc    Update user profile picture
 
 */
router.patch(
  "/me/profile-pic",
  isAuthenticated,
  uploadCloud(fileValidation.image).single("profilePic"),
  validation(schema.updateProfilePic),
  asyncHandler(service.updateProfilePic)
);

/**
 * @route   GET /users/:id
 * @desc    Get user by ID
 
 */
router.get(
  "/:id",
  isAuthenticated,
  validation(schema.getUserById),
  asyncHandler(service.getUserById)
);

/**
 * @route   GET /users/search
 * @desc    Search users
 
 */
router.get(
  "/search",
  isAuthenticated,
  validation(schema.searchUsers),
  asyncHandler(service.searchUsers)
);

/**
 * @route   POST /users/:id/add-contact
 * @desc    Add user to contacts
 
 */
router.post(
  "/:id/add-contact",
  isAuthenticated,
  validation(schema.addContact),
  asyncHandler(service.addContact)
);

/**
 * @route   DELETE /users/:id/remove-contact
 * @desc    Remove user from contacts
 
 */
router.delete(
  "/:id/remove-contact",
  isAuthenticated,
  validation(schema.removeContact),
  asyncHandler(service.removeContact)
);

/**
 * @route   GET /users/contacts
 * @desc    Get user contacts
 
 */
router.get(
  "/contacts",
  isAuthenticated,
  validation(schema.getContacts),
  asyncHandler(service.getContacts)
);

export default router;
