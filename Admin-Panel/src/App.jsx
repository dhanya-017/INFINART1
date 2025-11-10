import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import ProductsPage from '../pages/ProductsPage';
import SellersPage from '../pages/SellersPage';
import SellerProductsPage from '../pages/SellerProductsPage';
import ReportsPage from '../pages/ReportsPage';
import AnalyticsPage from '../pages/AnalyticsPage';
import GlobalSearchPage from '../pages/GlobalSearchPage';
import AdminLayout from './layouts/AdminLayout';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const verifyAdmin = async () => {
      const token = localStorage.getItem('adminToken');
      if (token) {
        try {
          const response = await fetch('/api/admin/verify', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.ok) {
            setIsAdmin(true);
          } else {
            localStorage.removeItem('adminToken');
          }
        } catch (error) {
          localStorage.removeItem('adminToken');
        }
      }
      setLoading(false);
    };

    verifyAdmin();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={isAdmin ? <Navigate to="/" /> : <LoginPage setIsAdmin={setIsAdmin} />} />
        <Route path="/" element={isAdmin ? <AdminLayout><DashboardPage /></AdminLayout> : <Navigate to="/login" />} />
        <Route path="/products" element={isAdmin ? <AdminLayout><ProductsPage /></AdminLayout> : <Navigate to="/login" />} />
        <Route path="/sellers" element={isAdmin ? <AdminLayout><SellersPage /></AdminLayout> : <Navigate to="/login" />} />
        <Route path="/sellers/:sellerId/products" element={isAdmin ? <AdminLayout><SellerProductsPage /></AdminLayout> : <Navigate to="/login" />} />
        <Route path="/reports" element={isAdmin ? <AdminLayout><ReportsPage /></AdminLayout> : <Navigate to="/login" />} />
        <Route path="/analytics" element={isAdmin ? <AdminLayout><AnalyticsPage /></AdminLayout> : <Navigate to="/login" />} />
        <Route path="/search" element={isAdmin ? <AdminLayout><GlobalSearchPage /></AdminLayout> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
