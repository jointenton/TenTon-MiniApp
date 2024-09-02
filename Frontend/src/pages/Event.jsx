import { FiSearch } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { CiLocationOn } from "react-icons/ci";
import { LuAlarmClock } from "react-icons/lu";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { FaPlus } from "react-icons/fa";
import CreateEventModal from '../components/CreateEventModal';

export default function Event() {
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [categories, setCategories] = useState([]);
    const [eventData, setEventData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState("all");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    useEffect(() => {
        // Fetch the event data from the JSON file or API
        fetch('/data.json') // Adjust the path or use an API endpoint
            .then(response => response.json())
            .then(data => {
                setTitle(data.eventTitle);
                setSubtitle(data.eventSubtitle);
                setCategories(data.eventCategories);
                setEventData(data.eventData);
            })
            .catch(error => console.error("Error fetching event data:", error));
    }, []);

    // Filter events based on search term and category
    const filteredEvents = eventData.filter(event => {
        const matchSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.location.toLowerCase().includes(searchTerm.toLowerCase());

        const matchCategory = filterCategory === "all" || event.title.toLowerCase().includes(filterCategory);

        return matchSearch && matchCategory;
    });

    return (
        <div className="max-w-md sm:mx-auto mx-5">
            <div className="flex flex-col min-h-screen w-full">
                <div className="flex-grow pb-[150px]">
                    <h1 className="text-3xl font-bold text-primary mt-10">{title}</h1>
                    <div className='flex justify-between items-center'>
                        <p className="text-gray-600 mb-4">{subtitle}</p>
                        <div onClick={toggleModal} className='w-10 h-10 bg-black rounded-full justify-center items-center flex text-white'>
                            <FaPlus />
                        </div>
                    </div>

                    <div className="flex items-center justify-between mb-4 mt-4">
                        <div className='border border-gray-300 w-full rounded-l-lg py-2 px-3 flex'>
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full focus:outline-none"
                            />
                            <button className="">
                                <FiSearch />
                            </button>
                        </div>
                    </div>

                    <div className="mb-4">
                        <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
                            {categories.map((category, index) => (
                                <button
                                    key={index}
                                    onClick={() => setFilterCategory(category.toLowerCase())}
                                    className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap ${filterCategory === category.toLowerCase() ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {filteredEvents.length > 0 ? (
                        filteredEvents.map((event, index) => (
                            <Link to={`/events/${event.id}`} key={index}> {/* Wrap with Link */}
                                <div
                                    className="mb-4 border border-gray-300 rounded-lg overflow-hidden bg-cover bg-center relative"
                                    style={{ backgroundImage: `url(${event.image})`, height: '250px' }}
                                >
                                    <div className="bg-black bg-opacity-50 h-full flex flex-col justify-end p-4">
                                        <div className='flex justify-between'>
                                            <div>
                                                <h2 className="font-medium text-lg text-white">{event.title}</h2>
                                                <div className='flex items-center gap-2'>
                                                    <CiLocationOn className='text-[#2A60DF]' />
                                                    <p className="text-sm text-gray-300 flex items-center gap-2">{event.location} • <LuAlarmClock className='text-[#2A60DF]' /> {event.time}</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-center justify-center text-white">
                                                <span className="text-3xl font-bold">{event.date.split(' ')[0]}</span>
                                                <div className='h-1 w-10 bg-white bg-opacity-50'></div>
                                                <span className="text-sm uppercase">{event.date.split(' ')[1]}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-gray-600">No events found</p>
                    )}
                </div>
            </div>
            <CreateEventModal isOpen={isModalOpen} onClose={toggleModal} />
        </div>
    );
}
