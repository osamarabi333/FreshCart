import React, { useContext, useEffect, useState } from "react";
import logo from "./../../assets/images/green-shopping-cart-10909.svg";
import { IoMoon, IoSunny } from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";
import { WishListContext } from "../../Context/WishListContext";

export default function Navbar() {
  const [dark, setDark] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Retrieve Cart and WishList data from their respective contexts
  const { Cart, getCartItems } = useContext(CartContext);
  const { wishListItems, getUserWishList } = useContext(WishListContext);

  // Retrieve user login information and setter from UserContext
  let { UserLogin, setUserLogin } = useContext(UserContext);

  // useNavigate hook to programmatically navigate routes
  const navigate = useNavigate();

  // Function to handle user sign-out
  function signOut() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("login");
  }

  // Fetch cart items and wish list items when the component mounts
  useEffect(() => {
    if (UserLogin) {
      getCartItems();
      getUserWishList();
    }
  }, [UserLogin]);

  // useEffect hook to set the initial theme based on saved preference or device settings
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      const isDark = savedTheme === "dark";
      setDark(isDark);
      document.body.classList.toggle("dark", isDark);
    } else {
      const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setDark(prefersDarkMode);
      document.body.classList.toggle("dark", prefersDarkMode);
    }
  }, []);

  // Function to toggle dark mode and save preference
  const darkModeHandler = () => {
    const newDarkMode = !dark;
    setDark(newDarkMode);
    document.body.classList.toggle("dark", newDarkMode);
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");
  };

  // Function to handle navbar toggle
  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <>
      <nav className="bg-slate-100 z-40 dark:bg-[#121212] dark:text-white border dark:border-black border-gray-100 top-0 right-0 left-0 fixed w-full">
        <div className="flex md:flex-row flex-col flex-wrap justify-between md:items-center items-start mx-auto max-w-screen-xl p-4">
          <div className="md:w-0 md:mx-0 flex items-center justify-between mx-4 w-full">
            <Link
              to=""
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img src={logo} className="h-8" alt="FreshCart Logo" />
              <span className="self-center text-2xl font-semibold pr-4 whitespace-nowrap dark:text-white">
                Fresh Cart
              </span>
            </Link>
            <button
              onClick={handleNavToggle}
              className="md:hidden p-2 text-gray-600 text-lg dark:text-white focus:outline-none"
              aria-label="Toggle navigation"
            >
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>

          <div
            className={`md:flex md:items-center md:justify-between md:w-5/12 md:space-x-6 ${
              isNavOpen ? "block" : "hidden"
            } md:block`}
          >
            {UserLogin != null ? (
              <ul className="flex flex-col md:flex-row gap-4 py-5 md:py-0 md:gap-6 ">
                <li>
                  <NavLink
                    to=""
                    className="hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/products"
                    className="hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="categories"
                    className="hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="brands"
                    className="hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    Brands
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="allorders"
                    className="hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    Orders
                  </NavLink>
                </li>
              </ul>
            ) : null}
          </div>

          <div
            className={`md:flex md:items-center md:justify-between md:w-0/12 md:space-x-6 ${
              isNavOpen ? "block" : "hidden"
            } md:block`}
          >
            <div className="flex items-center space-x-6 rtl:space-x-reverse">
              {UserLogin != null ? (
                <div className="flex gap-5">
                  <NavLink to={"cart"}>
                    <div className="relative">
                      <i className="fa-solid fa-cart-shopping text-emerald-500 font-semibold relative text-[24px] pt-2">
                        <span className="absolute bottom-3 left-4 rounded-full text-white bg-emerald-600 shadow-lg text-sm px-1">
                          {Cart ? Cart.numOfCartItems : 0}
                        </span>
                      </i>
                    </div>
                  </NavLink>
                  <NavLink to={"wishlist"}>
                    <div className="relative">
                      <i className="fa-solid fa-heart text-emerald-500 font-semibold relative text-[24px] pt-2">
                        <span className="absolute bottom-3 left-4 rounded-full text-white bg-emerald-600 shadow-lg text-sm px-1">
                          {wishListItems ? wishListItems.count : 0}
                        </span>
                      </i>
                    </div>
                  </NavLink>
                </div>
              ) : null}

              <div className="icons flex gap-4">
                <i className="fab fa-facebook text-lg pt-1"></i>
                <i className="fab fa-youtube text-lg pt-1"></i>
                <i className="fab fa-tiktok text-lg pt-1"></i>
                <i className="fa-brands fa-instagram text-lg pt-1"></i>
              </div>

              <div className="links flex gap-4">
                {UserLogin != null ? (
                  <span
                    onClick={() => signOut()}
                    className="text-base cursor-pointer font-semibold hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    SignOut
                  </span>
                ) : (
                  <>
                    <Link to="login" className="text-sm">
                      Login
                    </Link>
                    <Link to="signup" className="text-sm">
                      Register
                    </Link>
                  </>
                )}
              </div>

              <button onClick={darkModeHandler} className="text-xl">
                {dark ? <IoSunny className="text-white" /> : <IoMoon />}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
