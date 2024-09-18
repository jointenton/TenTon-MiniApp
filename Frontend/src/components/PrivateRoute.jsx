import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoute() {
  const { isAuthenticated } = useAuth(); // Get the authentication status from AuthContext
  const currentUser = useSelector((state) => state.user.currentUser); // Get current user from Redux
  // const isDevelopment = process.env.NODE_ENV === 'development';

  if ('') {
    return <Outlet />;
  }

  if (currentUser === null) {
    // If the user does not exist, redirect to the signup page
    return <Navigate to='/welcome' />;
  }

  // Check if user is authenticated or redirect to signin
  return isAuthenticated ? <Outlet /> : <Navigate to='/signin' />;
}
