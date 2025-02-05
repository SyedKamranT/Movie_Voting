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
    <nav className="flex items-center bg-[#153F29] justify-between h-20 rounded-xl m-3 p-5 relative">
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
      </div>

      {/* Navbar links */}
      <div
        className={`absolute top-20 left-0 w-full bg-[#153F29] md:static md:flex items-center md:gap-4 lg:gap-6 transition-all duration-300 ease-in-out 
        ${menuOpen ? "block" : "hidden"} md:flex md:w-auto`}
      >
        <ul className="flex flex-col md:flex-row gap-4 md:gap-0 lg:gap-6 items-center">
          {[
            { name: "Home", path: "/" },
            { name: "Movies", path: "/movies" },
            { name: "Series", path: "/series" },
            { name: "Kids", path: "/kids" },
          ].map((item) => (
            <NavLink
              key={item.name}
              className={({ isActive }) =>
                `${isActive ? "bg-red-500 font-bold text-white rounded-lg" : "text-white"} md:px-3 md:py-1.5 lg:px-4 lg:py-2`
              }
              to={item.path}
            >
              <li>{item.name}</li>
            </NavLink>
          ))}
        </ul>
      </div>

      {/* Right part of the navbar */}
      <div className="hidden md:flex items-center gap-4 md:gap-4 lg:gap-6 w-full md:w-auto lg:w-[400px]">
        <div className="search border-2 border-[#81E687] flex items-center px-4 py-2 rounded-md w-full md:w-[150px] lg:w-[400px]">
          <input
            type="search"
            name="movieSearch"
            placeholder="SEARCH"
            className="text-white font-bold bg-transparent w-full outline-0"
          />
          <button>
            <CiSearch className="text-2xl text-[#81E687] " />
          </button>
        </div>
        <div className="logout">
          {isAuthenticated ? (
            <button
              className="text-white bg-red-500 rounded-lg lg:px-4 lg:py-2 lg:p-2 md:py-2 cursor-pointer"
              onClick={() => {
                localStorage.removeItem("token");
                setIsAuthenticated(false);
              }}
            >
              Logout
            </button>
          ) : (
            <button onClick = { ()=>{
          window.location.href = "http://localhost:5173/login"
           

            }} className="text-white bg-green-500 rounded-lg lg:px-4 lg:py-2 lg:p-2 md:py-2 cursor-pointer">LOGIN</button>
          )}
        </div>
      </div>
    </nav>
  </div>
  );
};

export default Navbar;
