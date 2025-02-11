import React, { useState } from 'react'
import {useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { RotatingLines } from 'react-loader-spinner'
import Navbar from './Navbar';


const Kids = ({limit,isHomepage , isAuthenticated ,setIsAuthenticated}) => {
  const [Kids, setKids] = useState([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
   const [ homepage, setisHomepage] = useState(false)
   const [showPopup, setShowPopup] = useState(false); // Popup state
       const [selectedMovieId, setSelectedMovieId] = useState(null); // Store selected movie ID
  
  
 const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate(); 
  

  useEffect(() => {
      const fetchKids = async () => {
        setLoading(true)
          try {
              const response = await axios.get("https://movie-voting-u7oh.onrender.com/kids");
              setKids(response.data);
          } catch (err) {
              setError("Failed to fetch Kids. Maybe your token expired.");
          }
          finally{
            setLoading(false)
          }
      };

      fetchKids();
  }, []);

  const filteredContent = Kids.filter(item =>
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
const handleMovieClick = (movieId) => {
  if (isAuthenticated) {
      navigate(`/voting/${movieId}`);
  } else {
      setSelectedMovieId(movieId);
      setShowPopup(true);
  }
};

const handleOk = () => {
  navigate("/login");
  setShowPopup(false);
};

const handleCancel = () => {
  setShowPopup(false);
};


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
                     ) : (<div className="m-2 mt-[50px] sm:mt-[50px] font-[Mypoppins]">
        
                       
              
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        {searchTerm ? (
                      // Show filtered search results if there is a search term
                      <div className="md:h-full  h-screen">
                        <h2 className="text-[#153f29] text-2xl  mb-4 max-sm:text-[16px] uppercase  sm:text-[24px] font-custom text-[24px] font-extrabold">Search Results</h2>
                        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:max-xl:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-[30px]">
                          {filteredContent.length > 0 ? (
                            filteredContent.map((item, index) => (
                              <li key={index} className="max-sm:w-[140px]">
                                <button onClick={() => handleMovieClick(item._id)} className=' cursor-pointer'>
                                  <img
                                    className="max-sm:w-[140px] max-sm:h-[200px] max-sm:object-cover w-[189px] h-[259px]  object-cover   rounded-lg shadow-xl"
                                    src={item.poster}
                                    alt={item.title}
                                  />
                                  <div className="mt-2 max-sm:w-[140px]  w-[189px] text-center font-semibold">
                                    {item.title} 
                                  </div>
                                  <div className="max-sm:w-[140px]  w-[189px]  text-sm text-gray-500 text-center">
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
                    ) :  <>
                     <div className=" text-[#153f29] max-sm:mt-[80px]  flex items-center justify-between mb-[30px]">  {/*doubt*/}
                            <div className="max-sm:text-[16px]  sm:text-[24px] font-custom text-[24px] font-extrabold">
                                TOP RATED KID SHOWS
                            </div>
                            {limit && (
                                  <button
                                      className="max-sm:text-[12px] sm:text-base font-custom cursor-pointer hover:underline"
                                      onClick={() => navigate("/kids")}
                                  >
                                      VIEW ALL
                                  </button>
                              )}
                        </div>
                    
                    <ul className="max-sm:gap-[10px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:max-xl:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-[30px]">
                            {Kids.slice(0, limit || Kids.length).map((Kids, i) => (
                                <li key={i} className=" self-start">
                                    <button onClick={() => handleMovieClick(Kids._id)} className='  cursor-pointer w-full'> 
                                        <img
                                            className="max-sm:w-[169px] max-sm:h-[224px] max-sm:object-cover w-[189px] h-[259px]  object-cover   rounded-lg shadow-xl"
                                            src={Kids.poster}
                                            alt="Kids poster"
                                        />
                                        <div className=' max-sm:w-[140px]'>{formatRatings( Kids.rating)}</div>
                                    </button>
                                    <div className="max-sm:w-[140px] flex flex-col max-sm:mt-[-20px] gap-1 mt-[-20px]">
                                        <div className="font-[Mypoppins] font-[700] text-[#153F29] max-sm:w-[140px] sm:text-base tracking-wide">
                                            {Kids.title}
                                        </div>
              
                                        <div className="text-[#153F29B2] font-[500] max-sm:w-[140px] text-xs sm:text-sm">
                                            {Kids.year} • {formatVotes(Kids.votes)} + votes
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap max-sm:w-[140px]   gap-1 sm:gap-2 mt-1 sm:mt-2">
                                        {/* Display each genre as a separate word */}
                                        {Kids.genre.split(",").map((word, index) => (
                                            <span
                                                key={index}
                                                className=" border-[#4CAF50] border px-2 py-1 rounded  text-[10px] sm:text-xs"
                                            >
                                                {word.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    
                    </>}
              
                       
                    </div>)}
                    {/* Popup Modal */}
             {showPopup && (
                <div className="font-[Mypoppins] backdrop-blur-[2px] fixed z-10 inset-0 flex items-center justify-center bg-black/50">
                    <div className="bg-white h-[250px] max-sm:w-[320px] max-sm:h-[200px] w-[380px] gap-2 flex flex-col justify-center items-center p-6 rounded-lg shadow-lg text-center">
                        <p className="md:text-[22px] text-lg uppercase font-semibold mb-4">Login to continue</p>
                        <div className="flex justify-center gap-4">
                            <button onClick={handleOk} className="bg-green-500 h-[48px] w-[108px] cursor-pointer text-white px-4 py-2 rounded hover:bg-green-600">OK</button>
                            <button onClick={handleCancel} className="bg-red-500 h-[48px] w-[108px] cursor-pointer text-white px-4 py-2 rounded hover:bg-red-600">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
      
      </div>
  );
};

export default Kids;

