/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children, token }) => {
    return token ? <Navigate to="/" replace /> : children;
};
