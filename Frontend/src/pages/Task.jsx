import React, { useState } from 'react';
import { IoMdCheckmark } from "react-icons/io";

export default function Tasks() {
    const [activeTab, setActiveTab] = useState('active');
    const [tasks, setTasks] = useState([
        { id: 1, title: "Follow Ton on Telegram", points: 500, link: "https://t.me/ton", completed: false },
        { id: 2, title: "Follow Ton on Telegram", points: 500, link: "/task/2", completed: false },
        { id: 3, title: "Follow Ton on Telegram", points: 500, link: "/task/3", completed: false },
        { id: 4, title: "Follow Ton on Telegram", points: 500, link: "/task/4", completed: false },
    ]);

    const handleStart = (taskId) => {
        setTasks(tasks.map(task => 
            task.id === taskId ? { ...task, completed: true } : task
        ));
    };

    const activeTasks = tasks.filter(task => !task.completed);
    const completedTasks = tasks.filter(task => task.completed);

    return (
        <div className="min-h-screen bg-white px-4 py-8">
            <h1 className="text-3xl font-bold text-blue-600 mb-2">Tasks</h1>
            <p className="text-gray-600 mb-4">Complete any task and earn reward!</p>

            <div className="flex justify-center mb-6">
                <button
                    className={`px-4 py-2 text-sm font-medium ${
                        activeTab === 'active' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
                    }`}
                    onClick={() => setActiveTab('active')}
                >
                    Active
                </button>
                <button
                    className={`px-4 py-2 text-sm font-medium ml-4 ${
                        activeTab === 'completed' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
                    }`}
                    onClick={() => setActiveTab('completed')}
                >
                    Completed
                </button>
            </div>

            <div className="space-y-4">
                {activeTab === 'active' && activeTasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between gap-3 p-2 bg-gray-100 rounded-lg">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-gray-300 rounded-md mr-2"></div>
                            <div>
                                <h2 className="font-medium text-gray-800">{task.title}</h2>
                                <p className="text-sm text-gray-500">{task.points}pts</p>
                            </div>
                        </div>
                        <a 
                            href={task.link} 
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                            onClick={() => handleStart(task.id)}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Start
                        </a>
                    </div>
                ))}
                {activeTab === 'completed' && completedTasks.length > 0 && completedTasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-2 bg-gray-100 rounded-lg">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-gray-300 rounded-md mr-2"></div>
                            <div>
                                <h2 className="font-medium text-gray-800">{task.title}</h2>
                                <p className="text-sm text-gray-500">{task.points}pts</p>
                            </div>
                        </div>
                        <span className="bg-[#BABABA] text-white px-4 py-4 rounded-lg">
                        <IoMdCheckmark />
                        </span>
                    </div>
                ))}
                {activeTab === 'completed' && completedTasks.length === 0 && (
                    <p className="text-gray-500 text-center">No completed tasks</p>
                )}
            </div>
        </div>
    );
}
