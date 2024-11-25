import React from "react";
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from "react-router-dom";


export const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children
}