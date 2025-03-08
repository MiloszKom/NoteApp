import React, { useContext } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Loader from "../common/Loader";

export default function PrivateRoute({ children, message }) {
  const { isDataFetched, userData } = useContext(AuthContext);
  const location = useLocation();

  if (isDataFetched === false) {
    return <Loader />;
  }

  if (!userData) {
    return <Navigate to="/login" state={{ from: location, message }} replace />;
  }

  return children ? children : <Outlet />;
}
