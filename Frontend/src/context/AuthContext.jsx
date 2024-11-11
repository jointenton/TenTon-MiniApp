import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { LocalStorage } from "../utils";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get('authToken');
    if (token) {
      verifyToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await axios.get(
        'http://localhost:5000/verify',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      if (response.data.isAuthenticated) {
        setIsAuthenticated(true);
        setUser(response.data.user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (dataToSend) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/signin', dataToSend);
     

      if (response.data) {
        setIsAuthenticated(true);
        setUser(response.data.user);
        if (response.data.token) {
          Cookies.set('authToken', response.data.token, { expires: 1 });
        }
        LocalStorage.set("currentUser", response.data.user);
        console.log('Signed in successfully:', dataToSend);
      } else {
        throw new Error('Authentication failed');
      }
    } catch (error) {
      console.error('Sign-in error:', error.message);
      throw error;
    }
  };

  const signOut = () => {
    Cookies.remove('authToken');
    LocalStorage.remove("currentUser");
    setIsAuthenticated(false);
    setUser(null);
  };

  const handleSave = async (updatedUserData) => {
    try {
      const token = Cookies.get('authToken');
      const response = await axios.put(
        'http://localhost:5000/api/users/update',
        updatedUserData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data.success) {
        const updatedUser = { ...user, ...response.data.user };
        setUser(updatedUser);
        LocalStorage.set("currentUser", updatedUser);
        toast.success('Profile updated successfully');
        return true;
      } else {
        toast.error(response.data.message || 'Failed to update profile');
        return false;
      }
    } catch (error) {
      console.error('Profile update error:', error.response?.data?.message || error.message);
      toast.error('An error occurred while updating the profile');
      return false;
    }
  };

  // New function to handle image upload
  const handleImageUpload = async (file) => {
    if (!file) {
      console.error("No file selected.");
      return;
    }

    // Create a FormData object to hold the file
    const formData = new FormData();
    formData.append('image', file); // Append the file to the form data

    try {
      const token = Cookies.get('authToken');
      // Send a PUT request to your backend to update the user data with the file
      const response = await axios.put('http://localhost:5000/api/users/update', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Specify the content type
        },
      });

      // Check if the upload was successful
      if (response.data.success) {
        const updatedUser = { ...user, profileImage: response.data.user.profileImage }; // Assuming the backend returns the updated user data
        setUser(updatedUser);
        LocalStorage.set("currentUser", updatedUser);
        toast.success('Profile image uploaded successfully');
      } else {
        toast.error(response.data.message || 'Failed to upload profile image');
      }
    } catch (error) {
      console.error("Error uploading file:", error.response?.data?.message || error.message);
      toast.error('An error occurred while uploading the image');
    }
  };

  useEffect(() => {
    const _user = LocalStorage.get("currentUser");
    if (_user) {
      setUser(_user);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn, signOut, handleSave, handleImageUpload }}>
      {children}
    </AuthContext.Provider>
  );
};
