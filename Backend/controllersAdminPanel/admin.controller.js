const Product = require("../models/product.model");
const Admin = require("../models/admin.model");
const Seller = require("../models/seller.model");
const Order = require("../models/order.model");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// Admin login
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
      res.json({
        _id: admin._id,
        email: admin.email,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get products by status
const getPendingProducts = async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};

    if (status === 'pending') {
      query = {
        $or: [
          { approvalStatus: 'pending' },
          { approvalStatus: { $exists: false } },
          { approvalStatus: null },
        ],
      };
    } else if (status) {
      query = { approvalStatus: status };
    } else {
      // Default to pending if no status is provided
      query = {
        $or: [
          { approvalStatus: 'pending' },
          { approvalStatus: { $exists: false } },
          { approvalStatus: null },
        ],
      };
    }

    const products = await Product.find(query).populate({
      path: "sellerId",
      select: "sellerName storeName email phone",
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pending products", error });
  }
};

// Approve a product
const approveProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { approvalStatus: "approved" },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error approving product", error });
  }
};

// Reject a product
const rejectProduct = async (req, res) => {
  const { productId } = req.params;
  const { adminNotes } = req.body; // Optional notes from admin
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { approvalStatus: "rejected", adminNotes },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error rejecting product", error });
  }
};

// Get all sellers
const getAllSellers = async (req, res) => {
  try {
    const sellers = await Seller.find({}).select("-password");
    res.status(200).json(sellers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sellers", error });
  }
};

// Get all products for a specific seller
const getSellerProducts = async (req, res) => {
  const { sellerId } = req.params;
  try {
    const products = await Product.find({ sellerId }).populate({
      path: "sellerId",
      select: "sellerName storeName email phone",
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching seller products", error });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product removed" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};

const verifyToken = (req, res) => {
  res.status(200).json({ message: "Token is valid" });
};

// Get sales analytics data
const getSalesAnalytics = async (req, res) => {
  try {
    const salesData = await Order.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalSales: { $sum: "$totalAmount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formattedSalesData = salesData.map(item => ({
      name: monthNames[item._id - 1],
      sales: item.totalSales,
    }));

    res.status(200).json(formattedSalesData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sales analytics", error });
  }
};

// Get user analytics data
const getUserAnalytics = async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const userData = await User.aggregate([
      {
        $match: {
          lastLogin: { $gte: sevenDaysAgo },
        },
      },
      {
        $group: {
          _id: { $dayOfWeek: "$lastLogin" },
          userCount: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const formattedUserData = userData.map(item => ({
      name: dayNames[item._id - 1],
      users: item.userCount,
    }));

    res.status(200).json(formattedUserData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user analytics", error });
  }
};

module.exports = {
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
};
