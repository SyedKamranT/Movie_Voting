import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Coursel from './Coursel';
import Movies from './Movies';
import Series from './Series';
import Kids from './Kids';
import Footer from './Footer';
import { RotatingLines } from 'react-loader-spinner'; // Import your loader

const Home = () => {
  const [contentAll, setcontentAll] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
 
  const [error, setError] = useState("");
  const [isHomepage, setisHomepage] = useState(false)
  const [loading, setLoading] = useState(true); // Loader state

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
        <div className="m-4 ">
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
      ) : (
        <>
          {/* Default Sections if No Search */}
          <Movies limit={6} isHomepage = {true}  />
          <Series limit={6}  isHomepage = {true} />
          <Kids limit={6}  isHomepage = {true} />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Home;
