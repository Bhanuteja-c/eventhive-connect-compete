
import { Calendar, MapPin, Users } from 'lucide-react';

interface EventDetailsProps {
  date: string;
  location: string;
  participants: number;
  description: string;
}

export function EventDetails({ date, location, participants, description }: EventDetailsProps) {
  return (
    <>
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
        <Calendar className="h-4 w-4 mr-1" />
        <span>{date}</span>
      </div>
      
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
        <MapPin className="h-4 w-4 mr-1" />
        <span>{location}</span>
      </div>
      
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
        <Users className="h-4 w-4 mr-1" />
        <span>{participants} participants</span>
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
        {description}
      </p>
    </>
  );
}
