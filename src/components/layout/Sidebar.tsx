
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, User, Award, LogIn, UserPlus } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const location = useLocation();
  
  // Generate a class for the active link
  const getLinkClass = (path: string) => {
    const baseClass = "flex items-center p-3 rounded-md mb-2 transition-colors";
    return location.pathname === path
      ? cn(baseClass, "bg-eventhive-primary text-white")
      : cn(baseClass, "hover:bg-gray-100 dark:hover:bg-gray-800");
  };

  // Check if on auth page
  const isAuthPage = location.pathname.includes('/signin') || location.pathname.includes('/signup');

  return (
    <aside className="hidden md:flex flex-col w-[240px] h-screen bg-white dark:bg-card border-r border-gray-200 dark:border-gray-800 p-4 fixed left-0 top-0">
      <div className="mb-8">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold text-eventhive-primary">EventHive</span>
        </Link>
      </div>

      <nav className="flex-1">
        <Link to="/" className={getLinkClass("/")}>
          <Home size={20} className="mr-3" />
          <span>Home</span>
        </Link>
        <Link to="/events" className={getLinkClass("/events")}>
          <Calendar size={20} className="mr-3" />
          <span>Events</span>
        </Link>
        <Link to="/leaderboard" className={getLinkClass("/leaderboard")}>
          <Award size={20} className="mr-3" />
          <span>Leaderboard</span>
        </Link>
        <Link to="/profile" className={getLinkClass("/profile")}>
          <User size={20} className="mr-3" />
          <span>Profile</span>
        </Link>
      </nav>

      <div className="mt-auto">
        <div className="mb-4">
          <ThemeToggle />
        </div>
        
        {!isAuthPage && (
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
