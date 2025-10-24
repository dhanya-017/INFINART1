const jwt = require('jsonwebtoken');
const Seller = require('../models/seller.model');

const protectSeller = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const seller = await Seller.findById(decoded.id).select('-password');

      if (!seller) {
        return res.status(401).json({ message: 'Not authorized, seller not found' });
      }

      req.user = seller; // Attach the full seller object
      next();
    } catch (error) {
      console.error("SELLER AUTH ERROR:", error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protectSeller };
