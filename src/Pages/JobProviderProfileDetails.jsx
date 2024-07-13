import React from "react";
import "./JobProviderDashpoardPage.css";
import SidebarComponent from "../Components/DashBoardComponentJobProvider/SideBar.jsx";
import CompanyDetails from "../Components/DashBoardComponentJobProvider/ProfileDetails.jsx";
const JobProviderProfileDetails = () => {
  return (
    <div>
      <div className="layout">
        <div className="sidebar">
          <h2>Quick Access</h2>
          <SidebarComponent />
          {/* Add sidebar content here */}
        </div>
        <div className="content">
          {/* <h2>Profile Details</h2> */}
          <CompanyDetails/>
          {/* Add main content here */}
        </div>
      </div>
    </div>
  );
};

export default JobProviderProfileDetails;
