import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DashboardPage.css';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPendingProducts = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('/api/admin/products/pending', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
    } catch (err) {
      setError('Failed to fetch products.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPendingProducts();
  }, []);

  const handleApprove = async (productId) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`/api/admin/products/${productId}/approve`, {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProducts(products.filter(p => p._id !== productId));
    } catch (err) {
      alert('Failed to approve product.');
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const token = localStorage.getItem('adminToken');
        await axios.delete(`/api/admin/products/${productId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProducts(products.filter(p => p._id !== productId));
      } catch (err) {
        alert('Failed to delete product.');
      }
    }
  };

  const handleReject = async (productId) => {
    const reason = prompt('Please provide a reason for rejection:');
    if (reason) {
      try {
        const token = localStorage.getItem('adminToken');
        await axios.put(`/api/admin/products/${productId}/reject`, 
          { adminNotes: reason },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProducts(products.filter(p => p._id !== productId));
      } catch (err) {
        alert('Failed to reject product.');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="dashboard-background">
      <div className="dashboard-overview-content">
        <div className="dashboard-welcome-box">
          <div className="dashboard-welcome-text">
            <h1>Admin Dashboard</h1>
            <p>Review pending products from sellers.</p>
          </div>
          <Link to="/sellers" className="dashboard-add-btn" style={{ marginRight: '10px' }}>View Sellers</Link>
          <button onClick={() => { localStorage.removeItem('adminToken'); window.location.reload(); }} className="dashboard-add-btn">Logout</button>
        </div>

        <div className="dashboard-table-section">
          <h2>Pending Products for Review</h2>
          {products.length === 0 ? (
            <p>No products are currently pending review.</p>
          ) : (
            <div className="product-list">
              {products.map(product => (
                <div key={product._id} className="product-card">
                  <img src={product.images[0]} alt={product.name} className="product-image" />
                  <div className="product-details">
                    <h3>{product.name}</h3>
                    <p><strong>Seller:</strong> {product.sellerId.sellerName}</p>
                    <p><strong>Store:</strong> {product.sellerId.storeName}</p>
                    <p><strong>Email:</strong> {product.sellerId.email}</p>
                    <p><strong>Phone:</strong> {product.sellerId.phone}</p>
                    <p><strong>Price:</strong> ₹{product.price}</p>
                    <p>{product.description}</p>
                  </div>
                  <div className="product-actions">
                    <button onClick={() => handleApprove(product._id)} className="approve-button">Approve</button>
                    <button onClick={() => handleReject(product._id)} className="reject-button">Reject</button>
                    <button onClick={() => handleDelete(product._id)} className="delete-button">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
