import express from "express";
import {
  addToCart,
  getCartData,
  deleteAllCartItems,
  deleteCartItem,
} from "../controllers/cartController.js";
const router = express.Router();

router.post("/add", addToCart);
router.get("/all/:userId", getCartData);
router.delete("/delete/all/:userId", deleteAllCartItems);
router.delete("/delete/:userId/:productId", deleteCartItem);

export default router;
