import React, { useState, useEffect } from 'react';
import coin from "../assets/salary.png";
import { IoReturnUpBack } from "react-icons/io5";
import { GoOrganization } from "react-icons/go";
import { useNavigate, useParams } from 'react-router-dom';
import { IoLocationOutline } from "react-icons/io5";
import { LuAlarmClock } from "react-icons/lu";

const EventPage = () => {
  const { id } = useParams(); // Get the event ID from the URL
  const [isApplying, setIsApplying] = useState(false);
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  // Fetch event data from data.json
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch('/data.json');
        const data = await response.json();
        const event = data.eventData.find(event => event.id === parseInt(id)); // Find the event by ID
        setEvent(event);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchEventData();
  }, [id]);

  if (!event) {
    return <div>Event not found</div>;
  }

  const handleApply = () => {
    setIsApplying(true);
  };

  const handleSave = () => {
    setIsApplying(false);
  };

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEvent(prevEvent => ({
        ...prevEvent,
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
      <div className="bg-blue-500 h-[300px]" style={{ backgroundImage: `url(${event.image})`, backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover" }}>
        <button className="absolute top-2 left-2 text-white cursor-pointer">
          <div className='flex items-center gap-2' onClick={handleClick}>
            <IoReturnUpBack className="text-white cursor-pointer" />
            Back
          </div>
        </button>
      </div>
      <div className="text-center mt-2">
        <h2 className="text-xl font-medium text-left ml-5">{event.title}</h2>
        <div className='flex justify-between mx-5 items-center'>
          <div className=''>
            <div className='flex justify-left'>
              <div className='flex items-center gap-3'>
                <GoOrganization className='text-primary text-xl' />
                <p className="text-gray-500">{event.organization}</p>
              </div>
            </div>
            <div className='text-left flex gap-2 items-center'>
              <div className='flex gap-2 items-center'><IoLocationOutline className='text-primary text-sm' />  <p>{event.location}</p></div>
              <div className='flex gap-2 items-center'><LuAlarmClock className='text-primary text-sm' /> <p>{event.time}</p></div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="text-3xl font-bold">{event.date.split(' ')[0]}</span>
            <div className='h-1 w-10 bg-black bg-opacity-50'></div>
            <span className="text-sm uppercase">{event.date.split(' ')[1]}</span>
          </div>
        </div>
        <div className="flex gap-2 items-center ml-5">
          <img src={coin} alt="" />
          <p className='flex items-center gap-2'>
            <span className='text-sm'>Entry Fee</span>
            <span className='font-medium px-2 py-1 border-primary border-2 rounded-md'>{event.price}</span>
          </p>
        </div>
      </div>
      <div className="px-6 rounded-xl py-7 mt-2 ">
        <div>
          <h4 className="text-lg font-medium">About event</h4>
          <p className="text-gray-700 mt-2">{event.description}</p>
        </div>
        <button className='w-full rounded-md bg-primary text-white p-2 mt-5' onClick={handleApply}>Register for this event</button>
      </div>
      {/* Apply Modal */}
      {isApplying && (
        <div className="fixed z-[50] inset-0 bg-black bg-opacity-50 h-[auto] flex justify-center items-center">
          <div className="bg-white h-[auto] p-6 rounded-lg shadow-lg max-w-md w-full mx-5 mt-5">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Upload Document</label>
              <div className="flex flex-col items-center">
                {event.document ? (
                  <>
                    <div className="w-full text-center mb-4">
                      <p>Uploaded Document: {event.documentName}</p>
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

export default EventPage;
