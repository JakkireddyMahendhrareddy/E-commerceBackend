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
    const cart = await Cart.findOne({ userId }).populate("products.productId");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({
      message: "Cart data fetched successfully",
      cart,
    });
  } catch (error) {
    console.error("Error fetching cart data:", error);
    res.status(500).json({ message: "Error fetching cart data", error });
  }
};

// export const deleteCart=async(req,res)=>{

// }
