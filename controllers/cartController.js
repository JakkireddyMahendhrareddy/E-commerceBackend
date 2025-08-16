// import Cart from "../models/cartModel.js";

// export const addToCart = async (req, res) => {
//   try {
//     const { userId, productId, quantity = 1 } = req.body;

//     // Check if this user already has a cart
//     let cart = await Cart.findOne({ userId });

//     if (cart) {
//       // Check if product already exists in cart
//       const existingProductIndex = cart.products.findIndex(
//         (item) => item.productId.toString() === productId
//       );

//       if (existingProductIndex > -1) {
//         // Product already in cart → increase quantity
//         cart.products[existingProductIndex].quantity += quantity;
//       } else {
//         // Product not in cart → push new item
//         cart.products.push({
//           productId,
//           quantity,
//           message: "product addded to cart successfully",
//         });
//       }
//     } else {
//       // No cart for user → create one
//       cart = new Cart({
//         userId,
//         products: [
//           {
//             productId,
//             quantity,
//             message: "product addded to cart successfully",
//           },
//         ],
//       });
//     }

//     await cart.save();
//     res
//       .status(201)
//       .json({ message: "Product added to cart successfully", cart });
//   } catch (error) {
//     console.error("Error adding to cart:", error);
//     res.status(500).json({ message: "Error adding to cart", error });
//   }
// };

// import mongoose from "mongoose";

// export const getCartData = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     if (!userId) {
//       return res.status(400).json({ message: "User ID is required" });
//     }

//     const cart = await Cart.findOne({ userId })
//       .populate("products.productId")
//       .lean();

//     if (!cart) {
//       return res.status(404).json({ message: "Cart not found" });
//     }

//     // Remove null products
//     cart.products = cart.products.filter((p) => p.productId);

//     // Sort by product creation date (newest first)
//     cart.products.sort((a, b) => {
//       const dateA = a.productId?.createdAt
//         ? new Date(a.productId.createdAt)
//         : 0;
//       const dateB = b.productId?.createdAt
//         ? new Date(b.productId.createdAt)
//         : 0;
//       return dateB - dateA;
//     });

//     res.status(200).json({
//       message: "Cart data fetched successfully",
//       cart,
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({
//       message: "Error fetching cart data",
//       error: error.toString(),
//     });
//   }
// };
// export const updateCartItemQuantity = async (req, res) => {
//   try {
//     const { userId, productId } = req.params;
//     const { quantity } = req.body;

//     if (!userId || !productId) {
//       return res
//         .status(400)
//         .json({ message: "User ID and Product ID are required" });
//     }

//     if (quantity < 1) {
//       return res
//         .status(400)
//         .json({ message: "Quantity must be greater than zero." });
//     }

//     const cart = await Cart.findOne({ userId });
//     if (!cart) {
//       return res.status(404).json({ message: "Cart not found" });
//     }

//     const productIndex = cart.products.findIndex(
//       (item) => item.productId.toString() === productId
//     );

//     if (productIndex !== -1) {
//       // Get original unit price (you can store it separately to avoid cumulative multiplication)
//       const unitPrice =
//         cart.products[productIndex].unitPrice ||
//         cart.products[productIndex].price;

//       // Update quantity
//       cart.products[productIndex].quantity = quantity;

//       // Update price as double based on quantity
//       cart.products[productIndex].price = unitPrice * quantity;

//       // Store unitPrice for future updates (only once)
//       cart.products[productIndex].unitPrice = unitPrice;

//       await cart.save();
//       return res.json(cart);
//     } else {
//       return res.status(404).json({ message: "Product not found in cart" });
//     }
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// };

// export const deleteAllCartItems = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     if (!userId) {
//       return res.status(400).json({ message: "User ID is required" });
//     }

//     // Clear products array for that user's cart instead of deleting the whole document
//     const cart = await Cart.findOneAndUpdate(
//       { userId },
//       { $set: { products: [] } }, // empty the products array
//       { new: true }
//     );

//     if (!cart) {
//       return res.status(404).json({ message: "Cart not found" });
//     }

//     res.json({ message: "All items deleted successfully", cart });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send("Server Error");
//   }
// };

// export const deleteCartItem = async (req, res) => {
//   try {
//     const { userId, productId } = req.params;

//     if (!userId || !productId) {
//       return res
//         .status(400)
//         .json({ message: "User ID and Product ID are required" });
//     }

//     // Remove only the matching product from the products array
//     const cart = await Cart.findOneAndUpdate(
//       { userId },
//       { $pull: { products: { productId } } }, // pull product from array
//       { new: true }
//     );

//     if (!cart) {
//       return res.status(404).json({ message: "Cart not found" });
//     }

//     res.json({ message: "Product removed successfully", cart });
//   } catch (error) {
//     console.error("Error removing cart item:", error.message);
//     res.status(500).send("Server Error");
//   }
// };

import Cart from "../models/cartModel.js";
import mongoose from "mongoose";

export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity = 1 } = req.body;

    // Validate required fields
    if (!userId || !productId) {
      return res
        .status(400)
        .json({ message: "User ID and Product ID are required" });
    }

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
        cart.products.push({
          productId,
          quantity,
        });
      }
    } else {
      // No cart for user → create one
      cart = new Cart({
        userId,
        products: [
          {
            productId,
            quantity,
          },
        ],
      });
    }

    await cart.save();
    res.status(201).json({
      message: "Product added to cart successfully",
      cart,
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({
      message: "Error adding to cart",
      error: error.toString(),
    });
  }
};

export const getCartData = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID format" });
    }

    const cart = await Cart.findOne({ userId })
      .populate("products.productId")
      .lean();

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Remove products where productId is null (deleted products)
    cart.products = cart.products.filter((p) => p.productId);

    // Sort by product creation date (newest first)
    cart.products.sort((a, b) => {
      const dateA = a.productId?.createdAt
        ? new Date(a.productId.createdAt)
        : 0;
      const dateB = b.productId?.createdAt
        ? new Date(b.productId.createdAt)
        : 0;
      return dateB - dateA;
    });

    res.status(200).json({
      message: "Cart data fetched successfully",
      cart,
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({
      message: "Error fetching cart data",
      error: error.toString(),
    });
  }
};

export const updateCartItemQuantity = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const { quantity } = req.body;

    if (!userId || !productId) {
      return res
        .status(400)
        .json({ message: "User ID and Product ID are required" });
    }

    if (!quantity || quantity < 1) {
      return res
        .status(400)
        .json({ message: "Quantity must be greater than zero" });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex !== -1) {
      // Update quantity
      cart.products[productIndex].quantity = quantity;

      await cart.save();
      return res.status(200).json({
        message: "Cart updated successfully",
        cart,
      });
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({
      message: "Error updating cart",
      error: error.toString(),
    });
  }
};

export const deleteAllCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $set: { products: [] } },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({
      message: "All items deleted successfully",
      cart,
    });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({
      message: "Error clearing cart",
      error: error.toString(),
    });
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

    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { products: { productId } } },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({
      message: "Product removed successfully",
      cart,
    });
  } catch (error) {
    console.error("Error removing cart item:", error);
    res.status(500).json({
      message: "Error removing cart item",
      error: error.toString(),
    });
  }
};
