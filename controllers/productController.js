import ProductModel from "../models/productModel.js";

//delete product
export const createProduct = async (req, res) => {
  const { name, image, price, productDetails, rating, category } = req.body;
  try {
    if (
      !name ||
      !image ||
      !price ||
      !productDetails ||
      rating === undefined ||
      !category
    ) {
      return res.status(400).json({ message: "Please fill all the fields" });
    } else {
      let newProduct = new ProductModel({
        name,
        image,
        price,
        productDetails,
        rating,
        category,
      });
      const savedProduct = await newProduct.save();
      res.status(201).json({
        message: "product created successfully",
        product: savedProduct,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500), json({ message: "something went wrong" });
  }
};

//update product

export const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const { name, image, price, productDetails, rating, category } = req.body;
  try {
    if (!productId || !name || !image || !price || !productDetails) {
      return res.status(400).json({ message: "please fill all the fields" });
    }
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      {
        name,
        image,
        price,
        productDetails,
        rating,
        category,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "product not found" });
    }
    res.status(201).json({
      message: "product updated successfully",
      product: updatedProduct,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
};

//delete product
export const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    if (!productId) {
      return (
        res.status(400), json({ message: "please provide a valid product Id" })
      );
    }
    const deletedProuct = await ProductModel.findByIdAndDelete(productId);
    if (!deletedProuct) {
      return res.status(404).json({ message: "product not found" });
    }
    res.status(201).json({
      message: "product deleted successfully",
      product: deletedProuct,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
};

//delete all products

export const deleteAllProducts = async (req, res) => {
  try {
    await ProductModel.deleteMany();
    res.status(200).json({ message: "all products deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
};

//get All products

export const getAllProducts = async (req, res) => {
  try {
    let products = await ProductModel.find().sort({ createdAt: -1 });
    if (!products) {
      return res.status(404).json({ message: "no products found" });
    } else {
      if (products.length === 0) {
        return res.status(404).json({
          message:
            "products fetched successfully but no products are available",
          products: [],
        });
      }
    }
    res
      .status(200)
      .json({ message: "all products fetched successfully", products });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
};

//get single product

export const getSingleProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    if (!productId) {
      return (
        res.status(400), json({ message: "please provide a valid product Id" })
      );
    }
    let product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    res
      .status(200)
      .json({ message: "single product fetched successfully", product });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
};

//Get data based on category

export const getProductByCategory = async (req, res) => {
  const category = req.params.category;
  try {
    if (!category) {
      return res
        .status(400)
        .json({ message: "please provide a valid category" });
    }
    let products = await ProductModel.find({
      category,
    }); // { $regex: new RegExp(category, "i")

    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: `No products found in ${category}` });
    }
    res
      .status(200)
      .json({ message: `${products.length} products found`, products });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
};

//Get data based on search query

// GET /api/products/search?q=toys
export const searchProducts = async (req, res) => {
  try {
    const query = req.params.keyword?.trim();

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }
    const products = await ProductModel.find({
      $or: [
        { name: { $regex: query, $options: "i" } }, // search by product name
        { category: { $regex: query, $options: "i" } }, // search by category name
      ],
    });
    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: "Error searching products", error });
  }
};
