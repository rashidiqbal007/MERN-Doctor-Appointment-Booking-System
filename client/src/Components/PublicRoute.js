import React from 'react'
import { Navigate } from 'react-router-dom';
// if already has token to auto navigate to home page
function PublicRoute(props) {
    if (localStorage.getItem('token')) {
        return <Navigate to="/" />
    }
    else {
        return props.children;
    }
}

export default PublicRoute