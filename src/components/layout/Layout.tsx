
import React from 'react';
import { MobileNavbar } from './MobileNavbar';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <MobileNavbar />
      <Sidebar />
      <main className="flex-1 md:ml-[240px] transition-all">
        {children}
      </main>
    </div>
  );
}
