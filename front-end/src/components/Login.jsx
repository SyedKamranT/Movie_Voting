import React, { useState, useContext } from "react";
import image from "../images/mov1.png";
import google from "../images/search.png";
import facebook from "../images/facebook.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; // Importing AuthContext

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const { login } = useAuth(); // Using login function from AuthContext
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://movie-voting-u7oh.onrender.com/login", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", username);

      setMessage("Login successful!");
      setError("");

      // Call login function from AuthContext
      login(response.data.token);

      // Navigate to home page
      navigate("/");
    } catch (err) {
      setError("Invalid username or password");
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="relative flex flex-col sm:flex-row items-center justify-center min-h-screen w-full">
        {/* Background */}
        <div className="absolute top-0 left-0 w-full h-full bg-[#4CAF50]">
          <img className="w-full h-full object-cover mix-blend-soft-light" src={image} alt="Background" />
        </div>

        {/* RAMOV Branding */}
        <div className="absolute top-[50px] tracking-[5px] font-custom font-extrabold text-[35px] text-[#153F29] text-center w-full px-4">
          RAMOV
        </div>

        {/* Login Form */}
        <div className="relative z-10 bg-[#000000]/70 backdrop-blur-lg p-8 rounded-xl shadow-2xl max-w-[450px] w-full">
          <h3 className="text-xs font-regular text-white">LET'S GET YOU STARTED</h3>
          <h1 className="text-xl font-bold text-white ">Log in to Get Started</h1>

          {error && <p style={{ color: "red" }}>{error}</p>}
          {message && <p style={{ color: "green" }}>{message}</p>}

          <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
            <input value={username} onChange={(e) => setUsername(e.target.value)} required className="p-2.5 border ring-1 border-white/80 rounded-lg text-white focus:ring-white" type="text" placeholder="Username" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} required className="p-2.5 border ring-1 border-white/80 rounded-lg text-white focus:ring-white" type="password" placeholder="Enter Password" />
            <button className="bg-[#0DBC87] tracking-[2px] text-white p-3 rounded-lg hover:bg-[#00AB77] transition font-semibold">
              GET STARTED
            </button>
          </form>

          {/* Social Logins */}
          <div className="text-center mt-6 text-white/90">─────────────── Or ───────────────</div>
          <div className="btns w-full mt-6 space-y-4">
            <button className="bg-[#FFFFFF] flex items-center justify-center gap-3 p-2 w-full rounded-lg shadow-md hover:bg-blue-100 transition">
              <img src={google} alt="Google" className="h-5" />
              <span className="text-gray-700 font-medium">Sign in with Google</span>
            </button>
            <button className="bg-[#FFFFFF] flex items-center justify-center gap-3 p-2 w-full rounded-lg shadow-md hover:bg-blue-100 transition">
              <img src={facebook} alt="Facebook" className="h-5" />
              <span className="text-gray-700 font-medium">Sign in with Facebook</span>
            </button>
          </div>

          {/* Sign-Up Link */}
          <div className="mt-5 text-center text-white/90">
            Don't have an account? <a className="text-[#00AB77]" href="/signup">Sign Up</a> here.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
