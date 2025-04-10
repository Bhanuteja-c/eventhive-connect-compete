
import { FeaturedEventCarousel } from '@/components/FeaturedEventCarousel';
import { EventCard } from '@/components/EventCard';
import { mockEvents } from '@/data/mockEvents';
import { Link } from 'react-router-dom';

export default function Home() {
  // Get featured and upcoming events
  const featuredEvents = mockEvents.slice(0, 3);
  const upcomingEvents = mockEvents.slice(0, 4);

  return (
    <div className="flex flex-col p-4 md:p-8">
      <section className="mb-8">
        <FeaturedEventCarousel events={featuredEvents} />
      </section>

      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Upcoming Events</h2>
          <Link to="/events" className="text-eventhive-accent hover:underline">View All</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {upcomingEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-card p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold mb-4">For Participants</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Browse and register for exciting technical challenges, hackathons, and competitions. 
              Showcase your skills, climb the leaderboards, and connect with like-minded peers.
            </p>
            <Link 
              to="/signup?type=participant" 
              className="btn-primary inline-block"
            >
              Join as Participant
            </Link>
          </div>
          
          <div className="bg-white dark:bg-card p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold mb-4">For Hosts</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Create and manage your own events. Set challenges, track participant progress, 
              and build a community around your technical interests.
            </p>
            <Link 
              to="/signup?type=host" 
              className="btn-secondary inline-block"
            >
              Become a Host
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Connect, Compete, Collaborate</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            EventHive brings together innovative minds through technical challenges and competitions.
            Whether you're looking to test your skills or find top talent, our platform provides the tools you need.
          </p>
          <Link 
            to="/events" 
            className="btn-primary inline-block"
          >
            Explore Events
          </Link>
        </div>
      </section>
    </div>
  );
}
