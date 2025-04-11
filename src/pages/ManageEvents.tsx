
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash2, Eye, Award, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { LoadingState } from '@/components/ui/loading-state';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { format } from 'date-fns';

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  participants: number;
  status: string;
  image_url?: string;
}

export default function ManageEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [viewEvent, setViewEvent] = useState<Event | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    fetchEvents();
  }, [user]);

  const fetchEvents = async () => {
    try {
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      if (data) {
        // Format date for display
        const formattedEvents = data.map(event => ({
          ...event,
          date: format(new Date(event.date), 'PPP')
        }));
        setEvents(formattedEvents);
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

  const handleCreateEvent = () => {
    navigate('/submit-event');
  };

  const handleEditEvent = (id: string) => {
    // For future enhancement - edit event functionality
    toast({
      title: 'Edit functionality',
      description: 'Edit functionality will be available soon.',
    });
  };

  const handleViewEvent = (event: Event) => {
    setViewEvent(event);
  };

  const handleDeleteEvent = async () => {
    if (!deleteId) return;

    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', deleteId);

      if (error) {
        throw error;
      }

      // Remove the deleted event from state
      setEvents(events.filter(event => event.id !== deleteId));
      toast({
        title: 'Event deleted',
        description: 'Event has been successfully deleted.',
      });
    } catch (error) {
      console.error('Error deleting event:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete event. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'pending':
      default:
        return 'bg-primary/10 text-primary';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <LoadingState variant="spinner" text="Loading events..." size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Manage Events</h1>
          <p className="text-muted-foreground">Create and manage your events</p>
        </div>
        <Button onClick={handleCreateEvent}>
          <Plus className="mr-2 h-4 w-4" /> Create Event
        </Button>
      </div>
      
      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              {event.image_url ? (
                <div className="h-40 w-full overflow-hidden">
                  <img 
                    src={event.image_url} 
                    alt={event.title} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              ) : (
                <div className="h-40 bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">{event.title.charAt(0)}</span>
                </div>
              )}
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{event.title}</CardTitle>
                    <CardDescription>{event.date}</CardDescription>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full capitalize ${getStatusBadgeClass(event.status)}`}>
                    {event.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{event.description}</p>
                <div className="flex justify-between text-sm">
                  <span>Location: {event.location}</span>
                  <span>Participants: {event.participants}</span>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/50 px-6 py-3">
                <div className="flex space-x-2 w-full">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleViewEvent(event)}
                      >
                        <Eye className="h-4 w-4 mr-1" /> View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>Event Details</DialogTitle>
                      </DialogHeader>
                      {viewEvent && (
                        <div className="mt-4 space-y-6">
                          {viewEvent.image_url && (
                            <div className="mb-4 max-h-[300px] overflow-hidden rounded-md">
                              <img 
                                src={viewEvent.image_url} 
                                alt={viewEvent.title}
                                className="w-full object-cover" 
                              />
                            </div>
                          )}
                          <div className="grid gap-4">
                            <div>
                              <h3 className="text-lg font-semibold">{viewEvent.title}</h3>
                              <p className="text-sm text-muted-foreground">
                                {viewEvent.date} • {viewEvent.location}
                              </p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">Description</h4>
                              <p className="text-sm mt-1">{viewEvent.description}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">Status</h4>
                              <span className={`text-xs px-2 py-1 rounded-full capitalize ${getStatusBadgeClass(viewEvent.status)}`}>
                                {viewEvent.status}
                              </span>
                              {viewEvent.status === 'pending' && (
                                <p className="text-sm mt-1 text-muted-foreground">
                                  Your event is under review by administrators.
                                </p>
                              )}
                              {viewEvent.status === 'rejected' && (
                                <p className="text-sm mt-1 text-muted-foreground">
                                  Your event was not approved. Please create a new event with updated information.
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleEditEvent(event.id)}
                  >
                    <Edit className="h-4 w-4 mr-1" /> Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    disabled={event.status !== 'approved'}
                  >
                    <Award className="h-4 w-4 mr-1" /> Leaderboard
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 text-destructive"
                        onClick={() => setDeleteId(event.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Delete
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Delete Event</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to delete this event? This action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="mt-4">
                        <Button 
                          variant="outline" 
                          onClick={() => setDeleteId(null)}
                        >
                          Cancel
                        </Button>
                        <Button 
                          variant="destructive" 
                          onClick={handleDeleteEvent}
                          disabled={isDeleting}
                        >
                          {isDeleting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Deleting...
                            </>
                          ) : (
                            'Delete Event'
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="border rounded-lg p-12 text-center">
          <p className="text-lg mb-4">You haven't created any events yet</p>
          <Button onClick={handleCreateEvent}>
            <Plus className="mr-2 h-4 w-4" /> Create Your First Event
          </Button>
        </div>
      )}
    </div>
  );
}
