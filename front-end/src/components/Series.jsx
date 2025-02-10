import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner'
import Navbar from './Navbar';


const Series = ({ limit, isHomepage}) => {
    const [series, setSeries] = useState([]);
    const [error, setError] = useState("");
    const [ homepage, setisHomepage] = useState(false)
    const [searchTerm, setSearchTerm] = useState("");

    
    
    const [loading, setLoading] = useState(true);
   
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchSeries = async () => {
            setLoading(true);
            try {
                const response = await axios.get("https://movie-voting-u7oh.onrender.com/series");
                setSeries(response.data);
            } catch (err) {
                setError("Failed to fetch series. Maybe your token expired.");
            }
            finally{
                setLoading(false);
            }
        };

        fetchSeries();
    }, []);

    const filteredContent = series.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
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
        <div>
             <Navbar limit ={limit} homepage ={false} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

             {loading && !isHomepage ? (
                             <div className="flex justify-center items-center h-screen">
                                 <RotatingLines
                                     visible={true}
                                     height="96"
                                     width="80"
                                     color="grey"
                                     strokeWidth="5"
                                     animationDuration="0.75"
                                     ariaLabel="rotating-lines-loading"
                                 />
                             </div>
                         ) : ( <div className="m-3 mt-[50px] font-[Mypoppins]">
                            <div className=" text-[#153f29] flex justify-between mb-[30px]">
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
                            {searchTerm ? (
                        // Show filtered search results if there is a search term
                        <div className="m-4 h-screen">
                          <h2 className="text-2xl font-bold mb-4">Search Results</h2>
                          <ul className="flex flex-wrap gap-6">
                            {filteredContent.length > 0 ? (
                              filteredContent.map((item, index) => (
                                <li key={index} className="w-[200px]">
                                  <button className=' cursor-pointer'>
                                    <img
                                      className="w-[200px] h-[280px] rounded-lg shadow-lg"
                                      src={item.poster}
                                      alt={item.title}
                                    />
                                    <div className="mt-2 text-center font-semibold">
                                      {item.title} ({item.category})
                                    </div>
                                    <div className="text-sm text-gray-500 text-center">
                                      {item.year} • {item.rating} ★ Ratings
                                    </div>
                                  </button>
                                </li>
                              ))
                            ) : (
                              <p>No results found.</p>
                            )}
                          </ul>
                        </div>
                      ) :<><ul className="flex items-center justify-start gap-[70px]  flex-wrap">
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
                  </ul></>}
                            
                
                            
                        </div>)}
       
        </div>
    );
};

export default Series;
          


