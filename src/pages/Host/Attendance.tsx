
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { LoadingState } from '@/components/ui/loading-state';
import { Search, CheckCircle, XCircle, Eye, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  totalRegistered: number;
  totalAttended: number;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export default function Attendance() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchHostEvents();
  }, []);

  const fetchHostEvents = async () => {
    setLoading(true);
    try {
      // This is mock data for demonstration
      // In a real app, we would fetch from Supabase
      const mockEvents: Event[] = [
        {
          id: '1',
          title: 'Tech Conference 2025',
          date: new Date(2025, 4, 15).toISOString(),
          location: 'Convention Center',
          totalRegistered: 150,
          totalAttended: 120,
          status: 'completed'
        },
        {
          id: '2',
          title: 'Community Hackathon',
          date: new Date(2025, 5, 10).toISOString(),
          location: 'University Campus',
          totalRegistered: 100,
          totalAttended: 85,
          status: 'completed'
        },
        {
          id: '3',
          title: 'Design Workshop',
          date: new Date(2025, 6, 5).toISOString(),
          location: 'Design Studio',
          totalRegistered: 50,
          totalAttended: 0,
          status: 'upcoming'
        },
        {
          id: '4',
          title: 'Startup Meetup',
          date: new Date(2025, 5, 22).toISOString(),
          location: 'Co-Working Space',
          totalRegistered: 80,
          totalAttended: 0,
          status: 'ongoing'
        }
      ];
      setEvents(mockEvents);
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Badge variant="outline"><Clock className="w-3 h-3 mr-1" /> Upcoming</Badge>;
      case 'ongoing':
        return <Badge variant="default" className="bg-amber-500"><Clock className="w-3 h-3 mr-1" /> Ongoing</Badge>;
      case 'completed':
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" /> Completed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <LoadingState 
          variant="spinner" 
          text="Loading events..." 
          size="lg" 
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Attendance Management</h1>
      <p className="text-muted-foreground">View and manage attendance for your events</p>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Events</CardTitle>
          <CardDescription>
            {events.length} {events.length === 1 ? 'event' : 'events'} hosted by you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.title}</TableCell>
                    <TableCell>{format(new Date(event.date), 'MMM d, yyyy')}</TableCell>
                    <TableCell>{event.location}</TableCell>
                    <TableCell>
                      {event.status === 'upcoming' ? (
                        <span className="text-muted-foreground">Not started</span>
                      ) : (
                        <span>{event.totalAttended} / {event.totalRegistered} ({Math.round((event.totalAttended / event.totalRegistered) * 100)}%)</span>
                      )}
                    </TableCell>
                    <TableCell>{getStatusBadge(event.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/manage-attendance/${event.id}`}>
                            <Eye className="h-4 w-4 mr-1" /> View
                          </Link>
                        </Button>
                        {event.status === 'ongoing' && (
                          <Button variant="default" size="sm" asChild>
                            <Link to={`/mark-attendance/${event.id}`}>
                              <CheckCircle className="h-4 w-4 mr-1" /> Mark
                            </Link>
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No events found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
