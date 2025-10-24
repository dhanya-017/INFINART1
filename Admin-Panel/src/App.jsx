import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';

const App = () => {
  const [isAdmin, setIsAdmin] = React.useState(!!localStorage.getItem('adminToken'));

  return (
    <Router>
      <Routes>
        <Route path="/login" element={isAdmin ? <Navigate to="/" /> : <LoginPage setIsAdmin={setIsAdmin} />} />
        <Route path="/" element={isAdmin ? <DashboardPage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
