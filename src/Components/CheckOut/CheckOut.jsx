import { useFormik } from "formik";
import { useContext } from "react";
import * as Yup from "yup";
import { CartContext } from "../../Context/CartContext";
import useScrollToTop from "../../hooks/useScrollToTop";

export default function CheckOut() {
  // Accessing the checkOut function from CartContext
  let { checkOut } = useContext(CartContext);
  // hook  to make the pages when reload or refresh to back to top of page
  useScrollToTop();

  // Defining the validation schema using Yup
  let validationSchema = Yup.object().shape({
    details: Yup.string(), // No specific validation for details, just a string
    city: Yup.string().required("City Name is required"), // City field is required
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Invalid Phone Number") // Phone must match the specified regex pattern
      .required("Phone is required"), // Phone field is required
  });

  // Initializing Formik with initial values, validation schema, and submit handler
  let formik = useFormik({
    initialValues: {
      details: "", // Initial value for details field
      phone: "", // Initial value for phone field
      city: "", // Initial value for city field
    },
    validationSchema, // Applying the validation schema defined earlier
    onSubmit: checkOut, // Using the checkOut function as the submit handler
  });

  return (
    <>
      <div className="text-white py-12 pb-16">
        <h2 className="text-center py-3 text-3xl font-semibold text-emerald-500 dark:text-white mb-2">
          CheckOut Now
        </h2>

        <div className="container px-5 pb-8">
          <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
            {/* details input field */}
            <div className="relative z-0 w-full mb-5 pb-4 group">
              <input
                onBlur={formik.handleBlur} // Handle blur event to trigger validation
                onChange={formik.handleChange} // Handle change event to update form state
                value={formik.values.details} // Binding input value to Formik state
                type="text"
                name="details"
                id="details"
                className="block py-2.5 px-0 w-full text-sm text-slate-600 dark:text-white bg-transparent border-0 border-b-2 border-[#1ABC9C] appearance-none focus:outline-none focus:ring-0 focus:border-[#1ABC9C] peer"
                placeholder=" "
              />
              <label
                htmlFor="details"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#1ABC9C] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter your Street Name
              </label>
            </div>

            {/* city input field */}
            <div className="relative z-0 w-full mb-5 pb-4 group">
              <input
                onBlur={formik.handleBlur} // Handle blur event to trigger validation
                onChange={formik.handleChange} // Handle change event to update form state
                value={formik.values.city} // Binding input value to Formik state
                type="text"
                name="city"
                id="city"
                className="block py-2.5 px-0 w-full text-sm text-slate-600 dark:text-white bg-transparent border-0 border-b-2 border-[#1ABC9C] appearance-none focus:outline-none focus:ring-0 focus:border-[#1ABC9C] peer"
                placeholder=" "
              />
              <label
                htmlFor="city"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#1ABC9C] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter your City Name
              </label>
              {/* Display validation error for city field if any */}
              {formik.errors.city && formik.touched.city ? (
                <div
                  className="flex items-center p-2 mt-2 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-[#282828] dark:text-red-400 dark:border-red-800"
                  role="alert"
                >
                  <div>
                    <span className="font-medium">{formik.errors.city}</span>
                  </div>
                </div>
              ) : null}
            </div>

            {/* phone input field */}
            <div className="relative z-0 w-full mb-5 pb-4 group">
              <input
                onBlur={formik.handleBlur} // Handle blur event to trigger validation
                onChange={formik.handleChange} // Handle change event to update form state
                value={formik.values.phone} // Binding input value to Formik state
                type="tel"
                name="phone"
                id="phone"
                className="block py-2.5 px-0 w-full text-sm text-slate-600 dark:text-white bg-transparent border-0 border-b-2 border-[#1ABC9C] appearance-none focus:outline-none focus:ring-0 focus:border-[#1ABC9C] peer"
                placeholder=" "
              />
              <label
                htmlFor="phone"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#1ABC9C] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter your Phone Number
              </label>
              {/* Display validation error for phone field if any */}
              {formik.errors.phone && formik.touched.phone ? (
                <div
                  className="flex items-center p-2 mt-2 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-[#282828] dark:text-red-400 dark:border-red-800"
                  role="alert"
                >
                  <div>
                    <span className="font-medium">{formik.errors.phone}</span>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Submit button */}
            <div className="text-center">
              <button
                type="submit"
                className="relative inline-flex items-center justify-center w-full px-5 py-2.5 text-sm font-medium text-white rounded-lg bg-emerald-500 group focus:ring-4 focus:ring-emerald-300 dark:focus:ring-emerald-500 hover:bg-emerald-400"
              >
                CheckOut
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
