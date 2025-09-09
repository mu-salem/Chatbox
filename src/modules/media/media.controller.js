import { Router } from "express";
import { asyncHandler } from "../../utils/error handling/asynchandler.js";
import { validation } from "../../middleware/validation.middleware.js";
import { isAuthenticated } from "../../middleware/authentication.middleware.js";
import { uploadCloud } from "../../utils/file uploading/multerCloud.js";
import * as service from "./media.service.js";
import * as schema from "./media.validation.js";

const router = Router();

/**
 * @route   POST /media/upload
 * @desc    Upload media file
 */
router.post(
  "/upload",
  isAuthenticated,
  uploadCloud().single("file"),
  validation(schema.uploadMedia),
  asyncHandler(service.uploadMedia)
);

/**
 * @route   DELETE /media/:publicId
 * @desc    Delete media file
 
 */
router.delete(
  "/:publicId",
  isAuthenticated,
  validation(schema.deleteMedia),
  asyncHandler(service.deleteMedia)
);

export default router;
