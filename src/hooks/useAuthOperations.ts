
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { User, SignupData, UserRole } from '@/types/auth';
import { mockUsers } from '@/data/mockUsers';
import { generateUUID, isValidUUID } from '@/utils/uuid';

export const useAuthOperations = () => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('eventhive_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (!isValidUUID(parsedUser.id)) {
          const fixedUser = { ...parsedUser, id: generateUUID() };
          localStorage.setItem('eventhive_user', JSON.stringify(fixedUser));
          return fixedUser;
        }
        return parsedUser;
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('eventhive_user');
      }
    }
    return null;
  });
  
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const foundUser = mockUsers.find(u => u.email === email && u.password === password);
      
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }
      
      const { password: _, ...userWithoutPassword } = foundUser;
      
      if (!isValidUUID(userWithoutPassword.id)) {
        userWithoutPassword.id = generateUUID();
      }
      
      setUser(userWithoutPassword);
      localStorage.setItem('eventhive_user', JSON.stringify(userWithoutPassword));
      
      toast({
        title: 'Signed in successfully',
        description: `Welcome back, ${userWithoutPassword.name}!`,
      });
      
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

  const signup = async (userData: SignupData) => {
    try {
      setLoading(true);
      
      if (mockUsers.some(u => u.email === userData.email)) {
        throw new Error('Email already in use');
      }
      
      let role: UserRole = 'user';
      if (userData.userType === 'admin') {
        role = 'admin';
      } else if (userData.userType === 'host') {
        role = 'host';
      }
      
      const newUser: User = {
        id: generateUUID(),
        name: userData.name,
        email: userData.email,
        role: role,
      };
      
      setUser(newUser);
      localStorage.setItem('eventhive_user', JSON.stringify(newUser));
      
      toast({
        title: 'Account created successfully',
        description: `Welcome to EventHive, ${newUser.name}!`,
      });
      
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

  const logout = () => {
    setUser(null);
    localStorage.removeItem('eventhive_user');
    toast({
      title: 'Signed out successfully',
    });
    navigate('/');
  };

  return {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    signup,
    logout,
  };
};
