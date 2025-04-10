
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useLocation } from 'react-router-dom';
import { RoleBasedNavigation } from './RoleBasedNavigation';

// Mock user data - in a real app, this would come from auth context
const mockUser = {
  role: 'participant', // 'admin', 'host', 'participant', or undefined for guest
  isAuthenticated: false
};

export function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Check if on auth page
  const isAuthPage = location.pathname.includes('/signin') || location.pathname.includes('/signup');

  // If on auth page, don't show the navbar
  if (isAuthPage) {
    return null;
  }

  return (
    <nav className="md:hidden bg-sidebar dark:bg-sidebar shadow-sm z-50">
      <div className="px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold text-eventhive-primary">EventHive</span>
        </Link>

        <button
          onClick={toggleMenu}
          className="p-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent dark:hover:bg-sidebar-accent"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="absolute top-[56px] left-0 right-0 bg-sidebar dark:bg-sidebar shadow-md z-50 animate-fade-in">
          <div className="px-4 py-2 space-y-1">
            <RoleBasedNavigation 
              userRole={mockUser.isAuthenticated ? mockUser.role as any : 'guest'} 
              linkClassName={(isActive) => {
                return `flex items-center p-3 rounded-md ${
                  isActive 
                    ? 'bg-eventhive-primary text-white' 
                    : 'hover:bg-sidebar-accent dark:hover:bg-sidebar-accent'
                }`;
              }}
            />
            
            <div className="p-3">
              <ThemeToggle />
            </div>
            
            {!mockUser.isAuthenticated && (
              <div className="border-t border-sidebar-border dark:border-sidebar-border pt-2 mt-2 space-y-1">
                <Link
                  to="/signin"
                  className="block p-3 text-center rounded-md bg-eventhive-primary text-white"
                  onClick={closeMenu}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="block p-3 text-center rounded-md border border-eventhive-primary text-eventhive-primary mt-1"
                  onClick={closeMenu}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
