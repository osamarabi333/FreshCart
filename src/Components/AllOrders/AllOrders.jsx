// Importing necessary libraries and hooks
import axios from "axios"; // Axios for making HTTP requests
import React, { useContext, useState, useEffect } from "react"; // React library and hooks
import { CartContext } from "../../Context/CartContext"; // Cart context to manage cart operations
import { UserContext } from "../../Context/UserContext"; // User context to get user information
import { Link } from "react-router-dom"; // Link component for navigation
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import ordersEmpty from "../../assets/images/emptyorders.svg";
import useScrollToTop from "../../hooks/useScrollToTop";

// Component definition for displaying all orders of a user
export default function AllOrders() {
  const [Loading, setLoading] = useState(false);
  // Extracting functions and values from context
  let { userId } = useContext(UserContext); // userId from UserContext to identify the user
  let { userName } = useContext(UserContext); // userName from UserContext to display the user's name

  // hook  to make the pages when reload or refresh to back to top of page
  useScrollToTop();

  // State to store the list of orders fetched from the API
  const [orders, setOrders] = useState([]);
  // State to track which order's details are expanded
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  // Function to fetch the orders of the current user from the API
  async function userOrders() {
    setLoading(true);
    try {
      let response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
      );
      // Update the state with the fetched orders
      setOrders(response.data);
      setLoading(false);
    } catch (err) {
      console.log("error in getting user orders", err);
    }
  }

  // useEffect hook to fetch orders when the component mounts or when userId changes
  useEffect(() => {
    userOrders();
  }, [userId]);

  // Function to toggle the visibility of order details
  const toggleOrderDetails = (orderId) => {
    // If the clicked order's details are already expanded, collapse them, otherwise expand
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  return (
    <>
      {Loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          {!orders || orders.length == 0 ? ( // If the cart has no items, display the EmptyCart div
            <div className="flex flex-col justify-center items-center py-5 w-5/6 mx-auto md:w-full text-center ">
              <img src={ordersEmpty} className="h-80" alt="ordersEmpty" />
              <h2 className="font-extrabold text-2xl pb-1 text-emerald-500">
                No Orders History
              </h2>
              <p className="text-lg font-semibold text-gray-700 dark:text-white">
                Looks You haven't made any order yet Browse categories and
                discover our best offers!{" "}
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
            <div className="container w-11/12 md:w-10/12 mx-auto min-h-64 ">
              {/* page title */}
              <h2 className="text-2xl uppercase font-extrabold pt-3 shadow-emerald-500 text-center py-4 my-5 w-5/6 md:w-1/3 mx-auto rounded-xl shadow-md dark:shadow-emerald-500 bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-emerald-700 dark:from-emerald-300 dark:to-emerald-500 ">
                <span className="uppercase">{`${userName}'s`}</span> Orders
              </h2>
              {/* page content  */}
              <div className="row flex-col gap-5">
                {orders.map((order) => (
                  <div
                    key={order._id} // Unique key for each order
                    className={`order border-2 border-emerald-200 dark:border-emerald-300 flex flex-col gap-3 px-4 shadow-md shadow-emerald-500`}
                  >
                    {/* Order summary */}
                    <div className="md:flex justify-between items-center  py-5 border-b-2 border-emerald-500">
                      <div>
                        {/* Order ID */}
                        <h2 className="font-semibold text-3xl pb-2 text-emerald-500">
                          Order ID: #{order.id}
                        </h2>
                        {/* Order Date */}
                        <p className="text-gray-500 font-semibold pb-2 dark:text-white">
                          Order Date:{" "}
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      {/* Delivery Status and button to open and close the details */}
                      <div>
                        {/* Delivery Status */}
                        <p className="text-gray-500 font-semibold pb-3 dark:text-white">
                          Delivery Status:{" "}
                          {order.isDelivered ? "Delivered" : "On The Way"}
                          <i className="fa-solid fa-truck-fast mx-2 text-emerald-600"></i>
                        </p>
                      </div>
                      {/* Button  */}
                      <button
                        className="text-white py-3 px-3 rounded-2xl bg-emerald-500 font-semibold"
                        onClick={() => toggleOrderDetails(order._id)}
                      >
                        {expandedOrderId === order._id
                          ? "Hide Details"
                          : "Order Details"}
                      </button>
                    </div>

                    {/* Order details, initially hidden */}
                    <div
                      className={`order-details ${
                        expandedOrderId === order._id ? "expanded" : "collapsed"
                      }`}
                    >
                      {/* Main container for order items and summary */}
                      <div>
                        {/* Container for each item in the cart */}
                        <div className="row flex-col gap-6">
                          {order.cartItems.map((item) => (
                            <div
                              key={item._id}
                              className="product md:flex py-7 border-emerald-500 border-b-2"
                            >
                              {/* Left side: product image and details */}
                              <div className=" w-3/4">
                                <div className="md:flex items-center justify-start gap-2">
                                  {/* Product image */}
                                  <img
                                    src={item.product.imageCover}
                                    className="md:w-1/4 w-11/12 mx-4  h-64 object-contain shadow-emerald-500 shadow-lg md:mx-4"
                                    alt=""
                                  />
                                  {/* Product details */}
                                  <div className="flex flex-col pt-8 mx-4 md:mx-0 md:pb-2 ">
                                    {/* Product title (showing the first two words) */}
                                    <p className="text-lg text-emerald-500 font-semibold pb-3 md:pb-5">
                                      Title:{" "}
                                      {item.product.title
                                        .split(" ")
                                        .slice(0, 2)
                                        .join(" ")}
                                    </p>
                                    {/* Product category */}
                                    <p className="text-base text-gray-500 font-semibold dark:text-gray-200 pb-1">
                                      Category: {item.product.category.name}
                                    </p>
                                    {/* Product rating */}
                                    <p className="text-base text-gray-500 font-semibold md:pb-10 dark:text-gray-200">
                                      Rating: {item.product.ratingsAverage}{" "}
                                      <i className="fa-solid fa-star text-yellow-400"></i>
                                    </p>
                                  </div>
                                </div>
                              </div>
                              {/* Right side: price and quantity */}
                              <div className="md:w-1/4 flex md:flex-col md:items-end  md:justify-start  mt-6 md:my-14">
                                {/* Item price */}
                                <p className="md:mx-8 mx-5 text-xl font-semibold text-emerald-500 md:mb-2">
                                  {item.price} EGP
                                </p>
                                {/* Item quantity */}
                                <p className="md:mx-8 text-base font-semibold text-gray-700 dark:text-gray-200">
                                  Qty: {item.count}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Order summary section */}
                        <div className="py-7">
                          <div className="flex flex-col items-start border-b-4 pb-3 gap-1 border-dotted mx-16">
                            {/* Order Summary title */}
                            <p className="font-semibold text-xl text-emerald-500">
                              Order Summary
                            </p>
                            {/* Subtotal */}
                            <div className="flex items-center justify-between gap-9">
                              <p className="font-semibold text-base text-gray-700 dark:text-gray-200">
                                SubTotal
                              </p>
                              <p className="font-semibold text-base text-gray-700 dark:text-gray-200">
                                {order.totalOrderPrice} EGP
                              </p>
                            </div>
                            {/* Discount percentage (hardcoded as 0%) */}
                            <div className="flex items-center justify-between gap-9">
                              <p className="font-semibold text-base text-gray-700 dark:text-gray-200">
                                Discount %
                              </p>
                              <p className="font-semibold text-base text-gray-700 dark:text-gray-200">
                                (0%) {order.totalOrderPrice} EGP
                              </p>
                            </div>
                            {/* Delivery cost */}
                            <div className="flex items-center justify-between gap-9">
                              <p className="font-semibold text-base text-gray-700 dark:text-gray-200">
                                Delivery
                              </p>
                              <p className="font-semibold text-base text-gray-700 dark:text-gray-200">
                                {order.shippingPrice} EGP
                              </p>
                            </div>
                            {/* Tax cost */}
                            <div className="flex items-center justify-between gap-9">
                              <p className="font-semibold text-base text-gray-700 dark:text-gray-200">
                                Tax
                              </p>
                              <p className="font-semibold text-base text-gray-700 dark:text-gray-200">
                                {order.taxPrice} EGP
                              </p>
                            </div>
                          </div>
                          {/* Total cost (including all charges) */}
                          <div className="flex items-start justify-between mx-16 py-2 pb-5">
                            <p className="font-semibold text-2xl text-emerald-500">
                              Total
                            </p>
                            <p className="font-semibold text-lg text-gray-700 dark:text-gray-200">
                              {order.totalOrderPrice} EGP
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
