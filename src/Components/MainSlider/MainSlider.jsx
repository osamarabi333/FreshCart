// Import necessary libraries and assets
import React from "react"; // Import React for creating components
import slider1 from "../../assets/images/slider-image-1.jpeg"; // Import slider images
import slider2 from "../../assets/images/slider-image-2.jpeg";
import slider3 from "../../assets/images/slider-image-3.jpeg";
import slider4 from "../../assets/images/grocery-banner.png";
import slider5 from "../../assets/images/grocery-banner-2.jpeg";
import Slider from "react-slick"; // Import the Slider component from react-slick for creating carousels

// Functional component to render the main slider
export default function MainSlider() {
  // Configuration settings for the Slider component
  const settings = {
    dots: false, // Enable navigation dots below the slider
    infinite: true, // Enable infinite looping of slides
    speed: 500, // Transition speed in milliseconds
    slidesToShow: 1, // Show one slide at a time
    slidesToScroll: 1, // Scroll one slide at a time
    autoplay: true, // Enable automatic slide transition
    autoplaySpeed: 1500, // Duration in milliseconds for each slide to be displayed
    pauseOnHover: false, // Disable pausing the slider on hover
    arrows: false, // Disable navigation arrows
  };

  // Render the component's UI
  return (
    <>
      <div className="row  w-11/12 mx-auto md:w-full py-5">
        {/* Main slider occupying 3/4 of the width */}
        <div className="w-full md:w-3/4 ">
          <Slider {...settings}>
            {/* Display each image in the slider with full width and specified height */}
            <img
              src={slider3}
              className="w-5/6 md:w-full md:object-cover  object-fill  h-[400px]"
              alt="slider3"
            />
            <img
              src={slider4}
              className="w-5/6 md:w-full md:object-cover  object-fill h-[400px]"
              alt="slider4"
            />
            <img
              src={slider5}
              className="w-5/6 md:w-full md:object-cover  object-fill h-[400px]"
              alt="slider5"
            />
          </Slider>
        </div>

        {/* Side images occupying 1/4 of the width */}
        <div className="w-full md:w-1/4 flex md:flex-col">
          <img src={slider2} className="w-1/2  md:w-full h-[200px]" alt="" /> {/* First side image */}
          <img src={slider3} className="w-1/2 md:w-full h-[200px]" alt="" /> {/* Second side image */}
        </div>
      </div>
    </>
  );
}
