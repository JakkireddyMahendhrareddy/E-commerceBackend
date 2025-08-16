// // import mongoose from "mongoose";
// // const schema = mongoose.Schema;

// // const cartSchema = new schema(
// //   {
// //     userId: {
// //       type: schema.Types.ObjectId,
// //       ref: "user",
// //       required: true,
// //     },
// //     products: [
// //       {
// //         productId: {
// //           type: schema.Types.ObjectId,
// //           ref: "product",
// //           required: true,
// //         },
// //         quantity: { type: Number, default: 1 },
// //       },
// //     ],
// //   },
// //   { timestamps: true } // ✅ adds createdAt & updatedAt automatically
// // );

// // const Cart = mongoose.model("cart", cartSchema);
// // export default Cart;

// import mongoose from "mongoose";
// const schema = mongoose.Schema;

// const cartSchema = new schema(
//   {
//     userId: {
//       type: schema.Types.ObjectId,
//       ref: "User", // ✅ Capitalized to match model name
//       required: true,
//       index: true, // ✅ Add index for better query performance
//     },
//     products: [
//       {
//         productId: {
//           type: schema.Types.ObjectId,
//           ref: "Product", // ✅ Capitalized to match model name
//           required: true,
//         },
//         quantity: {
//           type: Number,
//           default: 1,
//           min: [1, "Quantity must be at least 1"], // ✅ Add validation
//         },
//         addedAt: {
//           type: Date,
//           default: Date.now, // ✅ Track when item was added to cart
//         },
//       },
//     ],
//   },
//   {
//     timestamps: true,
//     // ✅ Add indexes for better performance
//     indexes: [{ userId: 1 }, { "products.productId": 1 }],
//   }
// );

// // ✅ Ensure one cart per user
// cartSchema.index({ userId: 1 }, { unique: true });

// const Cart = mongoose.model("Cart", cartSchema); // ✅ Capitalized model name
// export default Cart;

import mongoose from "mongoose";
const schema = mongoose.Schema;

const cartSchema = new schema(
  {
    userId: {
      type: schema.Types.ObjectId,
      ref: "user", // ✅ lowercase if your model is registered as "user"
      required: true,
      index: true,
    },
    products: [
      {
        productId: {
          type: schema.Types.ObjectId,
          ref: "product", // ✅ lowercase if your model is registered as "product"
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          min: [1, "Quantity must be at least 1"],
        },
        // Add these if you need price functionality
        price: {
          type: Number,
          min: 0,
        },
        unitPrice: {
          type: Number,
          min: 0,
        },
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
    indexes: [{ userId: 1 }, { "products.productId": 1 }],
  }
);

cartSchema.index({ userId: 1 }, { unique: true });

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
