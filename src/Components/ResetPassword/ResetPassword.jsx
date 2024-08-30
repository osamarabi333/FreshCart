import { useFormik } from "formik"; // Importing the useFormik hook from Formik for handling form state and validation
import * as Yup from "yup"; // Importing Yup for schema validation
import React, { useState } from "react"; // Importing React and useState for state management
import axios from "axios"; // Importing axios for making HTTP requests
import toast from "react-hot-toast"; // Importing react-hot-toast for displaying toast notifications
import { useNavigate } from "react-router-dom"; // Importing useNavigate from react-router-dom for navigation
import useScrollToTop from "../../hooks/useScrollToTop";

export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false); // State to manage loading status
  const navigate = useNavigate(); // Hook to programmatically navigate

  // hook  to make the pages when reload or refresh to back to top of page
  useScrollToTop();

  // Function to handle password reset
  async function handleResetPassword({ email, newPassword }) {
    setIsLoading(true); // Set loading to true when the request starts

    try {
      // Make an HTTP PUT request to the password reset API
      const response = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
        {
          email,
          newPassword,
        }
      );

      // Redirect to the login page after a delay
      setTimeout(() => {
        navigate("/login");
      }, 1500);

      formik.resetForm(); // Reset the form fields

      // Show a success toast notification
      toast.success("The New Password has been set successfully", {
        style: {
          backgroundColor: "#34D399", // Success toast background color
          color: "white", // Success toast text color
        },
      });
    } catch (error) {
      console.error("Error in new password request:", error); // Log error to console

      // Show an error toast notification
      toast.error(
        error.response?.data?.message ||
          "Something went wrong, please try again."
      );
    } finally {
      setIsLoading(false); // Set loading to false when the request completes
    }
  }

  // Schema validation using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Email is required"), // Email must be a valid email address and is required
    newPassword: Yup.string()
      .matches(
        /^[A-Za-z0-9]{6,10}$/, // New password must be between 6 and 10 alphanumeric characters
        "New Password must be between 6 and 10 alphanumeric characters long. Example: abcABC12"
      )
      .required("New Password is required"), // New password is required
  });

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      email: "", // Initial value for email field
      newPassword: "", // Initial value for newPassword field
    },
    validationSchema, // Apply the validation schema
    onSubmit: handleResetPassword, // Function to call on form submit
  });

  return (
    <>
      <div className="py-10">
        <h2 className="text-center text-emerald-500 font-semibold text-3xl py-5">
          Set New Password
        </h2>
      </div>

      <div className="container px-5 pb-8">
        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
          <div className="relative z-0 w-full mb-5 pb-4 group">
            <input
              onBlur={formik.handleBlur} // Handle blur event for input
              onChange={formik.handleChange} // Handle change event for input
              value={formik.values.email} // Bind input value to Formik state
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-slate-600 dark:text-white bg-transparent border-0 border-b-2 border-[#1ABC9C] appearance-none focus:outline-none focus:ring-0 focus:border-[#1ABC9C] peer"
              placeholder=" "
              aria-describedby="email-error"
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#1ABC9C] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter your email
            </label>
            {formik.errors.email && formik.touched.email ? (
              <div
                id="email-error"
                className="flex items-center p-2 mt-2 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-[#282828] dark:text-red-400 dark:border-red-800"
                role="alert"
              >
                <div>
                  <span className="font-medium">{formik.errors.email}</span>
                </div>
              </div>
            ) : null}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              onBlur={formik.handleBlur} // Handle blur event for input
              onChange={formik.handleChange} // Handle change event for input
              value={formik.values.newPassword} // Bind input value to Formik state
              type="password"
              name="newPassword"
              id="newPassword"
              className="block py-2.5 px-0 w-full text-sm text-slate-600 dark:text-white bg-transparent border-0 border-b-2 border-[#1ABC9C] appearance-none focus:outline-none focus:ring-0 focus:border-[#1ABC9C] peer"
              placeholder=" "
              aria-describedby="password-error"
            />
            <label
              htmlFor="newPassword"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#1ABC9C] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter your new password
            </label>
            {formik.errors.newPassword && formik.touched.newPassword ? (
              <div
                id="password-error"
                className="flex items-center p-2 mt-2 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-[#282828] dark:text-red-400 dark:border-red-800"
                role="alert"
              >
                <div>
                  <span className="font-medium">
                    {formik.errors.newPassword}
                  </span>
                </div>
              </div>
            ) : null}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="relative inline-flex items-center justify-center w-full px-5 py-2.5 text-sm font-medium text-white rounded-lg bg-emerald-500 group focus:ring-4 focus:ring-emerald-300 dark:focus:ring-emerald-500 hover:bg-emerald-400"
              disabled={isLoading} // Disable button when loading
            >
              {isLoading ? (
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
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5538C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.6305 75.6946 6.88551C73.5322 5.1163 69.9895 5.66758 68.6536 8.70727C67.4382 11.2988 67.4823 14.099 68.6268 16.7168C69.769 19.3353 71.5445 22.6826 73.4447 25.8883C75.0744 28.5267 76.6241 31.233 77.9468 33.9786C79.3132 36.7015 82.8269 38.501 85.7301 37.5791C88.522 36.7071 90.9512 34.6423 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  Please wait...
                </>
              ) : (
                "Reset Password"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
