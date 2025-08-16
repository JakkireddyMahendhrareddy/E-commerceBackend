// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "./cloudinary.js";

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "products", // Folder name in Cloudinary
//     allowed_formats: ["jpg", "png", "jpeg", "webp"],
//   },
// });

// const upload = multer({ storage });

// export default upload;

import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products", // Folder name in Cloudinary where files will be stored
    allowed_formats: ["jpg", "png", "jpeg", "webp"], // Allowed file formats
    // Optional: You can add more parameters
    // resource_type: "image", // Specify resource type
    // public_id: (req, file) => `${Date.now()}-${file.originalname}`, // Custom public_id
  },
});

// Create multer instance with Cloudinary storage
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit (optional, Cloudinary has its own limits)
  },
  fileFilter: (req, file, cb) => {
    // Additional file validation (optional since Cloudinary handles allowed_formats)
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(
      file.originalname.toLowerCase().split(".").pop()
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

export default upload;
