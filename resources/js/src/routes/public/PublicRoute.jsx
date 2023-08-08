/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../hooks"

export const PublicRoute = ({ children }) => {
  const { isLogin } = useAuthStore();
  return isLogin 
      ? <Navigate to="/" /> 
      : children
}
