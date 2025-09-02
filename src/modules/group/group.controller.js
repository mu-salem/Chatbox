import { Router } from "express";
import { asyncHandler } from "../../utils/error handling/asynchandler.js";
import { validation } from "../../middleware/validation.middleware.js";
import { isAuthenticated } from "../../middleware/authentication.middleware.js";
import { uploadCloud, fileValidation } from "../../utils/file uploading/multerCloud.js";
import * as service from "./group.service.js";
import * as schema from "./group.validation.js";

const router = Router();

/**
 * @route   POST /groups
 * @desc    Create a new group
 
 */
router.post(
  "/",
  isAuthenticated,
  uploadCloud(fileValidation.image).single("groupPic"),
  validation(schema.createGroup),
  asyncHandler(service.createGroup)
);

/**
 * @route   GET /groups
 * @desc    Get all groups for current user
 
 */
router.get(
  "/",
  isAuthenticated,
  validation(schema.getMyGroups),
  asyncHandler(service.getMyGroups)
);

/**
 * @route   GET /groups/:id
 * @desc    Get group by ID
 
 */
router.get(
  "/:id",
  isAuthenticated,
  validation(schema.getGroupById),
  asyncHandler(service.getGroupById)
);

/**
 * @route   PATCH /groups/:id
 * @desc    Update group details
 
 */
router.patch(
  "/:id",
  isAuthenticated,
  validation(schema.updateGroup),
  asyncHandler(service.updateGroup)
);

/**
 * @route   DELETE /groups/:id
 * @desc    Delete group
 
 */
router.delete(
  "/:id",
  isAuthenticated,
  validation(schema.deleteGroup),
  asyncHandler(service.deleteGroup)
);

/**
 * @route   POST /groups/:id/add-member
 * @desc    Add member to group
 
 */
router.post(
  "/:id/add-member",
  validation(schema.addMember),
  asyncHandler(service.addMember)
);

/**
 * @route   DELETE /groups/:id/remove-member/:userId
 * @desc    Remove member from group
 
 */
router.delete(
  "/:id/remove-member/:userId",
  validation(schema.removeMember),
  asyncHandler(service.removeMember)
);

/**
 * @route   PATCH /groups/:id/leave
 * @desc    Leave group
 
 */
router.patch(
  "/:id/leave",
  validation(schema.leaveGroup),
  asyncHandler(service.leaveGroup)
);

export default router;
