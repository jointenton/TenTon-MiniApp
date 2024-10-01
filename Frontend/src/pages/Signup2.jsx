import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const tagList = [
    "Web3",
    "No-Code developer",
    "Marketer",
    "Mobile Developer",
    "UX/UI",
    "Ton games",
    "Crypto",
    "Web dev",
    "Blockchain dev",
    "Data Analytics",
    "GameFi",
    "DataFi",
    "Researcher",
    "NFT",
    "Sport",
    "Surveys",
    "Machine Learning",
    "Tokenomics",
    "DeFi",
    "Artificial Intelligence",

];

export default function SelectTag() {
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const { formData = {} } = location.state || {}; // Initialize formData if undefined

    const handleContinue = () => {
        // Add selected tags to the formData
        const updatedFormData = { ...formData, tags };
        navigate('/profession', { state: { formData: updatedFormData } });
    };

    const toggleTag = (tag) => {
        if (tags.includes(tag)) {
            setTags(tags.filter((t) => t !== tag));
        } else {
            if (tags.length < 3) {
                setTags([...tags, tag]);
            }
        }
    };

    return (
        <div>
            <div className='max-w-md sm:mx-auto mx-5 flex flex-col min-h-screen'>
                <div className='flex-grow'>
                    <h1 className='text-primary text-3xl text-left font-bold mb-4 mt-20'>Pick tags that are <br />
                        in your area of <br />
                        interest</h1>
                    <p className="text-gray-500 mb-4">You can't pick more than three tags</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {tagList.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => toggleTag(tag)}
                                className={`px-3 py-2 border rounded hover:bg-grayCus text-sm font-bold ${tags.includes(tag)
                                    ? "bg-blue-600 text-white"
                                    : "bg-white text-gray-800"
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
                <button
                    onClick={handleContinue}
                    className="w-full py-2 my-5 bg-primary text-white rounded font-bold"
                    disabled={tags.length === 0}
                >
                    Continue
                </button>
            </div>
        </div>
    );
}
