
import { Calendar, Users, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  participants: number;
  image?: string;
}

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const { user, isAuthenticated } = useAuth();
  
  // Function to determine if registration button should be disabled
  const isRegistrationDisabled = () => {
    if (!isAuthenticated) return false; // Allow click to redirect to sign in
    if (!user) return false;
    // Disable registration for admin and host roles
    return user.role === 'admin' || user.role === 'host';
  };
  
  // Get button text based on role
  const getButtonText = () => {
    if (!isAuthenticated) return "Register";
    if (user && (user.role === 'admin' || user.role === 'host')) {
      return "View Details";
    }
    return "Register";
  };
  
  // Handle button click based on role
  const handleButtonClick = (e: React.MouseEvent) => {
    if (!isAuthenticated || (user && (user.role === 'admin' || user.role === 'host'))) {
      e.preventDefault();
      window.location.href = `/events/${event.id}`;
    }
  };

  return (
    <div className="event-card">
      <div className="h-40 bg-gradient-to-r from-eventhive-primary to-eventhive-secondary">
        {event.image ? (
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white">
            <span className="text-xl font-semibold">{event.title.charAt(0)}</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-1">{event.title}</h3>
        
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{event.date}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{event.location}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
          <Users className="h-4 w-4 mr-1" />
          <span>{event.participants} participants</span>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {event.description}
        </p>
        
        <div className="flex justify-between items-center">
          <Link 
            to={`/events/${event.id}`} 
            className="text-eventhive-accent hover:underline text-sm font-medium"
          >
            View Details
          </Link>
          
          <button 
            className={`btn-primary py-1.5 px-4 text-sm ${isRegistrationDisabled() ? 'opacity-70 cursor-not-allowed' : ''}`}
            onClick={handleButtonClick}
            disabled={isRegistrationDisabled() && getButtonText() === "Register"}
          >
            {getButtonText()}
          </button>
        </div>
      </div>
    </div>
  );
}
