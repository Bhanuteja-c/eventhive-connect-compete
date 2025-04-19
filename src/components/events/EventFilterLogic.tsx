
import { Event } from '@/components/EventCard';

interface FilterConfig {
  search?: string;
  date?: string;
  category?: string;
}

export function filterEvents(events: Event[], filters: FilterConfig): Event[] {
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
  
  return results;
}
