import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "../../Context/CartContext";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import CartEmpty from "../../assets/images/shopping-cart_782150.png";
import { Link } from "react-router-dom";
import useScrollToTop from "../../hooks/useScrollToTop";

export default function Cart() {
  // Extracting necessary functions and variables from CartContext
  const { getCartItems, Cart, updateCartCount, deleteProduct, isLoading } =
    useContext(CartContext);

  // hook  to make the pages when reload or refresh to back to top of page
  useScrollToTop();

  // Fetch cart items when the component mounts using useEffect
  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <>
      {isLoading ? (
        // Show loading spinner if data is being fetched
        <LoadingSpinner />
      ) : (
        <div>
          {Cart && Cart.data.products.length ? (
            <>
              <div className="flex gap-5 items-center justify-center py-3">
                <h2 className="md:text-6xl text-5xl font-semibold pb-3 dark:text-white">
                  My Cart
                </h2>
                <i className="fa-solid fa-shopping-cart md:text-6xl text-5xl text-emerald-500 pb-2 pt-4"></i>
              </div>
              <div className="flex md:flex-row flex-col py-5">
                <div className="mx-auto w-3/4 text-sm text-gray-500 dark:text-gray-400 shadow-xl shadow-emerald-300">
                  {/* Map through the products in the cart and display them */}
                  {Cart.data.products.map((product) => (
                    <div
                      key={product._id}
                      className="bg-white border-b flex md:flex-row flex-col items-center md:justify-evenly justify-center hover:bg-gray-100 dark:bg-[#282828] border-emerald-400 dark:hover:bg-[#121212]"
                    >
                      {/* Display the product image */}
                      <div className="p-4">
                        <img
                          src={product.product.imageCover}
                          className="w-11/12 md:w-32 mx-auto"
                          alt={product.product.title || "Product Image"}
                        />
                      </div>
                      {/* Display the product title */}
                      <div className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {product.product?.title
                          ?.split(" ")
                          .slice(0, 2)
                          .join(" ") || "Product Title"}
                      </div>
                      <div className="px-6 py-4">
                        <div className="flex items-center">
                          {/* Button to decrease the product quantity */}
                          <button
                            onClick={() =>
                              updateCartCount(
                                product.product.id,
                                product.count - 1,
                                product.product.title
                              )
                            }
                          >
                            <i className="fa-solid fa-minus pt-1.5 h-6 w-6 p-1 me-3 text-white rounded-full bg-emerald-500 hover:bg-emerald-600"></i>
                          </button>
                          {/* Display the product quantity */}
                          <div className="font-semibold text-sm dark:text-white">
                            {product.count}
                          </div>
                          {/* Button to increase the product quantity */}
                          <button
                            onClick={() =>
                              updateCartCount(
                                product.product.id,
                                product.count + 1,
                                product.product.title
                              )
                            }
                          >
                            <i className="fa-solid fa-plus h-5.5 w-6 p-1 ms-3 text-white rounded-full bg-emerald-500 hover:bg-emerald-600"></i>
                          </button>
                        </div>
                      </div>
                      {/* Display the product price */}
                      <div className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {product.price} EGP
                      </div>
                      <div className="px-6 py-4">
                        {/* Button to delete the product from the cart */}
                        <button
                          onClick={() =>
                            deleteProduct(
                              product.product.id,
                              product.product.title
                            )
                          }
                          type="button"
                          className="text-red-600 hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-600"
                        >
                          Remove
                          <i className="fa-solid fa-trash ms-2"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cart summary and checkout section */}
                <div className="md:w-1/5 md:mt-0 mt-14 w-9/12 mx-auto h-fit border dark:bg-emerald-500 border-emerald-200 shadow-lg shadow-emerald-500 rounded-md">
                  {/* Display the cart summary title */}
                  <p className="pt-2 pb-3 rounded-sm border-b-2 border-emerald-200 px-2 font-semibold text-lg text-emerald-500 dark:text-white">
                    Cart Summary
                  </p>
                  {/* Display the total cart price */}
                  <p className="pt-3 pb-4 rounded-sm border-b-2 border-emerald-200 px-2 font-semibold text-base text-emerald-500 dark:text-white">
                    Total Cart Price = {Cart.data.totalCartPrice} EGP
                  </p>
                  {/* Link to the checkout page */}
                  <Link to={"/checkout"}>
                    <button
                      type="button"
                      className="text-white w-4/5 mx-auto bg-emerald-500 dark:bg-emerald-950 hover:bg-emerald-600 font-medium rounded-lg text-sm px-5 py-2.5 my-2 text-center flex items-center justify-center"
                    >
                      CheckOut Now
                      <i className="fa-solid fa-cart-plus text-white text-base px-2"></i>
                    </button>
                  </Link>
                </div>
              </div>
            </>
          ) : (
            // Display cartempty if the cart is empty
            <div className="flex flex-col justify-center items-center py-5 mx-5 text-center">
              <img src={CartEmpty} className="md:h-80 h-64" alt="CartEmpty" />
              <h2 className="font-extrabold text-2xl pb-1 text-emerald-500">
                Your Cart is Empty
              </h2>
              <p className="text-lg font-semibold text-gray-700 dark:text-white">
                Browse categories and discover our best offers!
              </p>
              {/* Link to the shop page */}
              <Link to={"/"}>
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2"
                >
                  Shop Now
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
}
