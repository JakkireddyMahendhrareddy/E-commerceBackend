import mongoose from "mongoose";
const schema = mongoose.Schema;

const cartSchema = new schema({
  userId: {
    type: schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  products: [
    {
      productId: {
        type: schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      quantity: { type: Number, default: 1 },
    },
  ],
});

const Cart = mongoose.model("cart", cartSchema);
export default Cart;
