import React, { useState, useEffect } from 'react';
import profileBg from "../assets/profile-bg.png";
import coin from "../assets/salary.png";
import cv from "../assets/cv.png";
import { IoReturnUpBack } from "react-icons/io5";
import { GoOrganization } from "react-icons/go";
import { useNavigate, useParams } from 'react-router-dom';

const BountyPage = () => {
  const { id } = useParams(); // Get the job ID from the URL
  const [isApplying, setIsApplying] = useState(false);
  const [org, setOrg] = useState(null);
  const navigate = useNavigate();

  // Fetch job data from data.json
  useEffect(() => {
    const fetchBountyData = async () => {
      try {
        const response = await fetch('/data.json');
        const data = await response.json();
        const bounty = data.bounties.find(bounty => bounty.id === parseInt(id)); // Find the job by ID
        setOrg(bounty);
      } catch (error) {
        console.error("Error fetching bounty data:", error);
      }
    };

    fetchBountyData();
  }, [id]);

  if (!org) {
    return <div>Bounty not found</div>;
  }

  const handleApply = () => {
    setIsApplying(true);
  };

  const handleSave = () => {
    setIsApplying(false);
  };

  const handleChange = (e) => {
    setOrg({ ...org, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setOrg(prevOrg => ({
        ...prevOrg,
        document: URL.createObjectURL(file), // Creates a URL for the uploaded file
        documentName: file.name // Stores the document's name
      }));
    }
  };

  const handleClick = () => {
    navigate(-1); // Go back one step in the history
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
        <div className='flex items-center justify-center'>
          <div className='flex items-center gap-3'>
            <GoOrganization className='text-primary text-xl' />
            <p className="text-gray-500">{org.organization}</p>
          </div>
        </div>
        <div className='flex mt-5 justify-center items-center gap-5 px-5 py-4 border-2 border-[#696969] mx-5 rounded-xl'>
          <div className='flex flex-col items-center gap-1'>
            <img src={cv} alt="" />
            <p className='text-sm'>Bounty Type</p>
            <p className='font-medium'>{org.bountyType}</p>
          </div>
          <div className='h-[50px] w-[2px] bg-black bg-opacity-30'></div>
          <div className="flex flex-col justify-center gap-1 items-center">
            <img src={coin} alt="" />
            <p className='flex flex-col'>
              <span className='text-sm'>Reward</span>
              <span className='font-medium'>{org.price}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="px-6 rounded-xl py-7 mt-5 ">
        <div>
          <h4 className="text-lg font-medium">Program Info</h4>
          <p className="text-gray-700 mt-2">{org.aboutBounty}</p>
        </div>
        <button className='w-full rounded-md bg-primary text-white p-2 mt-5' onClick={handleApply}>Apply for this bounty</button>
      </div>
      {/* Apply Modal */}
      {isApplying && (
        <div className="fixed z-[50] inset-0 bg-black bg-opacity-50 h-[auto] flex justify-center items-center">
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
    </div>
  );
};

export default BountyPage;
