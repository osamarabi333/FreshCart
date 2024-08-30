import axios from "axios"; // Import Axios for making HTTP requests
import React, { useContext, useEffect, useState } from "react"; // Import React and hooks
import { Link, useParams } from "react-router-dom"; // Import Link and useParams for routing
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"; // Import a loading spinner component
import { CartContext } from "../../Context/CartContext"; // Import CartContext for managing cart state
import { WishListContext } from "../../Context/WishListContext";
import useScrollToTop from "../../hooks/useScrollToTop";

export default function CategoryProducts() {
  // Retrieve the category name from the URL parameters
  let { categoryName } = useParams();

  // State to hold the list of products
  const [products, setProducts] = useState([]);

  // State to handle loading state for fetching products
  const [isLoading, setIsLoading] = useState(false);

  // State to manage the status of whether a product is in the wish list
  const [wishListStatus, setwishListStatus] = useState({});

  // State to handle loading state for adding products to the cart
  const [loading, setLoading] = useState(null);

  // Access the addProductToCart function from CartContext
  let { addProductToCart } = useContext(CartContext);

  // Accessing the addProductToWishList function from the WishListContext to add products to the wishlist.
  let {
    addProductToWishList,
    wishListItems,
    getUserWishList,
    RemoveProductFromWishList,
  } = useContext(WishListContext);

  // hook  to make the pages when reload or refresh to back to top of page
  useScrollToTop();

  // Function to fetch products of the specific category
  function GetSpecificCategory() {
    setIsLoading(true); // Set loading to true when fetching starts
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`) // Fetch all products from the API
      .then((res) => {
        // Filter products by category to find related products
        let categoryProducts = res.data.data.filter(
          (product) => product.category.name === categoryName
        );
        setProducts(categoryProducts); // Set the filtered products to state
        setIsLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        // Handle errors if the fetch fails
        console.error("Error fetching related products:", error);
        setIsLoading(false); // Set loading to false even if there is an error
      });
  }

  // useEffect hook to fetch products whenever categoryName changes
  useEffect(() => {
    GetSpecificCategory();
  }, [categoryName]);

  // Function to handle adding a product to the cart
  const handleAddToCart = async (productId) => {
    setLoading(productId); // Set the loading state to the current product ID
    try {
      await addProductToCart(productId); // Attempt to add the product to the cart
    } catch (error) {
      // Handle any errors that occur during the add-to-cart operation
      console.error("Error adding product to cart:", error);
    } finally {
      setLoading(null); // Reset the loading state once the operation is complete
    }
  };

  // useEffect hook to fetch products and wish list items when the component mounts
  useEffect(() => {
    getUserWishList();
  }, []);

  // useEffect hook to update the wish list status when products or wish list items change
  useEffect(() => {
    const initialStatus = {};
    products.forEach((product) => {
      // Check if each product is in the wish list
      initialStatus[product.id] = wishListItems?.data?.some(
        (item) => item.id === product.id
      );
    });

    // Update the wish list status state
    setwishListStatus(initialStatus);
  }, [products, wishListItems]);

  // Function to toggle the wish list status of a product
  const toggleWishList = (productId) => {
    if (wishListStatus[productId]) {
      // If the product is already in the wish list, remove it
      RemoveProductFromWishList(productId);
    } else {
      // Otherwise, add it to the wish list
      addProductToWishList(productId);
    }

    // Update the local state to reflect the change
    setwishListStatus({
      ...wishListStatus,
      [productId]: !wishListStatus[productId],
    });
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner /> // Display the loading spinner while data is being fetched
      ) : (
        <div className="container mx-auto min-h-64 px-4">
          <h2 className="text-2xl uppercase font-extrabold shadow-emerald-400 pt-3 text-center py-4 my-4 w-5/6 md:w-1/3 mx-auto rounded-xl shadow-md dark:shadow-emerald-500 bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-emerald-700 dark:from-emerald-300 dark:to-emerald-500 ">
            Shop {categoryName} now !
          </h2>
          {/* Display the list of products */}
          <div className="row pl-8">
            {products.map((product) => (
              <div
                key={product.id} // Use the product ID as the unique key for each product
                className=" md:w-1/6 px-5 py-5 md:m-4 mr-8 md:mr-4 mt-7 mb-5 border border-solid border-emerald-400 dark:border-[#1212] shadow-lg group relative overflow-hidden dark:bg-transparent dark:shadow-emerald-500 dark:shadow-md hover:shadow-emerald-500 transition-shadow duration-500 dark:hover:shadow-xl dark:hover:shadow-emerald-700 dark:transition-shadow dark:duration-500"
              >
                <div className="product">
                  {/* Link to the product details page */}
                  <Link
                    to={`/productDetails/${product.id}/${product.category.name}`}
                  >
                    {/* Display the product image */}
                    <img
                      src={product.imageCover}
                      className="w-full h-5/6 pb-2"
                      alt={product.title}
                    />
                    {/* Display the product category */}
                    <p className="text-emerald-500 text-sm dark:font-semibold">
                      {product.category.name}
                    </p>
                    {/* Display the product title, truncated to two words */}
                    <h3 className="font-semibold truncate whitespace-nowrap overflow-hidden pb-2 dark:text-white">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h3>
                    {/* Display the product price and rating */}
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

                  {/* Add to wishlist button */}
                  <div>
                    {/* Button to toggle wish list status */}
                    <button onClick={() => toggleWishList(product.id)}>
                      <i
                        className={`${
                          wishListStatus[product.id]
                            ? "fa-solid fa-heart"
                            : "fa-regular fa-heart"
                        } absolute top-6 right-6 text-emerald-800 bg-emerald-100 rounded-2xl py-2 px-2 shadow-xl transition-transform duration-300 hover:font-bold text-lg`}
                      ></i>
                    </button>
                  </div>

                  {/* Add to Cart button */}
                  <div className="text-center font-semibold absolute bottom-0 left-0 right-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                    <button
                      onClick={() => handleAddToCart(product.id)} // Call handleAddToCart with the product ID
                      className="bg-emerald-500 hover:bg-emerald-400 py-2 w-4/5 mb-2 rounded-lg text-white"
                      disabled={loading === product.id} // Disable button if loading state matches this product ID
                    >
                      {/* Show a loading spinner if this product is currently being added to the cart */}
                      {loading === product.id ? (
                        <>
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
                        "Add to Cart" // Default button text
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
