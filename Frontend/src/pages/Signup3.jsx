import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

function ProfessionalForm() {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    "Freelancer",
    "Student",
    "Expert",
    "Project owner",
    "Marketer",
    "Job seeker",
    "Recruiter",
  ];

  const handleOptionChange = (option) => {
    setSelectedOptions((prevSelectedOptions) =>
      prevSelectedOptions.includes(option)
        ? prevSelectedOptions.filter((item) => item !== option)
        : [...prevSelectedOptions, option]
    );
  };

  const navigate = useNavigate();
  const location = useLocation();
  const { formData = {} } = location.state || {}; // Initialize formData if undefined

  const handleContinue = () => {
    // Add selected options to the formData
    const updatedFormData = { ...formData, selectedOptions };
    navigate('/success', { state: { formData: updatedFormData } });
  };

  return (
    <div className="max-w-md sm:mx-auto mx-5 flex flex-col min-h-screen">
      <div className="flex-grow">
        <h2 className="text-primary text-3xl text-left font-bold mb-4 mt-20">
          What best describes you professionally
        </h2>
        <p className="mb-6 text-gray-600">You can select multiple options</p>
        <form>
          {options.map((option) => (
            <div key={option} className="mb-2">
              <label className="flex items-center justify-between">
              <span className="">{option}</span>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleOptionChange(option)}
                />
                <span className={`w-5 h-5 flex items-center justify-center rounded-full border-2 border-primary cursor-pointer ${selectedOptions.includes(option) ? "bg-blue-600 border-blue-600" : "border-gray-400"}`}>
                  {selectedOptions.includes(option) && (
                    <span className="w-4 h-4 bg-primary border-2 rounded-full"></span>
                  )}
                </span>
               
              </label>
            </div>
          ))}
        </form>
      </div>
      <div>
      <button
            type="button"
            onClick={handleContinue}
            className="mt-6 w-full py-2 px-4 bg-primary my-5 text-white font-semibold rounded-md shadow-md hover:bg-blue-700"
            disabled={selectedOptions.length === 0}
          >
            Continue
          </button>
      </div>
    </div>
  );
}

export default ProfessionalForm;
