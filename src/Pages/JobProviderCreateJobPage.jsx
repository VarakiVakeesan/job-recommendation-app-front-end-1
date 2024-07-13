import React from 'react';
import "./JobProviderDashpoardPage.css";
import SidebarComponent from '../Components/DashBoardComponentJobProvider/SideBar.jsx';
import CreateJob from '../Components/DashBoardComponentJobProvider/CreateJob.jsx';
const JobProviderCreateJob = () => {
    return ( <div>
                <div className="layout">
          <div className="sidebar">
            <h2>Quick Access</h2>
           <SidebarComponent/>
            {/* Add sidebar content here */}
          </div>
          <div className="content">
            {/* <h2>Create Job</h2> */}
            <CreateJob/>
            {/* Add main content here */}
          </div>
        </div>
        
    </div> );
}
 
export default JobProviderCreateJob;


