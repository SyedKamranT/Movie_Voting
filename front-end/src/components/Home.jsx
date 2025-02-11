import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Coursel from './Coursel';
import Movies from './Movies';
import Series from './Series';
import Kids from './Kids';
import Footer from './Footer';
import { RotatingLines } from 'react-loader-spinner'; // Import your loader
import { useNavigate } from 'react-router-dom';


const Home = ({isAuthenticated,setIsAuthenticated}) => {
  const [contentAll, setcontentAll] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
 
  const [error, setError] = useState("");
  const [isHomepage, setisHomepage] = useState(false)
  const [loading, setLoading] = useState(true); // Loader state
  const navigate = useNavigate(); 


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Show loader when fetching starts
      try {
        const moviesRes = await axios.get("https://movie-voting-u7oh.onrender.com/movies");
        const seriesRes = await axios.get("https://movie-voting-u7oh.onrender.com/series");
        const kidsRes = await axios.get("https://movie-voting-u7oh.onrender.com/kids");

        // Merge all content into one array with category labels
        const combinedData = [
          ...moviesRes.data.map(item => ({ ...item, category: "Movie" })),
          ...seriesRes.data.map(item => ({ ...item, category: "Series" })),
          ...kidsRes.data.map(item => ({ ...item, category: "Kids" }))
        ];

        setcontentAll(combinedData);
      } catch (err) {
        setError("Failed to fetch content. Maybe your token expired.");
      } finally {
        setLoading(false); // Hide loader after fetching completes
      }
    };

    fetchData();
  }, []);

  // Filter content based on the search term
  const filteredContent = contentAll.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className=''>
      {/* Navbar with search functionality */}
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Carousel remains unchanged */}
      <Coursel />

      {/* Show loader when fetching data */}
      {loading ? (
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
      ) : searchTerm ? (
        // Show filtered search results if there is a search term
        <div className="m-2 md:my-[50px] max-sm:mt-[80px] h-full ">
          <h2 className="text-[#153f29] text-2xl  mb-4 max-sm:text-[16px] uppercase  sm:text-[24px] font-custom text-[24px] font-extrabold">Search Results</h2>
          <ul className="max-sm:gap-[20px]  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:max-xl:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-[30px]">
            {filteredContent.length > 0 ? (
              filteredContent.map((item, index) => (
                <li key={index} className="max-sm:w-[140px] ">
                  <button onClick={()=>{
                                                navigate(`voting/${item._id}`)
                                            }} className=' cursor-pointer'>
                    <img
                      className="max-sm:w-[140px] max-sm:object-cover w-[189px] h-[259px]  object-cover   rounded-lg shadow-xl"
                      src={item.poster}
                      alt={item.title}
                    />
                    <div className="mt-2 max-sm:w-[140px]  w-[189px] text-center font-semibold">
                      {item.title} ({item.category})
                    </div>
                    <div className=" max-sm:w-[140px]  w-[189px]  text-sm text-gray-500 text-center">
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
      ) : (
        <>
          {/* Default Sections if No Search */}
          <Movies limit={6} isHomepage = {true}   />
          <Series limit={6}  isHomepage = {true} />
          <Kids limit={6}  isHomepage = {true} />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Home;
