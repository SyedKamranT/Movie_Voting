import React from 'react'
import image from '../images/mov1.png'
import google from '../images/search.png'
import facebook from '../images/facebook.png'
import apple from '../images/apple.png'
import '../../src/App.css'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
 const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://movie-voting-u7oh.onrender.com/signup", {
        username,
        password,
      });

      // Save token in localStorage

      setMessage(response.data.message);
      window.location.href = "https://movievotingramov.vercel.app/login"
      setError("");

      // Update authentication state
      setUsername("");
      setPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
  <div className="relative flex flex-col sm:flex-row items-center justify-center min-h-screen w-full">
    
    {/* Image Background */}
    <div className="absolute top-0 left-0 w-full h-full bg-[#4CAF50]">
      <img className="w-full h-full object-cover mix-blend-soft-light" src={image} alt="Background" />
    </div>
    
    {/* Responsive RAMOV text */}
    <div className="absolute max-sm:top-[27px] top-[50px] md:top-[30px] sm:top-[70px] tracking-[3px] sm:tracking-[5px] font-custom font-extrabold text-[25px] sm:text-[35px] text-[#153F29] text-center w-full px-4">
      RAMOV
    </div>

    {/* Sign-In Form */}
    <div className="relative z-10 bg-[#000000]/70 backdrop-blur-lg p-6 sm:p-8 rounded-xl shadow-2xl max-w-[90%] sm:max-w-[450px] lg:max-w-[500px] w-full">
      <div className="text-left mb-6">
        <h3 className="text-xs font-regular text-white">LET'S GET YOU STARTED</h3>
        <h1 className="text-xl font-bold text-white uppercase ">Sign up to Get Started</h1>
      </div>
      {error && <p style={{ color: "red"}}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
      <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
        <input value={username} onChange={(e) => setUsername(e.target.value)} required className="p-2.5 border ring-1 border-white/80 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-white" type="text" placeholder="Username" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} required className="p-2.5 border ring-1 border-white/80 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-white" type="password" placeholder="Enter Password" />
        <input className="bg-[#0DBC87]  tracking-[2px] text-white p-3 rounded-lg cursor-pointer hover:bg-[#00AB77] transition font-semibold" type="submit" value="GET STARTED" />
      </form>

      <div className="max-sm: text-center mt-6 text-white/50">─────── Or ───────</div>

      {/* Social Sign-In Buttons */}
      <div className="btns w-full mt-6 space-y-4">
        <button className="bg-[#FFFFFF] cursor-pointer flex items-center justify-center gap-3 p-2 w-full rounded-lg shadow-md hover:bg-blue-100 transition">
          <img src={google} alt="Google" className="h-5" />
          <span className="text-gray-700 font-medium">Sign in with Google</span>
        </button>
        <button className="bg-[#FFFFFF] cursor-pointer flex items-center justify-center gap-3 p-2 w-full rounded-lg shadow-md hover:bg-blue-100 transition">
          <img src={facebook} alt="Facebook" className="h-5" />
          <span className="text-gray-700 font-medium">Sign in with Facebook</span>
        </button>
      </div>
      <div className="max-sm:text-[12px]  mt-5 text-center text-white/90">
            Already have an account? <a className="text-[#00AB77] cursor-pointer" href="/login">Sign In</a> here.
          </div>
    </div>
  </div>
</div>
  
  )
}

export default Signup