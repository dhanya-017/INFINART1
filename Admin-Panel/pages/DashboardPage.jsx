import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DashboardPage.css';
import toast from 'react-hot-toast';
import ConfirmationModal from '../src/components/ConfirmationModal';

const DashboardPage = () => {
  const [stats, setStats] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
    totalSellers: 0
  });
  const [recentProducts, setRecentProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      
      // Fetch all products for statistics
      const [pendingRes, approvedRes, rejectedRes, sellersRes] = await Promise.all([
        axios.get('/api/admin/products?status=pending', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get('/api/admin/products?status=approved', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get('/api/admin/products?status=rejected', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch('/api/admin/sellers', {
          headers: { 'Authorization': `Bearer ${token}` }
        }).then(res => res.json())
      ]);

      setStats({
        pending: pendingRes.data.length,
        approved: approvedRes.data.length,
        rejected: rejectedRes.data.length,
        totalSellers: sellersRes.length
      });

      // Get recent pending products (last 6)
      const recentPending = pendingRes.data.slice(0, 6);
      setRecentProducts(recentPending);
    } catch (err) {
      setError('Failed to fetch dashboard data.');
      toast.error('Failed to fetch dashboard data.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleApproveClick = (product) => {
    setSelectedProduct(product);
    setModalAction('approve');
    setModalIsOpen(true);
  };

  const handleRejectClick = (product) => {
    setSelectedProduct(product);
    setModalAction('reject');
    setModalIsOpen(true);
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setModalAction('delete');
    setModalIsOpen(true);
  };

  const handleConfirmAction = () => {
    if (modalAction === 'approve') {
      handleApprove(selectedProduct._id);
    } else if (modalAction === 'reject') {
      handleReject(selectedProduct._id);
    } else if (modalAction === 'delete') {
      handleDelete(selectedProduct._id);
    }
    setModalIsOpen(false);
    setSelectedProduct(null);
    setModalAction(null);
  };

  const handleApprove = async (productId) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`/api/admin/products/${productId}/approve`, {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Product approved successfully!');
      fetchDashboardData(); // Refresh dashboard
    } catch (err) {
      toast.error('Failed to approve product.');
    }
  };

  const handleDelete = async (productId) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`/api/admin/products/${productId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Product deleted successfully!');
      fetchDashboardData(); // Refresh dashboard
    } catch (err) {
      toast.error('Failed to delete product.');
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
        toast.success('Product rejected successfully!');
        fetchDashboardData(); // Refresh dashboard
      } catch (err) {
        toast.error('Failed to reject product.');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <ConfirmationModal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        onConfirm={handleConfirmAction}
        title={`Confirm ${modalAction}`}
      >
        <p>Are you sure you want to {modalAction} this product?</p>
      </ConfirmationModal>
      <div className="dashboard-background">
        <div className="dashboard-overview-content">
          <div className="dashboard-welcome-box">
            <div className="dashboard-welcome-text">
              <h1>Dashboard</h1>
              <p>Welcome to the admin dashboard. Quick overview of your platform statistics.</p>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="stats-grid">
            <div className="stat-card stat-pending">
              <div className="stat-icon">⏳</div>
              <div className="stat-content">
                <h3>Pending Review</h3>
                <p className="stat-number">{stats.pending}</p>
                <span className="stat-label">Products awaiting approval</span>
              </div>
            </div>

            <div className="stat-card stat-approved">
              <div className="stat-icon">✅</div>
              <div className="stat-content">
                <h3>Approved</h3>
                <p className="stat-number">{stats.approved}</p>
                <span className="stat-label">Live products</span>
              </div>
            </div>

            <div className="stat-card stat-rejected">
              <div className="stat-icon">❌</div>
              <div className="stat-content">
                <h3>Rejected</h3>
                <p className="stat-number">{stats.rejected}</p>
                <span className="stat-label">Products rejected</span>
              </div>
            </div>

            <div className="stat-card stat-sellers">
              <div className="stat-icon">👥</div>
              <div className="stat-content">
                <h3>Total Sellers</h3>
                <p className="stat-number">{stats.totalSellers}</p>
                <span className="stat-label">Registered sellers</span>
              </div>
            </div>
          </div>

          {/* Recent Products Section */}
          <div className="dashboard-section">
            <div className="section-header">
              <h2>Recent Pending Products</h2>
              <a href="/products" className="view-all-link">View All Products →</a>
            </div>

            {recentProducts.length === 0 ? (
              <div className="no-recent-products">
                <p>🎉 No pending products! All caught up.</p>
              </div>
            ) : (
              <div className="recent-products-grid">
                {recentProducts.map(product => (
                  <div key={product._id} className="dashboard-product-card">
                    <img src={product.images[0]} alt={product.name} className="dashboard-product-image" />
                    <div className="dashboard-product-details">
                      <h3>{product.name}</h3>
                      <p className="product-price-dashboard">₹{product.price}</p>
                      <p className="product-info-line">
                        <strong>Seller:</strong> {product.sellerId ? product.sellerId.sellerName : 'N/A'}
                      </p>
                      <p className="product-info-line">
                        <strong>Store:</strong> {product.sellerId ? product.sellerId.storeName : 'N/A'}
                      </p>
                      <p className="product-info-line">
                        <strong>Email:</strong> {product.sellerId ? product.sellerId.email : 'N/A'}
                      </p>
                      <p className="product-info-line">
                        <strong>Phone:</strong> {product.sellerId ? product.sellerId.phone : 'N/A'}
                      </p>
                      <p className="product-description-dashboard">{product.description}</p>
                    </div>
                    <div className="dashboard-product-actions">
                      <button onClick={() => handleApproveClick(product)} className="btn-approve">Approve</button>
                      <button onClick={() => handleRejectClick(product)} className="btn-reject">Reject</button>
                      <button onClick={() => handleDeleteClick(product)} className="btn-delete">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
