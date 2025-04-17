
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart as BarChartIcon, 
  Download, 
  PieChart as PieChartIcon,
  Calendar
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const attendanceData = [
  { name: 'Tech Conference 2025', attendance: 120, registered: 150 },
  { name: 'Community Hackathon', attendance: 85, registered: 100 },
  { name: 'Design Workshop', attendance: 45, registered: 50 },
  { name: 'Startup Meetup', attendance: 65, registered: 80 },
  { name: 'AI Summit', attendance: 95, registered: 120 },
];

const roleData = [
  { name: 'Admins', value: 5, color: '#ef4444' },
  { name: 'Hosts', value: 25, color: '#3b82f6' },
  { name: 'Users', value: 120, color: '#84cc16' },
];

const COLORS = ['#ef4444', '#3b82f6', '#84cc16', '#f97316', '#8b5cf6'];

export default function Reports() {
  const [reportType, setReportType] = useState('attendance');
  const [timeRange, setTimeRange] = useState('all');

  const handleDownloadReport = () => {
    // In a real app, this would generate and download a CSV/PDF report
    alert('Downloading report...');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-muted-foreground">Generate and download system reports</p>
        </div>
        <Button onClick={handleDownloadReport}>
          <Download className="mr-2 h-4 w-4" /> Download Report
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Report Settings</CardTitle>
            <CardDescription>Configure your report parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Report Type</label>
              <Select
                value={reportType}
                onValueChange={setReportType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="attendance">Event Attendance</SelectItem>
                  <SelectItem value="users">User Distribution</SelectItem>
                  <SelectItem value="events">Event Statistics</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Time Range</label>
              <Select
                value={timeRange}
                onValueChange={setTimeRange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Last Week</SelectItem>
                  <SelectItem value="month">Last Month</SelectItem>
                  <SelectItem value="quarter">Last Quarter</SelectItem>
                  <SelectItem value="year">Last Year</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
            <CardDescription>Quick overview of key metrics</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-muted rounded-lg p-4 flex flex-col">
              <span className="text-muted-foreground text-sm">Total Events</span>
              <div className="flex items-center mt-2">
                <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                <span className="text-2xl font-bold">24</span>
              </div>
            </div>
            
            <div className="bg-muted rounded-lg p-4 flex flex-col">
              <span className="text-muted-foreground text-sm">Total Users</span>
              <div className="flex items-center mt-2">
                <BarChartIcon className="h-5 w-5 mr-2 text-green-500" />
                <span className="text-2xl font-bold">150</span>
              </div>
            </div>
            
            <div className="bg-muted rounded-lg p-4 flex flex-col">
              <span className="text-muted-foreground text-sm">Average Attendance</span>
              <div className="flex items-center mt-2">
                <PieChartIcon className="h-5 w-5 mr-2 text-purple-500" />
                <span className="text-2xl font-bold">82%</span>
              </div>
            </div>
            
            <div className="bg-muted rounded-lg p-4 flex flex-col">
              <span className="text-muted-foreground text-sm">Total Certificates</span>
              <div className="flex items-center mt-2">
                <PieChartIcon className="h-5 w-5 mr-2 text-orange-500" />
                <span className="text-2xl font-bold">320</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Visualizations</CardTitle>
          <CardDescription>Visual representation of the data</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="bar" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="bar">Bar Chart</TabsTrigger>
              <TabsTrigger value="pie">Pie Chart</TabsTrigger>
            </TabsList>
            <TabsContent value="bar">
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={attendanceData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 60,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="registered" name="Registered" fill="#3b82f6" />
                    <Bar dataKey="attendance" name="Attended" fill="#84cc16" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            <TabsContent value="pie">
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={roleData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {roleData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
