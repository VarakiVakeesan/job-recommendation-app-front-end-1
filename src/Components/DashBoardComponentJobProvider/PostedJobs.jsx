// PostedJobs.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PostedJobs.css';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this job?</p>
        <div className="modal-buttons">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="confirm-btn" onClick={onConfirm}>Yes</button>
        </div>
      </div>
    </div>
  );
};

const JobCard = ({ job, applicantCount, onDelete }) => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const hiredStatus = job.isHired ? 'Hired' : 'Not Hired';
  const statusColor = job.isHired ? 'red' : 'green';
  const skills = job.jobSkills ? job.jobSkills.split(', ') : [];

  const handleEdit = () => {
    navigate(`/editjobs/jobprovider/${job.jobId}`);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:8081/job/delete/${job.jobId}`);
      onDelete(job.jobId);
    } catch (error) {
      console.error('Error deleting job:', error);
    }
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="job-card">
      <div className="job-header">
        <h2>{job.jobTitle}</h2>
        <span className={`status-badge ${statusColor}`}>{hiredStatus}</span>
      </div>
      <p>{job.jobDescription}</p>
      <p><strong>Experience:</strong> {job.jobExperience}</p>
      <p><strong>Education:</strong> {job.qualifiedEducation}</p>
      <p><strong>Location:</strong> {job.jobLocation}</p>
      <p><strong>Posted on:</strong> {new Date(job.jobPostedDate).toLocaleDateString()}</p>
      <div className="skills">
        {skills.map((skill, index) => (
          <span key={index} className="skill-badge">{skill}</span>
        ))}
      </div>
      <div className="button-group">
        <button className="applicants-btn">{applicantCount} Applicants</button>
        <button className="edit-btn" onClick={handleEdit}>Edit</button>
        <button className="delete-btn" onClick={handleDeleteClick}>Delete</button>
      </div>
      <DeleteConfirmationModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

const PostedJobs = () => {
  const roleId = localStorage.getItem('roleId');
  const [jobs, setJobs] = useState([]);
  const [applicantCounts, setApplicantCounts] = useState({});

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/jobprovider/${roleId}/jobs`);
      setJobs(response.data);

      const counts = await Promise.all(
        response.data.map(job => 
          axios.get(`http://localhost:8081/application/count/${job.jobId}`)
            .then(res => ({ [job.jobId]: res.data }))
        )
      );
      setApplicantCounts(Object.assign({}, ...counts));
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleDeleteJob = (jobId) => {
    setJobs(jobs.filter(job => job.jobId !== jobId));
  };

  return (
    <div className="posted-jobs-container">
      <div className="job-grid">
        {jobs.map(job => (
          <JobCard 
            key={job.jobId} 
            job={job} 
            applicantCount={applicantCounts[job.jobId] || 0}
            onDelete={handleDeleteJob}
          />
        ))}
      </div>
    </div>
  );
};

export default PostedJobs;