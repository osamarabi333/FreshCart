import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";
import useScrollToTop from "../../hooks/useScrollToTop";

// This is a React functional component named `SignUp`
export default function SignUp() {
  // `useNavigate` is a React Router hook that allows you to programmatically navigate the user to a different route.
  const navigate = useNavigate();

  // Destructuring the `UserLogin` state and `setUserLogin` function from the `UserContext` using the `useContext` hook.
  // `UserLogin` holds the current state of the user's login information, and `setUserLogin` is used to update that state.
  let { UserLogin, setUserLogin } = useContext(UserContext);

  // `useState` is a React hook that creates state variables.
  // `ApiError` stores any error messages returned from the API, while `setApiError` updates it.
  // `IsLoading` tracks whether the form submission is in progress, and `setIsLoading` updates it.
  const [ApiError, setApiError] = useState("");
  const [IsLoading, setIsLoading] = useState(false);

  // `validationSchema` defines the validation rules for the form fields using Yup.
  // It ensures that the user inputs meet certain criteria (e.g., minimum/maximum length, required fields).
  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "min length is 3 characters")
      .max(10, "max length is 10")
      .required("Name is required"),
    email: Yup.string().email("invalid Email").required("Email is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "invalid Phone Number")
      .required("Phone is required"),
    password: Yup.string()
      .matches(
        /^[A-Za-z0-9]{6,10}$/,
        "Password must be between 6 and 10 alphanumeric characters long. Example: abcABC12"
      )
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "RePassword must match Password")
      .required("RePassword is required"),
  });

  // `handleRegister` is the function called when the form is submitted.
  // It sends a POST request to the signup API endpoint with the form values.
  // If the request is successful, the user is navigated to the home page.
  // If there is an error, it is captured and displayed to the user.
  function handleRegister(values) {
    setIsLoading(true); // Set loading state to true while the request is in progress
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .then((res) => {
        setIsLoading(false); // Set loading state to false when the request completes
        // console.log(res);

        if (res.data.message === "success") {
          localStorage.setItem("userToken", res.data.token); // Store the user's token in localStorage
          setUserLogin(res.data.token); // Store the user's token in userContext
          navigate("/"); // Navigate the user to the home page
        }
      })
      .catch((res) => {
        // console.log(res);
        setIsLoading(false); // Set loading state to false when the request fails
        setApiError(res.response.data.message); // Set the error message to display to the user
      });
  }

  // `formik` is an object created by the `useFormik` hook, which handles form state and validation.
  // `initialValues` sets the initial values for the form fields.
  // `validationSchema` is passed to handle validation.
  // `onSubmit` is the function that will be called when the form is submitted.
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: handleRegister, // `handleRegister` function will be called on form submission
  });

      // hook  to make the pages when reload or refresh to back to top of page
      useScrollToTop();

  // The JSX returned by this function is the UI rendered to the user.
  return (
    <>
      <div className=" text-white pt-5 w-11/12 mx-auto md:pt-0">
        <h2 className="text-center py-3 text-3xl font-semibold text-emerald-500 dark:text-white mb-2">
          Register
        </h2>

        {/* Conditionally render the API error message if there is an error */}
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
          {/* Form element with formik's handleSubmit as the submit handler */}
          <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
            {/* Name Input Field */}
            <div className="relative z-0 w-full mb-5 pb-4 group">
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
                type="text"
                name="name"
                id="name"
                className="block py-2.5 px-0 w-full text-sm text-slate-600 dark:text-white  bg-transparent border-0 border-b-2 border-[#1ABC9C] appearance-none  focus:outline-none focus:ring-0 focus:border-[#1ABC9C] peer"
                placeholder=" "
              />
              <label
                htmlFor="name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#1ABC9C] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter your Name
              </label>
              {/* Display validation error for the name field */}
              {formik.errors.name && formik.touched.name ? (
                <div
                  className="flex items-center p-2 mt-2  text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-[#282828] dark:text-red-400 dark:border-red-800"
                  role="alert"
                >
                  <div>
                    <span className="font-medium">{formik.errors.name}</span>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Email Input Field */}
            <div className="relative z-0 w-full mb-5 pb-4 group">
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                type="email"
                name="email"
                id="email"
                className="block py-2.5 px-0 w-full text-sm text-slate-600 dark:text-white  bg-transparent border-0 border-b-2 border-[#1ABC9C] appearance-none  focus:outline-none focus:ring-0 focus:border-[#1ABC9C] peer"
                placeholder=" "
              />
              <label
                htmlFor="email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#1ABC9C] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter your Email
              </label>
              {/* Display validation error for the email field */}
              {formik.errors.email && formik.touched.email ? (
                <div
                  className="flex items-center p-2 mt-2  text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-[#282828] dark:text-red-400 dark:border-red-800"
                  role="alert"
                >
                  <div>
                    <span className="font-medium">{formik.errors.email}</span>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Password Input Field */}
            <div className="relative z-0 w-full mb-5 pb-4 group">
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
                type="password"
                name="password"
                id="password"
                className="block py-2.5 px-0 w-full text-sm text-slate-600 dark:text-white  bg-transparent border-0 border-b-2 border-[#1ABC9C] appearance-none  focus:outline-none focus:ring-0 focus:border-[#1ABC9C] peer"
                placeholder=" "
              />
              <label
                htmlFor="password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#1ABC9C] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter your Password
              </label>
              {/* Display validation error for the password field */}
              {formik.errors.password && formik.touched.password ? (
                <div
                  className="flex items-center p-2 mt-2  text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-[#282828] dark:text-red-400 dark:border-red-800"
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

            {/* Re-Password Input Field */}
            <div className="relative z-0 w-full mb-5 pb-4 group">
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.rePassword}
                type="password"
                name="rePassword"
                id="rePassword"
                className="block py-2.5 px-0 w-full text-sm text-slate-600 dark:text-white   bg-transparent border-0 border-b-2 border-[#1ABC9C] appearance-none  focus:outline-none focus:ring-0 focus:border-[#1ABC9C] peer"
                placeholder=" "
              />
              <label
                htmlFor="rePassword"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#1ABC9C] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter your RePassword
              </label>
              {/* Display validation error for the rePassword field */}
              {formik.errors.rePassword && formik.touched.rePassword ? (
                <div
                  className="flex items-center p-2 mt-2  text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-[#282828] dark:text-red-400 dark:border-red-800"
                  role="alert"
                >
                  <div>
                    <span className="font-medium">
                      {formik.errors.rePassword}
                    </span>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Phone Number Input Field */}
            <div className="relative z-0 w-full mb-5 pb-4 group">
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.phone}
                type="tel"
                name="phone"
                id="phone"
                className="block py-2.5 px-0 w-full text-sm text-slate-600 dark:text-white  bg-transparent border-0 border-b-2 border-[#1ABC9C] appearance-none  focus:outline-none focus:ring-0 focus:border-[#1ABC9C] peer"
                placeholder=" "
              />
              <label
                htmlFor="phone"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#1ABC9C] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter your Phone Number
              </label>
              {/* Display validation error for the phone field */}
              {formik.errors.phone && formik.touched.phone ? (
                <div
                  className="flex items-center p-2 mt-2  text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-[#282828] dark:text-red-400 dark:border-red-800"
                  role="alert"
                >
                  <div>
                    <span className="font-medium">{formik.errors.phone}</span>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="text-center">
              {/* Submit Button */}
              <button
                type="submit"
                className="relative inline-flex items-center justify-center w-full px-5 py-2.5 text-sm font-medium text-white rounded-lg bg-emerald-500 group focus:ring-4 focus:ring-emerald-300 dark:focus:ring-emerald-500 hover:bg-emerald-400"
                disabled={IsLoading} // Disable the button if the form is loading
              >
                {IsLoading ? (
                  <>
                    {/* Loading spinner shown when the form is submitting */}
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
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5533C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8442 15.1192 80.8826 10.7233 75.2124 7.41289C69.5422 4.10251 63.2754 1.94025 56.7221 1.05126C51.7661 0.367765 46.7493 0.44618 41.8283 1.27849C39.3614 1.69443 37.9081 4.19778 38.5452 6.62326C39.1823 9.04874 41.6655 10.4718 44.1228 10.1072C47.8828 9.51249 51.7094 9.48873 55.5001 10.0434C60.8787 10.8283 66.0836 12.6245 70.786 15.3235C75.4885 18.0225 79.592 21.5644 82.9048 25.758C85.5589 29.1443 87.5733 32.8636 88.8612 36.7394C89.7472 39.1133 91.5423 40.5738 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                    {/* Loading text */}
                    Loading...
                  </>
                ) : (
                  // Button text when not loading
                  "Register"
                )}
              </button>
              {/* Link to the login page */}
              <div className="text-sm font-medium text-gray-500 dark:text-gray-300 pt-2">
                Already have an account?
                <Link
                  to="/login"
                  className="text-emerald-500 hover:underline dark:text-emerald-500 pl-1"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
