// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import { fileURLToPath } from "url";
// import connectToMongoDB from "./config/db.js";
// import userRoutes from "./routes/userRoutes.js";
// import productRoutes from "./routes/productRoutes.js";
// import cartRoutes from "./routes/cartRoutes.js";
// import upload from "./config/upload.js"; // Your Cloudinary multer config
// import cloudinary from "./config/cloudinary.js";

// // Load environment variables first
// dotenv.config();

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(
//   cors({
//     origin: [
//       "https://e-commerce-test-drkl.vercel.app",
//       "http://localhost:3000", // CRA local
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//     credentials: true,
//   })
// );

// // Connect to database with error handling
// connectToMongoDB().catch((err) => {
//   console.error("Database connection failed:", err);
//   process.exit(1);
// });

// app.post("/api/upload", upload.single("image"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }
//     res.json({
//       url: req.file.path, // Cloudinary file URL
//       public_id: req.file.filename,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Single image upload route using Cloudinary
// app.post("/api/upload", upload.single("image"), (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }
//     console.log(req.file.path, "0000000000000000000000"); // <-- will be undefined with Cloudinary storage

//     // Cloudinary automatically provides the URL in req.file.path
//     res.json({
//       message: "File uploaded successfully",
//       filename: req.file?.filename,
//       originalname: req.file.originalname,
//       size: req.file.size,
//       url: req.file?.path, // Cloudinary URL
//       public_id: req.file.public_id, // Cloudinary public ID for deletion
//     });
//   } catch (error) {
//     console.error("Upload error:", error);
//     res.status(500).json({ error: "Failed to upload file" });
//   }
// });

// // Multiple files upload route using Cloudinary
// app.post("/api/upload-multiple", upload.array("images", 5), (req, res) => {
//   try {
//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({ error: "No files uploaded" });
//     }

//     const fileData = req.files.map((file) => ({
//       filename: file.filename,
//       originalname: file.originalname,
//       size: file.size,
//       url: file.path, // Cloudinary URL
//       public_id: file.public_id, // Cloudinary public ID
//     }));

//     res.json({
//       message: "Files uploaded successfully",
//       files: fileData,
//     });
//   } catch (error) {
//     console.error("Upload error:", error);
//     res.status(500).json({ error: "Failed to upload files" });
//   }
// });

// // Delete uploaded file from Cloudinary
// app.delete("/api/upload/:public_id", async (req, res) => {
//   try {
//     const publicId = req.params.public_id;

//     // Delete from Cloudinary using public_id
//     const result = await cloudinary.uploader.destroy(publicId);

//     if (result.result === "ok") {
//       res.json({ message: "File deleted successfully" });
//     } else if (result.result === "not found") {
//       res.status(404).json({ error: "File not found" });
//     } else {
//       res.status(400).json({ error: "Failed to delete file" });
//     }
//   } catch (error) {
//     console.error("Delete error:", error);
//     res.status(500).json({ error: "Failed to delete file" });
//   }
// });

// // Routes
// app.use("/api/users", userRoutes);
// app.use("/api/product", productRoutes);
// app.use("/api/cart", cartRoutes);

// // Multer error handler
// app.use((error, req, res, next) => {
//   if (error.code === "LIMIT_FILE_SIZE") {
//     return res
//       .status(400)
//       .json({ error: "File too large. Check Cloudinary limits" });
//   }
//   if (error.code === "LIMIT_UNEXPECTED_FILE") {
//     return res
//       .status(400)
//       .json({ error: "Too many files or unexpected field name" });
//   }

//   // Handle Cloudinary errors
//   if (error.message && error.message.includes("cloudinary")) {
//     return res.status(400).json({ error: "Cloudinary upload failed" });
//   }

//   next(error);
// });

// // General error handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: "Something went wrong!" });
// });

// // 404 handler (must be last)
// app.use((req, res) => {
//   res.status(404).json({ message: "Route not found" });
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
//   console.log("Using Cloudinary for file storage");
// });

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { fileURLToPath } from "url";
import connectToMongoDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import upload from "./config/upload.js"; // Your Cloudinary multer config
import cloudinary from "./config/cloudinary.js";

// Load environment variables first
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://e-commerce-test-drkl.vercel.app",
      "http://localhost:3000", // CRA local
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

// Connect to database with error handling
connectToMongoDB().catch((err) => {
  console.error("Database connection failed:", err);
  process.exit(1);
});

// Test route to check server status
app.get("/api/test", (req, res) => {
  res.json({
    message: "Server is running",
    timestamp: new Date().toISOString(),
    cloudinary_config: {
      cloud_name: !!process.env.CLOUDINARY_CLOUD_NAME,
      api_key: !!process.env.CLOUDINARY_API_KEY,
      api_secret: !!process.env.CLOUDINARY_API_SECRET,
    },
  });
});

// FIXED: Single image upload route - removed duplicate
app.post("/api/upload", upload.single("image"), async (req, res) => {
  try {
    console.log("=== IMAGE UPLOAD REQUEST ===");
    console.log("Headers:", req.headers);
    console.log("File received:", !!req.file);

    if (!req.file) {
      console.error("No file in request");
      return res.status(400).json({
        error: "No file uploaded",
        received_fields: Object.keys(req.body || {}),
        content_type: req.headers["content-type"],
      });
    }

    console.log("File details:", {
      filename: req.file.filename,
      originalname: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
      path: req.file.path,
      public_id: req.file.public_id,
    });

    // Validate Cloudinary response
    if (!req.file.path) {
      console.error("Cloudinary didn't return URL");
      return res.status(500).json({
        error: "Upload successful but no URL returned from Cloudinary",
      });
    }

    const response = {
      message: "File uploaded successfully",
      filename: req.file.filename,
      originalname: req.file.originalname,
      size: req.file.size,
      url: req.file.path, // Cloudinary URL
      secure_url: req.file.path, // Same as path for Cloudinary
      public_id: req.file.public_id || req.file.filename, // Cloudinary public ID
    };

    console.log("=== UPLOAD SUCCESS ===");
    console.log("Response:", response);

    res.json(response);
  } catch (error) {
    console.error("=== UPLOAD ERROR ===");
    console.error("Error details:", error);
    console.error("Stack trace:", error.stack);

    res.status(500).json({
      error: `Upload failed: ${error.message}`,
      details: error.stack,
    });
  }
});

// Multiple files upload route using Cloudinary
app.post("/api/upload/multiple", upload.array("images", 5), (req, res) => {
  try {
    console.log("=== MULTIPLE UPLOAD REQUEST ===");
    console.log("Files received:", req.files?.length || 0);

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const fileData = req.files.map((file) => ({
      filename: file.filename,
      originalname: file.originalname,
      size: file.size,
      url: file.path, // Cloudinary URL
      public_id: file.public_id || file.filename, // Cloudinary public ID
    }));

    console.log("=== MULTIPLE UPLOAD SUCCESS ===");
    console.log("Uploaded files:", fileData.length);

    res.json({
      message: "Files uploaded successfully",
      files: fileData,
    });
  } catch (error) {
    console.error("=== MULTIPLE UPLOAD ERROR ===");
    console.error("Upload error:", error);
    res.status(500).json({
      error: `Multiple upload failed: ${error.message}`,
    });
  }
});

// Delete uploaded file from Cloudinary
app.delete("/api/upload/image/:public_id", async (req, res) => {
  try {
    const publicId = req.params.public_id;
    console.log("=== DELETE REQUEST ===");
    console.log("Public ID:", publicId);

    if (!publicId) {
      return res.status(400).json({ error: "Public ID is required" });
    }

    // Delete from Cloudinary using public_id
    const result = await cloudinary.uploader.destroy(publicId);
    console.log("Cloudinary delete result:", result);

    if (result.result === "ok") {
      res.json({ message: "File deleted successfully", result });
    } else if (result.result === "not found") {
      res.status(404).json({ error: "File not found", result });
    } else {
      res.status(400).json({
        error: "Failed to delete file",
        result,
        public_id: publicId,
      });
    }
  } catch (error) {
    console.error("=== DELETE ERROR ===");
    console.error("Delete error:", error);
    res.status(500).json({
      error: `Delete failed: ${error.message}`,
      public_id: req.params.public_id,
    });
  }
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);

// Multer error handler - MUST be before general error handler
app.use((error, req, res, next) => {
  console.error("=== MULTER ERROR ===");
  console.error("Error code:", error.code);
  console.error("Error message:", error.message);

  if (error.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      error: "File too large. Maximum size is 10MB",
      max_size: "10MB",
    });
  }

  if (error.code === "LIMIT_UNEXPECTED_FILE") {
    return res.status(400).json({
      error: "Too many files or unexpected field name. Expected field: 'image'",
      expected_field: "image",
    });
  }

  if (error.code === "LIMIT_FILE_COUNT") {
    return res.status(400).json({
      error: "Too many files uploaded",
      max_files: 5,
    });
  }

  // Handle file filter errors
  if (error.message && error.message.includes("Only image files")) {
    return res.status(400).json({
      error: error.message,
      allowed_types: ["jpeg", "jpg", "png", "gif", "webp"],
    });
  }

  // Handle Cloudinary errors
  if (error.message && error.message.toLowerCase().includes("cloudinary")) {
    return res.status(500).json({
      error: "Cloudinary service error",
      details: error.message,
    });
  }

  // If it's not a multer/upload specific error, pass to next handler
  next(error);
});

// General error handler - FIXED to provide better error info
app.use((err, req, res, next) => {
  console.error("=== GENERAL ERROR ===");
  console.error("URL:", req.method, req.url);
  console.error("Headers:", req.headers);
  console.error("Body:", req.body);
  console.error("Error:", err.message);
  console.error("Stack:", err.stack);

  // Don't send stack traces in production
  const isDevelopment = process.env.NODE_ENV !== "production";

  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
    ...(isDevelopment && {
      stack: err.stack,
      url: req.url,
      method: req.method,
    }),
  });
});

// 404 handler (must be last)
app.use((req, res) => {
  console.log("=== 404 ERROR ===");
  console.log("URL not found:", req.method, req.url);

  res.status(404).json({
    error: "Route not found",
    url: req.url,
    method: req.method,
    available_routes: [
      "GET /api/test",
      "POST /api/upload/image",
      "POST /api/upload/multiple",
      "DELETE /api/upload/image/:public_id",
      "POST /api/users/*",
      "POST /api/product/*",
      "POST /api/cart/*",
    ],
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("Using Cloudinary for file storage");
  console.log("Environment:", process.env.NODE_ENV || "development");
  console.log("Cloudinary config:", {
    cloud_name: !!process.env.CLOUDINARY_CLOUD_NAME,
    api_key: !!process.env.CLOUDINARY_API_KEY,
    api_secret: !!process.env.CLOUDINARY_API_SECRET,
  });
});
