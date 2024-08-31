import { FiSearch } from 'react-icons/fi';
import filter from '../assets/filter.svg';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from "react-icons/fa";
import CreateJobModal from '../components/CreateJobModal';

function truncateText(text, maxWords) {
  if (typeof text !== 'string') {
    return ''; // Return an empty string if text is not a string
  }

  const words = text.split(' ');
  return words.length > maxWords
    ? `${words.slice(0, maxWords).join(' ')}...`
    : text;
}

function Home() {
  const [selectedTab, setSelectedTab] = useState("Jobs");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [jobType, setJobType] = useState("");
  const filterRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const [sortOption, setSortOption] = useState("");
  const [jobData, setJobData] = useState({ jobsTitle: "", jobsSubtitle: "", jobs: [] });
  const [bountyData, setBountyData] = useState({ bountiesTitle: "", bountiesSubtitle: "", bounties: [] });

  const fetchData = async () => {
    try {
      const response = await fetch('/data.json');
      const data = await response.json();
      setJobData(data);
      setBountyData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const currentData = selectedTab === "Jobs" ? jobData.jobs : bountyData.bounties;

  const filteredData = currentData.filter(item =>
    (item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.company && item.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const finalData = filteredData.filter(item => {
    const matchLocation = filterLocation ? item.location === filterLocation : true;
    const matchCategory = filterCategory ? (item.title && item.title.toLowerCase().includes(filterCategory.toLowerCase())) : true;
    const matchJobType = jobType ? (item.location && item.location.toLowerCase() === jobType.toLowerCase()) : true;
  
    return matchLocation && matchCategory && matchJobType;
  });
  
  const sortedData = [...finalData].sort((a, b) => {
    switch (sortOption) {
      case "oldest":
        return new Date(a.time) - new Date(b.time);
      case "newest":
        return new Date(b.time) - new Date(a.time);
      case "priceLowToHigh":
        return (a.price || 0) - (b.price || 0);
      case "priceHighToLow":
        return (b.price || 0) - (a.price || 0);
      default:
        return 0;
    }
  });
  
  const dataToDisplay = selectedTab === "Bounties" ? sortedData : finalData;
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilters(false);
      }
    };
  
    if (showFilters) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilters]);
  

  return (
    <>
      <div className="max-w-md sm:mx-auto mx-5">
        <div className="flex flex-col min-h-screen w-full">
          <div className="flex-grow pb-[150px]">
            <h1 className="text-3xl font-bold text-primary mt-10">
              {selectedTab === "Jobs" ? jobData.jobsTitle : bountyData.bountiesTitle}
            </h1>
            <p className="text-gray-600 mb-4 flex justify-between items-center">
              {selectedTab === "Jobs" ? jobData.jobsSubtitle : bountyData.bountiesSubtitle}
              <div onClick={toggleModal} className='w-10 h-10 bg-black rounded-full justify-center items-center flex text-white'>
                <FaPlus  />
              </div>
            </p>

            <div className="flex items-center justify-between mb-4">
              <div className='border border-gray-300 w-[65%] rounded-l-lg py-2 px-3 flex'>
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
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="bg-primary w-[30%] text-white py-2 px-4 rounded-md justify-center gap-3 flex items-center"
              >
                <img src={filter} alt="Filter" />
                {showFilters ? "Filters" : "Filters"}
              </button>
            </div>

            {/* Filter Modal */}
            {showFilters && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div ref={filterRef} className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
                  {selectedTab === "Jobs" && (
                    <>
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Job role</label>
                        <select
                          value={filterCategory}
                          onChange={(e) => setFilterCategory(e.target.value)}
                          className="w-full border border-gray-300 rounded-md p-2"
                        >
                          <option value="">Select Role</option>
                          <option value="designer">Designer</option>
                          <option value="developer">Developer</option>
                        </select>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Location</label>
                        <input
                          type="text"
                          placeholder="Enter Location"
                          value={filterLocation}
                          onChange={(e) => setFilterLocation(e.target.value)}
                          className="w-full border border-gray-300 rounded-md p-2"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Job Type</label>
                        <div className="flex flex-col gap-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="jobType"
                              value="Remote"
                              checked={jobType === "Remote"}
                              onChange={(e) => setJobType(e.target.value)}
                              className="mr-2"
                            />
                            Remote
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="jobType"
                              value="Full-Time"
                              checked={jobType === "Full-Time"}
                              onChange={(e) => setJobType(e.target.value)}
                              className="mr-2"
                            />
                            Full-Time
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="jobType"
                              value="Freelance/Contract"
                              checked={jobType === "Freelance/Contract"}
                              onChange={(e) => setJobType(e.target.value)}
                              className="mr-2"
                            />
                            Freelance/Contract
                          </label>
                        </div>
                      </div>
                    </>
                  )}
                  {selectedTab === "Bounties" && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">Sort By</label>
                      <div className="flex flex-col">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="sortOption"
                            value="oldest"
                            checked={sortOption === "oldest"}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="mr-2"
                          />
                          Oldest to Newest
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="sortOption"
                            value="newest"
                            checked={sortOption === "newest"}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="mr-2"
                          />
                          Newest to Oldest
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="sortOption"
                            value="priceLowToHigh"
                            checked={sortOption === "priceLowToHigh"}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="mr-2"
                          />
                          Price: Low to High
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="sortOption"
                            value="priceHighToLow"
                            checked={sortOption === "priceHighToLow"}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="mr-2"
                          />
                          Price: High to Low
                        </label>
                      </div>
                    </div>
                  )}
                  <button
                    onClick={() => setShowFilters(false)}
                    className="bg-primary text-white py-2 px-4 rounded-md w-full"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}

            {dataToDisplay.map((item, index) => (
              <Link
                to={selectedTab === "Bounties" ? `/bounty/${item.id}` : `/job/${item.id}`}
                key={item.id}
                className="mb-4 border border-gray-300 rounded-lg p-4 flex items-center"
              >
                <div className={`w-16 h-16 ${item.image ? '' : 'bg-gray-200'} rounded-md mr-4`}>
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-md" />
                  ) : null}
                </div>
                <div className='max-w-[120px]'>
                  <h2 className="text-md font-medium">
                    {truncateText(item.title, 2)}
                  </h2>
                  <p className="text-gray-600">
                    {truncateText(item.organization, 2)}
                  </p>
                </div>
                <div className="ml-auto text-right text-gray-600">
                  <span className={`block mb-1 ${selectedTab === "Bounties" ? "font-semibold" : ""}`}>
                    {selectedTab === "Jobs" ? item.location : (item.price ? `$${item.price}` : 'No Price Listed')}
                  </span>
                  <span>{item.time}</span>
                </div>
              </Link>
            ))}

          </div>
        </div>

        <div className="flex max-w-md sm:mx-auto mx-5 bottom-0 left-0 right-0 justify-around py-2 fixed mb-[70px]">
          <div className="flex w-full gap-5 bg-grayCus py-2 px-2 rounded-md mt-2">
            <button
              type="button"
              onClick={() => setSelectedTab("Jobs")}
              className={`px-4 py-2 rounded-md w-full ${selectedTab === "Jobs" ? "bg-black text-white" : "bg-grayCus text-black"
                }`}
            >
              Jobs
            </button>

            <button
              type="button"
              onClick={() => setSelectedTab("Bounties")}
              className={`px-4 py-2 rounded-md w-full ${selectedTab === "Bounties" ? "bg-black text-white" : "bg-grayCus text-black"
                }`}
            >
              Bounties
            </button>
          </div>
        </div>
        <CreateJobModal isOpen={isModalOpen} onClose={toggleModal} />
      </div>
    </>
  );
}

export default Home;
