
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash2, Eye, Award } from 'lucide-react';

export default function ManageEvents() {
  // Mock events data
  const events = [
    { 
      id: 1, 
      title: 'Hackathon 2025', 
      date: 'May 15, 2025', 
      participants: 120, 
      status: 'Upcoming',
      description: 'A 48-hour coding marathon for students and professionals.',
    },
    { 
      id: 2, 
      title: 'AI Workshop', 
      date: 'June 5, 2025', 
      participants: 45, 
      status: 'Registration Open',
      description: 'Learn about the latest developments in artificial intelligence.',
    },
    { 
      id: 3, 
      title: 'Design Challenge', 
      date: 'July 10, 2025', 
      participants: 78, 
      status: 'Registration Open',
      description: 'A competition for UI/UX designers to showcase their skills.',
    },
    { 
      id: 4, 
      title: 'Web Dev Conference', 
      date: 'August 20, 2025', 
      participants: 200, 
      status: 'Planning',
      description: 'A conference for web developers to learn and network.',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Manage Events</h1>
          <p className="text-muted-foreground">Create and manage your events</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create Event
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription>{event.date}</CardDescription>
                </div>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {event.status}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{event.description}</p>
              <div className="flex justify-between text-sm">
                <span>Participants: {event.participants}</span>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/50 px-6 py-3">
              <div className="flex space-x-2 w-full">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-1" /> View
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-4 w-4 mr-1" /> Edit
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Award className="h-4 w-4 mr-1" /> Leaderboard
                </Button>
                <Button variant="outline" size="sm" className="flex-1 text-destructive">
                  <Trash2 className="h-4 w-4 mr-1" /> Delete
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
