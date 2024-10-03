// src/context/AuthContext.js

import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { LocalStorage } from "../utils";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import { toast } from 'react-hot-toast'

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for cookie on initial load
    const token = Cookies.get('authToken');
    if (token) {
      verifyToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      // Verify the token with your backend (e.g., using a MongoDB check)
      const response = await axios.get('http://localhost:5000/api/users/verify', { token });
      if (response.data.success) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (dataToSend) => {
    try {
      // dispatch(signInStart());
      const response = await axios.post('http://localhost:5000/api/users/signin', { dataToSend });

      if (response.data) {
        setIsAuthenticated(true);
        setUser(response.data.user);
        // LocalStorage.set("access_token", response.data.token);
        if (response.data.token) {
          Cookies.set('authToken', response.data.token, { expires: 1 });
        }
        LocalStorage.set("currentUser", response.data.user);
        // dispatch(signInSuccess(response.data.user));
        console.log('Signed in successfully:', dataToSend);
      } else {
        // dispatch(signInFailure(response.data.message));
        // toast.error(response.data.message, {
        //   position: 'bottom-center',
        // });
        throw new Error('Authentication failed');
      }
    } catch (error) {
      console.error('Sign-in error:', error.message);
      throw error;
    }
  };

  const signOut = () => {
    Cookies.remove('authToken'); // Remove the cookie
    setIsAuthenticated(false);
  };
  useEffect(() => {
    // const _token = LocalStorage.get("access_token");
    const _user = LocalStorage.get("currentUser");
    if (_user) {
      setUser(_user);
      setIsAuthenticated(true);
    }
  },[])

  if (loading) {
    return <div>Loading...</div>; // You can customize this loading state
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
