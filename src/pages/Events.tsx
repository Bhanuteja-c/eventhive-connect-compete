
import { useState, useEffect } from 'react';
import { EventFilter } from '@/components/EventFilter';
import { EventCard, Event } from '@/components/EventCard';
import { BeeLoading } from '@/components/ui/bee-spinner';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    fetchApprovedEvents();
  }, []);
  
  const fetchApprovedEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'approved')
        .order('date', { ascending: true });
        
      if (error) {
        throw error;
      }
      
      if (data) {
        // Format the events data
        const formattedEvents = data.map(event => ({
          id: event.id,
          title: event.title,
          date: new Date(event.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          location: event.location,
          description: event.description,
          participants: event.participants || 0,
          image: event.image_url
        }));
        
        setEvents(formattedEvents);
        setFilteredEvents(formattedEvents);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      toast({
        title: 'Error',
        description: 'Failed to load events. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleFilterChange = (filters: {
    search?: string;
    date?: string;
    category?: string;
  }) => {
    let results = [...events];
    
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
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const nextWeek = new Date(today);
      nextWeek.setDate(nextWeek.getDate() + 7);
      const nextMonth = new Date(today);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      
      results = results.filter(event => {
        const eventDate = new Date(event.date);
        
        switch (filters.date) {
          case 'today':
            return eventDate.toDateString() === today.toDateString();
          case 'tomorrow':
            return eventDate.toDateString() === tomorrow.toDateString();
          case 'week':
            return eventDate >= today && eventDate <= nextWeek;
          case 'month':
            return eventDate >= today && eventDate <= nextMonth;
          default:
            return true;
        }
      });
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <BeeLoading message="Loading events..." />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Explore Events</h1>
      
      <EventFilter onFilterChange={handleFilterChange} />
      
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
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
