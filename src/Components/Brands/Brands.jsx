import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { Link } from "react-router-dom";
import useScrollToTop from "../../hooks/useScrollToTop";

export default function Brands() {
  // State to store the list of categories fetched from the API
  const [Brands, setBrands] = useState([]);

    // hook  to make the pages when reload or refresh to back to top of page
    useScrollToTop();

  // Function to fetch categories from the API
  function getBrands() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands`) // API call to fetch categories
      .then((res) => {
        setBrands(res.data.data); // Update state with fetched categories
      })
      .catch((error) => {
        console.error("Error fetching Brands:", error); // Handle error and log to console
      });
  }

  // Fetch categories when the component mounts
  useEffect(() => {
    getBrands();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <>
      {/* Render categories if available, otherwise show a loading spinner */}
      {Brands.length > 0 ? (
        <div className="container mx-auto">
          {/* Section title */}
          <h2 className="text-2xl uppercase font-extrabold pt-3 shadow-emerald-500 text-center py-4 my-5 w-5/6 md:w-1/3 mx-auto rounded-xl shadow-md dark:shadow-emerald-500 bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-emerald-700 dark:from-emerald-300 dark:to-emerald-500 ">
            Shop Popular Brands
          </h2>

          <div className="row ">
            {/* Map over the list of Brands to create individual brand items */}
            {Brands.map((brand) => (
              <div key={brand._id} className="  md:w-1/3">
                <div className="category mx-7 ml-11 my-5">
                  <div className="text-center  rounded-xl bg-transparent py-8 bg-gray-50  ">
                    <Link to={`/brandsProducts/${brand.name}`}>
                      {/* brand image */}
                      <div className=" flex items-center justify-center mx-8  mt-1">
                        <img
                          src={brand.image}
                          className="w-full rounded-3xl hover:w-[97%] transition-all  shadow-lg  shadow-emerald-500 hover:shadow-xl hover:shadow-emerald-600  duration-800   object-cover "
                          alt={brand.name} // Alt text for accessibility
                        />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <LoadingSpinner /> // Show loading spinner if Brands haven't loaded yet
      )}
    </>
  );
}
