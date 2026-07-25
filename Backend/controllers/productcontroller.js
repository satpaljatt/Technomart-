import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product nahi mila bhai!' });
    }
});

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product delete ho gaya bhai!' });
    } else {

        res.status(404).json({ message: 'Product nahi mila bhai!' });
    }
});


const createProduct = async (req, res) => {
  try {
    const { name, price, description, image, brand, category, countInStock } = req.body;

    if (!name || !price || !description || !image || !brand || !category) {
      return res.status(400).json({ message: 'Bhai saare required fields bharo!' });
    }

    const newProduct = await Product.create({
      user: req.user._id, 
      name,
      price,
      description,
      image,
      brand,
      category,
      countInStock: countInStock || 0,
    });

    res.status(201).json({
      success: true,
      message: 'Product successfully add ho gaya bhai!',
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error: Product add nahi ho paya',
      error: error.message,
    });
  }
};


const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.image = image || product.image;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.countInStock = countInStock || product.countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: 'Product nahi mila bhai!' });
  }
});


export { getProducts, getProductById, deleteProduct, createProduct, updateProduct };