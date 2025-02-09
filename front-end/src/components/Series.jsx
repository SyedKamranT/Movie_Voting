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
                const response = await axios.get("http://127.0.0.1:8889/series");
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
        
        if (ratings <= 5.0) {
            return (
                <div className="rating">
                    <div className="relative top-[-50px] left-2 ratings text-white bg-[#FB5E2D] font-bold font-[Mypoppins] backdrop-blur-md h-[39px] w-[46px] text-center flex justify-center items-center rounded-[5px]">
                        {ratings}
                    </div>
                </div>
            )
        }
        else if (ratings <= 7.0) {
            return (
                <div className="rating">
                    <div className="relative top-[-50px] left-2 ratings bg-[#EFE177] font-bold font-[Mypoppins] backdrop-blur-md h-[39px] w-[46px] text-center flex justify-center items-center rounded-[5px]">
                        {ratings}
                    </div>
                </div>
    
            )
        }
        else {
            return (
                <div className="rating">
                    <div className="relative top-[-50px] left-2 ratings bg-[#7EE084] font-bold font-[Mypoppins] backdrop-blur-md h-[39px] w-[46px] text-center flex justify-center items-center rounded-[5px]">
                        {ratings}
                    </div>
                </div>
            )
        }
    }
    

    return (
        <div className="m-3 mt-[50px] font-[Mypoppins]">
            <div className="flex justify-between mb-[30px]">
                <div className="font-custom text-[24px] font-extrabold">
                    TOP RATED SERIES
                </div>
                {limit && (
                    <button
                        className="font-custom cursor-pointer hover:underline"
                        onClick={() => navigate("/series")}
                    >
                        VIEW ALL
                    </button>
                )}
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <ul className="flex items-center justify-start gap-[70px]  flex-wrap">
                {series.slice(0, limit || series.length).map((item, i) => ( 
                    <li key={i} className="self-start">
                        <button  onClick={() => navigate(`/voting/${item._id}`)} className=' cursor-pointer'>
                            <img
                                className="w-[189px] h-[259px] rounded-lg  object-cover shadow-3xl"
                                src={item.poster}
                                alt="series poster"
                            />
                            <div>
                                {formatRatings(item.rating) }
                            </div>
                        </button>
                        <div className="flex flex-col gap-2 mt-[-10px]">
                            <div className="font-[Mypoppins] font-[700] text-[#153F29] w-[189px] tracking-[1.5px]">
                                {item.title}
                            </div>

                            <div className="text-[#153F29B2] font-[500]">
                                {item.year} • {formatVotes(item.votes)} + votes
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 w-[189px] mt-2">
                            {item.genre.split(",").map((word, index) => (
                                <span
                                    key={index}
                                    className="border-[#4CAF50] px-2 py-1 rounded border-1   text-xs"
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
          


