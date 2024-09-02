import React, { useState, useRef } from 'react';

export default function CreateJobModal({ isOpen, onClose }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    if (!isOpen) return null;

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(URL.createObjectURL(file));
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleDeletePicture = () => {
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div>
            <div className="fixed inset-0 flex items-center justify-center px-5 bg-black h-[auto] bg-opacity-50 z-50">
                <div className="relative bg-white rounded-lg p-6  max-w-md w-full mx-5 my-10 h-[90%] overflow-y-auto">
                    <h2 className="text-2xl font-bold text-primary mb-4">Create Job</h2>
                    <form>
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
                                className="w-full border border-gray-300 rounded-md p-2"
                                placeholder="Company Name"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="job-role" className="block text-lg">
                                Job Role
                            </label>
                            <input
                                type="text"
                                id="job-role"
                                className="w-full border border-gray-300 rounded-md p-2"
                                placeholder="Job Role"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="job-type" className="block text-lg">
                                Job Type
                            </label>
                            <select
                                id="job-type"
                                className="w-full border border-gray-300 rounded-md p-2"
                            >
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
                                className="w-full border border-gray-300 rounded-md p-2"
                                placeholder="Salary"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="location" className="block text-lg">
                                Location
                            </label>
                            <input
                                type="text"
                                id="location"
                                className="w-full border border-gray-300 rounded-md p-2"
                                placeholder="Location"
                            />
                            <div className="mt-2">
                                <input type="radio" id="remote" name="location-type" />
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
                                className="w-full min-h-[150px] border border-gray-300 rounded-md p-2"
                                placeholder="Description"
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