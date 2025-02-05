import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './Login';

//icons
import { CiSearch } from "react-icons/ci";
import { FiX } from "react-icons/fi";

const Navbar = (params) => {


  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Check if the user has a valid token
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  return (
    <div className="m-0 p-0">
      <nav className="flex items-center bg-[#153F29] justify-between h-20 rounded-xl m-2 p-5 relative">
        {/* Left part of the navbar */}
        <div className="flex items-center gap-4 md:gap-4 lg:gap-6">
          <div className="logo font-custom font-extrabold text-[25px] tracking-[5px] text-[#7EE084]">
            RAMOV
          </div>
          {/* Mobile menu button */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✖" : "☰"}
          </button>
          {/* Navbar links */}
        <div
          className={`absolute top-20 left-0 w-full bg-[#153F29] md:static md:flex items-center md:gap-4 lg:gap-6 transition-all duration-300 ease-in-out 
          ${menuOpen ? "block" : "hidden"} md:flex md:w-auto ml-[60px]`} // Added margin-left
        >
          <ul className="flex flex-col md:flex-row gap-4 md:gap-0 lg:gap-6 items-start">
            {[
              { name: "HOME", path: "/" },
              { name: "MOVIES", path: "/movies" },
              { name: "SERIES", path: "/series" },
              { name: "KIDS", path: "/kids" },
            ].map((item) => (
              <NavLink
                key={item.name}
                className={({ isActive }) =>
                  `${isActive ? " font-medium text-[#153F29] bg-[#81E687] rounded-lg tracking-[2px]" : "text-white font-medium tracking-[2px]"} md:px-3 md:py-1.5 lg:px-4 lg:py-2`
                }
                to={item.path}
              >
                <li>{item.name}</li>
              </NavLink>
            ))}
          </ul>
        </div>

        </div>
  
        
      {/* Right part of the navbar */}
      <div className="hidden md:flex items-center gap-4 md:gap-4 lg:gap-6 w-full md:w-auto lg:w-[400px]">
        <div className="search border-2 border-[#81E687] flex items-center px-4 py-2 rounded-md w-full md:w-[150px] lg:w-[400px]">
          <input
            type="search"
            name="movieSearch"
            placeholder="SEARCH"
            className="text-white tracking-[1px] text-base font-bold bg-transparent w-full outline-0"
          />
          <button>
            <CiSearch className="text-2xl text-[#81E687]" />
          </button>
        </div>
        <div className="LOGOUT">
          {isAuthenticated ? (
            <button
              className="text-[#153F29] cursor-pointer font-bold text-sm bg-[#81E687] tracking-[2px] rounded-lg md:px-5 md:py-3"
              onClick={() => {
                localStorage.removeItem("token");
                setIsAuthenticated(false);
              }}
            >
              LOGOUT
            </button>
          ) : (
            <button  onClick = { ()=>{
          window.location.href = "http://localhost:5173/login"
           

            }} className="text-[#153F29] font-bold text-sm bg-[#81E687] tracking-[2px] cursor-pointer rounded-lg md:px-6 md:py-3">LOGIN</button>
          )}
        </div>
      </div>
    </nav>
  </div>
  );
};

export default Navbar;
