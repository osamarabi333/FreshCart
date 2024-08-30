import React from "react";
import logo from "./../../assets/images/green-shopping-cart-10909.svg";

export default function LoadingSpinner() {
  return (
    <>
      <div className=" fixed inset-0 flex items-center justify-center bg-emerald-500/25 z-50">
        <div className="flex items-center space-x-3 rtl:space-x-reverse animate__animated animate__flash">
          <img src={logo} className="h-8" alt="FreshCart Logo" />
          <span className="self-center text-2xl font-semibold pr-4 whitespace-nowrap dark:text-white">
            Fresh Cart
          </span>
        </div>
      </div>
    </>
  );
}
