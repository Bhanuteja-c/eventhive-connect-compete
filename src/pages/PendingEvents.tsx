
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { CheckCircle, XCircle, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

// Mock pending events data
const pendingEvents = [
  { 
    id: 1, 
    title: 'Web Development Bootcamp', 
    host: 'Sarah Johnson',
    date: 'September 15, 2025', 
    description: 'A beginner-friendly bootcamp for aspiring web developers.',
    submittedOn: 'April 5, 2025',
  },
  { 
    id: 2, 
    title: 'Mobile App Hackathon', 
    host: 'Tech Innovators Group',
    date: 'October 10, 2025', 
    description: 'Create innovative mobile apps in just 48 hours with prizes for the best solutions.',
    submittedOn: 'April 8, 2025',
  },
  { 
    id: 3, 
    title: 'Cybersecurity Workshop', 
    host: 'Digital Defense Institute',
    date: 'August 22, 2025', 
    description: 'Learn practical cybersecurity skills and best practices for protecting digital assets.',
    submittedOn: 'April 9, 2025',
  },
];

export default function PendingEvents() {
  const { toast } = useToast();
  
  const handleApprove = (id: number) => {
    // In a real app, this would make an API call to approve the event
    console.log(`Approving event ${id}`);
    
    toast({
      title: 'Event Approved',
      description: 'The event has been approved and is now public.',
    });
  };
  
  const handleReject = (id: number) => {
    // In a real app, this would make an API call to reject the event
    console.log(`Rejecting event ${id}`);
    
    toast({
      title: 'Event Rejected',
      description: 'The event has been rejected and the host has been notified.',
      variant: 'destructive',
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Pending Events</h1>
        <p className="text-muted-foreground">Review and approve event submissions</p>
      </div>
      
      {pendingEvents.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center">
            <p className="text-muted-foreground">No pending events to review.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {pendingEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <CardHeader className="pb-2 bg-muted/30">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                  <div>
                    <h3 className="text-lg font-semibold">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Submitted by {event.host} on {event.submittedOn}
                    </p>
                  </div>
                  <Badge variant="outline" className="self-start md:self-auto">
                    Pending Review
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="mb-4">
                  <p className="text-sm mb-2"><span className="font-medium">Date:</span> {event.date}</p>
                  <p className="text-sm"><span className="font-medium">Description:</span> {event.description}</p>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-950/30"
                    onClick={() => handleApprove(event.id)}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30"
                    onClick={() => handleReject(event.id)}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
