import { createContext, useContext, useState, useEffect } from 'react';
import ApiService from '../hooks/ApiService';

const AuthContext = createContext({});

const STATIC_USERS = [
  {
    id: '1',
    email: 'owner@vizaglands.com',
    password: 'owner123',
    fullName: 'John Owner',
    phone: '9876543210',
    userType: 'owner'
  },
  {
    id: '2',
    email: 'buyer@vizaglands.com',
    password: 'buyer123',
    fullName: 'Jane Buyer',
    phone: '9876543211',
    userType: 'agent'
  },
  {
    id: '3',
    email: 'buyer@vizaglands.com',
    password: 'buyer123',
    fullName: 'Jane Buyer',
    phone: '9876543211',
    userType: 'builder'
  }

];

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('clientDetails');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setUserProfile(userData);
    }
    setLoading(false);
  }, []);

  const signUp = async (email, password, fullName, phoneNumber, role) => {
    console.log("email::", email);
    console.log("password::", password);
    console.log("fullName::", fullName);
    console.log("phoneNumber::", phoneNumber);
    console.log("role::", role);
  
    try {
      const response = await ApiService.post(
        `/auth/register`,
        { fullName, phoneNumber, email, password, role },
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      const { data } = response;
      console.log("Registration response:", data);
  
      if (data?.token && data?.user) {
        // Save user/token to state/localStorage
        setUser(data.user);
        localStorage.setItem('token', data.token);
        localStorage.setItem('clientDetails', JSON.stringify(data.user));
  
        return { data, error: null };
      } else {
        return { data: null, error: { message: 'Invalid response from server' } };
      }
    } catch (err) {
      console.error('Registration failed:', err);
      const message =
        err.response?.data?.message || 'Registration failed. Please try again.';
      return { data: null, error: { message } };
    }
  };
  
  const signIn = async (email, password) => {
    try {
      const response = await ApiService.post(
        `/auth/login/client`,
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      const { data } = response;
      console.log('Login success:', data);
  
      if (data?.token && data?.user) {
        // Store token and user
        setUser(data.user);
        localStorage.setItem('token', data.token);
        localStorage.setItem('clientDetails', JSON.stringify(data.user));
  
        return { data, error: null };
      } else {
        return { data: null, error: { message: 'Invalid response from server' } };
      }
    } catch (err) {
      console.error('Login failed:', err);
  
      const message =
        err.response?.data?.message || 'Login failed. Please try again.';
  
      return { data: null, error: { message } };
    }
  };
    
  const signOut = async () => {
    setUser(null);
    setUserProfile(null);
    localStorage.clear();
    return { error: null };
  };

  const createUserProfile = async (userId, email, userType, fullName, phone) => {
    const updatedProfile = {
      id: userId,
      email,
      userType,
      fullName,
      phone
    };

    setUserProfile(updatedProfile);
    const userData = { ...user, ...updatedProfile };
    setUser(userData);
    localStorage.setItem('clientDetails', JSON.stringify(userData));

    return { data: updatedProfile, error: null };
  };

  const value = {
    user,
    userProfile,
    loading,
    signUp,
    signIn,
    signOut,
    createUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
