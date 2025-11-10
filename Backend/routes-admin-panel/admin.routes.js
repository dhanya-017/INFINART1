const express = require("express");
const router = express.Router();

const {
  loginAdmin,
  getPendingProducts,
  approveProduct,
  rejectProduct,
  getAllSellers,
  getSellerProducts,
  deleteProduct,
  verifyToken,
  getSalesAnalytics,
  getUserAnalytics,
} = require("../controllersAdminPanel/admin.controller.js");
const { protectAdmin } = require("../Middleware/auth.middleware");

// Admin routes
router.post("/login", loginAdmin);
router.get("/products", protectAdmin, getPendingProducts);
router.put("/products/:productId/approve", protectAdmin, approveProduct);
router.put("/products/:productId/reject", protectAdmin, rejectProduct);
router.get("/sellers", protectAdmin, getAllSellers);
router.get("/sellers/:sellerId/products", protectAdmin, getSellerProducts);
router.delete("/products/:productId", protectAdmin, deleteProduct);
router.get("/verify", protectAdmin, verifyToken);

// Analytics routes
router.get("/analytics/sales", protectAdmin, getSalesAnalytics);
router.get("/analytics/users", protectAdmin, getUserAnalytics);

module.exports = router;
