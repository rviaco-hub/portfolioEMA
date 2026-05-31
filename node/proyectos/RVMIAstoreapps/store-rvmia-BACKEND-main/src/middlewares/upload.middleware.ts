import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "products",
      resource_type: "image", // 🔥 CLAVE
      format: file.mimetype.split("/")[1], // 🔥 evita errores
      public_id: Date.now() + "-" + file.originalname
    };
  }
});

export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    console.log("FILE RECEIVED:", file);

    if (!file.mimetype.startsWith("image/")) {
      console.log("❌ Not an image");
      return cb(new Error("Only images allowed"));
    }

    cb(null, true);
  }
});