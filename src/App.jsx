import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Brands from "./Components/Brands/Brands";
import Cart from "./Components/Cart/Cart";
import Categories from "./Components/Categories/Categories";
import Products from "./Components/Products/Products";
import SignUp from "./Components/SignUp/SignUp";
import Login from "./Components/Login/Login";
import UserContextProvider, { UserContext } from "./Context/UserContext";
import Notfound from "./Components/Notfound/Notfound";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Components/productDetails/productDetails";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import AllOrders from "./Components/AllOrders/AllOrders";
import CheckOut from "./Components/CheckOut/CheckOut";
import CategoryProducts from "./Components/CategoryProducts/CategoryProducts";
import BrandsProducts from "./Components/BrandsProducts/BrandsProducts";
import WishList from "./Components/WishList/WishList";
import WishListContextProvider from "./Context/WishListContext";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import ResetCode from "./Components/ResetCode/ResetCode";
import ResetPassword from "./Components/ResetPassword/ResetPassword";

function App() {
  // Define the routes for the application using createBrowserRouter
  const routes = createBrowserRouter([
    {
      // Root route with a Layout component that wraps around all child routes
      path: "",
      element: <Layout />,
      children: [
        // Home route, protected by ProtectedRoute (requires authentication)
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },

        // Brands route, protected by ProtectedRoute
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },

        // Cart route, protected by ProtectedRoute
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },

        // wishlist route, protected by ProtectedRoute
        {
          path: "wishlist",
          element: (
            <ProtectedRoute>
              <WishList />
            </ProtectedRoute>
          ),
        },

        // AllOrders route, protected by ProtectedRoute
        {
          path: "allorders",
          element: (
            <ProtectedRoute>
              <AllOrders />
            </ProtectedRoute>
          ),
        },

        // CheckOut route, protected by ProtectedRoute
        {
          path: "checkout",
          element: (
            <ProtectedRoute>
              <CheckOut />
            </ProtectedRoute>
          ),
        },

        // Categories route, protected by ProtectedRoute
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },

        // Products route, protected by ProtectedRoute
        {
          path: "/products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },

        // ProductDetails route, protected by ProtectedRoute
        {
          path: "productDetails/:id/:categoryName",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        // categoryProducts route, protected by ProtectedRoute
        {
          path: "categoryProducts/:categoryName",
          element: (
            <ProtectedRoute>
              <CategoryProducts />
            </ProtectedRoute>
          ),
        },

        // brandsProducts route, protected by ProtectedRoute
        {
          path: "brandsProducts/:brandName",
          element: (
            <ProtectedRoute>
              <BrandsProducts />
            </ProtectedRoute>
          ),
        },

        // Login route, accessible without authentication
        { path: "login", element: <Login /> },

        // ForgetPassword route, accessible without authentication
        { path: "forgetpassword", element: <ForgetPassword /> },

        // ResetCode route, accessible without authentication
        { path: "resetcode", element: <ResetCode /> },

        // ResetPassword route, accessible without authentication
        { path: "resetpassword", element: <ResetPassword /> },

        // Sign-up route, accessible without authentication
        { path: "signup", element: <SignUp /> },

        // Fallback route for undefined paths, renders a NotFound component
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);

  return (
    <>
      <CartContextProvider>
        <WishListContextProvider>
          <UserContextProvider>
            <RouterProvider router={routes}></RouterProvider>
            <Toaster />
          </UserContextProvider>
        </WishListContextProvider>
      </CartContextProvider>
    </>
  );
}

export default App;
