import React from 'react'
import { Navigate } from 'react-router-dom'

// will redirect to admin or user based on user type
const PrivateRoutes = ({ is_authenticated, isValidUser, redirect, children }) => {
  return (
    
    is_authenticated && isValidUser ? children : (<Navigate to={redirect} />)
  )
}
export default PrivateRoutes