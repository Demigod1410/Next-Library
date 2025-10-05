"use client";

import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'sonner';

// Create the auth context
const AuthContext = createContext();

// Fixed credentials for the simple auth system
const VALID_USERNAME = "User1";
const VALID_PASSWORD = "123456";

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on component mount
  useEffect(() => {
    const checkAuthStatus = () => {
      const userData = localStorage.getItem('libraryUser');
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('libraryUser');
        }
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = (username, password) => {
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      const userData = { username };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('libraryUser', JSON.stringify(userData));
      toast.success('Logged in successfully');
      return true;
    } else {
      toast.error('Invalid username or password');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('libraryUser');
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);