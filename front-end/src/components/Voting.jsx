import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import casteImg from '../images/castimg.png'
import { FaPlay, FaStar, FaShareAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Voting = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [contentAll, setcontentAll] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moviesRes = await axios.get("http://127.0.0.1:8889/movies");
        const seriesRes = await axios.get("http://127.0.0.1:8889/series");
        const kidsRes = await axios.get("http://127.0.0.1:8889/kids");

        const combinedData = [
          ...moviesRes.data.map(item => ({ ...item, category: "Movie" })),
          ...seriesRes.data.map(item => ({ ...item, category: "Series" })),
          ...kidsRes.data.map(item => ({ ...item, category: "Kids" }))
        ];

        setcontentAll(combinedData);
      } catch (err) {
        setError("Failed to fetch content. Maybe your token expired.");
      }
    };

    fetchData();
  }, []);



  const mainItem = contentAll.filter((item) => item._id === params.id);
  const suggestions = (currentItem) => {
    return contentAll.filter((i) => i.category === currentItem.category && i._id !== currentItem._id);
  };

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

  const handleTrailer = (item) => {
    console.log(item.trailer)
   
    
            return(
              <div className=' w-full'>
                <video src={item.trailer} controls></video>
              </div>
            )
  }


  return (
    <div>
      <div className='mx-[120px] mt-[20px] max-md:m-2 font-[Mypoppins]'>
        {mainItem.length === 0 ? (
          <p className="text-center text-gray-500">Loading or No Data Found...</p>
        ) : (
          mainItem.map((item) => {
            console.log("Item Data:", item); // Debugging log
            const rating = item.rating ?? 0; // Default to 0 if undefined
            const starRating = Math.round(rating / 2); // Convert 10-scale to 5-star

            return (
              <div key={item._id}>
                <div className='flex max-md:flex-wrap gap-[20px]'>
                  {/* Left part */}
                  <div className=' flex flex-col gap-[20px] bg- max-sm:w-full  max-md:w-full'>
                    <img className='  w-[350px] h-[434px] rounded-[9px] object-cover max-sm:self-center' src={item.poster} alt={item.title} />
                    {/* ⭐ Rating Display */}
                    <div className=' min-sm:w-full flex justify-between items-center bg-[#153F29] text-white p-[20px] rounded-[9px] min-lg:w-[285px] h-[106px]'>
                      {/* left rating */}
                      <div className='flex flex-col gap-2 items-start'>
                        <p className='min-sm:text-[16px] text-[14px] text-white/70 font-[600]'>Ratings</p>
                        <div className=' min-sm:gap-2.5 flex items-center gap-1'>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                              key={star}
                              className={`text-[24px] ${star <= starRating ? 'text-[#81E687]' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className='min-sm:text-[14px] text-[12px] font-[500] text-white/70 '>{item.votes}+ Votes</span>
                      </div>
                      {/* Right rating */}
                      <div className=" top-[-50px] left-2 ratings bg-[#7EE084] font-bold font-[Mypoppins] backdrop-blur-md h-[39px] w-[46px] text-center flex justify-center items-center rounded-[5px]">
                        {item.rating}
                      </div>
                    </div>
                  </div>
                  {/* Right Part */}
                  <div className=' flex flex-col gap-[20px] max-md:w-full'>
                    <div className='max-sm:h-full max-sm:p-[20px] flex flex-col p-[30px] h-[434px] justify-between items-stretch bg-white rounded-[9px]  w-full'>
                      <div>
                        <div className='max-sm:gap-1.5 flex flex-col gap-2'>
                          <div className='flex justify-between items-center'>
                            <div className='max-sm:text-3xl max-sm:leading-[36px] text-[48px] font-[600] leading-[72px]'>{item.title}</div>
                            <button className='cursor-pointer'><FaShareAlt className='max-sm:text-2xl text-3xl' /></button>
                          </div>
                          <div className='max-sm:text-[16px]  text-[#153F29B2] text-[20px]'>{item.year} . Directed By {item.director}</div>
                        </div>

                        {/* Genre */}
                        <div className='max-sm:mt-[18px] max-sm:text-[12px] flex mt-[24px] gap-[7px] text-[14px] font-[600]'>
                          {item.genre?.split(",").map((word, index) => (
                            <span key={index} className="border-[#4CAF50] border-1 px-[9px] py-[6px] rounded">
                              {word.trim()}
                            </span>
                          ))}
                        </div>

                        {/* Storyline */}
                        <div>
                          <p className= '  max-sm:text-[14px] max-sm:mt-[18px]  text-[#153F29B2] mt-[24px] text-[16px] font-[700] tracking-[1.5px]'>Storyline</p>
                          <div className=' max-sm:text-[15px] max-sm:w-full  text-[17px] font-[400] leading-[20px] mt-[10px] w-2/3 text-justify'>{item.storyline}</div>
                        </div>

                        {/* Line */}
                        <div className='max-sm:w-full h-[1px] w-2/3 flex justify-center bg-[#153F29]/50 my-[18px]'></div>



                        {/* Vote and Play Buttons */}
                        <div className='flex justify-start items-center gap-2 mt-4'>
                          <button className='max-sm:px-[18px] max-sm:py-[10px] max-sm:text-[12px] flex justify-center items-center gap-2 bg-[#81E687] text-[#153F29] px-[22px] py-[13px] rounded-[9px] text-[14px] font-[700] tracking-[2px] max-sm:tracking-[1px] cursor-pointer'>
                            <FaStar /> VOTE MOVIE
                          </button>
                          <button onClick={() => handleTrailer(item)} className=' max-sm:px-[18px] max-sm:py-[10px] max-sm:text-[12px] flex justify-center items-center gap-2 border-2 border-[#153F29] text-[#153F29] px-[22px] py-[13px] rounded-[9px] text-[14px] font-[700] tracking-[2px] max-sm:tracking-[1px] cursor-pointer'>
                            <FaPlay /> VIEW TRAILER
                          </button>
                        </div>
                      </div>


                    </div>
                    {/* Cast */}
                    <div className=' bg-white max-sm:p-5  w-full p-7.5 rounded-[9px]'>
                      {/* heading */}
                      <p className=' max-sm:text-[14px] text-[#153F29B2]  text-[16px] font-[700] tracking-[1.5px]'>Cast</p>
                      {/* Cast List */}
                      <div className=' max-sm:grid-cols-2 max-sm:gap-[20px] mt-[30px] gap-[30px] grid grid-cols-3'>
                        {item.cast.map((castitem, index) => {
                          return (

                            <div key={index} className='flex max-sm:gap-2 gap-3'>
                              <div><img className='w-[50px] rounded-[5px] ' src={casteImg} alt="" /></div>
                              <div>
                                <div className=' text-[#153F29] max-sm:text-[14px] max-sm:leading-[18px]  text-[16px] font-[500] leading-[24px]'>{castitem}</div>
                                <div className='text-[#153F29]/50  max-sm:text-[12px] text-[14px] font-[500] tracking-[1px]'>Actor</div>
                              </div>

                            </div>
                          )
                        })}

                      </div>

                    </div>
                    {/* reviews */}
                    <div className=' bg-white  w-full  p-7.5 rounded-[9px]'>
                      <p className='text-[#153F29B2] max-sm:text-[14px] text-[16px] font-[700] tracking-[1.5px]'>Popular Reviews ({item.reviews.length})</p>
                      <div className=' mt-[30px] max-sm:gap-[20px] flex flex-col gap-[30px]' >
                        {item.reviews.map((reviewitem, index) => {

                          return (
                            <div key={index} className=' flex gap-3'>

                              <div><img className='w-[50px] rounded-[5px] ' src={casteImg} alt="" /></div>
                              <div>
                                <div className='text-[16px] text-[#153F29]  font-[600] max-sm:leading-[18px] leading-[24px]'>{reviewitem.user}</div>
                                <p className=' text-[14px] text-[#153F29] font-[400] max-sm:leading-[18px] leading-[24px]'>{reviewitem.comment}</p>
                              </div>
                            </div>
                          )
                        })}
                      </div>


                    </div>


                  </div>
                </div>
                {/* Suggestions */}
                <div className='max-sm:mt-[30px] mt-[50px]' >
                  <div className="flex justify-between text-[#153F29] max-sm:mb-[20px] mb-[30px]">
                    <div className="font-custom max-sm:text-[18px] text-[24px]  font-extrabold">
                      TOP RATED {item.category}s
                    </div>

                    <button
                      className="font-custom max-sm:text-[15px] cursor-pointer hover:underline"
                      onClick={() => navigate("/movies")}
                    >
                      VIEW ALL
                    </button>

                  </div>
                  <ul className=" min-sm:justify-start min-sm:gap-[55px] min-lg:gap-[30px] max-sm:items-center max-sm:justify-center max-sm:gap-[10px] flex items-center  min-lg:justify-between  flex-wrap">
                    {suggestions(item).slice(0, 5).map((suggest, i) => (
                      <li key={i} className="self-start">
                        <button className=" cursor-pointer"
                          onClick={() => {
                            navigate(`/voting/${suggest._id}`)
                          }}>
                          <img
                            className="w-[189px] h-[259px] rounded-lg shadow-3xl object-cover"
                            src={suggest.poster}
                            alt="movie poster"
                          />

                          <div className="rating">
                            <div>{formatRatings(suggest.rating)}</div>
                          </div>

                        </button>
                        <div className="flex flex-col gap-2 max-sm:gap-1 max-sm:mt-[-20px] mt-[-10px]">
                          <div className="font-[Mypoppins] max-sm:text-md font-[700] text-[#153F29] w-[189px] tracking-[1.5px]">
                            {suggest.title}
                          </div>
                          <div className="text-[#153F29B2] font-[500]">
                            {suggest.year} • {formatVotes(suggest.votes)}+ votes
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 w-[189px] mt-2">
                          {suggest.genre.split(",").map((word, index) => (
                            <span
                              key={index}
                              className="border-[#4CAF50] border-1 px-2 py-1 rounded text-xs"
                            >
                              {word.trim()}
                            </span>
                          ))}
                        </div>
                      </li>
                    ))}
                  </ul>

                </div>
              </div>



            )
          })
        )}
      </div>
    </div>
  )
}

export default Voting;
