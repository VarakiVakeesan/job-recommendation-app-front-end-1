import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AllJobs.css';

const AllJobs = () => {
  const roleid = localStorage.getItem('roleId');
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  

  useEffect(() => {
    fetchJobs();
    fetchApplications();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:8081/job/getAllJob');
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await axios.get('http://localhost:8081/application/all');
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const getApplicationStatus = (jobId) => {
    const application = applications.find(app => app.job.jobId === jobId && app.jobSeeker.jobSeekerId === roleid);
    return application ? application.applicationStatus : false;
  };

  const handleApply = async (jobId) => {
    try {
      await axios.post('http://localhost:8081/application/create', {
        applicationStatus: true,
        jobAppliedDate: new Date().toISOString(),
        jobSeekerId: roleid, // Assuming this is the current user's ID
        jobId: jobId
      });
      // Refetch applications to update the state
      // fetchApplications();
    } catch (error) {
      console.error('Error applying for job:', error);
    }
  };

  return (
    <div className="all-jobs">
      {jobs.map(job => {
        const applicationStatus = getApplicationStatus(job.jobId);
        return (
          <div key={job.jobId} className="job-card">
            <div className="job-header">
              <h2>{job.jobTitle}</h2>
              <span className={`status ${job.isHired ? 'hired' : 'not-hired'}`}>
                {job.isHired ? 'Hired' : 'Not Hired'}
              </span>
            </div>
            <p>{job.jobDescription}</p>
            <div className="job-details">
              <p><strong>Experience:</strong> {job.jobExperience}</p>
              <p><strong>Education:</strong> {job.qualifiedEducation}</p>
              <p><strong>Location:</strong> {job.jobLocation}</p>
              <p><strong>Posted on:</strong> {new Date(job.jobPostedDate).toLocaleDateString()}</p>
            </div>
            <div className="job-skills">
              {(job.jobSkills ? job.jobSkills.split(', ') : []).map(skill => (
                <span key={skill} className="skill">{skill}</span>
              ))}
            </div>
            <button 
              className={`apply-button ${applicationStatus ? 'applied' : ''}`} 
              disabled={applicationStatus}
              onClick={() => handleApply(job.jobId)}
            >
              {applicationStatus ? 'Applied' : 'Apply Now'}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default AllJobs;