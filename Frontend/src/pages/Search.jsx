import { FiSearch } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { CiLocationOn } from 'react-icons/ci'; // Adjust imports as needed

export default function Search() {
    const [searchTitle, setSearchTitle] = useState("");
    const [searchSubtitle, setSearchSubtitle] = useState("");
    const [categories, setCategories] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState("all");

    useEffect(() => {
        // Fetch the search data from the JSON file or API
        fetch('/data.json') // Adjust the path or use an API endpoint
            .then(response => response.json())
            .then(data => {
                setSearchTitle(data.searchTitle);
                setSearchSubtitle(data.searchSubtitle);
                setCategories(data.categories);
                setSearchData(data.searchData);
            })
            .catch(error => console.error("Error fetching search data:", error));
    }, []);

    // Filter data based on search term and category
    const filteredResults = searchData.filter(item => {
        const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.location.toLowerCase().includes(searchTerm.toLowerCase());

        const matchCategory = filterCategory === "all" || item.type === filterCategory;

        return matchSearch && matchCategory;
    });

    return (
        <div className="max-w-md sm:mx-auto mx-5">
            <div className="flex flex-col min-h-screen w-full">
                <div className="flex-grow pb-[150px]">
                    <h1 className="text-3xl font-bold text-primary mt-10">{searchTitle}</h1>
                    <p className="text-gray-600 mb-4">{searchSubtitle}</p>

                    <div className="flex items-center justify-between mb-4">
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
                                    onClick={() => setFilterCategory(category === "All" ? "all" : category)}
                                    className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap ${filterCategory === (category === "All" ? "all" : category) ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {filteredResults.length > 0 ? (
                        filteredResults.map((item) => (
                            <div
                                key={item.id}
                                className="mb-4 border border-gray-300 rounded-lg p-4 flex items-center justify-between bg-gray-100"
                            >
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-gray-300 rounded-md mr-2"></div>
                                    <div>
                                        <h2 className="font-medium text-lg text-gray-800">{item.name}</h2>
                                        <p className="text-sm text-gray-500">
                                            <CiLocationOn className='inline text-[#2A60DF]' /> {item.location}
                                        </p>
                                    </div>
                                </div>
                                <a 
                                    href={item.link} 
                                    className="bg-primary text-white px-4 py-2 rounded-lg"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Follow
                                </a>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">No results found</p>
                    )}
                </div>
            </div>
        </div>
    );
}
