// routes/SellerPanel.routes.js
const express = require("express");
const { registerSeller, loginSeller, getSellerProfile } = require("../controllers/sellerPanelController");
const { protectSeller } = require("../Middleware/sellerAuth");
const Product = require("../models/product.model");
const router = express.Router();

// Public routes 
router.post("/register", registerSeller);
router.post("/login", loginSeller);

// Protected routes (authentication required)
router.get("/profile", protectSeller, getSellerProfile);

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