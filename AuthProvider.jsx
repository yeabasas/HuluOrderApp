// AuthContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Add any logic to check user authentication (e.g., check if a token exists)
  // Set the user state accordingly

  useEffect(() => {
    // Your authentication logic here
    // Example: Check if a user token exists in AsyncStorage
    const checkAuthentication = async () => {
      const token = await AsyncStorage.getItem('authToken');
      setUser(token ? { isAuthenticated: true } : null);
    };

    checkAuthentication();
  }, []);

  const signIn = (userData) => {
    // Set the user state when the user signs in
    setUser({ isAuthenticated: true, ...userData });
  };

  const signOut = () => {
    // Clear user state when the user signs out
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
