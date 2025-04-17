import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Calendar, User, Award, 
  Settings, BarChart, Ticket, 
  Users, FileText, MessageSquare,
  PlusCircle, ClipboardCheck, Shield,
  CheckCircle, Clipboard
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserRole } from '@/types/auth';

interface NavItem {
  title: string;
  icon: React.ElementType;
  path: string;
  roles: UserRole[];
}

export const navigationItems: NavItem[] = [
  {
    title: 'Home',
    icon: Home,
    path: '/',
    roles: ['admin', 'host', 'user', 'guest'],
  },
  {
    title: 'Events',
    icon: Calendar,
    path: '/events',
    roles: ['admin', 'host', 'user', 'guest'],
  },
  {
    title: 'Leaderboard',
    icon: Award,
    path: '/leaderboard',
    roles: ['admin', 'host', 'user', 'guest'],
  },
  {
    title: 'Profile',
    icon: User,
    path: '/profile',
    roles: ['admin', 'host', 'user'],
  },
  {
    title: 'Dashboard',
    icon: BarChart,
    path: '/dashboard',
    roles: ['admin'],
  },
  {
    title: 'Admin Dashboard',
    icon: Shield,
    path: '/admin',
    roles: ['admin'],
  },
  {
    title: 'Manage Events',
    icon: Ticket,
    path: '/manage-events',
    roles: ['admin', 'host'],
  },
  {
    title: 'Submit Event',
    icon: PlusCircle,
    path: '/submit-event',
    roles: ['host'],
  },
  {
    title: 'Pending Approvals',
    icon: ClipboardCheck,
    path: '/pending-events',
    roles: ['admin'],
  },
  {
    title: 'Users',
    icon: Users,
    path: '/users',
    roles: ['admin'],
  },
  {
    title: 'Attendance',
    icon: CheckCircle,
    path: '/attendance',
    roles: ['host'],
  },
  {
    title: 'Certificates',
    icon: FileText,
    path: '/certificates',
    roles: ['host'],
  },
  {
    title: 'Mark Attendance',
    icon: Clipboard,
    path: '/mark-attendance',
    roles: ['host'],
  },
  {
    title: 'Reports',
    icon: FileText,
    path: '/reports',
    roles: ['admin'],
  },
  {
    title: 'Messages',
    icon: MessageSquare,
    path: '/messages',
    roles: ['admin', 'host', 'user'],
  },
  {
    title: 'Settings',
    icon: Settings,
    path: '/settings',
    roles: ['admin', 'host', 'user'],
  },
];

interface RoleBasedNavigationProps {
  userRole?: UserRole;
  className?: string;
  linkClassName?: (isActive: boolean) => string;
}

export function RoleBasedNavigation({ 
  userRole = 'guest', 
  className,
  linkClassName 
}: RoleBasedNavigationProps) {
  const location = useLocation();
  
  const filteredItems = navigationItems.filter(item => item.roles.includes(userRole));

  const defaultLinkClass = (isActive: boolean) => {
    const baseClass = "flex items-center p-3 rounded-md transition-colors";
    return isActive
      ? cn(baseClass, "bg-eventhive-primary text-white")
      : cn(baseClass, "hover:bg-gray-100 dark:hover:bg-gray-800");
  };

  const getLinkClass = linkClassName || defaultLinkClass;

  return (
    <nav className={cn("flex flex-col space-y-1", className)}>
      {filteredItems.map(item => {
        const isActive = location.pathname === item.path;
        return (
          <Link 
            key={item.path}
            to={item.path} 
            className={getLinkClass(isActive)}
          >
            <item.icon size={20} className="mr-3" />
            <span>{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}
