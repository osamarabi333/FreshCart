import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="dark:bg-[#282828]">
        <div className="container py-20 pb-8 min-h-screen">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}
