
import multer, { diskStorage } from "multer";

export const fileValidation = {
  images: ["image/jpeg", "image/png"],
  videos: ["video/mp4"],
  audios: ["audio/mpeg"],
  files: ["application/pdf"],
};

export const uploadCloud = () => {
  const storage = diskStorage({});

  const multerUpload = multer({ storage });
  return multerUpload;
};

    