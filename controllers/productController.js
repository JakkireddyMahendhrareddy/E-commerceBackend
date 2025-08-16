// import ProductModel from "../models/productModel.js";

// //delete product
// // export const createProduct = async (req, res) => {
// //   const { name, image, price, productDetails, rating, category } = req.body;
// //   try {
// //     if (
// //       !name ||
// //       !image ||
// //       !price ||
// //       !productDetails ||
// //       rating === undefined ||
// //       !category
// //     ) {
// //       return res.status(400).json({ message: "Please fill all the fields" });
// //     } else {
// //       let newProduct = new ProductModel({
// //         name,
// //         image,
// //         price,
// //         productDetails,
// //         rating,
// //         category,
// //       });
// //       const savedProduct = await newProduct.save();
// //       res.status(201).json({
// //         message: "product created successfully",
// //         product: savedProduct,
// //       });
// //     }
// //   } catch (err) {
// //     console.log(err);
// //     res.status(500), json({ message: "something went wrong" });
// //   }
// // };

// export const createProduct = async (req, res) => {
//   try {
//     const { name, price, productDetails, rating, category, image } = req.body;

//     // check if file uploaded OR image URL provided
//     let imagePath = "";
//     if (req.file) {
//       imagePath = req.file.path; // Cloudinary URL
//     } else if (image) {
//       imagePath = image; // Direct image link
//     }

//     // validation
//     if (
//       !name ||
//       !price ||
//       !productDetails ||
//       rating === undefined ||
//       !category ||
//       !imagePath
//     ) {
//       return res.status(400).json({ message: "Please fill all the fields" });
//     }

//     // create product
//     const newProduct = new ProductModel({
//       name,
//       image: imagePath,
//       price,
//       productDetails,
//       rating,
//       category,
//     });

//     const savedProduct = await newProduct.save();

//     res.status(201).json({
//       message: "Product created successfully",
//       product: savedProduct,
//     });
//   } catch (err) {
//     console.error("Error creating product:", err);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };

// //update product

// export const updateProduct = async (req, res) => {
//   const productId = req.params.id;
//   const { name, image, price, productDetails, rating, category } = req.body;
//   try {
//     if (!productId || !name || !image || !price || !productDetails) {
//       return res.status(400).json({ message: "please fill all the fields" });
//     }
//     const updatedProduct = await ProductModel.findByIdAndUpdate(
//       productId,
//       {
//         name,
//         image,
//         price,
//         productDetails,
//         rating,
//         category,
//       },
//       { new: true }
//     );

//     if (!updatedProduct) {
//       return res.status(404).json({ message: "product not found" });
//     }
//     res.status(201).json({
//       message: "product updated successfully",
//       product: updatedProduct,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "something went wrong" });
//   }
// };

// //delete product
// export const deleteProduct = async (req, res) => {
//   const productId = req.params.id;
//   try {
//     if (!productId) {
//       return (
//         res.status(400), json({ message: "please provide a valid product Id" })
//       );
//     }
//     const deletedProuct = await ProductModel.findByIdAndDelete(productId);
//     if (!deletedProuct) {
//       return res.status(404).json({ message: "product not found" });
//     }
//     res.status(201).json({
//       message: "product deleted successfully",
//       product: deletedProuct,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "something went wrong" });
//   }
// };

// //delete all products

// export const deleteAllProducts = async (req, res) => {
//   try {
//     await ProductModel.deleteMany();
//     res.status(200).json({ message: "all products deleted successfully" });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "something went wrong" });
//   }
// };

// //get All products

// export const getAllProducts = async (req, res) => {
//   try {
//     let products = await ProductModel.find().sort({ createdAt: -1 });
//     if (!products) {
//       return res.status(404).json({ message: "no products found" });
//     } else {
//       if (products.length === 0) {
//         return res.status(404).json({
//           message:
//             "products fetched successfully but no products are available",
//           products: [],
//         });
//       }
//     }
//     res
//       .status(200)
//       .json({ message: "all products fetched successfully", products });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "something went wrong" });
//   }
// };

// //get single product

// export const getSingleProduct = async (req, res) => {
//   const productId = req.params.id;
//   try {
//     if (!productId) {
//       return (
//         res.status(400), json({ message: "please provide a valid product Id" })
//       );
//     }
//     let product = await ProductModel.findById(productId);
//     if (!product) {
//       return res.status(404).json({ message: "product not found" });
//     }
//     res
//       .status(200)
//       .json({ message: "single product fetched successfully", product });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "something went wrong" });
//   }
// };

// //Get data based on category

// export const getProductByCategory = async (req, res) => {
//   const category = req.params.category;
//   try {
//     if (!category) {
//       return res
//         .status(400)
//         .json({ message: "please provide a valid category" });
//     }
//     let products = await ProductModel.find({
//       category,
//     }); // { $regex: new RegExp(category, "i")

//     if (products.length === 0) {
//       return res
//         .status(404)
//         .json({ message: `No products found in ${category}` });
//     }
//     res
//       .status(200)
//       .json({ message: `${products.length} products found`, products });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "something went wrong" });
//   }
// };

// //Get data based on search query

// // GET /api/products/search?q=toys
// export const searchProducts = async (req, res) => {
//   try {
//     const query = req.params.keyword?.trim();

//     if (!query) {
//       return res.status(400).json({ message: "Search query is required" });
//     }
//     const products = await ProductModel.find({
//       $or: [
//         { name: { $regex: query, $options: "i" } }, // search by product name
//         { category: { $regex: query, $options: "i" } }, // search by category name
//       ],
//     });
//     res.json({ products });
//   } catch (error) {
//     res.status(500).json({ message: "Error searching products", error });
//   }
// };

import ProductModel from "../models/productModel.js";

// Create product with Cloudinary image upload
export const createProduct = async (req, res) => {
  try {
    const { name, price, productDetails, rating, category, image } = req.body;

    // Check if file uploaded OR image URL provided
    let imagePath = "";
    if (req.file) {
      imagePath = req.file.path; // Cloudinary URL from multer-cloudinary
    } else if (image) {
      imagePath = image; // Direct image link
    }

    // Validation
    if (
      !name ||
      !price ||
      !productDetails ||
      rating === undefined ||
      !category ||
      !imagePath
    ) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    // Create product
    const newProduct = new ProductModel({
      name,
      image: imagePath,
      price,
      productDetails,
      rating,
      category,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      message: "Product created successfully",
      product: savedProduct,
    });
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const { name, price, productDetails, rating, category, image } = req.body;

    if (!productId) {
      return res
        .status(400)
        .json({ message: "Please provide a valid product ID" });
    }

    // Handle image update
    let imagePath = image; // Keep existing image if no new one
    if (req.file) {
      imagePath = req.file.path; // New Cloudinary URL
    }

    // Build update object (only include fields that are provided)
    const updateData = {};
    if (name) updateData.name = name;
    if (price) updateData.price = price;
    if (productDetails) updateData.productDetails = productDetails;
    if (rating !== undefined) updateData.rating = rating;
    if (category) updateData.category = category;
    if (imagePath) updateData.image = imagePath;

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      updateData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    if (!productId) {
      return res
        .status(400)
        .json({ message: "Please provide a valid product ID" });
    }

    const deletedProduct = await ProductModel.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Delete all products
export const deleteAllProducts = async (req, res) => {
  try {
    await ProductModel.deleteMany();
    res.status(200).json({ message: "All products deleted successfully" });
  } catch (err) {
    console.error("Error deleting all products:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find().sort({ createdAt: -1 });

    if (products.length === 0) {
      return res.status(200).json({
        message: "No products available",
        products: [],
      });
    }

    res.status(200).json({
      message: "All products fetched successfully",
      products,
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Get single product
export const getSingleProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    if (!productId) {
      return res
        .status(400)
        .json({ message: "Please provide a valid product ID" });
    }

    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product fetched successfully",
      product,
    });
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Get products by category
export const getProductByCategory = async (req, res) => {
  const category = req.params.category;
  try {
    if (!category) {
      return res
        .status(400)
        .json({ message: "Please provide a valid category" });
    }

    const products = await ProductModel.find({
      category: { $regex: new RegExp(category, "i") },
    });

    if (products.length === 0) {
      return res.status(404).json({
        message: `No products found in ${category} category`,
      });
    }

    res.status(200).json({
      message: `${products.length} products found`,
      products,
    });
  } catch (err) {
    console.error("Error fetching products by category:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Search products
export const searchProducts = async (req, res) => {
  try {
    const query = req.params.keyword?.trim();

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const products = await ProductModel.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { productDetails: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json({
      message: `${products.length} products found`,
      products,
    });
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ message: "Error searching products" });
  }
};
