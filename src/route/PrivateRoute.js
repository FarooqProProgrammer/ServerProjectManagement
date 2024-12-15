import React from "react";
import { Route, Navigate } from "react-router-dom";

const auth = localStorage.getItem("accessToken");

const PrivateRoute = ({ element: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      element={
        auth ? (
          <Component />
        ) : (
          <Navigate to={`${process.env.PUBLIC_URL}/auth-login`} />
        )
      }
    />
  );
};

export default PrivateRoute;
