import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import success from "../assets/success.png";
import toast from 'react-hot-toast';
import axios from 'axios'; // Import axios

function SuccessPage() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate()
    const { formData } = location.state || {};

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading state
        setError(null); // Reset error state

        // Validate formData
        if (!formData || Object.keys(formData).length === 0) {
            const errorMessage = "No form data provided. Please try again.";
            setError(errorMessage);
            toast.error(errorMessage, {
                position: "bottom-center",
                duration: 5000,
            });
            setLoading(false); // Stop loading state
            return; // Exit early if no formData
        }

        try {
            const {username, skills, tags, email, gender, country, city} = formData;

            const dataToSend = {
                formData: { username, skills, tags, email, gender, country, city }
            };

            // Use axios to send a POST request to your signup endpoint
            const response = await axios.post('https://tenton-miniapp-q5q5.onrender.com/api/users/signup', dataToSend); // Adjust the URL as needed

            if (response.data.success === false) {
                // Handle error response from the API
                setError(response.data.message);
                toast.error(response.data.message, {
                    position: "bottom-center",
                    duration: 5000,
                });
            } else {
                // Handle successful response
                toast.success(response.data.message, {
                    position: "bottom-center",
                    duration: 5000,
                });
                setIsModalOpen(true);
                navigate('/signin')
            }
        } catch (error) {
            // Handle unexpected errors
            const errorMessage = error.response ? error.response.data.message : error.message;
            setError(errorMessage);
            toast.error(errorMessage, {
                position: "bottom-center",
                duration: 5000,
            });
        } finally {
            setLoading(false); // Stop loading state
        }
        console.log('Form data submitted:', formData);
    };

    return (
        <div className="max-w-md sm:mx-auto mx-5 flex flex-col min-h-screen">
            <div className="flex-grow text-center">
                <h2 className="text-3xl text-primary font-bold mb-4 mt-20">
                    Congrats! Your TenTon account is ready
                </h2>
                <div className="mt-[100px]">
                    <img src={success} alt="Success" className="mx-auto" />
                </div>
            </div>
            <button
                onClick={handleSubmit}
                disabled={loading} // Disable button while loading
                className={`w-full py-2 px-4 bg-primary text-white font-semibold rounded-md mb-20 mt-5 shadow-md hover:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {loading ? 'Loading...' : 'Continue'}
            </button>

            {/* Render error message if there's any */}
            {error && (
                <div className="text-red-500 text-center mt-4">{error}</div>
            )}
        </div>
    );
}

export default SuccessPage;
