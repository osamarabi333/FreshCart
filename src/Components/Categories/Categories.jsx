import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { Link } from "react-router-dom";
import useScrollToTop from "../../hooks/useScrollToTop";

export default function Categories() {
  // State to store the list of categories fetched from the API
  const [Categories, setCategories] = useState([]);

  // hook  to make the pages when reload or refresh to back to top of page
  useScrollToTop();

  // Function to fetch categories from the API
  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`) // API call to fetch categories
      .then((res) => {
        setCategories(res.data.data); // Update state with fetched categories
      })
      .catch((error) => {
        console.error("Error fetching categories:", error); // Handle error and log to console
      });
  }

  // Fetch categories when the component mounts
  useEffect(() => {
    getCategories();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <>
      {/* Render categories if available, otherwise show a loading spinner */}
      {Categories.length > 0 ? (
        <div className=" container mx-auto ">
          {/* Section title */}
          <h2 className="text-2xl uppercase font-extrabold pt-3 shadow-emerald-500 text-center py-4 my-5 w-5/6 md:w-1/3 mx-auto rounded-xl shadow-md dark:shadow-emerald-500 bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-emerald-700 dark:from-emerald-300 dark:to-emerald-500 ">
            Shop Popular Categories
          </h2>

          <div className="row  ">
            {/* Map over the list of categories to create individual category items */}
            {Categories.map((category) => (
              <div
                key={category._id}
                className=" w-11/12 mx-auto md:w-1/3 py-4 md:px-4"
              >
                <div className="category">
                  <div
                    key={category._id}
                    className="text-center hover:shadow-xl hover:shadow-emerald-500 transition-shadow duration-500  rounded-full py-8   "
                  >
                    <Link to={`/categoryProducts/${category.name}`}>
                      {/* Category image */}
                      <div className="bg-emerald-300 flex items-center justify-center mx-8 rounded-full hover:shadow-xl shadow-xl  mt-1">
                        <img
                          src={category.image}
                          className="w-3/5 h-80  object-cover rounded-3xl"
                          alt={category.name} // Alt text for accessibility
                        />
                      </div>
                      {/* Category name */}
                      <p className="font-semibold text-lg text-emerald-900 dark:text-white">
                        {category.name}
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <LoadingSpinner /> // Show loading spinner if categories haven't loaded yet
      )}
    </>
  );
}
