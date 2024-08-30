// Importing React library to use JSX and component functionalities.
import React from 'react';

// Importing the Navigate component from react-router-dom to programmatically navigate users.
import { Navigate } from 'react-router-dom';

// A functional component named ProtectedRoute that wraps around protected routes in the app.
export default function ProtectedRoute(props) {
  
  // Check if "userToken" is present in local storage, indicating the user is authenticated.
  if (localStorage.getItem("userToken")) {
    
    // If authenticated, render the child components (protected content).
    return props.children;
  } else {
    
    // If not authenticated, redirect the user to the login page.
    return <Navigate to={"/login"} />;
  }
}
