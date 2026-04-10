import { all } from 'axios';
import React from 'react'
import { Navigate } from "react-router-dom";
export const ProtectedRoute = ({ children, allow }) => {
    const role=localStorage.getItem("role");
    if(allow=="/")
    {
        return children;
    }
    else if(!role || allow!=role)
    {
        return <Navigate to={"/" } replace/>
    }
    else{
        return children;
    }
 
}
