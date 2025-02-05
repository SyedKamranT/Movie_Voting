import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';

const Series = () => {
  const [series, setSeries] = useState([]);
  const [error, setError] = useState("");
  const username = localStorage.getItem("username"); // Get logged-in user's username

  useEffect(() => {
      const fetchSeries = async () => {
         

         

          try {
              const response = await axios.get("http://127.0.0.1:8889/series", {
                
              });
              setSeries(response.data);
             
          } catch (err) {
              setError("Failed to fetch series. Maybe your token expired.");
          }
      };

      fetchSeries();
  }, []);


  const formatVotes = (votes) => {
    if (votes >= 1000000) return (votes / 1000000).toFixed(1) + "M";
    if (votes >= 1000) return (votes / 1000).toFixed(1) + "K";
    return votes;
};

  return (
    
    <div className="m-3 mt-[50px] font-[Mypoppins]">
    <div className="flex justify-between mb-[30px]">
        <div className="font-custom text-[24px] font-extrabold">
            TOP RATED SERIES
        </div>
        <div className="font-custom">VIEW ALL</div>
    </div>

    {error && <p style={{ color: "red" }}>{error}</p>}

    <ul className="flex items-center justify-start gap-[70px] flex-wrap">
        {series.map((item, i) => (
            <li key={i} className="self-start">
                <button>
                    <img
                        className="     w-[189px] h-[259px] rounded-lg shadow-3xl"
                        src={item.poster}
                        alt="movie poster"
                    />
                    <div className=" relative top-[-50px] left-2 font-bold font-[Mypoppins]  ratings bg-[#7EE084] backdrop-blur-md h-[39px] w-[46px] text-center flex justify-center items-center rounded-[5px] ">{item.rating} ★</div>
                </button>
                <div className=" flex flex-col gap-2 mt-[-10px]">
                    <div className="font-[Mypoppins] font-[700] text-[#153F29] w-[189px] tracking-[1.5px]">
                        {item.title}
                    </div>

                    <div className="text-[#153F29B2] font-[500]">
                        {item.year} • {formatVotes(item.votes)} + votes
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 w-[189px] mt-2">
                    {/* Display each genre as a separate word */}
                    {item.genre.split(",").map((word, index) => (
                        <span
                            key={index}
                            className=" border-[#4CAF50] border-2 px-2 py-1 rounded text-sm"
                        >
                            {word.trim()}
                        </span>
                    ))}
                </div>
            </li>
        ))}
    </ul>
</div>
  )
}

export default Series