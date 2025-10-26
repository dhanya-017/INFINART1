import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import SellersPage from '../pages/SellersPage';
import SellerProductsPage from '../pages/SellerProductsPage';

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
      <Routes>
        <Route path="/login" element={isAdmin ? <Navigate to="/" /> : <LoginPage setIsAdmin={setIsAdmin} />} />
        <Route path="/" element={isAdmin ? <DashboardPage /> : <Navigate to="/login" />} />
        <Route path="/sellers" element={isAdmin ? <SellersPage /> : <Navigate to="/login" />} />
        <Route path="/sellers/:sellerId/products" element={isAdmin ? <SellerProductsPage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
