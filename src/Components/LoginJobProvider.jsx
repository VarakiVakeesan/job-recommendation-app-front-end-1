// LoginComponent.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './LoginComponent.css';
import LoginImage from '../Resources/Images/LoginImage.png';

const LoginJobProvider = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8081/jobprovider/login', {
        userName,
        password
      });

      if (response.data.loginSuccess) {
        const { token } = response.data;
        localStorage.setItem('token', token);
        
        // Decode token (in a real app, use a proper JWT decoding library)
        const payload = JSON.parse(atob(token.split('.')[1]));
        localStorage.setItem('userName', payload.userName);
        localStorage.setItem('role', payload.role);
        localStorage.setItem('loginSuccess', 'true');
        localStorage.setItem('roleId',payload.jobProviderId)

        // Show success toast
        toast.success('Login successful!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Redirect to job provider dashboard
        navigate('/profiledetails/jobprovider');
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-image">
        <img src={LoginImage} alt="Login illustration" />
      </div>
      <div className="login-form">
        <h2>Welcome Back..!</h2>
        <h3 className="tagline">Find Your Ideal Candidates with AI-Powered Precision.</h3>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter User Name Here"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Enter Password Here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <a href="#" className="forgot-password">Forgot Password</a>
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <div className="create-account">
          <a href="#">Create New Account</a>
        </div>
      </div>
    </div>
  );
};

export default LoginJobProvider;