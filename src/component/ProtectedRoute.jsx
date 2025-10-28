import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("token");

  if (!user) {
    // If no user is found in local storage, redirect to the sign-in page
    return <Navigate to="/signin" />;
  }

  return children;
};

export default ProtectedRoute;
