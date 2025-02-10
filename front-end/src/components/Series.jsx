import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Series = ({ limit }) => {
    const [series, setSeries] = useState([]);
    const [error, setError] = useState("");
   
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchSeries = async () => {
            try {
                const response = await axios.get("https://movie-voting-u7oh.onrender.com/series");
                setSeries(response.data);
            } catch (err) {
                setError("Failed to fetch series. Maybe your token expired.");
            }
        };

        fetchSeries();
    }, []);

    // Function to format votes
    const formatVotes = (votes) => {
        if (votes >= 1000000) return (votes / 1000000).toFixed(1) + "M";
        if (votes >= 1000) return (votes / 1000).toFixed(1) + "K";
        return votes;
    };

    const formatRatings = (ratings) => {
        let bgColor = "#7EE084"; // Green for high ratings
        if (ratings <= 5.0) bgColor = "#FB5E2D"; // Red for low ratings
        else if (ratings <= 7.0) bgColor = "#EFE177"; // Yellow for medium ratings

        return (
            <div className="absolute top-2 left-2 text-white font-bold backdrop-blur-md h-[32px] w-[38px] sm:h-[39px] sm:w-[46px] flex justify-center items-center rounded-[5px]" style={{ backgroundColor: bgColor }}>
                {ratings}
            </div>
        );
    };

    return (
        <div className="m-3 mt-[30px] sm:mt-[50px] font-[Mypoppins]">
            <div className="flex justify-between items-center mb-5 sm:mb-[30px]">
                <div className="font-custom text-lg sm:text-[24px] font-extrabold">
                    TOP RATED SERIES
                </div>
                {limit && (
                    <button
                        className="font-custom text-sm sm:text-base cursor-pointer hover:underline"
                        onClick={() => navigate("/series")}
                    >
                        VIEW ALL
                    </button>
                )}
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-[30px]">
                {series.slice(0, limit || series.length).map((item, i) => ( 
                    <li key={i} className="relative">
                        <button onClick={() => navigate(`/voting/${item._id}`)} className="cursor-pointer w-full">
                            <img
                                className="w-full h-[200px] sm:w-[189px] sm:h-[259px] rounded-lg object-cover shadow-xl"
                                src={item.poster}
                                alt="series poster"
                            />
                            {formatRatings(item.rating)}
                        </button>
                        <div className="flex flex-col gap-1 mt-1 sm:mt-[-10px]">
                            <div className="font-[700] text-[#153F29] text-sm sm:text-base tracking-wide">
                                {item.title}
                            </div>
                            <div className="text-[#153F29B2] font-[500] text-xs sm:text-sm">
                                {item.year} • {formatVotes(item.votes)}+ votes
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-1 sm:gap-2 mt-1 sm:mt-2">
                            {item.genre.split(",").map((word, index) => (
                                <span
                                    key={index}
                                    className="border-[#4CAF50] border px-2 py-1 rounded text-[10px] sm:text-xs"
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

export default Series;
