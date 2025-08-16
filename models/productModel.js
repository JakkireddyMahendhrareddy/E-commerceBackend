import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    productDetails: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    // stock: { type: Number, default: 0 },
    // brand: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("product", productSchema);

export default Product;
