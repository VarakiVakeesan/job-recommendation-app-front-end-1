// SignUpComponent.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './SignupJobSeeker.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import SignUpImage from "../Resources/Images/Personal site-amico.png"

const SignUpJobProviderComponent = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userName: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8081/jobprovider/create', {
        ...formData,
        registeredDate: new Date().toISOString().split('T')[0]
      });
      if(response.data.isDuplicated){
        console.log('User Not created:', response.data);
        toast.error('User Name Already Exists');
      }
      else{
        console.log('User created:', response.data);
        toast.success('Account created successfully!');
        setTimeout(() => {
          navigate('/login/jobProvider');
        }, 2000);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="signup-container">
            <ToastContainer />
      <div className="signup-image">
      <img src={SignUpImage} alt="Login illustration" />
      </div>
      <div className="signup-form">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="userName"
            placeholder="Username"
            value={formData.userName}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit" className="signup-button">SIGN UP</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <p className="login-link">
          Already have an account? <a href="/login/jobSeeker">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default SignUpJobProviderComponent;