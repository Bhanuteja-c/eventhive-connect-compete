
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Check, X, Eye, Loader2 } from 'lucide-react';
import { BeeLoading } from '@/components/ui/bee-spinner';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { format } from 'date-fns';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image_url?: string;
  criteria?: string;
  status: string;
  created_at: string;
}

export default function PendingEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchPendingEvents();
  }, []);

  const fetchPendingEvents = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      if (data) {
        // Format dates for display
        const formattedEvents = data.map(event => ({
          ...event,
          date: new Date(event.date).toISOString(),
          created_at: new Date(event.created_at).toISOString()
        }));
        setEvents(formattedEvents);
      }
    } catch (error) {
      console.error('Error fetching pending events:', error);
      toast({
        title: 'Error',
        description: 'Failed to load pending events. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateEventStatus = async (id: string, status: 'approved' | 'rejected') => {
    setActionLoading(id);
    try {
      const { error } = await supabase
        .from('events')
        .update({ status })
        .eq('id', id);

      if (error) {
        throw error;
      }

      // Update local state
      setEvents(events.filter(event => event.id !== id));
      
      toast({
        title: `Event ${status}`,
        description: `The event has been ${status} successfully.`,
      });
    } catch (error) {
      console.error(`Error ${status} event:`, error);
      toast({
        title: 'Error',
        description: `Failed to ${status} event. Please try again.`,
        variant: 'destructive',
      });
    } finally {
      setActionLoading(null);
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <BeeLoading message="Loading pending events..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Pending Approvals</h1>
      <p className="text-muted-foreground">Review and approve event submissions from hosts</p>
      
      {events.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Pending Events</CardTitle>
            <CardDescription>
              {events.length} {events.length === 1 ? 'event' : 'events'} waiting for approval
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map(event => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.title}</TableCell>
                    <TableCell>{formatDate(event.date)}</TableCell>
                    <TableCell>{event.location}</TableCell>
                    <TableCell>{formatDate(event.created_at)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedEvent(event)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl">
                            <DialogHeader>
                              <DialogTitle>Event Details</DialogTitle>
                              <DialogDescription>
                                Review the complete event information before approving
                              </DialogDescription>
                            </DialogHeader>
                            {selectedEvent && (
                              <div className="mt-4 space-y-6">
                                {selectedEvent.image_url && (
                                  <div className="mb-4 max-h-[300px] overflow-hidden rounded-md">
                                    <img 
                                      src={selectedEvent.image_url} 
                                      alt={selectedEvent.title}
                                      className="w-full object-cover" 
                                    />
                                  </div>
                                )}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div>
                                    <h3 className="text-lg font-semibold">{selectedEvent.title}</h3>
                                    <p className="text-sm text-muted-foreground">
                                      {formatDate(selectedEvent.date)} • {selectedEvent.location}
                                    </p>
                                  </div>
                                  <div className="space-y-4">
                                    <div>
                                      <h4 className="text-sm font-medium">Description</h4>
                                      <p className="text-sm mt-1">{selectedEvent.description}</p>
                                    </div>
                                    {selectedEvent.criteria && (
                                      <div>
                                        <h4 className="text-sm font-medium">Participation Criteria</h4>
                                        <p className="text-sm mt-1">{selectedEvent.criteria}</p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="flex justify-end space-x-2 mt-6">
                                  <Button 
                                    variant="destructive" 
                                    onClick={() => updateEventStatus(selectedEvent.id, 'rejected')}
                                    disabled={!!actionLoading}
                                  >
                                    {actionLoading === selectedEvent.id ? (
                                      <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Rejecting...
                                      </>
                                    ) : (
                                      <>
                                        <X className="mr-2 h-4 w-4" />
                                        Reject
                                      </>
                                    )}
                                  </Button>
                                  <Button 
                                    variant="default" 
                                    onClick={() => updateEventStatus(selectedEvent.id, 'approved')}
                                    disabled={!!actionLoading}
                                  >
                                    {actionLoading === selectedEvent.id ? (
                                      <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Approving...
                                      </>
                                    ) : (
                                      <>
                                        <Check className="mr-2 h-4 w-4" />
                                        Approve
                                      </>
                                    )}
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateEventStatus(event.id, 'rejected')}
                          disabled={actionLoading === event.id}
                          className="text-destructive hover:bg-destructive/10"
                        >
                          {actionLoading === event.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <X className="h-4 w-4" />
                          )}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateEventStatus(event.id, 'approved')}
                          disabled={actionLoading === event.id}
                          className="text-green-600 hover:bg-green-100 dark:text-green-500 dark:hover:bg-green-900/20"
                        >
                          {actionLoading === event.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Check className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <div className="border rounded-lg p-12 text-center">
          <p className="text-lg mb-4">No pending events to review</p>
          <p className="text-muted-foreground">
            All submitted events have been reviewed. Check back later for new submissions.
          </p>
        </div>
      )}
    </div>
  );
}
