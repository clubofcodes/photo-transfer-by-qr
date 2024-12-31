import React, { useMemo } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { getAuthUser } from "../utils/auth";

const ProtectedRoute: React.FC = () => {
  const isUserAuthenticated = useMemo(
    () => !!JSON.parse(getAuthUser() ?? `{}`)?.accessToken,
    []
  );
  console.log({ isUserAuthenticated, d: getAuthUser() });

  if (isUserAuthenticated) {
    return <Navigate to="/qr-code" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
