import { createContext, useContext, useState, useEffect } from 'react';

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
    userType: 'buyer'
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
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setUserProfile(userData);
    }
    setLoading(false);
  }, []);

  const signUp = async (email, password, fullName, phone) => {
    const existingUser = STATIC_USERS.find(u => u.email === email);
    if (existingUser) {
      return {
        data: null,
        error: { message: 'User already exists' }
      };
    }

    const newUser = {
      id: String(STATIC_USERS.length + 1),
      email,
      password,
      fullName,
      phone,
      userType: null
    };

    STATIC_USERS.push(newUser);

    return {
      data: { user: { id: newUser.id, email: newUser.email } },
      error: null
    };
  };

  const signIn = async (email, password) => {
    const user = STATIC_USERS.find(
      u => u.email === email && u.password === password
    );

    if (!user) {
      return {
        data: null,
        error: { message: 'Invalid email or password' }
      };
    }

    const userData = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      phone: user.phone,
      userType: user.userType
    };

    setUser(userData);
    setUserProfile(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));

    return { data: { user: userData }, error: null };
  };

  const signOut = async () => {
    setUser(null);
    setUserProfile(null);
    localStorage.removeItem('currentUser');
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
    localStorage.setItem('currentUser', JSON.stringify(userData));

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
