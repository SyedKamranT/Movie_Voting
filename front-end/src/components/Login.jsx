import React from 'react'
import image from '../images/mov1.png'
import google from '../images/search.png'
import facebook from '../images/facebook.png'
import apple from '../images/apple.png'
import '../../src/App.css'
import axios from 'axios'
import { useState } from 'react'

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8889/login", {
        username,
        password,
      });

      // Save token in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", username);

      setMessage("Login successful!");
      setError("");

      // Update authentication state
      setIsAuthenticated(true);
    } catch (err) {
      setError("Invalid username or password");
      setMessage("");
    }
  };

  return (
    <div className=" min-h-screen w-full flex items-center justify-center ">
  <div className="relative flex flex-col sm:flex-row items-center justify-center min-h-screen w-full">
    
    {/* Image Background */}
    <div className="absolute top-0 left-0 w-full h-full bg-[#4CAF50]">
      <img className="w-full h-full object-cover mix-blend-soft-light" src={image} alt="Background" />
    </div>
    
<div className="text-base font-regular text-black font-[Poppins]">
  
  </div>

    {/* Sign-In Form */}
    <div className="relative z-10 bg-[#000000]/70 backdrop-blur-lg p-6 sm:p-8 rounded-xl shadow-2xl max-w-[450px] w-full sm:w-auto lg:w-[500px]">
      <div className="text-left mb-6">
        <h3 className="text-xs font-regular text-white ">LET'S GET YOU STARTED</h3>
        <h1 className="text-2xl font-bold text-white">Log in to Get Started</h1>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
      <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
        <input  value={username} onChange={(e) => setUsername(e.target.value)} required className="p-2.5 border ring-1 border-white/80 rounded-lg  text-white focus:outline-none focus:ring-1 focus:ring-white" type="text" placeholder="Username" />
        {/* <input className="p-2.5 border ring-1  border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black-100" type="email" placeholder="Enter Email" /> */}
        <input value={password} onChange={(e) => setPassword(e.target.value)} required className="p-2.5 border ring-1 border-white/80 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-white" type="password" placeholder="Enter Password" />
        <input className="bg-[#0DBC87] text-white p-3 rounded-lg cursor-pointer hover:bg-[#00AB77] transition font-semibold" type="submit" value="GET STARTED" />
      </form>

      <div className="text-center mt-6 text-white/90 ">
      ───────────────   Or   ───────────────
      </div>

      {/* Social Sign-In Buttons */}
      <div className="btns w-full mt-6 space-y-4">
        <button className="bg-[#FFFFFF] flex items-center justify-center gap-3 p-2 w-full rounded-lg shadow-md hover:bg-blue-100 transition">
          <img src={google} alt="Google" className="h-5" />
          <span className="text-gray-700 font-medium">Sign in with Google</span>
        </button>
        <button className="bg-[#FFFFFF] flex items-center justify-center gap-3 p-2 w-full rounded-lg shadow-md hover:bg-blue-100 transition">
          <img src={facebook} alt="Facebook" className="h-5" />
          <span className="text-gray-700 font-medium">Sign in with Facebook</span>
        </button>
        {/* <button className="bg-[#E0F3FF] flex items-center justify-center gap-3 p-2 w-full rounded-lg shadow-md hover:bg-blue-100 transition">
          <img src={apple} alt="Apple" className="h-5" />
          <span className="text-gray-700 font-medium">Sign in with Apple</span>
        </button> */}
      </div>
    </div>
  </div>
</div>

  
  )
}

export default Login