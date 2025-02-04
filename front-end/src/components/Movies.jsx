import React, { useState, useEffect } from "react";
import axios from "axios";

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState("");
    const username = localStorage.getItem("username"); // Get logged-in user's username

    useEffect(() => {
        const fetchMovies = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("You must log in first.");
                return;
            }

            try {
                const response = await axios.get("http://127.0.0.1:5000/movies", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setMovies(response.data);
            } catch (err) {
                setError("Failed to fetch movies. Maybe your token expired.");
            }
        };

        fetchMovies();
    }, []);

    return (
        <div>
            <h2>Welcome, {username}!</h2>
            <h3>Movies List</h3>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <ul>
                {movies.map((movie, index) => (
                    <li key={index}>{movie.title} - Rating: {movie.rating}</li>
                ))}
            </ul>



            {/* logout button here */}
            {/* <button onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("username");
                window.location.href = "/login";  // Redirect to login page
            }}>
                Logout
            </button> */}

        </div>
    );
};

export default Movies;
