import React from "react";
import { Link, useLocation } from "react-router-dom";
import homeSvg from "../assets/home.svg";
import searchSvg from "../assets/search.png";
import eventSvg from "../assets/event.svg";
import taskSvg from "../assets/task.png";
import profileSvg from "../assets/profile.png";

// Images for active states
import homeActiveSvg from "../assets/home-active.svg";
import searchActiveSvg from "../assets/search-active.png";
import eventActiveSvg from "../assets/event-active.png";
import taskActiveSvg from "../assets/task-active.png";
import profileActiveSvg from "../assets/profile-active.png";

export default function Footer() {
    const location = useLocation();
    const currentPath = location.pathname;

    const getImage = (path) => {
        switch (path) {
            case "/":
                return currentPath === "/" ? homeActiveSvg : homeSvg;
            case "/search":
                return currentPath === "/search" ? searchActiveSvg : searchSvg;
            case "/events":
                return currentPath === "/events" ? eventActiveSvg : eventSvg;
            case "/tasks":
                return currentPath === "/tasks" ? taskActiveSvg : taskSvg;
            case "/profile":
                return currentPath === "/profile" ? profileActiveSvg : profileSvg;
            default:
                return homeSvg;
        }
    };

    const getLinkClasses = (path) => {
        return `flex flex-col items-center ${currentPath === path ? "text-primary" : "text-gray-800"}`;
    };

    return (
        <footer className="fixed bottom-0 left-0 right-0 bg-white border-t">
            <div className="flex justify-around p-2">
                <Link to="/" className={getLinkClasses("/")}>
                    <img src={getImage("/")} alt="Home" />
                    <span>Home</span>
                </Link>
                <Link to="/search" className={getLinkClasses("/search")}>
                    <img src={getImage("/search")} alt="Search" />
                    <span>Search</span>
                </Link>
                <Link to="/events" className={getLinkClasses("/events")}>
                    <img src={getImage("/events")} alt="Events" />
                    <span>Events</span>
                </Link>
                <Link to="/tasks" className={getLinkClasses("/tasks")}>
                    <img src={getImage("/tasks")} alt="Tasks" />
                    <span>Tasks</span>
                </Link>
                <Link to="/profile" className={getLinkClasses("/profile")}>
                    <img src={getImage("/profile")} alt="Profile" />
                    <span>Profile</span>
                </Link>
            </div>
        </footer>
    );
}
