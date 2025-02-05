import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { Carousel } from "react-responsive-carousel";
import image from "../assets/corosal.png"

const Coursel = () => {
  return (
    <div className=" m-2 rounded-2xl ">
    <Carousel className="" autoPlay={true}   
    infiniteLoop={true}
    interval={3000}    
    showThumbs={false} 
    showStatus={false} >
      <div>
        <img className="h-[401px] rounded-xl  object-cover object-top" src={image} alt="Top Movies" />
        <p className="legend">Top Movies</p>
      </div>
      <div>
        <img className="h-[401px] rounded-xl object-cover object-top" src={image} alt="Top Series" />
        <p className="legend">Top Series</p>
      </div>
      <div>
        <img className="h-[401px] rounded-xl object-cover object-top" src={image} alt="Top Kid Shows" />
        <p className="legend">top Kid Shows</p>
      </div>
    </Carousel> 
      </div>
  
  );
};

export default Coursel;
