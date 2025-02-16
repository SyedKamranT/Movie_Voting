import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Coursel from './Coursel';
import Movies from './Movies';
import Series from './Series';
import Kids from './Kids';
import Footer from './Footer';
import { RotatingLines } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../AuthContext";

const Home = () => {
  const { isAuthenticated } = useAuth()
  const [contentAll, setContentAll] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [moviesRes, seriesRes, kidsRes] = await Promise.all([
          axios.get("https://movie-voting-u7oh.onrender.com/movies"),
          axios.get("https://movie-voting-u7oh.onrender.com/series"),
          axios.get("https://movie-voting-u7oh.onrender.com/kids")
        ]);

        const combinedData = [
          ...moviesRes.data.map(item => ({ ...item, category: "Movie" })),
          ...seriesRes.data.map(item => ({ ...item, category: "Series" })),
          ...kidsRes.data.map(item => ({ ...item, category: "Kids" }))
        ];

        setContentAll(combinedData);
      } catch (err) {
        setError("Failed to fetch content. Maybe your token expired.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredContent = contentAll.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Coursel />

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <RotatingLines visible={true} height="96" width="80" color="grey" />
        </div>
      ) : searchTerm ? (
        <div className="h-full m-2 md:my-[50px] max-sm:mt-[80px]">
          <h2 className="text-[#153f29] text-2xl mb-4 uppercase font-extrabold">Search Results</h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredContent.length > 0 ? (
              filteredContent.map((item, index) => (
                <li key={index} className="max-sm:w-[140px]">
                <button onClick={() => handleMovieClick(item._id)} className=' cursor-pointer'>
                  <img
                    className="max-sm:w-[140px] max-sm:h-[200px] max-sm:object-cover w-[189px] h-[259px]  object-cover   rounded-lg shadow-xl"
                    src={item.poster}
                    alt={item.title}
                  />
                  <div className="max-sm:w-[140px] mt-2   w-[189px] text-center font-semibold">
                    {item.title} ({item.category})
                  </div>
                  <div className=" max-sm:w-[140px]  w-[189px]  text-sm text-gray-500 text-center">
                    {item.year} • {item.rating} ★ Ratings
                  </div>
                </button>
              </li>
              ))
            ) : (
              <p className=' font-[Mypoppins] font-bold'>No results found.</p>
            )}
          </ul>
        </div>
      ) : (
        <>
          <Movies limit={6} isHomepage={true} isAuthenticated={isAuthenticated} />
          <Series limit={6} isHomepage={true} isAuthenticated={isAuthenticated} />
          <Kids limit={6} isHomepage={true} isAuthenticated={isAuthenticated} />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Home;
