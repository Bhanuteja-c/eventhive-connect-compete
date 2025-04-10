
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Ticket, BarChart3, MessageSquare } from 'lucide-react';

export default function Dashboard() {
  // Mock statistics
  const stats = [
    { title: 'Total Events', value: 32, icon: Calendar, color: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' },
    { title: 'Total Users', value: 248, icon: Users, color: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300' },
    { title: 'Active Events', value: 12, icon: Ticket, color: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300' },
    { title: 'Messages', value: 18, icon: MessageSquare, color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the EventHive admin dashboard</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <stat.icon className={`h-8 w-8 p-1.5 rounded-md ${stat.color}`} />
                <span className="text-sm text-muted-foreground">Last 30 days</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-muted-foreground">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Monitor recent events and registrations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">New event registration</p>
                    <p className="text-sm text-muted-foreground">User joined Hackathon 2025</p>
                  </div>
                  <span className="text-xs text-muted-foreground">2 hours ago</span>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">View All Activity</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Events happening in the next 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">Hackathon 2025</p>
                    <p className="text-sm text-muted-foreground">120 participants registered</p>
                  </div>
                  <span className="text-xs text-muted-foreground bg-primary/10 px-2 py-1 rounded-full">
                    May 15, 2025
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">View All Events</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
