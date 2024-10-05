import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

export default function CreateJobModal({ isOpen, onClose }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
    const { user, loading, handleSave, handleImageUpload } = useAuth(); // Assuming handleSave and handleImageUpload are defined in your AuthContext

    // If the modal is not open, return null to render nothing
    if (!isOpen) return null;

    // Handle file change event
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(URL.createObjectURL(file)); // Preview the selected file
        }
    };

    // Trigger the hidden file input click
    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    // Delete the selected file
    const handleDeletePicture = () => {
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Reset the file input
        }
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        
        // Collect form data
        const formData = new FormData(event.target);
        // Handle image upload if an image is selected
        if (selectedFile) {
            handleImageUpload(selectedFile); // You may need to adjust this according to your logic
        }
        // Handle saving job details
        handleSave(formData); // Adjust according to your logic for saving job details
        onClose(); // Close the modal after submission
    };

    return (
        <div>
            <div className="fixed inset-0 flex items-center justify-center px-5 bg-black bg-opacity-50 z-50">
                <div className="relative bg-white rounded-lg p-6 max-w-md w-full mx-5 my-10 h-[90%] overflow-y-auto">
                    <h2 className="text-2xl font-bold text-primary mb-4">Create Job</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="upload-photo" className="block text-lg">
                                Upload Photo
                            </label>
                            <div className="flex justify-center items-center">
                                <div 
                                    className="w-24 h-24 rounded-full bg-gray-200 flex text-center items-center justify-center cursor-pointer overflow-hidden"
                                    onClick={handleUploadClick}
                                >
                                    {selectedFile ? (
                                        <img src={selectedFile} alt="Uploaded" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-gray-400 text-sm">Upload Picture</span>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    id="upload-photo"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </div>
                            <div className="mt-2 flex justify-between gap-2">
                                <button
                                    type="button"
                                    className="bg-primary py-2 text-white text-sm w-full rounded-md"
                                    onClick={handleUploadClick}
                                >
                                    Change Picture
                                </button>
                                <button
                                    type="button"
                                    className="bg-black py-2 text-white text-sm w-full rounded-md"
                                    onClick={handleDeletePicture}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="company-name" className="block text-lg">
                                Company Name
                            </label>
                            <input
                                type="text"
                                id="company-name"
                                name="companyName" // Ensure this matches your backend requirements
                                className="w-full border border-gray-300 rounded-md p-2"
                                placeholder="Company Name"
                                required // Added required attribute
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="job-role" className="block text-lg">
                                Job Role
                            </label>
                            <input
                                type="text"
                                id="job-role"
                                name="jobRole" // Ensure this matches your backend requirements
                                className="w-full border border-gray-300 rounded-md p-2"
                                placeholder="Job Role"
                                required // Added required attribute
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="job-type" className="block text-lg">
                                Job Type
                            </label>
                            <select
                                id="job-type"
                                name="jobType" // Ensure this matches your backend requirements
                                className="w-full border border-gray-300 rounded-md p-2"
                                required // Added required attribute
                            >
                                <option value="">Select Job Type</option>
                                <option value="full-time">Full-time</option>
                                <option value="part-time">Part-time</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="salary" className="block text-lg">
                                Salary
                            </label>
                            <input
                                type="text"
                                id="salary"
                                name="salary" // Ensure this matches your backend requirements
                                className="w-full border border-gray-300 rounded-md p-2"
                                placeholder="Salary"
                                required // Added required attribute
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="location" className="block text-lg">
                                Location
                            </label>
                            <input
                                type="text"
                                id="location"
                                name="location" // Ensure this matches your backend requirements
                                className="w-full border border-gray-300 rounded-md p-2"
                                placeholder="Location"
                                required // Added required attribute
                            />
                            <div className="mt-2">
                                <input type="radio" id="remote" name="locationType" value="remote" />
                                <label htmlFor="remote" className="ml-2">
                                    Remote
                                </label>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description" className="block text-lg">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description" // Ensure this matches your backend requirements
                                className="w-full min-h-[150px] border border-gray-300 rounded-md p-2"
                                placeholder="Description"
                                required // Added required attribute
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-primary text-white p-2 rounded-md"
                        >
                            Save
                        </button>
                    </form>
                    <button
                        className="mt-4 w-full bg-black text-white p-2 rounded-md"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
