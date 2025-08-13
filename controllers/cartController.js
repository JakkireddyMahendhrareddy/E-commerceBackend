import Cart from "../models/cartModel.js";

export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity = 1 } = req.body;

    // Check if this user already has a cart
    let cart = await Cart.findOne({ userId });

    if (cart) {
      // Check if product already exists in cart
      const existingProductIndex = cart.products.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (existingProductIndex > -1) {
        // Product already in cart → increase quantity
        cart.products[existingProductIndex].quantity += quantity;
      } else {
        // Product not in cart → push new item
        cart.products.push({ productId, quantity });
      }
    } else {
      // No cart for user → create one
      cart = new Cart({
        userId,
        products: [{ productId, quantity }],
      });
    }

    await cart.save();
    res
      .status(201)
      .json({ message: "Product added to cart successfully", cart });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Error adding to cart", error });
  }
};
