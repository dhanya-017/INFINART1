// services/sellerPanelService.js
const Seller = require("../models/seller.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// REGISTER
const registerSellerService = async (sellerData) => {
  const { email, password } = sellerData;

  // Validate required fields
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  // Check if email exists
  const sellerExists = await Seller.findOne({ email });
  if (sellerExists) {
    throw new Error("Seller already exists with this email");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create seller
  const seller = await Seller.create({
    ...sellerData,
    password: hashedPassword,
  });

  if (!seller) {
    throw new Error("Failed to create seller account");
  }

  // Remove password from response
  const sellerResponse = seller.toObject();
  delete sellerResponse.password;

  return {
    seller: sellerResponse,
    token: generateToken(seller._id),
  };
};

// LOGIN
const loginSellerService = async ({ email, password }) => {
  // Validate input
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  // Find seller by email
  const seller = await Seller.findOne({ email });
  if (!seller) {
    throw new Error("Invalid email or password");
  }

  // Check password
  const isMatch = await bcrypt.compare(password, seller.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  // Remove password from response
  const sellerResponse = seller.toObject();
  delete sellerResponse.password;

  return {
    seller: sellerResponse,
    token: generateToken(seller._id),
  };
};

// GET PROFILE
const getSellerProfileService = async (sellerId) => {
  console.log('Getting seller profile for ID:', sellerId);
  
  if (!sellerId) {
    throw new Error("Seller ID is required");
  }

  const seller = await Seller.findById(sellerId).select("-password");
  if (!seller) {
    throw new Error("Seller not found");
  }

  return seller;
};

module.exports = {
  registerSellerService,
  loginSellerService,
  getSellerProfileService,
};