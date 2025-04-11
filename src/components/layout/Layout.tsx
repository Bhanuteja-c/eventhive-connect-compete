
import React, { Suspense } from 'react';
import { MobileNavbar } from './MobileNavbar';
import { Sidebar } from './Sidebar';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { LoadingState } from '@/components/ui/loading-state';

interface LayoutProps {
  children: React.ReactNode;
}

const PageLoader = () => (
  <div className="flex justify-center items-center h-full min-h-[50vh]">
    <LoadingState 
      variant="spinner" 
      text="Loading page content..." 
      size="lg" 
    />
  </div>
);

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  
  // Check if we're on an auth page
  const isAuthPage = location.pathname.includes('/signin') || location.pathname.includes('/signup');
  
  // If on auth page, don't show the sidebar or navbar
  if (isAuthPage) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Suspense fallback={<PageLoader />}>
          {children}
        </Suspense>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <MobileNavbar />
      <Sidebar />
      <main className="flex-1 md:ml-[240px] transition-all p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <Suspense fallback={<PageLoader />}>
            {children}
          </Suspense>
        </div>
      </main>
    </div>
  );
}
