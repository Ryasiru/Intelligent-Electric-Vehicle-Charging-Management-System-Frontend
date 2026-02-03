// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Load user from storage on app start
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('@user');
      const userToken = await AsyncStorage.getItem('@token');
      
      if (userData && userToken) {
        setUser(JSON.parse(userData));
        setToken(userToken);
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      // Simulate API call
      // In real app, you would make actual API call here
      const mockUser = {
        id: '1',
        email,
        name: 'John Doe',
        phone: '+1 (555) 123-4567',
        avatar: null,
        membership: 'Premium',
        memberSince: new Date().toISOString(),
      };
      
      const mockToken = 'mock-jwt-token';
      
      // Save to AsyncStorage
      await AsyncStorage.setItem('@user', JSON.stringify(mockUser));
      await AsyncStorage.setItem('@token', mockToken);
      
      setUser(mockUser);
      setToken(mockToken);
      
      return { success: true, user: mockUser };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  const signup = async (userData) => {
    try {
      // Simulate API call
      const mockUser = {
        id: '1',
        ...userData,
        membership: 'Basic',
        memberSince: new Date().toISOString(),
      };
      
      const mockToken = 'mock-jwt-token';
      
      // Save to AsyncStorage
      await AsyncStorage.setItem('@user', JSON.stringify(mockUser));
      await AsyncStorage.setItem('@token', mockToken);
      
      setUser(mockUser);
      setToken(mockToken);
      
      return { success: true, user: mockUser };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.multiRemove(['@user', '@token']);
      setUser(null);
      setToken(null);
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
    }};

}