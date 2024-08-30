import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

// Create a context for the wishlist, which will provide data and functions related to the wishlist to its consumers
export let WishListContext = createContext();

// Provider component for the WishListContext
export default function WishListContextProvider({ children }) {
  // State to store the list of wishlist items
  const [wishListItems, setWishListItems] = useState([]);
  // State to manage the loading status when fetching or modifying the wishlist
  const [loading, setLoading] = useState(true);

  // Base URL for the API
  let baseUrl = `https://ecommerce.routemisr.com`;

  // Function to fetch the user's wishlist from the API
  async function getUserWishList() {
    const token = localStorage.getItem("userToken"); // Retrieve the token from local storage
    if (!token) { // If no token is found, stop loading and exit the function
      setLoading(false);
      return;
    }
    setLoading(true); // Set loading to true before making the API call
    try {
      const headers = { token }; // Set headers with the token
      let { data } = await axios.get(`${baseUrl}/api/v1/wishlist`, { headers }); // Make GET request to fetch wishlist
      setWishListItems(data); // Update state with the fetched wishlist data
    } catch (error) {
      // Handle errors that occur during the API request
      console.error("Error fetching the wishlist:", error);
      toast.error("Failed to fetch wishlist."); // Show error message
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  }

  // Function to add a product to the user's wishlist
  async function addProductToWishList(productId) {
    const token = localStorage.getItem("userToken"); // Retrieve the token from local storage
    if (!token) { // If no token is found, show an error message and exit
      toast.error("User not authenticated.");
      return;
    }
    try {
      const headers = { token }; // Set headers with the token
      let { data } = await axios.post(
        `${baseUrl}/api/v1/wishlist`,
        { productId }, // Send productId in the request body
        { headers } // Set headers with the token
      );
      // Show success message with a green heart icon
      toast(data.message, {
        style: {
          backgroundColor: "white",
          color: "green",
        },
        icon: "💚",
      });
      getUserWishList(); // Refresh the wishlist to include the newly added product
    } catch (error) {
      // Handle errors that occur during the API request
      console.error("Error adding product to wishlist:", error);
      toast.error("Failed to add product to wishlist."); // Show error message
    }
  }

  // Function to remove a product from the user's wishlist
  async function RemoveProductFromWishList(productId) {
    const token = localStorage.getItem("userToken"); // Retrieve the token from local storage
    if (!token) { // If no token is found, show an error message and exit
      toast.error("User not authenticated.");
      return;
    }
    try {
      const headers = { token }; // Set headers with the token
      const response = await axios.delete(
        `${baseUrl}/api/v1/wishlist/${productId}`, // Make DELETE request to remove product
        { headers } // Set headers with the token
      );
      // Show success message with a broken heart icon
      toast("Product removed from wishlist successfully", {
        style: {
          backgroundColor: "white",
          color: "green",
        },
        icon: "💔",
      });
      getUserWishList(); // Refresh the wishlist to reflect the removal
    } catch (error) {
      // Handle errors that occur during the API request
      console.error("Error deleting product from wishlist:", error);
      toast.error("Failed to delete product from wishlist."); // Show error message
    }
  }

  // useEffect hook to fetch the user's wishlist when the component mounts
  useEffect(() => {
    getUserWishList();
  }, []);

  return (
    // Provide the wishlist data and functions to the component tree
    <WishListContext.Provider
      value={{
        wishListItems, // The current wishlist items
        loading, // The loading state
        getUserWishList, // Function to fetch the wishlist
        addProductToWishList, // Function to add a product to the wishlist
        RemoveProductFromWishList, // Function to remove a product from the wishlist
      }}
    >
      {children} {/* Render the child components */}
    </WishListContext.Provider>
  );
}
