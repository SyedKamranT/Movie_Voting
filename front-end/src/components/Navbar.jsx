import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import { FiX, FiMenu } from "react-icons/fi";

const Navbar = ({ limit, homepage, searchTerm, setSearchTerm }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  if (!homepage && limit) {
    return null;
  }

  return (
    <div className="m-0 p-0 relative z-50 font-[Mypoppins]">
      <nav className="flex items-center bg-[#153F29] justify-between h-16 rounded-xl m-2 p-4 relative md:h-20">
        <div className="flex items-center w-full md:w-auto">
          <div className="font-custom font-extrabold text-[20px] tracking-[3px] text-[#7EE084] md:text-[25px] md:tracking-[5px]">
            RAMOV
          </div>
          <button
            className="md:hidden text-white text-2xl ml-auto"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        <div
          className={`absolute top-16 left-0 w-full bg-[#153F29] md:static md:flex items-center transition-all duration-300 ease-in-out z-50 shadow-lg 
          ${menuOpen ? "flex flex-col" : "hidden"} md:flex md:w-auto md:shadow-none`}
          style={{ zIndex: 100 }}
        >
          <ul className="max-sm:hidden min-md:max-lg:gap-1 flex flex-col md:flex-row gap-3 md:gap-4 items-center w-full md:w-auto p-4 md:p-0">
            {[{ name: "HOME", path: "/" }, { name: "MOVIES", path: "/movies" }, { name: "SERIES", path: "/series" }, { name: "KIDS", path: "/kids" }].map((item) => (
              <NavLink
                key={item.name}
                className={({ isActive }) =>
                  `${isActive ? "min-md:px-3 min-md:py-2 text-[#153F29] bg-[#81E687] rounded-md" : "text-white"} font-medium tracking-[1px] text-sm px-3 py-2 md:text-base md:px-4 md:py-2`}
                to={item.path}
                onClick={() => setMenuOpen(false)}
              >
                <li>{item.name}</li>
              </NavLink>
            ))}
          </ul>
          
          {/* Search Bar & Login/Logout Button inside dropdown on small screens */}
          {menuOpen && (
  <div className="flex flex-col  items-center gap-3 w-full px-4 pb-4 md:hidden">
    
    <div className="search border-2 mt-[20px] border-[#81E687] flex items-center px-3 py-2.5 rounded-md w-full">
      <input
        type="text"
        name="movieSearch"
        placeholder="SEARCH"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="text-white tracking-[1px] text-sm font-bold bg-transparent w-full outline-0"
      />
      <button>
        <CiSearch className="text-xl text-[#81E687]" />
      </button>
    </div>

    {/* Navigation Links */}
    <ul className=" flex flex-col gap-3 w-full items-center">
      {[{ name: "HOME", path: "/" }, { name: "MOVIES", path: "/movies" }, { name: "SERIES", path: "/series" }, { name: "KIDS", path: "/kids" }].map((item) => (
        <NavLink
          key={item.name}
          className={({ isActive }) =>
            `${isActive ? "text-[#153F29] bg-[#81E687] rounded-md px-3 py-2" : "text-white"} font-medium tracking-[1px] text-sm px-3 py-2`
          }
          to={item.path}
          onClick={() => setMenuOpen(false)}
        >
          <li>{item.name}</li>
        </NavLink>
      ))}
    </ul>

    {/* Login/Logout Button at the bottom */}
    <div className="w-full flex justify-center">
      {isAuthenticated ? (
        <button
          className="text-[#153F29] bg-[#81E687] font-bold text-xs tracking-[1px] rounded-md px-4 py-3"
          onClick={() => {
            localStorage.removeItem("token");
            setIsAuthenticated(false);
          }}
        >
          LOGOUT
        </button>
      ) : (
        <button
          onClick={() => window.location.href = "https://movievotingramov.vercel.app/login"}
          className="text-[#153F29] bg-[#81E687] font-bold text-sm tracking-[1px] cursor-pointer rounded-md px-4 py-3"
        >
          LOGIN
        </button>
      )}
    </div>
  </div>
)}

        </div>
        
        {/* Search Bar & Login/Logout Button for larger screens */}
        <div className="hidden md:flex items-center gap-3 md:gap-4 w-auto">
          <div className="min-lg:max-xl:w-[200px]  min-md:w-[100px] search border-2 border-[#81E687] flex items-center px-3 py-2.5 rounded-md w-[180px] lg:w-[350px]">
            <input
              type="text"
              name="movieSearch"
              placeholder="SEARCH"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-white tracking-[1px] text-sm font-bold bg-transparent w-full outline-0"
            />
            <button>
              <CiSearch className="text-xl text-[#81E687]" />
            </button>
          </div>
          <div>
            {isAuthenticated ? (
              <button
                className="text-[#153F29] bg-[#81E687] font-bold text-xs tracking-[1px] cursor-pointer rounded-md px-4 py-3"
                onClick={() => {
                  localStorage.removeItem("token");
                  setIsAuthenticated(false);
                }}
              >
                LOGOUT
              </button>
            ) : (
              <button
                onClick={() => window.location.href = "http://localhost:5173/login"}
                className="text-[#153F29] cursor-pointer bg-[#81E687] font-bold text-xs tracking-[1px] rounded-md px-4 py-3"
              >
                LOGIN
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
