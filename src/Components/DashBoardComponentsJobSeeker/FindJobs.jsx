// FindJob.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./FindJobs.css";

const JobCard = ({ job, applications, onApplicationSubmit }) => {
  const roleid = localStorage.getItem('roleId');
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    const application = applications.find(
      (app) => app.job.jobId === job.jobId && app.jobSeeker.jobSeekerId === roleid
    );
        // setIsApplied(application && application.applicationStatus);
  }, [applications, job.jobId]);

  const handleApply = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8081/application/create",
        {
          applicationStatus: true,
          jobAppliedDate: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
          jobSeekerId: roleid, // Assuming the jobSeekerId is 1, you might want to get this dynamically
          jobId: job.jobId,
        }
      );

      if (response.status === 200 || response.status === 201) {
        setIsApplied(true);
        toast.success("Application submitted successfully!");
        if (onApplicationSubmit) onApplicationSubmit();
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.");
    }
  };

  return (
    <div className=".job-card-jobseeker">
      <div className="job-header">
        <h2>{job.jobTitle}</h2>
        <span className="status1">Not Hired</span>
      </div>
      <p>{job.jobDescription}</p>
      <div className="job-details">
        <p>
          <strong>Experience:</strong> {job.jobExperience}
        </p>
        <p>
          <strong>Education:</strong> {job.qualifiedEducation}
        </p>
        <p>
          <strong>Location:</strong> {job.jobLocation}
        </p>
        <p>
          <strong>Posted on:</strong>{" "}
          {new Date(job.jobPostedDate).toLocaleDateString()}
        </p>
      </div>
      <div className="job-skills">
        {job.jobSkills.split(", ").map((skill) => (
          <span key={skill} className="skill">
            {skill}
          </span>
        ))}
      </div>
      <button
        className={`apply-button1 ${isApplied ? "applied" : ""}`}
        disabled={isApplied}
        onClick={handleApply}
      >
        {isApplied ? "Applied" : "Apply Now"}
      </button>
    </div>
  );
};

const FindJob = () => {
  const roleid = localStorage.getItem("roleId");
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [skills, setSkills] = useState([]);
  const [response, setResponse] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState(null);

  const jobIds = [1, 2, 3, 10, 15, 20, 25];

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchJobs = async () => {
    const fetchedJobs = await Promise.all(
      jobIds.map(async (id) => {
        try {
          const response = await axios.get(
            `http://localhost:8081/job/getJobById/${id}`
          );
          return response.data;
        } catch (error) {
          console.error(`Error fetching job with ID ${id}:`, error);
          return null;
        }
      })
    );
    setJobs(fetchedJobs.filter((job) => job !== null));
  };

  const fetchApplications = async () => {
    try {
      const response = await axios.get("http://localhost:8081/application/all");
      setApplications(response.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  const fetchSkills = async () => {
    try {
      // Fetching data from the GET endpoint
      const getSkillsResponse = await axios.get(
        `http://localhost:8081/jobseeker/getSkills/${roleid}`
      );
      setSkills(getSkillsResponse.data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching Skills:", err);
    }
  };

  const SendSkills = async () => {
    try {
      const searchJobsResponse = await axios.post(
        "http://localhost:8081/searchjobs",
        skills
      );
      setResponse(searchJobsResponse.data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching Skills:", error);
    }
  };

  const handleShowResults = () => {
    fetchJobs();
    setShowResults(true);
  };

  const handleSearchResults = () => {
    SendSkills();
    // setShowResults(true);
  };

  const handleFindJobs = () => {
    fetchSkills();
    // setShowResults(true);
  };

  const handleApplicationSubmit = () => {
    fetchApplications(); // Refresh the applications list
  };

  return (
    <div className="find-job-container">
      <div className="button-container">
        <button className="find-button" onClick={handleFindJobs}>
          Find Jobs
        </button>
      </div>
      <div className="button-container">
        <button className="find-button" onClick={handleSearchResults}>
          Search Jobs
        </button>
      </div>
      <div className="button-container">
        <button className="show-results-button" onClick={handleShowResults}>
          Show Results
        </button>
      </div>
      {showResults && (
        <div className="job-results">
          {jobs.reduce((rows, job, index) => {
            if (index % 2 === 0) {
              rows.push(
                <div className="job-row" key={job.jobId}>
                  <JobCard
                    job={job}
                    applications={applications}
                    onApplicationSubmit={handleApplicationSubmit}
                  />
                  {jobs[index + 1] && (
                    <JobCard
                      job={jobs[index + 1]}
                      applications={applications}
                      onApplicationSubmit={handleApplicationSubmit}
                    />
                  )}
                </div>
              );
            }
            return rows;
          }, [])}
        </div>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default FindJob;
