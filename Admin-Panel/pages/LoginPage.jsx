import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';
import logo from '../../FrontEnd/src/Images/Logo.png';

const LoginPage = ({ setIsAdmin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/admin/login', {
        email,
        password,
      });
      localStorage.setItem('adminToken', response.data.token);
      setIsAdmin(true);
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <img src={logo} alt="Infinart Logo" style={{ width: '150px', marginBottom: '20px' }} />
        <h2>Admin Panel Login</h2>
        <p>Please enter your credentials to continue.</p>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="login-message error">{error}</p>}
          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
