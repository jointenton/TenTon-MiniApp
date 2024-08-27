import { React, useState } from 'react';
import { useLocation } from 'react-router-dom';
import success from "../assets/success.png"
import toast from 'react-hot-toast';

function SuccessPage() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();
    const { formData } = location.state || {};
    const apiUrl = 'https://swift-liaison.onrender.com/api';

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch(`${apiUrl}/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                setLoading(false);
                setError(data.message);
                toast.error(data.message, {
                    position: "bottom-center",
                    duration: 5000,
                });
                return;
            }
            setLoading(false);
            setError(null);
            toast.success(data.message, {
                position: "bottom-center",
                duration: 5000,
            });
            setIsModalOpen(true);
        } catch (error) {
            setLoading(false);
            setError(error.message);
            toast.error(error.message, {
                position: "bottom-center",
                duration: 5000,
            });
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
                className="w-full py-2 px-4 bg-primary text-white font-semibold rounded-md my-5 shadow-md hover:bg-blue-700"
            >
                Continue
            </button>
        </div>
    );
}

export default SuccessPage;
