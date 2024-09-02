import React, { useState, useEffect } from 'react';
import profileBg from "../assets/profile-bg.png";
import coin from "../assets/salary.png";
import cv from "../assets/cv.png";
import { IoLocationOutline } from "react-icons/io5";
import { IoReturnUpBack } from "react-icons/io5";
import { GoOrganization } from "react-icons/go";
import { useNavigate, useParams } from 'react-router-dom';
import { GrEdit } from "react-icons/gr";

const JobPage = () => {
  const { id } = useParams();
  const [isApplying, setIsApplying] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [org, setOrg] = useState(null);
  const [isJobPoster, setIsJobPoster] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await fetch('/data.json');
        const data = await response.json();
        const job = data.jobs.find(job => job.id === parseInt(id));
        setOrg(job);

        // Simulate checking if the current user is the job poster
        // In a real app, you'd compare the job's poster ID with the current user's ID
        setIsJobPoster(Math.random() < 0.5); // 50% chance of being the job poster for demonstration
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };

    fetchJobData();
  }, [id]);

  if (!org) {
    return <div>Job not found</div>;
  }

  const handleApply = () => {
    setIsApplying(true);
  };

  const handleSave = () => {
    setIsApplying(false);
    setIsSubmitted(true);
    setShowSuccessModal(true);
  };

  const handleCloseModal = () => {
    setIsApplying(false);
    setShowSuccessModal(false);
    setShowEditModal(false);
  };

  const handleChange = (e) => {
    setOrg({ ...org, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setOrg(prevOrg => ({
        ...prevOrg,
        document: URL.createObjectURL(file),
        documentName: file.name
      }));
    }
  };

  const handleClick = () => {
    navigate(-1);
  };

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    // Here you would typically send the updated job data to your backend
    console.log("Saving edited job data:", org);
    setShowEditModal(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white overflow-hidden pb-20">
      <div className="bg-blue-500 h-32" style={{ backgroundImage: `url(${profileBg})` }}>
        <button className="absolute top-2 left-2 text-white cursor-pointer">
          <div className='flex items-center gap-2' onClick={handleClick}>
            <IoReturnUpBack className="text-white cursor-pointer" />
            Back
          </div>
        </button>
        {isJobPoster && (
          <button
            className="absolute top-2 text-white flex items-center gap-2 right-2 p-2 rounded-full "
            onClick={handleEdit}
          >
            <GrEdit className="text-white" /> Edit
          </button>
        )}
      </div>
      <div className="flex justify-center -mt-16 relative">
        <div className="w-32 h-32 bg-gray-200 border-4 border-white rounded-full relative">
          {org.profileImage ? (
            <img src={org.profileImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-500">
              No Image
            </div>
          )}
        </div>
      </div>
      <div className="text-center mt-2">
        <h2 className="text-xl font-medium">{org.title}</h2>
        <div className='flex items-center justify-center gap-5'>
          <div className='flex items-center gap-3'>
            <GoOrganization className='text-primary text-xl' />
            <p className="text-gray-500">{org.organization}</p>
          </div>
          <p className="text-gray-500 flex justify-center gap-2 items-center">
            <IoLocationOutline className='text-primary text-xl' /> {org.location}
          </p>
        </div>
        <div className='flex mt-5 justify-center items-center gap-5 px-5 py-4 border-2 border-[#696969] mx-5 rounded-xl'>
          <div className='flex flex-col items-center gap-1'>
            <img src={cv} alt="" />
            <p className='text-sm'>Job Type</p>
            <p className='font-medium'>{org.jobType}</p>
          </div>
          <div className='h-[50px] w-[2px] bg-black bg-opacity-30'></div>
          <div className="flex flex-col justify-center gap-1 items-center">
            <img src={coin} alt="" />
            <p className='flex flex-col'>
              <span className='text-sm'>Salary</span>
              <span className='font-medium'>{org.salary}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="px-6 rounded-xl py-7 mt-5 ">
        <div>
          <h4 className="text-lg font-medium">About job</h4>
          <p className="text-gray-700 mt-2">{org.aboutJob}</p>
        </div>
        <button
          className={`w-full rounded-md p-2 mt-5 ${isSubmitted ? 'bg-[#BABABA]' : 'bg-primary'} text-white`}
          onClick={handleApply}
          disabled={isSubmitted}
        >
          {isSubmitted ? 'Applied' : 'Apply for this job'}
        </button>
      </div>
      {/* Apply Modal */}
      {isApplying && !isJobPoster && (
        <div className="absolute z-[50] inset-0 bg-black bg-opacity-50 h-[auto] flex justify-center items-center">
          <div className="bg-white h-[auto] p-6 rounded-lg shadow-lg max-w-md w-full mx-5 mt-5">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Upload Document</label>
              <div className="flex flex-col items-center">
                {org.document ? (
                  <>
                    <div className="w-full text-center mb-4">
                      <p>Uploaded Document: {org.documentName}</p>
                    </div>
                    <div className="flex mt-4 gap-2">
                      <button
                        className="bg-primary text-white py-2 px-3 rounded-md"
                        onClick={() => document.getElementById('fileUpload').click()}
                      >
                        Change Document
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-full text-center mb-4">
                      <p>No document uploaded</p>
                    </div>
                    <button
                      className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
                      onClick={() => document.getElementById('fileUpload').click()}
                    >
                      Upload Document
                    </button>
                  </>
                )}
                <input
                  id="fileUpload"
                  type="file"
                  accept=".pdf,.doc,.docx,.txt,.csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder='yourmail@gmail.com'
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className=''>
              <button onClick={handleSave} className="w-full bg-blue-500 text-white py-2 rounded mt-4">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="absolute z-[50] inset-0 bg-black bg-opacity-50 h-[auto] flex justify-center items-center">
          <div className="bg-white h-[auto] p-6 rounded-lg shadow-lg max-w-md w-full mx-5 mt-5 text-center">
            <h2 className="text-xl font-semibold mb-4">Congratulations!</h2>
            <p className="text-gray-700 mb-4">Your application has been sent successfully.</p>
            <button onClick={handleCloseModal} className="w-full bg-blue-500 text-white py-2 rounded mt-4">
              Close
            </button>
          </div>
        </div>
      )}
      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed z-[50] inset-0 bg-black bg-opacity-50 h-[auto] flex justify-center items-center">
          <div className="relative bg-white h-[90%] p-6 rounded-lg shadow-lg max-w-md w-full mx-5 mt-5 overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Edit Job</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Job Title</label>
              <input
                type="text"
                name="title"
                value={org.title}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Organization</label>
              <input
                type="text"
                name="organization"
                value={org.organization}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={org.location}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Job Type</label>
              <input
                type="text"
                name="jobType"
                value={org.jobType}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Salary</label>
              <input
                type="text"
                name="salary"
                value={org.salary}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">About Job</label>
              <textarea
                name="aboutJob"
                value={org.aboutJob}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows="4"
              ></textarea>
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={handleCloseModal} className="bg-gray-300 text-black py-2 px-4 rounded">
                Cancel
              </button>
              <button onClick={handleSaveEdit} className="bg-blue-500 text-white py-2 px-4 rounded">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobPage;