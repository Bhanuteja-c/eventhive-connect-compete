
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Home, Calendar, User, Award } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useLocation } from 'react-router-dom';

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

  return (
    <nav className="md:hidden bg-white dark:bg-card shadow-sm z-50">
      <div className="px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold text-eventhive-primary">EventHive</span>
        </Link>

        <button
          onClick={toggleMenu}
          className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="absolute top-[56px] left-0 right-0 bg-white dark:bg-card shadow-md z-50 animate-fade-in">
          <div className="px-4 py-2 space-y-1">
            <Link
              to="/"
              className="flex items-center p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={closeMenu}
            >
              <Home size={20} className="mr-3" />
              <span>Home</span>
            </Link>
            <Link
              to="/events"
              className="flex items-center p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={closeMenu}
            >
              <Calendar size={20} className="mr-3" />
              <span>Events</span>
            </Link>
            <Link
              to="/leaderboard"
              className="flex items-center p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={closeMenu}
            >
              <Award size={20} className="mr-3" />
              <span>Leaderboard</span>
            </Link>
            <Link
              to="/profile"
              className="flex items-center p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={closeMenu}
            >
              <User size={20} className="mr-3" />
              <span>Profile</span>
            </Link>
            <div className="p-3">
              <ThemeToggle />
            </div>
            
            {!isAuthPage && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2 space-y-1">
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
