import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Outlet } from "react-router-dom";
import Loader from "../common/Loader";

export default function PublicRoute({ children }) {
  const auth = useContext(AuthContext);

  if (auth.isDataFetched === false) {
    return <Loader />;
  }

  return children ? children : <Outlet />;
}
