
import React from 'react';
import { MobileNavbar } from './MobileNavbar';
import { Sidebar } from './Sidebar';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  
  // Check if we're on an auth page
  const isAuthPage = location.pathname.includes('/signin') || location.pathname.includes('/signup');
  
  // If on auth page, don't show the sidebar or navbar
  if (isAuthPage) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        {children}
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <MobileNavbar />
      <Sidebar />
      <main className="flex-1 md:ml-[240px] transition-all p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
