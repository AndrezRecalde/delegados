/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../hooks";

export const PrivateRoute = ({ redirectPath = "/auth/login", children }) => {
  let { isLogin } = useAuthStore();
  return !isLogin ? <Navigate to={redirectPath} /> : children;
};
