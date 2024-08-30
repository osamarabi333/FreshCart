import React from "react";
// Import images for payment partners and app download buttons
import visaImage from "./../../assets/images/visa.png";
import AmericanExpressImage from "./../../assets/images/americanexpress.png";
import masterCardImage from "./../../assets/images/mastercard.png";
import payPalImage from "./../../assets/images/paypal.png";
import appleImage from "./../../assets/images/apple.png";
import playstoreImage from "./../../assets/images/playstore.png";

// Define and export the Footer component
export default function Footer() {
  return (
    <>
      {/* Main footer container */}
      <div className="relative text-center px-3 py-4 dark:bg-[#121212]  border-gray-100 dark:border-black border bottom-0 right-0 left-0 bg-gray-200">
        <div className="container">
          {/* Section for app promotion */}
          <div className="flex flex-col items-start pt-4 pb-3">
            <h3 className="font-serif text-2xl dark:text-white text-slate-800 pb-1">
              Get the FreshCart app
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              We will send you a link, open it on your phone to download the
              app.
            </p>
          </div>

          {/* Email input and share link button */}
          <div className="flex items-center pb-5">
            <input
              type="email"
              id="footerEmail"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2 mx-2 dark:bg-zinc-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Email..."
            />
            <button
              type="button"
              className="focus:outline-none text-white bg-emerald-500 hover:bg-emerald-400 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm h-10  md:w-1/5 md:px-0  md:h-9   px-1 dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:focus:ring-green-800"
            >
              Share Link
            </button>
          </div>

          {/* Divider line */}
          <div>
            <hr className="dark:border-zinc-700 border-gray-300" />
          </div>

          {/* Section for payment partners and app download buttons */}
          <div className="md:flex md:flex-row flex-col flex  md:items-center md:justify-between pt-4 px-3">
            {/* Payment partners section */}
            <div>
              <div className="images md:flex flex  gap-2">
                <p className="text-xl text-gray-700 dark:text-white">
                  Payment Partners
                </p>
                <img src={visaImage} className="h-7" alt="Visa" />
                <img
                  src={AmericanExpressImage}
                  className="h-7"
                  alt="American Express"
                />
                <img src={masterCardImage} className="h-7" alt="MasterCard" />
                <img src={payPalImage} className="h-7" alt="PayPal" />
              </div>
            </div>

            {/* App download buttons */}
            <div className="md:flex md:flex-row flex flex-col items-center gap-2 md:pt-0 pt-3">
              <p className="text-xl text-gray-700 px-2 dark:text-white">
                Get deliveries with FreshCart
              </p>
              <button>
                <img src={appleImage} className="h-9" alt="Apple Store" />
              </button>
              <button>
                <img
                  src={playstoreImage}
                  className="h-9"
                  alt="Google Play Store"
                />
              </button>
            </div>
          </div>

          {/* Final divider line */}
          <div className="pt-3 pb-10">
            <hr className="dark:border-zinc-700 border-gray-300" />
          </div>
        </div>
      </div>
    </>
  );
}
