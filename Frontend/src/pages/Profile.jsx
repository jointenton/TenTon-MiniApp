import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { IoLocationOutline } from "react-icons/io5";
import { GrEdit } from "react-icons/gr";
import { RxCopy } from "react-icons/rx";

// Import your assets
import profileBg from "../assets/profile-bg.png";
import coin from "../assets/coin.png";
import fb from "../assets/fb.png";
import twitter from "../assets/twitter.png";
import link from "../assets/link.png";
import tele from "../assets/tele.png";

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('about');
    const { user, loading, handleSave, handleImageUpload } = useAuth();
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                about: user.about || '',
                skills: user.skills ? user.skills.join(', ') : '',
                facebook: user.facebook || '',
                twitter: user.twitter || '',
                linkedin: user.linkedin || '',
                telegram: user.telegram || '',
                website: user.website || '',
                portfolio: user.portfolio || '',
                appointment: user.appointment || '',
                profileImage: user.profileImage || '',
            });
        }
    }, [user]);

    if (loading) return <div>Loading...</div>;
    if (!user) return <div>User not found</div>;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(user.referralId).then(() => {
            alert('Text copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleFormSave = async () => {
        try {
            const updatedUserData = {
                ...formData,
                skills: formData.skills.split(',').map(skill => skill.trim())
            };
            const success = await handleSave(updatedUserData);
            if (success) {
                setIsEditing(false);
            }
        } catch (error) {
            console.error('Error saving profile:', error);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const onFileChange = (e) => {
        const file = e.target.files[0];
        handleImageUpload(file); // Call the image upload function
    };

    const handleRemoveImage = () => {
        // Send a request to remove the profile image
        // For example: removeProfileImage();
    };

    return (
        <div className="max-w-md mx-auto bg-white overflow-hidden pb-20">
            <div className="bg-blue-500 h-32" style={{ backgroundImage: `url(${profileBg})` }}>
                <button className="absolute top-2 right-2 text-white cursor-pointer" onClick={handleEdit}>
                    <GrEdit className="text-white cursor-pointer" />
                </button>
            </div>
            <div className="flex justify-center -mt-16 relative">
                <div className="w-32 h-32 bg-gray-200 border-4 border-white rounded-full relative">
                    {user.profileImage ? (
                        <img
                            src={`http://localhost:5000${user.profileImage}`} // Construct the full image URL
                            alt="Profile"
                            className="w-full h-full object-cover rounded-full"
                        />
                    ) : (
                        <div className="flex items-center justify-center w-full h-full text-gray-500">
                            No Image
                        </div>
                    )}

                </div>
            </div>
            <div className="text-center mt-2">
                <h2 className="text-xl font-semibold">{user.username}</h2>
                <p className="text-gray-500">{user.email}</p>
                <p className="text-gray-500 flex justify-center gap-2 items-center">
                    <IoLocationOutline className='text-primary text-xl' /> {user.country} {user.city}
                </p>
                <div className='flex justify-center gap-2 mt-2'>
                    <Link to={user.facebook} target='_blank'><img src={fb} alt="" /></Link>
                    <Link to={user.twitter} target='_blank'><img src={twitter} alt="" /></Link>
                    <Link to={user.linkedin} target='_blank'><img src={link} alt="" /></Link>
                    <Link to={user.telegram} target='_blank'><img src={tele} alt="" /></Link>
                </div>
                <div className='flex justify-center gap-2 mt-2 text-primary items-center'>
                    <Link to={user.website} target='_blank'>Website</Link>
                    <p className='h-[3px] w-[3px] rounded-full bg-primary'></p>
                    <Link to={user.portfolio} target='_blank'>Portfolio</Link>
                    <p className='h-[3px] w-[3px] rounded-full bg-primary'></p>
                    <Link to={user.appointment} target='_blank'>Book Appointment</Link>
                </div>
                <p className="text-lg flex justify-center gap-3 items-center font-medium mt-2">
                    <img src={coin} alt="" /> {user.balance}
                </p>
            </div>
            <div className="flex justify-center gap-2 mb-4">
                <button
                    onClick={() => setActiveTab('about')}
                    className={`text-lg font-medium ${activeTab === 'about' ? 'text-blue-500 border-b-2 border-gray-300' : 'text-gray-500'}`}
                >
                    Overview
                </button>
                <button
                    onClick={() => setActiveTab('jobs')}
                    className={`text-lg font-medium ${activeTab === 'jobs' ? 'text-blue-500 border-b-2 border-gray-300' : 'text-gray-500'}`}
                >
                    Applied Jobs
                </button>
            </div>
            <div className="px-6 bg-blueLight rounded-xl py-7 mt-5 min-h-screen">
                {activeTab === 'about' && (
                    <div>
                        <h4 className="text-lg font-medium">About me</h4>
                        <p className="text-gray-700 mt-2">{user.about}</p>
                        <div className="mt-4">
                            <h4 className="text-lg font-medium">Skills</h4>
                            <div className="flex flex-wrap mt-2">
                                {user.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="bg-white text-black px-2 py-1 border-2 border-black rounded-md text-sm mr-2 mt-2"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className='mt-5'>
                            <ul>
                                <div className='flex items-center'> <div className='w-1 h-1 rounded-full bg-black mr-2'></div><li className='text-primary font-semibold text-md'>Invite a friend</li></div>
                                <p className='ml-2'>You will get 500 points</p>

                                <div className='flex mt-2'>  <div className='w-1 h-1 rounded-full bg-black mr-2 mt-3'></div><li className='text-primary font-semibold text-md'>Invite a Friend with a Telegram Premium Account</li> </div>
                                <p className='ml-2'>You will get 5000 points</p>
                            </ul>
                        </div>

                        <div className='mt-5'>
                            <div className='flex justify-between'>
                                <div className='bg-primary text-white flex justify-center items-center px-4 py-2 rounded-md w-[75%] text-center'><p>Referral ID: {user.referralId}</p></div>
                                <div className='bg-[#B3B3B3] bg-opacity-50 flex items-center justify-center px-6 py-4 rounded-md border-[#1D1B20] border-2 cursor-pointer' onClick={copyToClipboard}><RxCopy /></div>
                            </div>
                        </div>
                        <div className='mt-5 bg-[#F5F5F5] p-5 rounded-md'>
                            <h1 className='text-[20px]'>Friends</h1>
                            <hr className='bg-black bg-opacity-30 h-1 ' />
                            <div className='mt-5'>
                                {user.friends.map((friend, index) => (
                                    <div key={index} className='flex items-center gap-2 mb-2'>
                                        <div
                                            className='h-[50px] w-[50px] bg-[#B3B3B3] border-[#1D1B20] border-2 rounded-full'
                                            style={{ backgroundImage: `url(${friend.image})`, backgroundSize: 'cover' }}
                                        ></div>
                                        <div className="flex flex-col">
                                            <span className="text-primary text-[16px]">{friend.name}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'jobs' && (
                    <div>
                        <h4 className="text-lg font-medium">Applied Jobs</h4>
                        <ul className="mt-4">
                            {user.appliedJobs.map(job => (
                                <li key={job.id} className="bg-white text-black px-4 py-2 rounded-md mb-2">
                                    <div className="font-medium">{job.title}</div>
                                    <div className={`text-sm ${job.status === 'Accepted' ? 'text-green-500' : 'text-yellow-500'}`}>
                                        {job.status}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Edit Modal */}
            {isEditing && (
                <div className="fixed z-[50] inset-0 bg-black bg-opacity-50 h-[auto] flex justify-center items-center">
                    <div className="relative bg-white h-[90%] p-6 rounded-lg shadow-lg max-w-md w-full mx-5 mt-5 overflow-y-auto">
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Profile Photo</label>
                            <div className="flex flex-col items-center">
                                {user.profileImage ? (
                                    <>
                                        <div className="w-[100px] h-[100px] rounded-full overflow-hidden">
                                            <img src={`http://localhost:5000${user.profileImage}`} alt="Profile" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex mt-4 gap-2">
                                            <button className="bg-primary text-white py-2 px-3 rounded-md" onClick={() => document.getElementById('imageUpload').click()}>
                                                Change Picture
                                            </button>
                                            <button
                                                onClick={handleRemoveImage}
                                                className="bg-black text-white rounded-md px-3 py-2"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-[100px] h-[100px] bg-gray-200 rounded-full flex items-center justify-center">
                                        </div>
                                        <button className="bg-blue-500 text-white py-2 px-4 rounded mt-4" onClick={() => document.getElementById('imageUpload').click()}>
                                            Change Picture
                                        </button>
                                    </>
                                )}
                                <input
                                    id="imageUpload"
                                    type="file"
                                    accept="image/*"
                                    onChange={onFileChange}
                                    className="hidden"
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Name</label>
                            <input
                                type="text"
                                name="username"
                                placeholder='Full Name'
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder='yourmail@gmail.com'
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Bio</label>
                            <textarea
                                name="about"
                                value={formData.about}
                                placeholder='About me.............'
                                onChange={handleChange}
                                className="w-full min-h-[100px] p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Skills</label>
                            <input
                                type="text"
                                name="skills"
                                placeholder="Add skills separated by commas"
                                value={formData.skills}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Facebook URL:</label>
                            <input
                                type="text"
                                name="facebook"
                                placeholder="Add Facebook URL"
                                value={formData.facebook}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Twitter URL:</label>
                            <input
                                type="text"
                                name="twitter"
                                placeholder="Add Twitter URL"
                                value={formData.twitter}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">LinkedIn URL:</label>
                            <input
                                type="text"
                                name="linkedin"
                                placeholder="Add LinkedIn URL"
                                value={formData.linkedin}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Telegram URL:</label>
                            <input
                                type="text"
                                name="telegram"
                                placeholder="Add Telegram URL:"
                                value={formData.telegram}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Website URL</label>
                            <input
                                type="text"
                                name="website"
                                placeholder="Add website URL"
                                value={formData.website}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Portfolio URL:</label>
                            <input
                                type="text"
                                name="portfolio"
                                placeholder="Add Portfolio URL:"
                                value={formData.portfolio}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Appointment URL:</label>
                            <input
                                type="text"
                                name="appointment"
                                placeholder="Add Appointment URL"
                                value={formData.appointment}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div className=''>
                            <button onClick={handleFormSave} className="w-full bg-blue-500 text-white py-2 rounded mt-4">
                                Save
                            </button>
                            <button onClick={handleCancel} className="w-full bg-black text-white py-2 rounded mt-2">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;