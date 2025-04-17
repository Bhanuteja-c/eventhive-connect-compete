
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { LoadingState } from '@/components/ui/loading-state';
import { Search, CheckCircle, XCircle, Award, Clipboard, Save } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useParams } from 'react-router-dom';

interface Participant {
  id: string;
  name: string;
  email: string;
  attended: boolean;
  marks: number | null;
}

export default function MarkAttendance() {
  const { eventId } = useParams<{ eventId: string }>();
  const [participants, setParticipants] = useState<Participant[]>([
    { id: '1', name: 'John Doe', email: 'john.doe@example.com', attended: true, marks: 85 },
    { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', attended: true, marks: 92 },
    { id: '3', name: 'Bob Johnson', email: 'bob.johnson@example.com', attended: false, marks: null },
    { id: '4', name: 'Alice Brown', email: 'alice.brown@example.com', attended: true, marks: 78 },
    { id: '5', name: 'Charlie Wilson', email: 'charlie.wilson@example.com', attended: false, marks: null },
  ]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [markAll, setMarkAll] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    title: 'Tech Conference 2025',
    date: new Date(2025, 4, 15).toISOString(),
    location: 'Convention Center',
    totalRegistered: 5
  });
  
  const { toast } = useToast();

  const filteredParticipants = participants.filter(participant => 
    participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    participant.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAttendanceChange = (id: string, attended: boolean) => {
    setParticipants(prev => 
      prev.map(p => p.id === id ? {...p, attended} : p)
    );
  };

  const handleMarksChange = (id: string, marks: number) => {
    setParticipants(prev => 
      prev.map(p => p.id === id ? {...p, marks} : p)
    );
  };

  const handleMarkAll = (value: boolean) => {
    setMarkAll(value);
    setParticipants(prev => 
      prev.map(p => ({...p, attended: value}))
    );
  };

  const handleSave = () => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      toast({
        title: 'Saved Successfully',
        description: 'Attendance and marks have been saved.',
      });
      setSaving(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{eventDetails.title}</h1>
          <p className="text-muted-foreground">
            {new Date(eventDetails.date).toLocaleDateString()} • {eventDetails.location}
          </p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? (
            <>
              <LoadingState variant="spinner" size="sm" className="mr-2" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" /> Save Changes
            </>
          )}
        </Button>
      </div>
      
      <Tabs defaultValue="attendance">
        <TabsList className="mb-4">
          <TabsTrigger value="attendance">Mark Attendance</TabsTrigger>
          <TabsTrigger value="marks">Assign Marks</TabsTrigger>
        </TabsList>
        
        <TabsContent value="attendance">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>Attendance ({participants.filter(p => p.attended).length}/{eventDetails.totalRegistered})</CardTitle>
                  <CardDescription>
                    Mark attendance for registered participants
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="mark-all" 
                    checked={markAll}
                    onCheckedChange={(value) => handleMarkAll(value === true)}
                  />
                  <label
                    htmlFor="mark-all"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Mark all as present
                  </label>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative mb-6">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search participants..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Present</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredParticipants.length > 0 ? (
                    filteredParticipants.map((participant) => (
                      <TableRow key={participant.id}>
                        <TableCell>
                          <Checkbox 
                            checked={participant.attended}
                            onCheckedChange={(value) => handleAttendanceChange(participant.id, value === true)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{participant.name}</TableCell>
                        <TableCell>{participant.email}</TableCell>
                        <TableCell>
                          {participant.attended ? (
                            <Badge variant="default" className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" /> Present</Badge>
                          ) : (
                            <Badge variant="outline"><XCircle className="w-3 h-3 mr-1" /> Absent</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center">
                        No participants found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="marks">
          <Card>
            <CardHeader>
              <CardTitle>Assign Marks</CardTitle>
              <CardDescription>
                Assign marks to participants who attended the event
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative mb-6">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search participants..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Marks (0-100)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredParticipants.length > 0 ? (
                    filteredParticipants.map((participant) => (
                      <TableRow key={participant.id}>
                        <TableCell className="font-medium">{participant.name}</TableCell>
                        <TableCell>{participant.email}</TableCell>
                        <TableCell>
                          {participant.attended ? (
                            <Badge variant="default" className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" /> Present</Badge>
                          ) : (
                            <Badge variant="outline"><XCircle className="w-3 h-3 mr-1" /> Absent</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={participant.marks || ''}
                            onChange={(e) => handleMarksChange(participant.id, parseInt(e.target.value, 10))}
                            disabled={!participant.attended}
                            className="w-20"
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center">
                        No participants found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
