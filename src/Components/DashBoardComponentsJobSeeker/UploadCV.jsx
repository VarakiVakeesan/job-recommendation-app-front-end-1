import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Document, Page, pdfjs } from 'react-pdf';
import { useDropzone } from 'react-dropzone';
import './UploadCV.css';

// Set up the worker for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [updating, setUpdating] = useState(false);
  const roleid = localStorage.getItem('roleId');

  const onDrop = useCallback((acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    handleFileSelection(selectedFile);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    multiple: false
  });

  const handleFileSelection = (selectedFile) => {
    const fileType = selectedFile.type;
    if (fileType === "application/pdf" || fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      if (fileType === "application/pdf") {
        setPdfUrl(URL.createObjectURL(selectedFile));
      } else {
        setPdfUrl(null);
      }
    } else {
      toast.error('Please select a PDF or DOCX file');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please select a file to upload');
      return;
    }
    if (!roleid) {
      toast.error('User not logged in');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('userID', roleid);

    setUploading(true);
    try {
      const response = await axios.post(`http://127.0.0.1:5000/upload-cv`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 200) {
        toast.success(response.data.db_message || 'Resume uploaded successfully!');
      } else {
        throw new Error(response.data.error || 'Failed to upload file');
      }
    } catch (error) {
      console.error('Error uploading resume:', error);
      toast.error(error.message || 'Failed to upload resume. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    setFile(null);
    setFileName('');
    setPdfUrl(null);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const handleUpdateData = async () => {
    // ... (keep the existing handleUpdateData function)
  };

  return (
    <div className="resume-upload">
      <h2>Upload Resume</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
            <input {...getInputProps()} />
            {
              isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Drag and drop your resume here, or click to select files</p>
            }
            {fileName && <p className="file-name">Selected file: {fileName}</p>}
          </div>
        </div>
        <div className="button-group">
          <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
          <button type="submit" className="save-btn" disabled={uploading}>
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
          <button type="button" className="update-btn" onClick={handleUpdateData} disabled={updating}>
            {updating ? 'Updating...' : 'Update Data'}
          </button>
        </div>
      </form>

      {pdfUrl && (
        <div className="pdf-viewer">
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>
          <p>
            Page {pageNumber} of {numPages}
          </p>
          <div className="pdf-controls">
            <button 
              onClick={() => setPageNumber(pageNumber - 1)} 
              disabled={pageNumber <= 1}
            >
              Previous
            </button>
            <button 
              onClick={() => setPageNumber(pageNumber + 1)} 
              disabled={pageNumber >= numPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;