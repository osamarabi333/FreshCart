import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";
import { WishListContext } from "../../Context/WishListContext";

export default function ProductDetails() {
  // Slider settings for the main product slider
  const settingsProductSlider = {
    dots: true, // Show navigation dots
    infinite: true, // Enable infinite scrolling
    speed: 500, // Transition speed in milliseconds
    slidesToShow: 1, // Number of slides to show at a time
    slidesToScroll: 1, // Number of slides to scroll per swipe
    autoplay: true, // Enable automatic sliding
    autoplaySpeed: 2000, // Time between slides in milliseconds
    pauseOnHover: false, // Do not pause autoplay when hovered
    arrows: false, // Hide navigation arrows
  };

  // Slider settings for the related products slider
  const settingsRelatedProductsSlider = {
    dots: true, // Show navigation dots
    infinite: false, // Disable infinite scrolling
    speed: 500, // Transition speed in milliseconds
    slidesToShow: 6, // Number of slides to show at a time
    slidesToScroll: 6, // Number of slides to scroll per swipe
    autoplay: false, // Disable automatic sliding
    arrows: true, // Show navigation arrows
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          infinite: true, // Disable infinite scrolling

          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
          autoplay: true, // Disable automatic sliding
          arrows: false, // Enable navigation arrows
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          autoplay: true, // Disable automatic sliding
          infinite: true, // Disable infinite scrolling
          arrows: false, // Enable navigation arrows
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          autoplay: true, // Disable automatic sliding
          infinite: true, // Disable infinite scrolling
          arrows: false, // Enable navigation arrows
        },
      },
    ],
  };

  // Get the product ID and category name from the URL parameters
  let { id, categoryName } = useParams();
  // Get the addProductToCart function from the CartContext
  let { addProductToCart } = useContext(CartContext);
  // Accessing the addProductToWishList function from the WishListContext to add products to the wishlist.
  let { addProductToWishList } = useContext(WishListContext);

  // State to hold the product details
  const [Product, setProduct] = useState(null);
  // State to hold the related products
  const [RelatedProducts, setRelatedProducts] = useState([]);
  // State to manage loading status
  const [loading, setLoading] = useState(true);
  // State to track loading for a specific product ID when adding to cart
  const [loadingProductId, setLoadingProductId] = useState(null);

  // State to manage the status of whether a product is in the wish list
  const [wishListStatus, setwishListStatus] = useState({});

  // Function to fetch product details based on the product ID
  function getProductDetails() {
    setLoading(true); // Set loading to true while fetching data
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`) // Fetch product details by ID
      .then((res) => {
        setProduct(res.data.data); // Set the product details in state
        setLoading(false); // Set loading to false after data is fetched
        window.scrollTo(0, 0); // Scroll to the top of the page
      })
      .catch((error) => {
        console.error("Error fetching product details:", error); // Log any errors
        setLoading(false); // Set loading to false if an error occurs
      });
  }

  // Function to fetch related products based on the category name
  function getRelatedProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`) // Fetch all products
      .then((res) => {
        let RelatedProducts = res.data.data.filter(
          (Product) => Product.category.name === categoryName // Filter products by category name
        );
        setRelatedProducts(RelatedProducts); // Set the filtered products in state
      })
      .catch((error) => {
        console.error("Error fetching related products:", error); // Log any errors
      });
  }

  // Function to handle adding a product to the cart
  const handleAddToCart = async (productId) => {
    setLoadingProductId(productId); // Set loading state for the specific product being added
    try {
      await addProductToCart(productId); // Attempt to add the product to the cart
    } catch (error) {
      console.error("Error adding product to cart:", error); // Log any errors
    } finally {
      setLoadingProductId(null); // Reset loading state after the operation
    }
  };

  // useEffect hook to fetch product details and related products when the component mounts or when the product ID or category name changes
  useEffect(() => {
    getProductDetails(); // Fetch product details
    getRelatedProducts(); // Fetch related products
  }, [id, categoryName]); // Re-run the effect when the product ID or category name changes

  return (
    <>
      {/* Display a loading spinner if data is being fetched */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="container mx-auto">
          <div className=" py-12 relative flex md:flex-row flex-col">
            {/* Product image container */}
            <div className="w-10/12 mx-auto md:w-1/4 shadow-lg shadow-slate-500 dark:shadow-lg dark:shadow-emerald-500">
              {/* Check if the product has multiple images */}
              {Product?.images.length > 1 ? (
                // Display a slider if there are multiple images
                <Slider {...settingsProductSlider}>
                  {Product?.images.map((src) => (
                    <img src={src} className="w-10/12" alt="" key={src} />
                  ))}
                </Slider>
              ) : (
                // Display a single image if there is only one image
                <img src={Product.imageCover} className=" w-10/12" alt="" />
              )}
            </div>
            {/* product details and add to cart and add to wishlist button */}
            <div className="pt-10 md:pt-0 md:py-0 mx-4 md:mx-0 md:w-3/4 flex flex-col pl-8 justify-center mr-11 md:mr-0">
              {/* Product description */}
              <h2 className="font-semibold text-xl pb-5 md:pb-2 text-slate-900 dark:text-slate-300">
                {Product.description}
              </h2>
              {/* Product title */}
              <h3 className="text-gray-500 dark:text-gray-400 pb-2 font-semibold">
                {Product.title}
              </h3>
              {/* Product category */}
              <p className="text-emerald-700 pb-2">{Product?.category.name}</p>
              {/* Product price and ratings */}
              <div className="flex items-center justify-between pb-9">
                <p className="dark:text-white">{Product?.price} EGP</p>
                <div className="flex items-center gap-1">
                  <i className="fa-solid fa-star text-[#FFD43B]"></i>
                  <p className="dark:text-white">{Product?.ratingsAverage}</p>
                </div>
              </div>
              {/* Add to wishlist button */}
              <div>
                <button onClick={() => addProductToWishList(Product.id)}>
                  <i className="fa-regular fa-heart   absolute  top-10 md:top-3 right-8 text-emerald-800 bg-emerald-100 rounded-2xl py-2 px-2 shadow-xl   transition-transform duration-300 hover:font-bold text-2xl md:text-lg "></i>
                </button>
              </div>
              {/* Add to Cart button */}
              <div className="text-center font-semibold">
                <button
                  onClick={() => handleAddToCart(Product.id)}
                  className="bg-emerald-500 hover:bg-emerald-400 py-2 w-full mb-2 rounded-lg text-white"
                  disabled={loadingProductId === Product.id} // Disable button if loading
                >
                  {loadingProductId === Product.id ? (
                    <>
                      {/* Show spinner and loading text when loading */}
                      <svg
                        aria-hidden="true"
                        role="status"
                        className="inline w-4 h-4 mr-3 text-white animate-spin"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9765 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9765 100 50.5908ZM9.08124 50.5908C9.08124 73.2556 27.3353 91.5097 50 91.5097C72.6647 91.5097 90.9188 73.2556 90.9188 50.5908C90.9188 27.926 72.6647 9.67192 50 9.67192C27.3353 9.67192 9.08124 27.926 9.08124 50.5908Z"
                          fill="#E5E7EB"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5538C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7232 75.2124 7.41289C69.5422 4.10256 63.2754 1.94025 56.7688 1.0519C51.7666 0.367437 46.6987 0.446906 41.7345 1.27866C39.2611 1.69443 37.7926 4.19778 38.4297 6.62326C39.0668 9.04874 41.539 10.4566 44.0001 10.0209C47.7756 9.3554 51.6142 9.34166 55.4078 9.98734C60.8784 10.9377 65.9981 13.0137 70.3661 16.0837C74.7342 19.1538 78.2526 23.1355 80.6395 27.7922C82.6566 31.6424 84.0506 35.7837 84.7637 40.0675C85.2979 42.4253 87.5422 43.9631 89.9676 43.326C92.393 42.6889 93.9308 40.4446 93.9676 39.0409Z"
                          fill="currentColor"
                        />
                      </svg>
                      Loading...
                    </>
                  ) : (
                    <div>
                      {" "}
                      <i className="fa-solid fa-cart-shopping"></i> Add to Cart
                    </div> // Show text when not loading
                  )}
                </button>
              </div>
            </div>
          </div>
          {/* Related products section */}
          <div className="container mx-auto pb-4 md:w-full w-11/12">
            <h3 className="text-xl font-semibold dark:text-white pb-4">
              More Related Products
            </h3>
            <Slider {...settingsRelatedProductsSlider}>
              {RelatedProducts?.map((product) => (
                <div
                  key={product.id}
                  className="px-5 py-5 border border-solid border-emerald-400 dark:border-[#1212] shadow-lg group relative overflow-hidden dark:bg-transparent dark:shadow-emerald-500 dark:shadow-md"
                >
                  <div className="product">
                    <Link
                      to={`/productDetails/${product.id}/${product.category.name}`}
                    >
                      {/* Product image */}
                      <img
                        src={product.imageCover}
                        className="w-full h-5/6 pb-2"
                        alt={product.title}
                      />
                      {/* Product category */}
                      <p className="text-emerald-500 text-sm dark:font-semibold">
                        {product.category.name}
                      </p>
                      {/* Product title */}
                      <h3 className="font-semibold truncate whitespace-nowrap overflow-hidden pb-2 dark:text-white">
                        {product.title.split(" ").slice(0, 2).join(" ")}
                      </h3>
                      {/* Product price and ratings */}
                      <div className="flex items-center justify-between pb-9">
                        <p className="dark:text-white">{product.price} EGP</p>
                        <div className="flex items-center gap-1">
                          <i className="fa-solid fa-star text-[#FFD43B]"></i>
                          <p className="dark:text-white">
                            {product.ratingsAverage}
                          </p>
                        </div>
                      </div>
                    </Link>
                    {/* Add to Cart button for related products */}
                    <div className="text-center font-semibold absolute bottom-0 left-0 right-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                      <button
                        onClick={() => handleAddToCart(product.id)}
                        className="bg-emerald-500 hover:bg-emerald-400 py-2 w-4/5 mb-2 rounded-lg text-white"
                        disabled={loadingProductId === product.id} // Disable button if loading
                      >
                        {loadingProductId === product.id ? (
                          <>
                            {/* Show spinner and loading text when loading */}
                            <svg
                              aria-hidden="true"
                              role="status"
                              className="inline w-4 h-4 mr-3 text-white animate-spin"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9765 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9765 100 50.5908ZM9.08124 50.5908C9.08124 73.2556 27.3353 91.5097 50 91.5097C72.6647 91.5097 90.9188 73.2556 90.9188 50.5908C90.9188 27.926 72.6647 9.67192 50 9.67192C27.3353 9.67192 9.08124 27.926 9.08124 50.5908Z"
                                fill="#E5E7EB"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5538C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7232 75.2124 7.41289C69.5422 4.10256 63.2754 1.94025 56.7688 1.0519C51.7666 0.367437 46.6987 0.446906 41.7345 1.27866C39.2611 1.69443 37.7926 4.19778 38.4297 6.62326C39.0668 9.04874 41.539 10.4566 44.0001 10.0209C47.7756 9.3554 51.6142 9.34166 55.4078 9.98734C60.8784 10.9377 65.9981 13.0137 70.3661 16.0837C74.7342 19.1538 78.2526 23.1355 80.6395 27.7922C82.6566 31.6424 84.0506 35.7837 84.7637 40.0675C85.2979 42.4253 87.5422 43.9631 89.9676 43.326C92.393 42.6889 93.9308 40.4446 93.9676 39.0409Z"
                                fill="currentColor"
                              />
                            </svg>
                            Loading...
                          </>
                        ) : (
                          <div>
                            {" "}
                            <i className="fa-solid fa-cart-shopping"></i> Add to
                            Cart
                          </div> // Show text when not loading
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </>
  );
}
