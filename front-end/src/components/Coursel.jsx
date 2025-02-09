import React, { useState, useEffect } from "react";
import corosal1 from "../assets/corosal.png";
import corosal2 from "../assets/corosal.png";
import corosal3 from "../assets/corosal.png";

const Carousel = () => {


  const slides = [
    { id: 1, image: corosal1, alt: "Slide 1" },
    { id: 2, image: corosal2, alt: "Slide 2" },
    { id: 3, image: corosal3, alt: "Slide 3" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  return (
    <div className="relative w-full pl-2.5 max-sm:max-h-[200px] pr-2.5 max-lg:w-full mx-auto">
      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-lg">
        {/* Slides */}
        <div
          className="flex max-sm:min-h-[200px] transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="flex-shrink-0 w-full relative"
              style={{ flexBasis: "100%" }}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover"
              />
              {/* Overlay Box */}
              <div className="max-lg:hidden lg:max-xl:p-[16px] lg:max-xl:bottom-[30px] lg:max-xl:left-[30px] absolute p-[20px] text-[24px] tracking-[1px] flex flex-row justify-around items-center bottom-[50px] left-[50px] w-[455px] h-[120px] backdrop-blur-2xl bg-white/20 rounded-[12px] xl:w-[600px] xl:h-[140px]">

                <div className=" lg:max-xl:text-[24px] lg:max-xl:[30px] font-custom leading-[29px] text-white lg:text-[28px] lg:leading-[35px]">
                  TOP RATED <div>MOVIES OF 2025</div>
                </div>

                <div className="ratings bg-[#7EE084] font-bold backdrop-blur-md text-center flex justify-center items-center rounded-[5px] h-[39px] w-[46px] lg:h-[50px] lg:w-[60px]">

                  <div className="rating text-[24px] lg:text-[28px]">4.5</div>
                </div>

              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Previous Button */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-5 z-10 transform -translate-y-1/2 backdrop-blur-xl bg-[#153F29]/70 hover:bg-black/50 text-white px-2 py-2 rounded-full"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32px" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path></svg>
      </button>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-5 z-10 transform -translate-y-1/2 backdrop-blur-xl bg-[#153F29]/70 hover:bg-black/50 text-white px-2 py-2 rounded-full"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32px" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${index === currentIndex
              ? "bg-blue-500"
              : "bg-gray-300 hover:bg-gray-400"
              }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
