// Importing necessary modules and functions
import axios from "axios"; // For making HTTP requests
import { useFormik } from "formik"; // For managing form state and validation
import React, { useContext, useState } from "react"; // React utilities
import { Link, useNavigate } from "react-router-dom"; // For navigation and linking between routes
import * as Yup from "yup"; // For form validation schema
import { UserContext } from "../../Context/UserContext"; // Importing user context for managing user state
import useScrollToTop from "../../hooks/useScrollToTop";

export default function Login() {
  const navigate = useNavigate(); // Hook for programmatic navigation
  const [ApiError, setApiError] = useState(""); // State for storing API error messages
  const [IsLoading, setIsLoading] = useState(false); // State for managing loading state
  let { UserLogin, setUserLogin } = useContext(UserContext); // Accessing user context to set user login state

  // Validation schema for the login form
  let validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Email is required"), // Email must be valid and is required
    password: Yup.string()
      .matches(
        /^[A-Za-z0-9]{6,10}$/,
        "Password must be between 6 and 10 alphanumeric characters long. Example: abcABC12"
      )
      .required("Password is required"), // Password must be alphanumeric with a length between 6 and 10 characters and is required
  });

  // Function to handle form submission for login
  function handleLogin(values) {
    setIsLoading(true); // Set loading state to true while making the request
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values) // POST request to the login API with form values
      .then((res) => {
        setIsLoading(false); // Reset loading state

        if (res.data.message === "success") {
          // If login is successful
          localStorage.setItem("userToken", res.data.token); // Store the user token in local storage
          setUserLogin(res.data.token); // Update user login state in context
          navigate("/"); // Redirect user to the homepage
        }
      })
      .catch((res) => {
        console.log(res); // Log the error response for debugging

        setIsLoading(false); // Reset loading state
        setApiError(res.response.data.message); // Set API error message to display to the user
      });
  }

  // Initialize formik for form management
  let formik = useFormik({
    initialValues: {
      email: "", // Initial value for email field
      password: "", // Initial value for password field
    },
    validationSchema, // Attach validation schema
    onSubmit: handleLogin, // Attach submit handler function
  });

  // hook  to make the pages when reload or refresh to back to top of page
  useScrollToTop();
  return (
    <>
      <div className="text-white py-14 pb-16 ">
        <h2 className="text-center py-3 text-3xl font-semibold text-emerald-500 dark:text-white mb-2">
          Login
        </h2>

        {/* Display API error message if any */}
        {ApiError ? (
          <div
            className="flex items-center p-2 my-5 w-1/3 mx-auto text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-[#282828] dark:text-red-400 dark:border-red-800"
            role="alert"
          >
            <div>
              <span className="font-medium">{ApiError}</span>
            </div>
          </div>
        ) : null}

        <div className="container px-5 pb-8">
          <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
            {/* Email input field */}
            <div className="relative z-0 w-full mb-5 pb-4 group">
              <input
                onBlur={formik.handleBlur} // Handle input blur event for validation
                onChange={formik.handleChange} // Handle input change event
                value={formik.values.email} // Set input value from formik state
                type="email"
                name="email"
                id="email"
                className="block py-2.5 px-0 w-full text-sm text-slate-600 dark:text-white bg-transparent border-0 border-b-2 border-[#1ABC9C] appearance-none focus:outline-none focus:ring-0 focus:border-[#1ABC9C] peer"
                placeholder=" "
              />
              <label
                htmlFor="email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#1ABC9C] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter your Email
              </label>
              {/* Display validation error for email field if any */}
              {formik.errors.email && formik.touched.email ? (
                <div
                  className="flex items-center p-2 mt-2 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-[#282828] dark:text-red-400 dark:border-red-800"
                  role="alert"
                >
                  <div>
                    <span className="font-medium">{formik.errors.email}</span>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Password input field */}
            <div className="relative z-0 w-full mb-5  group">
              <input
                onBlur={formik.handleBlur} // Handle input blur event for validation
                onChange={formik.handleChange} // Handle input change event
                value={formik.values.password} // Set input value from formik state
                type="password"
                name="password"
                id="password"
                className="block py-2.5 px-0 w-full text-sm text-slate-600 dark:text-white bg-transparent border-0 border-b-2 border-[#1ABC9C] appearance-none focus:outline-none focus:ring-0 focus:border-[#1ABC9C] peer"
                placeholder=" "
              />
              <label
                htmlFor="password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#1ABC9C] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter your Password
              </label>
              {/* Display validation error for password field if any */}
              {formik.errors.password && formik.touched.password ? (
                <div
                  className="flex items-center p-2 mt-2 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-[#282828] dark:text-red-400 dark:border-red-800"
                  role="alert"
                >
                  <div>
                    <span className="font-medium">
                      {formik.errors.password}
                    </span>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Forget Passowrd Link */}
            <div className="flex  items-center justify-end pb-4">
              <Link
                to="/forgetpassword"
                className="text-[#1ABC9C] dark:text-[#1ABC9C] pl-1 text-sm font-semibold  hover:underline"
              >
                Forget Passowrd?
              </Link>
            </div>

            {/* Submit button */}
            <div className="text-center">
              <button
                type="submit"
                className="relative inline-flex items-center justify-center w-full px-5 py-2.5 text-sm font-medium text-white rounded-lg bg-emerald-500 group focus:ring-4 focus:ring-emerald-300 dark:focus:ring-emerald-500 hover:bg-emerald-400"
                disabled={IsLoading} // Disable button while loading
              >
                {IsLoading ? (
                  <>
                    {/* Loading spinner */}
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
                  "Login"
                )}
              </button>
            </div>
          </form>

          {/* Link to signup page */}
          <div className="flex items-center justify-center pt-6">
            <div className="w-28 h-0.5 bg-gray-300"></div>
            <p className="text-lg px-4 text-gray-500">or</p>
            <div className="w-28 h-0.5 bg-gray-300"></div>
          </div>
          <div className="text-center text-gray-500 font-semibold dark:text-white text-sm pt-4 ">
            Don't have an account?
            <Link
              to="/signup"
              className="text-[#1ABC9C] dark:text-[#1ABC9C] pl-1 font-medium hover:underline"
            >
              Sign up here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
