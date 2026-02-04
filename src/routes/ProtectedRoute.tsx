import Cookies from "js-cookie";
import type { JSX } from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = Cookies.get('access_token');
  if (!token) return <Navigate to="/login" replace />;
  return children;
};