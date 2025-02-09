import React from "react";
import "../App.css"; // Adjusted the path to correctly locate App.css
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { IoLogoYoutube } from "react-icons/io";

const Footer = () => {
  return (
    <footer className="bg-[#153F2933] text-[#153F29] text-center py-4 rounded-lg p-4 mx-4 my-4">
      <div className="flex items-center justify-between">
        <div className="logo font-custom font-extrabold text-[25px] tracking-[5px] text-[#153F29]" align="left" >
          RAMOV
        </div>
        <div>
          <p className="text-sm">  &copy; 1990-2025 by ramov.com, Inc.</p>
        </div>
        <div className="flex items-center justify-between gap-4 ">
          <FaFacebook  className="text-[26px]"/>
          <RiInstagramFill className="text-[26px]" />
          <IoLogoYoutube className="text-[26px]" />


        



        </div>
      </div>
    </footer>
  );
};

export default Footer;
