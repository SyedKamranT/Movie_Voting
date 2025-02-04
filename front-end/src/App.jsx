import { useState, useEffect } from "react";
import Login from "./components/Login";
import Results from "./components/Results";
import Voting from "./components/Voting";
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

  return (
    <div>
      {isAuthenticated ? (
        <>
          <Voting />
          <Results />
          <button
            onClick={() => {
              localStorage.removeItem("token"); // Logout
              setIsAuthenticated(false);
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <Login setIsAuthenticated={setIsAuthenticated} />
      )}
    </div>
  );
}

export default App;
