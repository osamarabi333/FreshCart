// Import necessary libraries and components
import axios from "axios"; // Used for making HTTP requests
import React, { useEffect, useState } from "react"; // React hooks for managing component state and lifecycle
import { Link } from "react-router-dom"; // Link component for navigation
import Slider from "react-slick"; // Slider component for creating a carousel
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"; // Custom loading spinner component

// Functional component for displaying a category slider
export default function CategorySlider() {
  // State to store the list of categories fetched from the API
  const [Categories, setCategories] = useState([]);

  // Configuration settings for the Slider component
  const settings = {
    dots: false, // Disable navigation dots
    infinite: true, // Enable infinite looping of slides
    speed: 500, // Transition speed in milliseconds
    slidesToShow: 5, // Number of slides to show at once
    slidesToScroll: 2, // Number of slides to scroll on each transition
    autoplay: true, // Enable automatic slide transition
    autoplaySpeed: 3000, // Duration in milliseconds for each slide to be displayed
    pauseOnHover: false, // Disable pausing the slider on hover
    arrows: true, // Enable navigation arrows
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
          arrows: false, // Enable navigation arrows
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false, // Enable navigation arrows
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false, // Enable navigation arrows
        },
      },
    ],
  };

  // Function to fetch categories from the API
  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`) // API call to fetch categories
      .then((res) => {
        setCategories(res.data.data); // Update state with fetched categories
      })
      .catch((res) => {}); // Handle error silently (no action taken here)
  }

  // useEffect hook to fetch categories when the component mounts
  useEffect(() => {
    getCategories(); // Fetch categories when the component is first rendered
  }, []); // Empty dependency array means this runs only once

  // Render the component's UI
  return (
    <>
      {/* Conditional rendering: Show the slider if categories are loaded, otherwise show a loading spinner */}
      {Categories.length > 0 ? (
        <div className="container mx-auto lg:w-full  w-11/12 ">
          {/* Section title */}
          <h2 className="text-xl  py-4 font-semibold   bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-emerald-700 dark:from-emerald-300 dark:to-emerald-500">
            Shop Popular Categories
          </h2>

          <Slider {...settings}>
            {/* Map over the list of categories to create individual slide items */}
            {Categories.map((category) => (
              <div key={category._id} className="text-center pb-7 ">
                <Link to={`/categoryProducts/${category.name}`}>
                  {/* // Category image */}
                  <div className="bg-emerald-300 flex items-center justify-center mx-2 rounded-full shadow-xl  mt-1">
                    <img
                      src={category.image}
                      className="w-4/5 h-52 object-cover rounded-3xl"
                      alt={category.name} // Alt text for accessibility
                    />
                  </div>
                  {/* Category name */}
                  <p className="font-semibold text-emerald-900 dark:text-white">
                    {category.name}
                  </p>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <LoadingSpinner /> // Show loading spinner if categories haven't loaded yet
      )}
    </>
  );
}
