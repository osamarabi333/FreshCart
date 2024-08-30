import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

// Create a context for managing cart data
export let CartContext = createContext();

export default function CartContextProvider({ children }) {
  // Define a constant variable named `baseUrl` and assign it the value of the base URL for the e-commerce API
  const baseUrl = `https://ecommerce.routemisr.com`;

  // State to hold cart data
  const [Cart, setCart] = useState(null);

  // State to manage loading state
  const [isLoading, setisLoading] = useState(false);

  // Function to add a product to the cart
  async function addProductToCart(productId) {
    const token = localStorage.getItem("userToken");
    if (!token) {
      toast.error("You need to be logged in to add products to the cart.");
      return;
    }
    try {
      let { data } = await axios.post(
        `${baseUrl}/api/v1/cart`,
        { productId },
        { headers: { token } }
      );
      toast(data.message, {
        style: {
          backgroundColor: "#34D399",
          color: "white",
        },
        icon: "🛒",
      });
      setCart(data); // Update the cart state with the response data
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Failed to add product to cart.");
    }
  }

  // Function to retrieve cart items from the API
  async function getCartItems() {
    const token = localStorage.getItem("userToken");
    if (!token) {
      return; // Exit if the user is not logged in
    }
    setisLoading(true);
    try {
      let { data } = await axios.get(`${baseUrl}/api/v1/cart`, {
        headers: { token },
      });
      setCart(data); // Set the cart state with the retrieved data
    } catch (error) {
      console.error("Error getting cart items:", error);
      toast.error("Failed to retrieve cart items.");
    } finally {
      setisLoading(false); // Ensure loading state is reset
    }
  }

  // Function to update the quantity of a product in the cart
  async function updateCartCount(productId, count, title) {
    const token = localStorage.getItem("userToken");
    if (!token) {
      toast.error("You need to be logged in to update the cart.");
      return;
    }
    if (count > 0) {
      try {
        let { data } = await axios.put(
          `${baseUrl}/api/v1/cart/${productId}`,
          { count },
          { headers: { token } }
        );
        setCart(data); // Update the cart state with the new data
        toast.success(
          `${title.split(" ").slice(0, 2).join(" ")} updated successfully`
        );
      } catch (error) {
        console.error("Error updating the cart items:", error);
        toast.error("Failed to update the cart.");
      }
    } else {
      deleteProduct(productId, title); // Remove the product if count is zero
    }
  }

  // Function to delete a product from the cart
  async function deleteProduct(productId, title) {
    const token = localStorage.getItem("userToken");
    if (!token) {
      toast.error("You need to be logged in to remove items from the cart.");
      return;
    }
    try {
      let { data } = await axios.delete(`${baseUrl}/api/v1/cart/${productId}`, {
        headers: { token },
      });
      toast.error(
        `${title.split(" ").slice(0, 2).join(" ")} removed from cart`
      );
      setCart(data); // Update the cart state after deletion
    } catch (error) {
      console.error("Error deleting product from the cart:", error);
      toast.error("Failed to remove the item from the cart.");
    }
  }

  // Asynchronous function to handle the checkout process
  async function checkOut(shippingAddress) {
    const token = localStorage.getItem("userToken");
    if (!token) {
      toast.error("You need to be logged in to proceed to checkout.");
      return;
    }
    try {
      let { data } = await axios.post(
        `${baseUrl}/api/v1/orders/checkout-session/${Cart.data._id}?url=https://fresh-cart-lovat-omega.vercel.app/`,
        { shippingAddress },
        { headers: { token } }
      );

      // Redirect the user to the checkout page provided by the session URL
      window.location.href = data.session.url;
    } catch (error) {
      console.error("Error in checkout process", error);
      toast.error("Failed to initiate checkout.");
    }
  }

  // Fetch cart items when the component mounts
  useEffect(() => {
    getCartItems();
  }, []);

  // Provide cart-related functions and state to child components
  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        getCartItems,
        Cart,
        setCart,
        updateCartCount,
        deleteProduct,
        checkOut,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
