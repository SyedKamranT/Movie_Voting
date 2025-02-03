import React from 'react'
import image from '../images/mov1.png'
import google from '../images/search.png'
import facebook from '../images/facebook.png'
import apple from '../images/apple.png'
import '../../src/App.css'

const Login = () => {
  return (
    <div className=" min-h-screen w-full flex items-center justify-center ">
  <div className="relative flex flex-col sm:flex-row items-center justify-center min-h-screen w-full">
    
    {/* Image Background */}
    <div className="absolute top-0 left-0 w-full h-full">
      <img className="w-full h-full object-cover" src={image} alt="Background" />
    </div>

    {/* Sign-In Form */}
    <div className="relative z-10 bg-white/30 backdrop-blur-lg p-6 sm:p-8 rounded-lg shadow-lg max-w-[450px] w-full sm:w-auto lg:w-[500px]">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-black font-[Poppins]">Let's Get You Started</h3>
        <h1 className="text-3xl font-bold text-black font-[Poppins]">Create An Account</h1>
      </div>

      <form className="w-full flex flex-col gap-5">
        <input className="p-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" type="text" placeholder="Your Name Here.." />
        <input className="p-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" type="email" placeholder="Enter Email" />
        <input className="p-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" type="password" placeholder="Enter Password" />
        <input className="bg-blue-500 text-white p-3 rounded-lg cursor-pointer hover:bg-blue-600 transition font-semibold" type="submit" value="Get Started" />
      </form>

      {/* Social Sign-In Buttons */}
      <div className="btns w-full mt-6 space-y-4">
        <button className="bg-[#E0F3FF] flex items-center justify-center gap-3 p-2 w-full rounded-lg shadow-md hover:bg-blue-100 transition">
          <img src={google} alt="Google" className="h-5" />
          <span className="text-gray-700 font-medium">Sign in with Google</span>
        </button>
        <button className="bg-[#E0F3FF] flex items-center justify-center gap-3 p-2 w-full rounded-lg shadow-md hover:bg-blue-100 transition">
          <img src={facebook} alt="Facebook" className="h-5" />
          <span className="text-gray-700 font-medium">Sign in with Facebook</span>
        </button>
        <button className="bg-[#E0F3FF] flex items-center justify-center gap-3 p-2 w-full rounded-lg shadow-md hover:bg-blue-100 transition">
          <img src={apple} alt="Apple" className="h-5" />
          <span className="text-gray-700 font-medium">Sign in with Apple</span>
        </button>
      </div>
    </div>
  </div>
</div>

  
  )
}

export default Login