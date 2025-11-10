import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SellersPage.css';
import Pagination from '../src/components/Pagination';

const SellersPage = () => {
  const [sellers, setSellers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const itemsPerPage = 10;
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

  // Filter sellers
  const filteredSellers = sellers.filter(seller => {
    if (localSearchTerm === '') return true;
    const lowercasedTerm = localSearchTerm.toLowerCase();
    return (
      seller.sellerName.toLowerCase().includes(lowercasedTerm) ||
      seller.storeName.toLowerCase().includes(lowercasedTerm) ||
      seller.email.toLowerCase().includes(lowercasedTerm)
    );
  });

  // Sort sellers
  const sortedSellers = [...filteredSellers].sort((a, b) => {
    let compareA, compareB;
    
    if (sortBy === 'name') {
      compareA = a.sellerName.toLowerCase();
      compareB = b.sellerName.toLowerCase();
    } else if (sortBy === 'store') {
      compareA = a.storeName.toLowerCase();
      compareB = b.storeName.toLowerCase();
    } else if (sortBy === 'date') {
      compareA = new Date(a.createdAt || a._id);
      compareB = new Date(b.createdAt || b._id);
    }
    
    if (sortOrder === 'asc') {
      return compareA > compareB ? 1 : -1;
    } else {
      return compareA < compareB ? 1 : -1;
    }
  });

  // Paginate sellers
  const totalPages = Math.ceil(sortedSellers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSellers = sortedSellers.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="sellers-page">
      <div className="page-header">
        <h1>Sellers</h1>
        <button onClick={() => navigate(-1)} className="back-btn">Back</button>
      </div>
      <div className="sellers-controls">
        <div className="sellers-search-container">
          <input
            type="text"
            placeholder="Search sellers..."
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
            className="local-search-input"
          />
        </div>
        <div className="sort-container">
          <label htmlFor="seller-sort-select">Sort by:</label>
          <select 
            id="seller-sort-select"
            className="sort-select" 
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split('-');
              setSortBy(field);
              setSortOrder(order);
              setCurrentPage(1);
            }}
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="store-asc">Store (A-Z)</option>
            <option value="store-desc">Store (Z-A)</option>
            <option value="date-desc">Date (Newest)</option>
            <option value="date-asc">Date (Oldest)</option>
          </select>
        </div>
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
          {paginatedSellers.map(seller => (
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

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        totalItems={sortedSellers.length}
      />
    </div>
  );
};

export default SellersPage;
