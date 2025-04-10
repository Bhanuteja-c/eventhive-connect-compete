
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { RoleBasedNavigation } from './RoleBasedNavigation';

// Mock user data - in a real app, this would come from auth context
const mockUser = {
  role: 'participant', // 'admin', 'host', 'participant', or undefined for guest
  isAuthenticated: false
};

export function Sidebar() {
  const location = useLocation();
  
  // Check if on auth page
  const isAuthPage = location.pathname.includes('/signin') || location.pathname.includes('/signup');

  return (
    <aside className="hidden md:flex flex-col w-[240px] h-screen bg-sidebar dark:bg-sidebar border-r border-sidebar-border dark:border-sidebar-border p-4 fixed left-0 top-0 z-30">
      <div className="mb-8">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold text-eventhive-primary">EventHive</span>
        </Link>
      </div>

      <RoleBasedNavigation 
        userRole={mockUser.isAuthenticated ? mockUser.role as any : 'guest'} 
        className="flex-1"
      />

      <div className="mt-auto">
        <div className="mb-4">
          <ThemeToggle />
        </div>
        
        {!mockUser.isAuthenticated && !isAuthPage && (
          <div className="space-y-2">
            <Link to="/signin" className="flex items-center p-3 rounded-md bg-eventhive-primary text-white">
              <LogIn size={20} className="mr-3" />
              <span>Sign In</span>
            </Link>
            <Link to="/signup" className="flex items-center p-3 rounded-md border border-eventhive-primary text-eventhive-primary">
              <UserPlus size={20} className="mr-3" />
              <span>Sign Up</span>
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}
