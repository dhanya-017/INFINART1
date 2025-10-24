const express = require('express');
const router = express.Router();
const Product = require('../models/product.model');
const { protectSeller } = require('../Middleware/sellerAuth');

// @desc    Get all products for the logged-in seller
// @route   GET /api/seller/products
// @access  Private
router.get('/products', protectSeller, async (req, res) => {
  try {
    const products = await Product.find({ sellerId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
