import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import AuthService from '../api/AuthService';


const Login = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Email and password are required.');
      return;
    }

    try {
      setError('');
      const response = await AuthService.login(formData); // Call login API
      localStorage.setItem('jwtToken', response.token); // Store token in localStorage
      navigate('/'); // Redirect to home page after successful login
    } catch (error) {
      console.error('Login failed:', error);
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-header">Login</h2>
        {error && <p className="login-error">{error}</p>}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" id="email" name="email" className="form-input" placeholder="Enter your email" 
            value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" id="password" name="password" className="form-input" placeholder="Enter your password" 
            value={formData.password}  onChange={handleChange} required />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
