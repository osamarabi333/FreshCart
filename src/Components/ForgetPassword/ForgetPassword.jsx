import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useScrollToTop from "../../hooks/useScrollToTop";

export default function ForgetPassword() {
  // State to manage the loading status during the password reset request
  const [IsLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // hook  to make the pages when reload or refresh to back to top of page
  useScrollToTop();

  // Function to handle the password reset request
  async function handelForgetPassword({ email }) {
    setIsLoading(true); // Start loading

    try {
      // Send a POST request to the password reset endpoint with the user's email
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        {
          email,
        }
      );

      // Navigate to the reset code input page upon success
      navigate("/resetcode");

      // Reset the form fields after successful submission
      formik.resetForm();

      // Display a success message to the user
      toast.success(response.data.message, {
        style: {
          backgroundColor: "#34D399",
          color: "white",
        },
      });
    } catch (error) {
      // Log the error for debugging purposes
      console.error("Error in forgot password request:", error);

      // Display an error message to the user if the request fails
      toast.error(
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Failed to send password reset email."
      );
    } finally {
      setIsLoading(false); // End loading
    }
  }

  // Define validation rules for the form using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Email is required"),
  });

  // Initialize Formik for managing form state and handling form submission
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema, // Attach validation rules to Formik
    onSubmit: handelForgetPassword, // Attach the form submission handler
  });

  return (
    <>
      {/* Header Section */}
      <div className="py-10">
        <h2 className="text-center text-emerald-500 font-semibold text-3xl py-5 ">
          Forget Password?
        </h2>
        <p className="text-gray-400 font-semibold text-center dark:text-gray-200">
          No worries, we'll send you a reset code on your email.
        </p>
      </div>

      {/* Form Section */}
      <div className="container px-5 pb-8">
        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
          <div className="relative z-0 w-full mb-5 pb-4 group">
            <input
              // Bind Formik handlers and values to the input field
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
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
              Enter your email
            </label>
            {/* Display validation error if email is invalid */}
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

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="relative inline-flex items-center justify-center w-full px-5 py-2.5 text-sm font-medium text-white rounded-lg bg-emerald-500 group focus:ring-4 focus:ring-emerald-300 dark:focus:ring-emerald-500 hover:bg-emerald-400"
              disabled={IsLoading} // Disable button while loading
            >
              {IsLoading ? (
                <>
                  {/* Spinner Icon displayed during loading */}
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
                "Send Reset Code" // Button text when not loading
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
