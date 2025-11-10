// src/services/sellerService.js
import axios from "axios";

const API_URL = "http://localhost:5001/api/seller";

// Function to get the seller profile
const getSellerProfile = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/profile`, config);

  if (response.data.success) {
    return response.data.seller;
  } else {
    throw new Error(response.data.message || "Failed to fetch profile");
  }
};

const sellerService = {
  getSellerProfile,
};

export default sellerService;
