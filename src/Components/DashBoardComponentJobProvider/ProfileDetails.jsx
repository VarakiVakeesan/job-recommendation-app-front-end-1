// CompanyDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfileDetails.css';
import { toast } from 'react-toastify';

const CompanyDetails = () => {
    const roleid = localStorage.getItem('roleId');

  const [company, setCompany] = useState({
    companyName: '',
    industry: '',
    email: '',
    phoneNumber: '',
    address: '',
    registeredDate: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCompanyDetails();
  }, []);

  const fetchCompanyDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/jobprovider/get/${roleid}`);
      setCompany(response.data);
    } catch (err) {
      setError('Failed to fetch company details');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompany({ ...company, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(company).some(value => value === '')) {
      setError('All fields are required');
      return;
    }
    try {
      await axios.put(`http://localhost:8081/jobprovider/update/${roleid}`, company);
      setError('');
      toast.success('Profile Updated successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (err) {
      setError('Failed to update company details');
    }
  };

  return (
    <div className="company-details-container">
      <h2>Company Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={company.companyName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="industry">Industry</label>
          <input
            type="text"
            id="industry"
            name="industry"
            value={company.industry}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={company.email}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={company.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Contact Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={company.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="registeredDate">Registered Date</label>
          <input
            type="date"
            id="registeredDate"
            name="registeredDate"
            value={company.registeredDate.split('T')[0]}
            readOnly
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className="button-group">
          <button type="button" className="cancel-button">Cancel</button>
          <button type="submit" className="save-button">Save</button>
        </div>
      </form>
    </div>
  );
};

export default CompanyDetails;