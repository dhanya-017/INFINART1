const userModel = require('../models/user.model');

// Favorites (Wishlist)
// Get user favorites
module.exports.getFavorites = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id).populate('favorites');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ favorites: user.favorites });
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add to favorites
module.exports.addFavorite = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) return res.status(400).json({ message: 'productId is required' });
    const user = await userModel.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const exists = user.favorites.find((id) => id.toString() === productId);
    if (!exists) user.favorites.push(productId);
    await user.save();
    res.status(200).json({ message: 'Added to favorites', favorites: user.favorites });
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Remove from favorites
module.exports.removeFavorite = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = await userModel.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.favorites = user.favorites.filter((id) => id.toString() !== productId);
    await user.save();
    res.status(200).json({ message: 'Removed from favorites', favorites: user.favorites });
  } catch (error) {
    console.error('Error removing favorite:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
