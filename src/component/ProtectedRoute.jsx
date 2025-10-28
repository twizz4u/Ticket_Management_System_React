import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("token");

  if (!user) {
    // If no user is found in local storage, redirect to the sign-in page
    return <Navigate to="/Ticket_Management_System_React/signin" />;
  }

  return children;
};

export default ProtectedRoute;
