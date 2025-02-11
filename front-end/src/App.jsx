import { useState, useEffect } from "react";
import { createBrowserRouter ,RouterProvider} from "react-router-dom"
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  

  useEffect(() => {
    // Check if the user has a valid token
    
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);




  // Creating our routes

  const router = createBrowserRouter ([
    {
      path: "/",
      element:<>
      
      <Home  isAuthenticated = {isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      </>
    },
    {
      path: "/login",
      element:<> {
        <Login setIsAuthenticated={setIsAuthenticated} />
      }</>
    },
    
    {
      path: "/movies",
      element:<>
     <Movies  isAuthenticated = {isAuthenticated} setIsAuthenticated={setIsAuthenticated} /></>
    },
    {
      path: "/series",
      element: <><Series   isAuthenticated = {isAuthenticated} setIsAuthenticated={setIsAuthenticated}/></>
    },
    {
      path: "/kids",
      element:<><Kids  isAuthenticated = {isAuthenticated} setIsAuthenticated={setIsAuthenticated} /></>
    },
    {
      path: "/voting/:id",
      element:<><Navbar   />
      <Voting  isAuthenticated = {isAuthenticated} setIsAuthenticated={setIsAuthenticated}/></>
    },
    {
      path: "/signup",
      element:<> <Signup setIsAuthenticated={setIsAuthenticated} /></>
    }
    
    
  ])

  return (
   
    <div className="bg-[#EFF2F0]">
        <RouterProvider router={router} />
    </div>

  );
}

export default App;
