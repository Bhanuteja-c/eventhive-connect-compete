
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface EventActionsProps {
  eventId: string;
  onButtonClick: (e: React.MouseEvent) => void;
}

export function EventActions({ eventId, onButtonClick }: EventActionsProps) {
  const { user, isAuthenticated } = useAuth();
  
  const isRegistrationDisabled = () => {
    if (!isAuthenticated) return false;
    if (!user) return false;
    return user.role === 'admin' || user.role === 'host';
  };
  
  const getButtonText = () => {
    if (!isAuthenticated) return "Register";
    if (user && (user.role === 'admin' || user.role === 'host')) {
      return "View Details";
    }
    return "Register";
  };

  return (
    <div className="flex justify-between items-center">
      <Link 
        to={`/events/${eventId}`} 
        className="text-eventhive-accent hover:underline text-sm font-medium"
      >
        View Details
      </Link>
      
      <button 
        className={`btn-primary py-1.5 px-4 text-sm ${isRegistrationDisabled() ? 'opacity-70 cursor-not-allowed' : ''}`}
        onClick={onButtonClick}
        disabled={isRegistrationDisabled() && getButtonText() === "Register"}
      >
        {getButtonText()}
      </button>
    </div>
  );
}
