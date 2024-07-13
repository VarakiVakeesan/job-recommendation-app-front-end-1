import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CreateJob.css';

const CreateJob = () => {
    const roleid = localStorage.getItem('roleId');

  const [job, setJob] = useState({
    jobTitle: '',
    jobDescription: '',
    jobLocation: '',
    jobExperience: '',
    jobSkills: '',
    qualifiedEducation: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(job).some(value => value.trim() === '')) {
      setError('All fields are required');
      return;
    }
    try {
      const currentDate = new Date().toISOString().split('T')[0];
      const jobData = {
        ...job,
        jobPostedDate: currentDate,
        jobProviderId: roleid
      };
      await axios.post('http://localhost:8081/job/create', jobData);
      setError('');
      
      // Show success toast
      toast.success('Job created successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Reset form
      setJob({
        jobTitle: '',
        jobDescription: '',
        jobLocation: '',
        jobExperience: '',
        jobSkills: '',
        qualifiedEducation: ''
      });
    } catch (err) {
      setError('Failed to create job');
      
      // Show error toast
      toast.error('Failed to create job. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="create-job-container">
      <h2>Create Job</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="jobTitle">Job Title</label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={job.jobTitle}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="jobDescription">Job Description</label>
          <textarea
            id="jobDescription"
            name="jobDescription"
            value={job.jobDescription}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="jobLocation">Location</label>
          <input
            type="text"
            id="jobLocation"
            name="jobLocation"
            value={job.jobLocation}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="jobExperience">Experience</label>
          <input
            type="text"
            id="jobExperience"
            name="jobExperience"
            value={job.jobExperience}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="jobSkills">Skills</label>
          <input
            type="text"
            id="jobSkills"
            name="jobSkills"
            value={job.jobSkills}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="qualifiedEducation">Education</label>
          <input
            type="text"
            id="qualifiedEducation"
            name="qualifiedEducation"
            value={job.qualifiedEducation}
            onChange={handleInputChange}
            required
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

export default CreateJob;