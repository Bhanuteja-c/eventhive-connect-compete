
import { Event } from '@/types/event';
import { EventImage } from './events/EventImage';
import { EventDetails } from './events/EventDetails';
import { EventActions } from './events/EventActions';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const handleButtonClick = (e: React.MouseEvent) => {
    if (!event.id) return;
    e.preventDefault();
    window.location.href = `/events/${event.id}`;
  };

  return (
    <div className="event-card">
      <EventImage image={event.image} title={event.title} />
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-1">{event.title}</h3>
        
        <EventDetails 
          date={event.date}
          location={event.location}
          participants={event.participants}
          description={event.description}
        />
        
        <EventActions 
          eventId={event.id}
          onButtonClick={handleButtonClick}
        />
      </div>
    </div>
  );
}
