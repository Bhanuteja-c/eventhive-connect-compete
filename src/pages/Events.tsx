
import { useState, useEffect } from 'react';
import { EventFilter } from '@/components/EventFilter';
import { Event } from '@/types/event';
import { EventList } from '@/components/events/EventList';
import { filterEvents } from '@/components/events/EventFilterLogic';
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
        .select(`
          id,
          title,
          description,
          date,
          location,
          participants,
          image_url
        `)
        .eq('status', 'approved')
        .order('date', { ascending: true });
        
      if (error) {
        throw error;
      }
      
      if (data) {
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
    const results = filterEvents(events, filters);
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
      <EventList events={filteredEvents} />
    </div>
  );
}
