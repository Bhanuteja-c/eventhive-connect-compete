
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Event } from './EventCard';
import { Link } from 'react-router-dom';

interface FeaturedEventCarouselProps {
  events: Event[];
}

export function FeaturedEventCarousel({ events }: FeaturedEventCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length);
  };

  useEffect(() => {
    // Auto-scroll on desktop only
    const interval = setInterval(() => {
      if (window.innerWidth >= 768) {
        nextSlide();
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  if (events.length === 0) return null;

  const event = events[currentIndex];

  return (
    <div className="relative h-[300px] md:h-[400px] overflow-hidden rounded-xl">
      <div 
        className="absolute inset-0 bg-gradient-to-r from-eventhive-primary to-eventhive-secondary"
      >
        {event.image && (
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover opacity-70"
          />
        )}
      </div>
      
      <div className="absolute inset-0 bg-black bg-opacity-30" />
      
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 text-white">
        <div className="mb-2 text-eventhive-light font-medium">Featured Event</div>
        <h2 className="text-2xl md:text-4xl font-bold mb-2">{event.title}</h2>
        <p className="mb-4 max-w-2xl line-clamp-2 md:line-clamp-3">{event.description}</p>
        
        <div className="flex space-x-3 mb-2">
          <span className="bg-black bg-opacity-40 px-3 py-1 rounded-full text-sm">
            {event.date}
          </span>
          <span className="bg-black bg-opacity-40 px-3 py-1 rounded-full text-sm">
            {event.participants} participants
          </span>
        </div>
        
        <div className="flex space-x-3 mt-2">
          <Link 
            to={`/events/${event.id}`} 
            className="px-5 py-2 bg-eventhive-primary hover:bg-opacity-90 transition-colors rounded-md font-medium"
          >
            View Details
          </Link>
          
          <button 
            className="px-5 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors rounded-md font-medium"
          >
            Register Now
          </button>
        </div>
      </div>
      
      {/* Navigation arrows */}
      <button 
        onClick={prevSlide} 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-70 transition-opacity"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button 
        onClick={nextSlide} 
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-70 transition-opacity"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>
      
      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {events.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
