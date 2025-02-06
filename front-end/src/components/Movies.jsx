import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Movies = ({ limit }) => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8889/movies");
                setMovies(response.data);
            } catch (err) {
                setError("Failed to fetch movies. Maybe your token expired.");
            }
        };

        fetchMovies();
    }, []);

    // Function to format votes
    const formatVotes = (votes) => {
        if (votes >= 1000000) return (votes / 1000000).toFixed(1) + "M";
        if (votes >= 1000) return (votes / 1000).toFixed(1) + "K";
        return votes;
    };

    return (
        <div className="m-3 mt-[50px] font-[Mypoppins]">
            <div className="flex justify-between mb-[30px]">
                <div className="font-custom text-[24px] font-extrabold">
                    TOP RATED MOVIES
                </div>
                {limit && (
                    <button
                        className="font-custom cursor-pointer hover:underline"
                        onClick={() => navigate("/movies")}
                    >
                        VIEW ALL
                    </button>
                )}
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <ul className="flex items-center justify-start gap-[70px] flex-wrap">
                {movies.slice(0, limit || movies.length).map((movie, i) => ( 
                    <li key={i} className="self-start">
                        <button className=" cursor-pointer">
                            <img
                                className="w-[189px] h-[259px] rounded-lg shadow-3xl"
                                src={movie.poster}
                                alt="movie poster"
                            />
                            <div className="relative top-[-50px] left-2 ratings bg-[#7EE084] font-bold font-[Mypoppins] backdrop-blur-md h-[39px] w-[46px] text-center flex justify-center items-center rounded-[5px]">
                                {movie.rating}
                            </div>
                        </button>
                        <div className="flex flex-col gap-2 mt-[-10px]">
                            <div className="font-[Mypoppins] font-[700] text-[#153F29] w-[189px] tracking-[1.5px]">
                                {movie.title}
                            </div>
                            <div className="text-[#153F29B2] font-[500]">
                                {movie.year} • {formatVotes(movie.votes)}+ votes
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 w-[189px] mt-2">
                            {movie.genre.split(",").map((word, index) => (
                                <span
                                    key={index}
                                    className="border-[#4CAF50] border-2 px-2 py-1 rounded text-sm"
                                >
                                    {word.trim()}
                                </span>
                            ))}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Movies;
