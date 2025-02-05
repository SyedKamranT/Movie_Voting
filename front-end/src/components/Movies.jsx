import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const Movies = () => {

    // const movies = [
    //     {
    //         "_id": {
    //           "$oid": "679fd7fce61298bb025a406d"
    //         },
    //         "title": "The Dark Knight",
    //         "year": 2008,
    //         "genre": "Action, Crime, Drama",
    //         "director": "Christopher Nolan",
    //         "rating": 9,
    //         "votes": 2200000,
    //         "poster": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UY2048_.jpg\n"
    //       },
    //       {
    //         "_id": {
    //           "$oid": "679fd7fce61298bb025a406d"
    //         },
    //         "title": "The Dark Knight",
    //         "year": 2008,
    //         "genre": "Action, Crime, Drama",
    //         "director": "Christopher Nolan",
    //         "rating": 9,
    //         "votes": 2200000,
    //         "poster": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UY2048_.jpg\n"
    //       },
    //       {
    //         "_id": {
    //           "$oid": "679fd7fce61298bb025a406d"
    //         },
    //         "title": "The Dark Knight",
    //         "year": 2008,
    //         "genre": "Action, Crime, Drama",
    //         "director": "Christopher Nolan",
    //         "rating": 9,
    //         "votes": 2200000,
    //         "poster": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UY2048_.jpg\n"
    //       },
    //       {
    //         "_id": {
    //           "$oid": "679fd7fce61298bb025a406d"
    //         },
    //         "title": "The Dark Knight",
    //         "year": 2008,
    //         "genre": "Action, Crime, Drama",
    //         "director": "Christopher Nolan",
    //         "rating": 9,
    //         "votes": 2200000,
    //         "poster": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UY2048_.jpg\n"
    //       },
    //       {
    //         "_id": {
    //           "$oid": "679fd7fce61298bb025a406d"
    //         },
    //         "title": "The Dark Knight",
    //         "year": 2008,
    //         "genre": "Action, Crime, Drama",
    //         "director": "Christopher Nolan",
    //         "rating": 9,
    //         "votes": 2200000,
    //         "poster": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UY2048_.jpg\n"
    //       },
    //       {
    //         "_id": {
    //           "$oid": "679fd7fce61298bb025a406d"
    //         },
    //         "title": "The Dark Knight",
    //         "year": 2008,
    //         "genre": "Action, Crime, Drama",
    //         "director": "Christopher Nolan",
    //         "rating": 9,
    //         "votes": 2200000,
    //         "poster": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UY2048_.jpg\n"
    //       },
    //       {
    //         "_id": {
    //           "$oid": "679fd7fce61298bb025a406d"
    //         },
    //         "title": "The Dark Knight",
    //         "year": 2008,
    //         "genre": "Action, Crime, Drama",
    //         "director": "Christopher Nolan",
    //         "rating": 9,
    //         "votes": 2200000,
    //         "poster": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UY2048_.jpg\n"
    //       },
    //       {
    //         "_id": {
    //           "$oid": "679fd7fce61298bb025a406d"
    //         },
    //         "title": "The Dark Knight",
    //         "year": 2008,
    //         "genre": "Action, Crime, Drama",
    //         "director": "Christopher Nolan",
    //         "rating": 9,
    //         "votes": 2200000,
    //         "poster": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UY2048_.jpg\n"
    //       },
    //       {
    //         "_id": {
    //           "$oid": "679fd7fce61298bb025a406d"
    //         },
    //         "title": "The Dark Knight",
    //         "year": 2008,
    //         "genre": "Action, Crime, Drama",
    //         "director": "Christopher Nolan",
    //         "rating": 9,
    //         "votes": 2200000,
    //         "poster": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UY2048_.jpg\n"
    //       }


    // ]
        
    
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState("");
    const username = localStorage.getItem("username"); // Get logged-in user's username

    useEffect(() => {
        const fetchMovies = async () => {
            const token = localStorage.getItem("token");

           

            try {
                const response = await axios.get("http://127.0.0.1:8889/movies", {
                   
                });
                setMovies(response.data);
            } catch (err) {
                setError("Failed to fetch movies. Maybe your token expired.");
            }
        };

        fetchMovies();
    }, []);



    return (
        <div className=" m-3">
            {/* <h2>Welcome, {username}!</h2> */}
            <h3>Movies List</h3>
            {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
            <ul className=" flex  items-center justify-start gap-[70px] flex-wrap">
                {movies.map((movie, index) => (
                    // <li key={index}>{movie.title} - Rating: {movie.rating}</li>
                    <li key={index} className=" self-start">
                        <button>
                        <img className=" w-[189px] h-[259px] rounded-lg" src={movie.poster} alt="movie poster" />
                    </button>
                    <div>
                       <div>{movie.title} </div> 
                       <div>{movie.year} * {movie.votes}</div>
                    </div>
                    <div>
                        {movie.genre}
                    </div>
                    </li>
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





    {/* Starting my code from here... */}


        </div>
    );
};

export default Movies;
