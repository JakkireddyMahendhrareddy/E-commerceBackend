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

export const getCartData = async (req, res) => {
  try {
    const { userId } = req.params; // or req.params if you send via URL

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Populate product details if needed
    const cart = await Cart.findOne({ userId })
      .populate("products.productId")
      .lean();

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    cart.products.sort((a, b) => {
      return new Date(b.productId.createdAt) - new Date(a.productId.createdAt);
    });

    res.status(200).json({
      message: "Cart data fetched successfully",
      cart,
    });
  } catch (error) {
    console.error("Error fetching cart data:", error);
    res.status(500).json({ message: "Error fetching cart data", error });
  }
};

export const deleteAllCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Clear products array for that user's cart instead of deleting the whole document
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $set: { products: [] } }, // empty the products array
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.json({ message: "All items deleted successfully", cart });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
};

export const deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    if (!userId || !productId) {
      return res
        .status(400)
        .json({ message: "User ID and Product ID are required" });
    }

    // Remove only the matching product from the products array
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { products: { productId } } }, // pull product from array
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.json({ message: "Product removed successfully", cart });
  } catch (error) {
    console.error("Error removing cart item:", error.message);
    res.status(500).send("Server Error");
  }
};
