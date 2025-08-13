import express from "express";
import { addToCart, getCartData } from "../controllers/cartController.js";
const router = express.Router();

router.post("/add", addToCart);
router.get("/all/:userId", getCartData);

export default router;
