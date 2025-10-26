const Product = require("../models/product.model");
const Admin = require("../models/admin.model");
const Seller = require("../models/seller.model");
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

// Get all products with "pending" status
const getPendingProducts = async (req, res) => {
  try {
    const pendingProducts = await Product.find({ approvalStatus: "pending" }).populate({
      path: "sellerId",
      select: "sellerName storeName email phone",
    });
    res.status(200).json(pendingProducts);
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

module.exports = {
  loginAdmin,
  getPendingProducts,
  approveProduct,
  rejectProduct,
  getAllSellers,
  getSellerProducts,
  deleteProduct,
  verifyToken,
};
