import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AppliedJobs.css';

const AppliedJobs = () => {
  const roleid = localStorage.getItem('roleId');
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/application/jobs/${roleid}`);
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="applied-jobs-container">
      {jobs.map((job, index) => (
        <div key={job.jobId} className="job-card">
          <div className={`status-badge ${job.isHired ? 'hired' : 'not-hired'}`}>
            {job.isHired ? 'Hired' : 'Not Hired'}
          </div>
          <h2>{job.jobTitle}</h2>
          <p>{job.jobDescription}</p>
          <p><strong>Experience:</strong> {job.jobExperience}</p>
          <p><strong>Education:</strong> {job.qualifiedEducation}</p>
          <p><strong>Location:</strong> {job.jobLocation}</p>
          <p><strong>Posted on:</strong> {new Date(job.jobPostedDate).toLocaleDateString()}</p>
          <div className="skills">
            {(job.jobSkills ? job.jobSkills.split(', '): []).map((skill, skillIndex) => (
              <span key={skillIndex} className="skill-tag">{skill}</span>
            ))}
          </div>
          <button className="applied-button" disabled>Applied</button>
        </div>
      ))}
    </div>
  );
};

export default AppliedJobs;