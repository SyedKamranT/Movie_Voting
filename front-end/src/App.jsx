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
      
      
      
      <Home/>
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
      element:<><Navbar authenticated = {isAuthenticated} set = {setIsAuthenticated} /><Movies/></>
    },
    {
      path: "/series",
      element:<><Navbar authenticated = {isAuthenticated} set = {setIsAuthenticated} /><Series/></>
    },
    {
      path: "/kids",
      element:<> <Navbar authenticated = {isAuthenticated} set = {setIsAuthenticated} /><Kids/></>
    },
    {
      path: "/voting/:id",
      element:<> <Navbar authenticated = {isAuthenticated} set = {setIsAuthenticated} />
      <Voting/></>
    }
    
    
  ])

  return (
    <div>
      {/* {isAuthenticated ? (
        <> */}
        <RouterProvider router={router} />
        {/* <Movies /> */}
          
          {/* <button
            onClick={() => {
              localStorage.removeItem("token"); // Logout
              setIsAuthenticated(false);
            }}
          >
            Logout
          </button> */}
        {/* </>
      ) : (
        <Login setIsAuthenticated={setIsAuthenticated} />
      )} */}
    </div>
  );
}

export default App;
