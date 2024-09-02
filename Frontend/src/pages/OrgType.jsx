import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function OrgType() {
    const location = useLocation();
    const [formData, setFormData] = useState(location.state?.formData || {});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleContinue = () => {
        navigate('/success', { state: { formData } });
    };

    return (
        <div>
            <div className="max-w-md sm:mx-auto mx-5">
                <div className="flex flex-col min-h-screen w-full">
                    <div className="flex-grow">
                        <h2 className="text-primary text-3xl text-left font-bold mb-4 mt-20">
                            What Industries best describe Your Company
                        </h2>
                        <p className="mb-6 text-gray-600">State below eg( DeFi, Blockchain)</p>
                        <div className="sm:px-10">
                            <textarea
                                type="text"
                                placeholder="DeFi, Blockchain, etc."
                                className="border p-2 w-full rounded-md focus:outline-none mt-2 min-h-[100px]"
                                id="companyType"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between sm:px-10 py-2 my-5">
                        <button
                            onClick={handleContinue}
                            className="bg-primary text-white rounded-md px-4 py-2 mt-4"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
