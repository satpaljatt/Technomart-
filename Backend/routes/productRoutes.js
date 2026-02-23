import express from 'express';
import Product from '../models/productModel.js'; // Godaam (Model) ka access liya

const router = express.Router(); // Router wo traffic police hai jo rasta batayega

// 1. Saara Samaan Mangne ka rasta
// Rasta: GET /api/products
router.get('/', async (req, res) => {
    // Product.find({}) matlab DB mein jao aur sab kuch utha lao
    const products = await Product.find({});
    
    // Samaan ko browser ko de do
    res.json(products);
});

// 2. Koi Ek (Single) Samaan Mangne ka rasta (ID ke hisaab se)
// Rasta: GET /api/products/:id
router.get('/:id', async (req, res) => {
    // req.params.id matlab browser ne URL mein jo ID bheji hai, usko uthao aur DB mein dhoondo
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product); // Agar mil gaya toh bhej do
    } else {
        res.status(404).json({ message: 'Product nahi mila bhai!' }); // Nahi mila toh error de do
    }
});

export default router; // Is raste ko bahar bhej do taaki server isko use kar sake