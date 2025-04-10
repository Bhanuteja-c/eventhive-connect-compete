
import { useState } from 'react';
import { EventFilter } from '@/components/EventFilter';
import { EventCard, Event } from '@/components/EventCard';
import { mockEvents } from '@/data/mockEvents';

export default function Events() {
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(mockEvents);
  
  const handleFilterChange = (filters: {
    search?: string;
    date?: string;
    category?: string;
  }) => {
    let results = [...mockEvents];
    
    // Filter by search term
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      results = results.filter(
        event => 
          event.title.toLowerCase().includes(searchTerm) || 
          event.description.toLowerCase().includes(searchTerm)
      );
    }
    
    // Filter by date
    if (filters.date) {
      // In a real app, this would be proper date filtering
      // For now, we'll just filter by including the month name
      const dateMap: Record<string, string[]> = {
        today: ['April'],
        tomorrow: ['April'],
        week: ['April', 'May'],
        month: ['April', 'May']
      };
      
      if (dateMap[filters.date]) {
        results = results.filter(event => 
          dateMap[filters.date].some(month => event.date.includes(month))
        );
      }
    }
    
    // Filter by category
    if (filters.category) {
      // Simple category-based filtering
      // In a real app, events would have a category field
      const categoryMap: Record<string, string[]> = {
        hackathon: ['Hackathon', 'Web3'],
        competition: ['Challenge', 'Championship', 'Contest', 'Competition'],
        workshop: ['Innovation', 'Expo'],
        webinar: ['Virtual']
      };
      
      if (categoryMap[filters.category]) {
        results = results.filter(event => 
          categoryMap[filters.category].some(term => 
            event.title.includes(term) || event.description.includes(term)
          )
        );
      }
    }
    
    setFilteredEvents(results);
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Explore Events</h1>
      
      <EventFilter onFilterChange={handleFilterChange} />
      
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No events found</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Try adjusting your filters or check back later for new events.
          </p>
        </div>
      )}
    </div>
  );
}
