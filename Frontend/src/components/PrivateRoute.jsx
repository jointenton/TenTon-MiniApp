import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoute() {
  const { isAuthenticated, user } = useAuth(); // Get the authentication status from AuthContext
  const currentUser = useSelector((state) => state.user.currentUser); // Get current user from Redux
  // const isDevelopment = process.env.NODE_ENV === 'development';

  if ('') {
    return <Outlet />;
  }

  // if (currentUser === null) {
  //   // If the user does not exist, redirect to the signup page
  //   return <Navigate to='/welcome' />;
  // }

  if (user) {
    // Redirect to home if the user has just registered
    if (currentUser) {
      return <Navigate to='/' />;
    }
    // Otherwise, render the children components
    return <Outlet />;
  }

  // Check if user is authenticated or redirect to signin
  return isAuthenticated ? <Outlet /> : <Navigate to='/welcome' />;
}
