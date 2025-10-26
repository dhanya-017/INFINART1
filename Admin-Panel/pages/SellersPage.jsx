import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SellersPage.css';

const SellersPage = () => {
  const [sellers, setSellers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch('/api/admin/sellers', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setSellers(data);
      } catch (error) {
        console.error('Error fetching sellers:', error);
      }
    };

    fetchSellers();
  }, []);

  const handleViewProducts = (sellerId) => {
    navigate(`/sellers/${sellerId}/products`);
  };

  return (
    <div className="sellers-page">
      <div className="page-header">
        <h1>Sellers</h1>
        <button onClick={() => navigate(-1)} className="back-btn">Back</button>
      </div>
      <table className="sellers-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Store Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sellers.map(seller => (
            <tr key={seller._id}>
              <td>{seller.sellerName}</td>
              <td>{seller.storeName}</td>
              <td>{seller.email}</td>
              <td>{seller.phone}</td>
              <td>
                <button className="view-products-btn" onClick={() => handleViewProducts(seller._id)}>View Products</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SellersPage;
