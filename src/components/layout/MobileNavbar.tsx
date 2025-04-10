
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogIn, LogOut, Menu, UserPlus, X } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useLocation } from 'react-router-dom';
import { RoleBasedNavigation } from './RoleBasedNavigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

export function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

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
              userRole={isAuthenticated && user ? user.role : 'guest'} 
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
            
            {!isAuthenticated ? (
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
            ) : (
              <div className="border-t border-sidebar-border dark:border-sidebar-border pt-2 mt-2">
                <div className="mb-3 px-3">
                  <p className="text-sm font-medium">Signed in as:</p>
                  <p className="text-sm text-muted-foreground truncate">{user?.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
                </div>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30"
                  onClick={() => { logout(); closeMenu(); }}
                >
                  <LogOut size={18} className="mr-2" />
                  Sign Out
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
