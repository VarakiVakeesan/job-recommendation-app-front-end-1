import React from 'react';
import "./JobProviderDashpoardPage.css";
import SidebarComponent from '../Components/DashBoardComponentJobProvider/SideBar.jsx';
import PostedJobs from '../Components/DashBoardComponentJobProvider/PostedJobs.jsx';
const JobProviderPostedJobs = () => {
    return ( <div>
                <div className="layout">
          <div className="sidebar">
            <h2>Quick Access</h2>
           <SidebarComponent/>
            {/* Add sidebar content here */}
          </div>
          <div className="content">
            <h2>Posted Jobs</h2>
            {/* Add main content here */}
            <PostedJobs/>
          </div>
        </div>
        
    </div> );
}
 
export default JobProviderPostedJobs;


