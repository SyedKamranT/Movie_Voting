// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Navbar from "./Navbar";
// import { useNavigate } from "react-router-dom";
// import { RotatingLines } from 'react-loader-spinner';

// const Movies = ({ limit, isHomepage }) => {
//     const [movies, setMovies] = useState([]);
//     const [error, setError] = useState("");
//     const [searchTerm, setSearchTerm] = useState("");
//     const [loading, setLoading] = useState(true);
//     const [showPopup, setShowPopup] = useState(false);
//     const [selectedMovieId, setSelectedMovieId] = useState(null);
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         // Check if token exists on component mount
//         const token = localStorage.getItem("token");
//         setIsAuthenticated(!!token);

//         const fetchMovies = async () => {
//             setLoading(true);
//             try {
//                 const response = await axios.get("https://movie-voting-u7oh.onrender.com/movies", {
//                     headers: {
//                         "Authorization": `Bearer ${token}`,
//                         "Content-Type": "application/json",
//                     },
//                 });
//                 setMovies(response.data);
//             } catch (err) {
//                 setError("Failed to fetch movies. Maybe your token expired.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchMovies();
//     }, []);

//     const filteredContent = movies.filter(item =>
//         item.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     const formatVotes = (votes) => {
//         if (votes >= 1000000) return (votes / 1000000).toFixed(1) + "M";
//         if (votes >= 1000) return (votes / 1000).toFixed(1) + "K";
//         return votes;
//     };

//     const formatRatings = (ratings) => {
//         let bgColor = ratings <= 5.0 ? "#FB5E2D" : ratings <= 7.0 ? "#EFE177" : "#7EE084";
//         return (
//             <div className="rating">
//                 <div className="relative top-[-50px] left-2 ratings font-bold font-[Mypoppins] backdrop-blur-md h-[39px] w-[46px] text-center flex justify-center items-center rounded-[5px]"
//                     style={{ backgroundColor: bgColor }}>
//                     {ratings}
//                 </div>
//             </div>
//         );
//     };

//     const handleMovieClick = (movieId) => {
//         const token = localStorage.getItem("token");

//         if (token) {
//             setIsAuthenticated(true);
//             navigate(`/voting/${movieId}`);
//         } else {
//             setIsAuthenticated(false);
//             setSelectedMovieId(movieId);
//             setShowPopup(true);
//         }
//     };

//     const handleOk = () => {
//         navigate("/login");
//         setShowPopup(false);
//     };

//     const handleCancel = () => {
//         setShowPopup(false);
//     };

//     return (
//         <div>
//             {/* Navbar */}
//             <Navbar limit={limit} homepage={false} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

//             {/* Loading Spinner */}
//             {loading && !isHomepage ? (
//                 <div className="flex justify-center items-center h-screen">
//                     <RotatingLines
//                         visible={true}
//                         height="96"
//                         width="80"
//                         color="grey"
//                         strokeWidth="5"
//                         animationDuration="0.75"
//                         ariaLabel="rotating-lines-loading"
//                     />
//                 </div>
//             ) : (
//                 <div className="m-2 mt-[50px] sm:mt-[50px] font-[Mypoppins]">
//                     {error && <p className="text-red-500">{error}</p>}

//                     {searchTerm ? (
//                         <div className="md:h-full h-screen">
//                             <h2 className="text-[#153f29] text-2xl mb-4 max-sm:text-[16px] uppercase sm:text-[24px] font-custom text-[24px] font-extrabold">
//                                 Search Results
//                             </h2>
//                             <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:max-xl:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-[30px]">
//                                 {filteredContent.length > 0 ? (
//                                     filteredContent.map((item) => (
//                                         <li key={item._id} className="max-sm:w-[140px]">
//                                             <button onClick={() => handleMovieClick(item._id)} className="cursor-pointer">
//                                                 <img
//                                                     className="max-sm:w-[140px] max-sm:h-[200px] w-[189px] h-[259px] object-cover rounded-lg shadow-xl"
//                                                     src={item.poster}
//                                                     alt={item.title}
//                                                 />
//                                                 <div className="mt-2 w-[189px] text-center font-semibold">
//                                                     {item.title}
//                                                 </div>
//                                                 <div className="w-[189px] text-sm text-gray-500 text-center">
//                                                     {item.year} • {item.rating} ★ Ratings
//                                                 </div>
//                                             </button>
//                                         </li>
//                                     ))
//                                 ) : (
//                                     <p className="font-[Mypoppins] font-[500]">No results found.</p>
//                                 )}
//                             </ul>
//                         </div>
//                     ) : (
//                         <>
//                             <div className="text-[#153f29] max-sm:mt-[80px] flex items-center justify-between mb-[30px]">
//                                 <div className="max-sm:text-[16px] sm:text-[24px] font-custom text-[24px] font-extrabold">
//                                     TOP RATED MOVIES
//                                 </div>
//                                 {limit && (
//                                     <button className="max-sm:text-[12px] sm:text-base font-custom cursor-pointer hover:underline"
//                                         onClick={() => navigate("/movies")}>
//                                         VIEW ALL
//                                     </button>
//                                 )}
//                             </div>
//                             <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:max-xl:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-[30px]">
//                                 {movies.slice(0, limit || movies.length).map((movie) => (
//                                     <li key={movie._id} className="self-start">
//                                         <button onClick={() => handleMovieClick(movie._id)} className="cursor-pointer">
//                                             <img
//                                                 className="max-sm:w-[169px] max-sm:h-[224px] w-[189px] h-[259px] object-cover rounded-lg shadow-xl"
//                                                 src={movie.poster}
//                                                 alt="movie poster"
//                                             />
//                                             {formatRatings(movie.rating)}
//                                         </button>
//                                         <div className="flex flex-col gap-1 mt-[-20px]">
//                                             <div className="font-[Mypoppins] font-[700] text-[#153F29] sm:text-base tracking-wide">
//                                                 {movie.title}
//                                             </div>
//                                             <div className="text-[#153F29B2] font-[500] text-xs sm:text-sm">
//                                                 {movie.year} • {formatVotes(movie.votes)}+ votes
//                                             </div>
//                                         </div>
//                                         <div className="flex flex-wrap gap-1 sm:gap-2 mt-1 sm:mt-2">
//                                             {movie.genre.split(",").map((word, index) => (
//                                                 <span key={index} className="border-[#4CAF50] border px-2 py-1 rounded text-[10px] sm:text-xs">
//                                                     {word.trim()}
//                                                 </span>
//                                             ))}
//                                         </div>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </>
//                     )}
//                 </div>
//             )}

//             {/* Popup Modal */}
//             {showPopup && (
//                 <div className="fixed font-[Mypoppins] backdrop-blur-[2px] z-10 inset-0 flex items-center justify-center bg-black/50">
//                     <div className="bg-white h-[250px] w-[380px] flex flex-col justify-center items-center p-6 rounded-lg shadow-lg text-center">
//                         <p className="text-lg uppercase font-semibold mb-4">Login to continue</p>
//                         <div className="flex justify-center gap-4">
//                             <button onClick={handleOk} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">OK</button>
//                             <button onClick={handleCancel} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Cancel</button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Movies;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from 'react-loader-spinner';

const Movies = ({ limit, isHomepage ,isAuthenticated,setIsAuthenticated }) => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [showPopup, setShowPopup] = useState(false); // Popup state
    const [selectedMovieId, setSelectedMovieId] = useState(null); // Store selected movie ID
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                const response = await axios.get("https://movie-voting-u7oh.onrender.com/movies");
                setMovies(response.data);
            } catch (err) {
                setError("Failed to fetch movies. Maybe your token expired.");
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    const filteredContent = movies.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatVotes = (votes) => {
        if (votes >= 1000000) return (votes / 1000000).toFixed(1) + "M";
        if (votes >= 1000) return (votes / 1000).toFixed(1) + "K";
        return votes;
    };

    const formatRatings = (ratings) => {
        let bgColor = ratings <= 5.0 ? "#FB5E2D" : ratings <= 7.0 ? "#EFE177" : "#7EE084";
        return (
            <div className="rating">
                <div className={`relative top-[-50px] left-2 ratings font-bold font-[Mypoppins] backdrop-blur-md h-[39px] w-[46px] text-center flex justify-center items-center rounded-[5px]`} style={{ backgroundColor: bgColor }}>
                    {ratings}
                </div>
            </div>
        );
    };

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
            {/* Navbar is always visible */}
            <Navbar limit={limit} homepage={false} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            {/* Show loading spinner */}
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
            ) : (
                <div className="m-2 mt-[50px] sm:mt-[50px] font-[Mypoppins]">
                   

                    {error && <p style={{ color: "red" }}>{error}</p>}

                    {searchTerm ? (
                        <div className="  md:h-full h-screen">
                            <h2 className="text-[#153f29]   text-2xl  mb-4 max-sm:text-[16px] uppercase  sm:text-[24px] font-custom text-[24px] font-extrabold">Search Results</h2>
                            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:max-xl:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-[30px]">
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
                                    <p className=" font-[Mypoppins] font-[500]">No results found.</p>
                                )}
                            </ul>
                        </div>

                    ) : ( 
                    <><div className=" text-[#153f29] max-sm:mt-[80px] flex items-center justify-between mb-[30px]">
                        <div className=" max-sm:text-[16px]  sm:text-[24px] font-custom text-[24px] font-extrabold">
                            TOP RATED MOVIES
                        </div>
                        {limit && (
                            <button
                                className=" max-sm:text-[12px] sm:text-base  font-custom cursor-pointer hover:underline"
                                onClick={() => navigate("/movies")}
                            >
                                VIEW ALL
                            </button>
                        )}
                    </div>
                        <ul className="max-sm:gap-[10px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:max-xl:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-[30px]">
                            {movies.slice(0, limit || movies.length).map((movie, i) => (
                                <li key={i} className="self-start">
                                    <button onClick={() => handleMovieClick(movie._id)} className="cursor-pointer" 
                                   
                                        
                                        >
                                        <img
                                            className="max-sm:w-[169px] max-sm:h-[224px] max-sm:object-cover w-[189px] h-[259px]  object-cover   rounded-lg shadow-xl  "
                                            src={movie.poster}
                                            alt="movie poster"
                                        />
                                        {formatRatings(movie.rating)}
                                    </button>
                                   
                                    <div className="max-sm:w-[140px] flex flex-col gap-1 max-sm:mt-[-20px]  mt-[-20px]">
                                        <div className="font-[Mypoppins] font-[700] text-[#153F29] max-sm:w-[140px] sm:text-base tracking-wide">
                                            {movie.title}
                                        </div>
                                        <div className="text-[#153F29B2] max-sm:w-[140px] font-[500] text-xs sm:text-sm">
                                            {movie.year} • {formatVotes(movie.votes)}+ votes
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap  max-sm:w-[140px] gap-1 sm:gap-2 mt-1 sm:mt-2">
                                        {movie.genre.split(",").map((word, index) => (
                                            <span key={index} className="border-[#4CAF50] border px-2 py-1 rounded  text-[10px] sm:text-xs">
                                                {word.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </li>
                            ))}
                        </ul>
                        </>
                    )}
                </div>
            )}

             {/* Popup Modal */}
             {showPopup && (
                <div className="fixed font-[Mypoppins] backdrop-blur-[2px] z-10 inset-0 flex items-center justify-center bg-black/50">
                    <div className="bg-white h-[250px] max-sm:w-[320px] max-sm:h-[200px] w-[380px] gap-2 flex flex-col justify-center items-center p-6 rounded-lg shadow-lg text-center">
                        <p className="md:text-[22px] text-lg uppercase  font-semibold mb-4">Login to continue</p>
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

export default Movies;