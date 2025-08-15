import express from "express";
import {
  addToCart,
  getCartData,
  deleteAllCartItems,
  deleteCartItem,
  updateCartItemQuantity,
} from "../controllers/cartController.js";
const router = express.Router();

router.post("/add", addToCart);
router.get("/all/:userId", getCartData);
router.delete("/delete/all/:userId", deleteAllCartItems);
router.delete("/delete/:userId/:productId", deleteCartItem);
router.put("/update/quantity/:userId/:productId", updateCartItemQuantity);

export default router;
