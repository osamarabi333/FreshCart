import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { WishListContext } from "../../Context/WishListContext";
import useScrollToTop from "../../hooks/useScrollToTop";

// Component for displaying recent products
export default function RecentProducts() {
  // State to hold the list of products
  const [products, setProducts] = useState([]);
  // State to manage the status of whether a product is in the wish list
  const [wishListStatus, setwishListStatus] = useState({});
  // State to manage the loading status when adding a product to the cart
  const [loading, setLoading] = useState(null);

  // Get functions and values from CartContext
  let { addProductToCart } = useContext(CartContext);
  // Get functions and values from WishListContext
  let {
    addProductToWishList,
    wishListItems,
    getUserWishList,
    RemoveProductFromWishList,
  } = useContext(WishListContext);

  // Custom hook to scroll to the top of the page when this component mounts
  useScrollToTop();

  // Function to fetch products from the API
  function getProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        // Set the products state with the fetched data
        setProducts(res.data.data);
      })
      .catch((error) => {
        // Log any errors that occur during the fetch
        console.error("Error fetching products:", error);
      });
  }

  // Function to handle adding a product to the cart
  const handleAddToCart = async (productId) => {
    setLoading(productId); // Set loading state to the current product ID
    try {
      // Call the addProductToCart function from CartContext
      await addProductToCart(productId);
    } catch (error) {
      // Log any errors that occur during the add to cart operation
      console.error("Error adding product to cart:", error);
    } finally {
      // Reset loading state
      setLoading(null);
    }
  };

  // useEffect hook to fetch products and wish list items when the component mounts
  useEffect(() => {
    getProducts();
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
    <div className="container mx-auto px-4">
      <h2 className="text-2xl uppercase font-extrabold pt-3 shadow-emerald-500 text-center py-4 my-5 w-10/12 md:w-1/3 mx-auto rounded-xl shadow-md dark:shadow-emerald-500 bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-emerald-700 dark:from-emerald-300 dark:to-emerald-500">
        Our products
      </h2>

      <div className="row pl-8">
        {/* Check if there are products to display */}
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="md:w-1/6 md:mr-4 px-5 py-5 m-4 mr-11 border border-solid border-emerald-400 dark:border-[#1212] shadow-lg group relative overflow-hidden dark:bg-transparent dark:shadow-emerald-500 dark:shadow-md hover:shadow-xl hover:shadow-emerald-500 transition-shadow duration-500 dark:hover:shadow-xl dark:hover:shadow-emerald-700 dark:transition-shadow dark:duration-500"
            >
              <div className="product">
                {/* Link to product details page */}
                <Link
                  to={`/productDetails/${product.id}/${product.category.name}`}
                >
                  <img
                    src={product.imageCover}
                    className="w-full h-5/6 pb-2"
                    alt={product.title}
                  />
                  <p className="text-emerald-500 text-sm dark:font-semibold">
                    {product.category.name}
                  </p>
                  <h3 className="font-semibold truncate whitespace-nowrap overflow-hidden pb-2 dark:text-white">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
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

                <div className="text-center font-semibold absolute bottom-0 left-0 right-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                  {/* Button to add product to cart */}
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className="bg-emerald-500 hover:bg-emerald-400 py-2 w-4/5 mb-2 rounded-lg text-white"
                    disabled={loading === product.id}
                  >
                    {/* Display a loading spinner while adding to cart */}
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
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5538C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7232 75.2124 7.41289C69.5422 4.10256 63.2754 1.94025 56.7688 1.0519C51.7666 0.367437 46.6987 0.446906 41.7345 1.27866C39.2611 1.69443 37.7926 4.19778 38.4297 6.62326C39.0668 9.04874 41.5492 10.2066 43.9965 9.21963C48.1474 8.34029 52.3994 8.36778 56.555 9.29557C59.3802 9.99172 62.1265 11.1083 64.611 13.0678C67.0956 15.0273 69.176 17.567 70.5567 20.5911C71.8139 23.3283 72.6441 26.2758 72.9754 29.3038C73.0726 30.5245 73.1631 31.6611 73.2256 32.6776C73.2938 33.6124 74.4347 34.2161 75.1362 34.0142C76.365 33.7578 77.2072 32.7238 77.3077 31.4688C77.453 29.6984 77.7501 27.9686 78.1675 26.2936C78.8545 23.0701 79.7021 19.989 80.6914 16.9692C81.0894 15.4702 82.5377 14.7021 83.8523 15.5194C85.0514 16.249 86.1334 17.3854 86.9669 18.7528C88.7125 22.3628 89.7126 26.1434 89.8831 29.9819C89.9815 31.0033 90.0378 32.0012 90.0574 32.9499C90.0664 33.7314 91.0843 34.372 91.8927 34.0552C92.6319 33.7727 93.2689 33.2252 93.5862 32.5477C93.8358 31.9444 93.9619 31.2575 93.9676 30.5906V39.0409Z"
                            fill="currentColor"
                          />
                        </svg>
                        Loading...
                      </>
                    ) : (
                      "Add to Cart"
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </div>
  );
}
