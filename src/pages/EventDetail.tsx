
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { CalendarDays, MapPin, Users, Award, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  
  // In a real app, this would fetch event data from an API
  // For now, we'll use mock data
  const event = {
    id: id,
    title: 'Hackathon 2025',
    status: 'Registration Open',
    date: 'May 15-17, 2025',
    location: 'Tech Campus, Building A',
    organizer: 'Tech Innovation Hub',
    registrationDeadline: 'May 10, 2025',
    participants: 120,
    description: 'A 48-hour coding marathon for students and professionals. Build innovative solutions to real-world problems and compete for amazing prizes.',
    criteria: 'Open to all skill levels. Participants can join individually or in teams of up to 4 people. Basic programming knowledge is recommended.',
    schedule: [
      { time: '9:00 AM, May 15', activity: 'Opening Ceremony & Team Formation' },
      { time: '10:00 AM, May 15', activity: 'Hacking Begins' },
      { time: '10:00 AM, May 17', activity: 'Hacking Ends' },
      { time: '2:00 PM, May 17', activity: 'Presentations & Judging' },
      { time: '5:00 PM, May 17', activity: 'Awards Ceremony' },
    ],
  };
  
  const handleRegister = () => {
    // In a real app, this would make an API call to register the user
    toast({
      title: 'Registration Successful',
      description: `You've registered for ${event.title}. We'll send you further details by email.`,
    });
  };

  // Function to determine if registration button should be disabled
  const isRegistrationDisabled = () => {
    if (!isAuthenticated) return true;
    if (!user) return true;
    // Disable registration for admin and host roles
    return user.role === 'admin' || user.role === 'host';
  };
  
  // Get the registration button text based on user role and authentication
  const getRegistrationButtonText = () => {
    if (!isAuthenticated) {
      return "Sign in to Register";
    }
    if (user && (user.role === 'admin' || user.role === 'host')) {
      return `Registration not allowed for ${user.role}s`;
    }
    return "Register Now";
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <Button 
        variant="ghost" 
        className="mb-4" 
        onClick={() => navigate('/events')}
      >
        &larr; Back to Events
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <CardTitle className="text-2xl">{event.title}</CardTitle>
                  <p className="text-muted-foreground">Organized by {event.organizer}</p>
                </div>
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  {event.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 mt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <CalendarDays className="h-5 w-5 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Date</p>
                      <p className="text-sm text-muted-foreground">{event.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">{event.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Participants</p>
                      <p className="text-sm text-muted-foreground">{event.participants} registered</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Registration Deadline</p>
                      <p className="text-sm text-muted-foreground">{event.registrationDeadline}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">Description</h3>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                </div>
                
                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">Participation Criteria</h3>
                  <p className="text-sm text-muted-foreground">{event.criteria}</p>
                </div>
                
                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">Schedule</h3>
                  <div className="space-y-2">
                    {event.schedule.map((item, index) => (
                      <div key={index} className="flex">
                        <div className="w-40 text-sm font-medium shrink-0">{item.time}</div>
                        <div className="text-sm text-muted-foreground">{item.activity}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Registration</CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleRegister} 
                className="w-full" 
                disabled={isRegistrationDisabled()}
              >
                {getRegistrationButtonText()}
              </Button>
              {isAuthenticated && user && (user.role === 'admin' || user.role === 'host') && (
                <p className="mt-2 text-sm text-orange-500 text-center">
                  {user.role === 'admin' ? 'Administrators' : 'Hosts'} cannot register for events
                </p>
              )}
              {!isAuthenticated && (
                <p className="mt-2 text-sm text-muted-foreground text-center">
                  <Button variant="link" className="p-0" onClick={() => navigate('/signin')}>
                    Sign in
                  </Button> to register for this event
                </p>
              )}
              <p className="mt-4 text-sm text-muted-foreground text-center">
                Registration closes on {event.registrationDeadline}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Leaderboard</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <Award className="h-12 w-12 mx-auto text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">
                Leaderboard will be available during the event
              </p>
              <Button variant="outline" className="mt-4 w-full" disabled>
                View Leaderboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
