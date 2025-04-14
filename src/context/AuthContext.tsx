
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

// Define user roles
export type UserRole = 'admin' | 'host' | 'user' | 'guest';

// Define user type
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

// Define context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => void;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  userType: string;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  loading: true,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
});

// Hook for using the auth context
export const useAuth = () => useContext(AuthContext);

// Function to map from Supabase roles to frontend roles
const mapRole = (role: string): UserRole => {
  switch(role) {
    case 'admin': return 'admin';
    case 'host': return 'host';
    case 'user': return 'user';
    default: return 'guest';
  }
};

// Generate a valid UUID v4 string for mock users
const generateUUID = (): string => {
  // RFC4122 compliant UUID v4 implementation
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, 
        v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// Mock users for demonstration
const mockUsers = [
  { id: generateUUID(), name: 'Admin User', email: 'admin@eventhive.com', password: 'password', role: 'admin' as UserRole },
  { id: generateUUID(), name: 'Host User', email: 'host@eventhive.com', password: 'password', role: 'host' as UserRole },
  { id: generateUUID(), name: 'Participant User', email: 'user@eventhive.com', password: 'password', role: 'user' as UserRole },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check for stored auth on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('eventhive_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Validate the UUID format
        if (parsedUser.id && typeof parsedUser.id === 'string' && parsedUser.id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
          setUser(parsedUser);
        } else {
          // Fix the user ID by generating a valid UUID
          const fixedUser = { ...parsedUser, id: generateUUID() };
          setUser(fixedUser);
          localStorage.setItem('eventhive_user', JSON.stringify(fixedUser));
        }
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('eventhive_user');
      }
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    // Simulate API call
    try {
      setLoading(true);
      
      // Find user with matching email and password
      const foundUser = mockUsers.find(u => u.email === email && u.password === password);
      
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }
      
      // Remove password from user object before storing
      const { password: _, ...userWithoutPassword } = foundUser;
      
      // Ensure the user has a valid UUID format
      if (!userWithoutPassword.id || typeof userWithoutPassword.id !== 'string' || !userWithoutPassword.id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
        userWithoutPassword.id = generateUUID();
      }
      
      // Set user in state and localStorage
      setUser(userWithoutPassword);
      localStorage.setItem('eventhive_user', JSON.stringify(userWithoutPassword));
      
      toast({
        title: 'Signed in successfully',
        description: `Welcome back, ${userWithoutPassword.name}!`,
      });
      
      // Redirect based on role
      if (userWithoutPassword.role === 'admin') {
        navigate('/dashboard');
      } else if (userWithoutPassword.role === 'host') {
        navigate('/manage-events');
      } else {
        navigate('/events');
      }
    } catch (error) {
      toast({
        title: 'Authentication failed',
        description: error instanceof Error ? error.message : 'Failed to sign in',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Signup function
  const signup = async (userData: SignupData) => {
    try {
      setLoading(true);
      
      // Check if email already exists
      if (mockUsers.some(u => u.email === userData.email)) {
        throw new Error('Email already in use');
      }
      
      // Map userType to role
      let role: UserRole = 'user';
      if (userData.userType === 'admin') {
        role = 'admin';
      } else if (userData.userType === 'host') {
        role = 'host';
      }
      
      // Create new user with a valid UUID
      const newUser: User = {
        id: generateUUID(),
        name: userData.name,
        email: userData.email,
        role: role,
      };
      
      // In a real app, we would save this to the database
      // For now, just set in state and localStorage
      setUser(newUser);
      localStorage.setItem('eventhive_user', JSON.stringify(newUser));
      
      toast({
        title: 'Account created successfully',
        description: `Welcome to EventHive, ${newUser.name}!`,
      });
      
      // Redirect based on role
      if (newUser.role === 'admin') {
        navigate('/dashboard');
      } else if (newUser.role === 'host') {
        navigate('/manage-events');
      } else {
        navigate('/events');
      }
    } catch (error) {
      toast({
        title: 'Registration failed',
        description: error instanceof Error ? error.message : 'Failed to create account',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('eventhive_user');
    toast({
      title: 'Signed out successfully',
    });
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      loading,
      login, 
      signup, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
