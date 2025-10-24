import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Search, Filter, Edit2, Trash2, Plus } from 'lucide-react';
import './Inventory.css';

const InventoryManagement = () => {
  const [products] = useState([
    { id: 1, name: 'Acrylic Wall Paint', sku: 'PNT-001', category: 'Paints', stock: 45, price: 149.99, status: 'In Stock' },
    { id: 2, name: 'Oil Paint Set', sku: 'PNT-002', category: 'Paints', stock: 12, price: 299.99, status: 'Low Stock' },
    { id: 3, name: 'Fine Paintbrush Set', sku: 'BRH-003', category: 'Brushes', stock: 60, price: 79.99, status: 'In Stock' },
    { id: 4, name: 'Canvas Panels Pack', sku: 'CNS-004', category: 'Paint Supplies', stock: 30, price: 249.99, status: 'In Stock' },
    { id: 5, name: 'Decorative Vase', sku: 'DCR-005', category: 'Decor', stock: 25, price: 499.99, status: 'In Stock' },
    { id: 6, name: 'LED Table Lamp', sku: 'LMP-006', category: 'Lighting', stock: 15, price: 349.99, status: 'Low Stock' },
    { id: 7, name: 'Wooden Bookshelf', sku: 'FUR-007', category: 'Furniture', stock: 8, price: 2499.99, status: 'Low Stock' },
    { id: 8, name: 'Wall Clock', sku: 'DCR-008', category: 'Decor', stock: 0, price: 899.99, status: 'Out of Stock' },
    { id: 9, name: 'Acrylic Paint Medium', sku: 'PNT-009', category: 'Paints', stock: 50, price: 199.99, status: 'In Stock' },
    { id: 10, name: 'Canvas Easel Stand', sku: 'CNS-010', category: 'Paint Supplies', stock: 20, price: 1299.99, status: 'In Stock' }
  ]);

  const getStatusClass = (status) => {
    switch(status) {
      case 'In Stock': return 'status-in-stock';
      case 'Low Stock': return 'status-low-stock';
      case 'Out of Stock': return 'status-out-stock';
      default: return '';
    }
  };

  const alertCards = [
    { title: 'Total Stock Value', count: '$25,000' },
    { title: 'High Demand', product: 'Acrylic Wall Paint', count: '15 sold today' },
    { title: 'Low Stock Alert', product: 'Acrylic Paint Set', count: '8 left' },
    { title: 'Out of Stock', product: 'Canvas Easel Stand', count: 'Restock needed' },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const categories = ['All Categories', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });  

  const AlertCard = ({ title, product, count }) => (
    <div className="inventory-alert-card">
      <h3 className="alert-title">{title}</h3>
      <div className="alert-content">
        {product && <span className="alert-product">{product}</span>}
        <span className="alert-badge">{count}</span>
      </div>
    </div>
  );

  return (
    <div className="inventory-container">
      <div className="inventory-header">
        <h1 className="inventory-title">Inventory Management</h1>
        <Link to="/addProduct" className="link-no-underline">
          <button className="add-product-btn">
            <Plus size={20} /> Add product
          </button>
        </Link>
      </div>

      <div className="alert-cards-grid">
        {alertCards.map((card, idx) => <AlertCard key={idx} {...card} />)}
      </div>

      <div className="search-filter-section">
        <div className="search-box">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search Products Or SKU" 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="dropdown-container">
          <button className="filter-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <Filter size={20} /> {selectedCategory} <span className="dropdown-arrow">▼</span>
          </button>
          {dropdownOpen && (
            <ul className="dropdown-list">
              {categories.map((cat, idx) => (
                <li 
                  key={idx} 
                  onClick={() => { setSelectedCategory(cat); setDropdownOpen(false); }}
                  className={cat === selectedCategory ? 'active-category' : ''}
                >
                  {cat}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="product-inventory-section">
        <h2 className="section-title">Product Inventory</h2>
        <div className="table-container">
          <table className="inventory-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product.id}>
                  <td className="product-name">{product.name}</td>
                  <td>{product.sku}</td>
                  <td>{product.category}</td>
                  <td>{product.stock}</td>
                  <td>${product.price}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(product.status)}`}>
                      {product.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn edit-btn"><Edit2 size={18} /></button>
                      <button className="action-btn delete-btn"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InventoryManagement;