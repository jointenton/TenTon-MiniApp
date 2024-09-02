import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import Select from 'react-select';
import countryList from 'react-select-country-list';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState("Male");
  const [activeTab, setActiveTab] = useState("personal"); // State to manage active tab
  const navigate = useNavigate();
  const options = useMemo(() => countryList().getData(), []);
  const [value, setValue] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const changeHandler = (value) => {
    setValue(value);
    setFormData({
      ...formData,
      country: value.label,
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/sign-in");
  };

  const handleContinue = () => {
    if (activeTab === "company") {
      navigate('/select-org-type', { state: { formData } });
    } else {
      navigate('/select-tag', { state: { formData } });
    }
  };

  return (
    <div className="max-w-md sm:mx-auto mx-5">
      <div className="flex flex-col min-h-screen w-full">
        <div className="flex-grow">

          {/* Tabs for Personal and Company */}
          <div className="sm:px-10 mb-4 max-w-[200px] mx-auto mt-20">
            <div className="flex border-b border-gray-200">
              <button
                className={`px-4 py-2 ${activeTab === "personal" ? "border-b-2 border-primary text-primary" : "text-gray-500"}`}
                onClick={() => setActiveTab("personal")}
              >
                Personal
              </button>
              <button
                className={`px-4 py-2 ${activeTab === "company" ? "border-b-2 border-primary text-primary" : "text-gray-500"}`}
                onClick={() => setActiveTab("company")}
              >
                Company
              </button>
            </div>
          </div>
          <div className="sm:pl-10">
            <h1 className="text-3xl text-primary text-left font-bold mb-4">
              Setup your free <br />
              TenTon Account
            </h1>
          </div>

          {/* Form content based on selected tab */}
          {activeTab === "personal" && (
            <form className="flex flex-col gap-1">
              <div className="flex flex-col sm:px-10 w-full">
                <label htmlFor="name" className="text-sm font-semibold mt-2">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="border p-2 rounded-md focus:outline-none mt-2"
                  id="username"
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col sm:px-10">
                <label htmlFor="email" className="text-sm font-semibold mt-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="yourmail@gmail.com"
                  className="border p-2 rounded-md focus:outline-none mt-2"
                  id="email"
                  onChange={handleChange}
                />
              </div>

              <div className="sm:px-10">
                <label htmlFor="gender" className="text-sm font-semibold mt-2 block">
                  Gender
                </label>
                <div className="flex gap-5 bg-grayCus py-2 px-2 rounded-md mt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedGender("Male")}
                    className={`px-4 py-2 rounded-md w-full ${selectedGender === "Male" ? "bg-black text-white" : "bg-grayCus text-black"
                      }`}
                  >
                    Male
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedGender("Female")}
                    className={`px-4 py-2 rounded-md w-full ${selectedGender === "Female" ? "bg-black text-white" : "bg-grayCus text-black"
                      }`}
                  >
                    Female
                  </button>
                </div>
              </div>

              <div className="sm:px-10">
                <label htmlFor="country" className="text-sm font-semibold mt-2 block">
                  Country
                </label>
                <Select
                  options={options}
                  value={value}
                  onChange={changeHandler}
                  className="mt-2"
                />
              </div>

              <div className="sm:px-10">
                <label htmlFor="city" className="text-sm font-semibold mt-2 block">
                  City
                </label>
                <input
                  type="text"
                  placeholder="City"
                  className="border p-2 w-full rounded-md focus:outline-none mt-2"
                  id="city"
                  onChange={handleChange}
                />
              </div>
            </form>
          )}

          {activeTab === "company" && (
            <form className="flex flex-col gap-1">
              <div className="flex flex-col sm:px-10 w-full">
                <label htmlFor="companyName" className="text-sm font-semibold mt-2">
                  Company Name
                </label>
                <input
                  type="text"
                  placeholder="Company Name"
                  className="border p-2 rounded-md focus:outline-none mt-2"
                  id="companyName"
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col sm:px-10">
                <label htmlFor="email" className="text-sm font-semibold mt-2">
                  Company Email
                </label>
                <input
                  type="email"
                  placeholder="companyemail@domain.com"
                  className="border p-2 rounded-md focus:outline-none mt-2"
                  id="companyEmail"
                  onChange={handleChange}
                />
              </div>

              <div className="sm:px-10">
                <label htmlFor="country" className="text-sm font-semibold mt-2 block">
                  Country
                </label>
                <Select
                  options={options}
                  value={value}
                  onChange={changeHandler}
                  className="mt-2"
                />
              </div>

              <div className="sm:px-10">
                <label htmlFor="city" className="text-sm font-semibold mt-2 block">
                  City
                </label>
                <input
                  type="text"
                  placeholder="City"
                  className="border p-2 w-full rounded-md focus:outline-none mt-2"
                  id="city"
                  onChange={handleChange}
                />
              </div>
            </form>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-between sm:px-10 py-2 my-5">
          <button
            onClick={handleContinue}
            className="bg-primary text-white rounded-md px-4 py-2 mt-4"
          >
            Continue
          </button>
        </div>

        {/* Render modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="Sign Up Successful"
          message="Your account has been created successfully. Please check your email to verify your account."
        />
      </div>
    </div>
  );
}
