import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

// A component that can be used for any route that needs to be protected

function ProtectedRoute(props) {
    if (localStorage.getItem('token')) {
        return props.children;
    }
    else {
        return <Navigate to="/login" />;
    }
}
export default ProtectedRoute;