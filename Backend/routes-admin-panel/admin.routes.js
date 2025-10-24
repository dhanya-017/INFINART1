const express = require("express");
const router = express.Router();

const {
  loginAdmin,
  getPendingProducts,
  approveProduct,
  rejectProduct,
} = require("../controllersAdminPanel/admin.controller.js");
const { protectAdmin } = require("../Middleware/auth.middleware");

// Admin routes
router.post("/login", loginAdmin);
router.get("/products/pending", protectAdmin, getPendingProducts);
router.put("/products/:productId/approve", protectAdmin, approveProduct);
router.put("/products/:productId/reject", protectAdmin, rejectProduct);

module.exports = router;
