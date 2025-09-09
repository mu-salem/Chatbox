import multer, { diskStorage } from "multer";

export const uploadCloud = (filetype) => {
  const storage = diskStorage({});
  const multerUpload = multer({ storage });
  return multerUpload;
};
