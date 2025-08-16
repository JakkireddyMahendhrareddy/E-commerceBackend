import express from "express";
import {
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getSingleProduct,
  deleteAllProducts,
  getProductByCategory,
  searchProducts,
} from "../controllers/productController.js";
import upload from "../config/upload.js";
// <-- your multer-cloudinary setup

const router = express.Router();

// Product Routes
router.post("/create", upload.single("image"), createProduct);
router.put("/update/:id", upload.single("image"), updateProduct);

router.delete("/delete/:id", deleteProduct);
router.delete("/delete/all", deleteAllProducts);

router.get("/all", getAllProducts);
router.get("/:id", getSingleProduct);
router.get("/category/:category", getProductByCategory);
router.get("/search/:keyword", searchProducts);

export default router;

// import {
//   createProduct,
//   deleteProduct,
//   updateProduct,
//   getAllProducts,
//   getSingleProduct,
//   deleteAllProducts,
//   getProductByCategory,
//   searchProducts,
// } from "../controllers/productController.js";
// import express from "express";
// const router = express.Router();

// router.post("/create", createProduct);
// router.delete("/delete/:id", deleteProduct);
// router.delete("/delete/all", deleteAllProducts);
// router.put("/update/:id", updateProduct);
// router.get("/all", getAllProducts);
// router.get("/:id", getSingleProduct);
// router.get("/category/:category", getProductByCategory);
// router.get("/search/:keyword", searchProducts);

// export default router;
