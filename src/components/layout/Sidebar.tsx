
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogIn, LogOut, UserPlus } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { RoleBasedNavigation } from './RoleBasedNavigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

export function Sidebar() {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  
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
        userRole={isAuthenticated && user ? user.role : 'guest'} 
        className="flex-1"
      />

      <div className="mt-auto">
        <div className="mb-4">
          <ThemeToggle />
        </div>
        
        {!isAuthenticated && !isAuthPage ? (
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
        ) : isAuthenticated && (
          <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
            <div className="mb-3 px-3">
              <p className="text-sm font-medium">Signed in as:</p>
              <p className="text-sm text-muted-foreground truncate">{user?.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
            </div>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30"
              onClick={logout}
            >
              <LogOut size={18} className="mr-2" />
              Sign Out
            </Button>
          </div>
        )}
      </div>
    </aside>
  );
}
