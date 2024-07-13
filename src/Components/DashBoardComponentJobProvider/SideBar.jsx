// SidebarComponent.jsx
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SideBar.css";
import {
  FaHome,
  FaTachometerAlt,
  FaBriefcase,
  FaPlus,
  FaUser,
  FaTrashAlt,
  FaSignOutAlt,
} from "react-icons/fa";

const SidebarComponent = () => {
  const roleid = localStorage.getItem("roleId");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleDeleteClick = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  const handleCancelDelete = () => {
    setShowPopup(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8081/jobprovider/delete/${roleid}`);
      toast.success("Account deleted successfully");
      setShowPopup(false);
      // Redirect to home page or login page after successful deletion
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      localStorage.removeItem("role");
      localStorage.setItem("loginSuccess", "false");
      localStorage.removeItem("roleId");
      navigate("/home");
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Failed to delete account. Please try again.");
    }
  };

  return (
    <div className="sidebar">
      <NavLink to="/home" className="sidebar-item" activeClassName="active">
        <FaHome className="sidebar-icon" />
        Home
      </NavLink>
      {/* <NavLink
        to="/dashboard/jobprovider"
        className="sidebar-item"
        activeClassName="active"
      >
        <FaTachometerAlt className="sidebar-icon" />
        Dashboard
      </NavLink> */}
      <NavLink
        to="/postedjobs/jobprovider"
        className="sidebar-item"
        activeClassName="active"
      >
        <FaBriefcase className="sidebar-icon" />
        Posted Jobs
      </NavLink>
      <NavLink
        to="/createjob/jobprovider"
        className="sidebar-item"
        activeClassName="active"
      >
        <FaPlus className="sidebar-icon" />
        Create Job
      </NavLink>
      <NavLink
        to="/profiledetails/jobprovider"
        className="sidebar-item"
        activeClassName="active"
      >
        <FaUser className="sidebar-icon" />
        Company Details
      </NavLink>
      <NavLink to="#" className="sidebar-item1" onClick={handleDeleteClick}>
        <FaTrashAlt className="sidebar-icon" />
        Delete Account
      </NavLink>
      <NavLink to="/logout" className="sidebar-item" activeClassName="active">
        <FaSignOutAlt className="sidebar-icon" />
        Logout
      </NavLink>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <p>Are you sure you want to delete account?</p>
            <div className="popup-buttons">
              <button className="cancel-btn" onClick={handleCancelDelete}>
                Cancel
              </button>
              <button className="confirm-btn" onClick={handleConfirmDelete}>
                DELETE
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default SidebarComponent;
