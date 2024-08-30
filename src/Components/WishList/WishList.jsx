import React, { useContext, useEffect, useState } from "react";
import { WishListContext } from "../../Context/WishListContext";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import WishListEmpty from "../../assets/images/empty-wishlist.svg";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import useScrollToTop from "../../hooks/useScrollToTop";

export default function WishList() {
  // Destructure relevant data and functions from WishListContext
  let { wishListItems, getUserWishList, loading, RemoveProductFromWishList } =
    useContext(WishListContext);

  // hook  to make the pages when reload or refresh to back to top of page
  useScrollToTop();

  // State to manage the loading state of the "Add to Cart" button for specific products
  const [loadingCart, setLoadingCart] = useState(null);

  // Destructure the addProductToCart function from CartContext
  let { addProductToCart } = useContext(CartContext);

  // Fetch the user's wishlist items when the component mounts
  useEffect(() => {
    getUserWishList();
  }, []);

  // Handle adding a product to the cart when the user clicks the "Add to Cart" button
  const handleAddToCart = async (productId) => {
    setLoadingCart(productId); // Set loading state for the specific product being added to the cart
    try {
      await addProductToCart(productId); // Add the product to the cart
    } catch (error) {
      console.error("Error adding product to cart:", error); // Log any errors
    } finally {
      setLoadingCart(null); // Reset the loading state
    }
  };

  return (
    <div>
      {loading ? (
        // Show loading spinner while the wishlist data is being fetched
        <LoadingSpinner />
      ) : (
        <div>
          {/* Check if the wishlist is empty */}
          {!wishListItems || wishListItems.count === 0 ? (
            // empty wishlist div
            <div className="flex flex-col justify-center items-center py-5 text-center mx-2 ">
              <img src={WishListEmpty} className="h-80" alt="WishListEmpty" />
              <h2 className="font-extrabold text-2xl pb-1 text-emerald-500">
                Your wishlist is empty!
              </h2>
              <p className="text-lg font-semibold text-gray-700 dark:text-white">
                Explore our wide selection and find something you like
              </p>
              <Link to={"/"}>
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2"
                >
                  Shop Now
                </button>
              </Link>
            </div>
          ) : (
            <div>
              {/* Display wishlist items if available */}
              <div className="text-center py-3">
                <i className="fa-regular fa-heart md:text-6xl text-5xl  text-emerald-500 pb-2 pt-4"></i>
                <h2 className="md:text-6xl text-5xl font-semibold pb-3 dark:text-white">
                  My WishList
                </h2>
                {/* table that showes proudcts in the wishlist */}
                <div className="container">
                  <div className="py-6 ">
                    <div className=" w-5/6 md:w-11/12 mx-auto  shadow-lg border border-emerald-200 dark:border-[#282828] shadow-emerald-300 ">
                      <div>
                        {wishListItems.data.map((product) => (
                          <div
                            key={product._id}
                            className="bg-white  flex flex-col md:flex-row items-center justify-center md:justify-evenly border-b pb-8 md:pb-2 hover:bg-gray-100 dark:bg-[#282828] border-emerald-400 dark:hover:bg-[#121212]"
                          >
                            {/* remove product from wishlist button */}
                            <div>
                              <button
                                onClick={() =>
                                  RemoveProductFromWishList(product._id)
                                }
                              >
                                <i className="fa-solid fa-trash-can md:pr-8 py-5 md:py-0 pt-7 md:pt-0 text-xl text-red-400 hover:text-red-500"></i>
                              </button>
                            </div>
                            <Link
                              to={`/productDetails/${product.id}/${product.category.name}`}
                              className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-5"
                            >
                              {/* product image */}
                              <div className="p-4 ">
                                <img
                                  src={product.imageCover}
                                  className="w-11/12 mx-auto md:w-32 "
                                  alt={product.title}
                                />
                              </div>
                              {/* product title */}
                              <div className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                {product.title.split(" ").slice(0, 2).join(" ")}
                              </div>
                              {/* product price */}
                              <div className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                {product.price} EGP
                              </div>
                            </Link>

                            {/* add to cart button */}
                            <div>
                              <button
                                onClick={() => handleAddToCart(product.id)}
                                className="bg-emerald-500 hover:bg-emerald-400 py-2 px-3 w-full md:mb-2 mb-9 rounded-lg text-white"
                                disabled={loadingCart === product.id}
                              >
                                {loadingCart === product.id ? (
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
                                  "Add to Cart"
                                )}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
