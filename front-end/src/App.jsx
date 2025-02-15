import { useState, useEffect } from "react";
import { createBrowserRouter ,RouterProvider} from "react-router-dom"
import { useContext } from "react"; //now added
import { useAuth } from "./AuthContext";; //now added
import { AuthProvider } from "./AuthContext";
import Login from "./components/Login";
import Results from "./components/Results";
import Voting from "./components/Voting";
import Movies from "./components/Movies";
import Series from "./components/Series";
import Kids from "./components/Kids";
import Navbar from "./components/Navbar";
import Coursel from "./components/Coursel"
import Home from "./components/Home";
import Signup from "./components/Signup";
import "./App.css";

function App() {
  const { isAuthenticated } = useAuth(); // Use context instead of state
  
  

 


  // Creating our routes

  const router = createBrowserRouter ([
    {
      path: "/",
      element:<>
      
      <Home   />
      </>
    },
    {
      path: "/login",
      element:<> {
        <Login />
      }</>
    },
    
    {
      path: "/movies",
      element:<>
     <Movies   /></>
    },
    {
      path: "/series",
      element: <><Series/></>
    },
    {
      path: "/kids",
      element:<><Kids /></>
    },
    {
      path: "/voting/:id",
      element:<><Navbar   />
      <Voting /></>
    },
    {
      path: "/signup",
      element:<> <Signup  /></>
    }
    
    
  ])

  return (
    <AuthProvider>
    <div className="bg-[#EFF2F0]">
        <RouterProvider router={router} />
    </div>
    </AuthProvider>

  );
}

export default App;
