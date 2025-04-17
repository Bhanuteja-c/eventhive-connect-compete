
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { LoadingState } from '@/components/ui/loading-state';
import { Search, FileText, Download, Send, Certificate, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Certificate {
  id: string;
  eventName: string;
  recipientName: string;
  recipientEmail: string;
  issueDate: string;
  status: 'generated' | 'sent' | 'downloaded';
}

interface CertificateTemplate {
  id: string;
  name: string;
  preview: string;
}

export default function Certificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      id: '1',
      eventName: 'Tech Conference 2025',
      recipientName: 'John Doe',
      recipientEmail: 'john.doe@example.com',
      issueDate: new Date(2025, 4, 15).toISOString(),
      status: 'generated'
    },
    {
      id: '2',
      eventName: 'Tech Conference 2025',
      recipientName: 'Jane Smith',
      recipientEmail: 'jane.smith@example.com',
      issueDate: new Date(2025, 4, 15).toISOString(),
      status: 'sent'
    },
    {
      id: '3',
      eventName: 'Community Hackathon',
      recipientName: 'Bob Johnson',
      recipientEmail: 'bob.johnson@example.com',
      issueDate: new Date(2025, 5, 10).toISOString(),
      status: 'downloaded'
    }
  ]);

  const [templates, setTemplates] = useState<CertificateTemplate[]>([
    {
      id: '1',
      name: 'Standard Certificate',
      preview: 'https://example.com/certificate1.jpg'
    },
    {
      id: '2',
      name: 'Premium Certificate',
      preview: 'https://example.com/certificate2.jpg'
    },
    {
      id: '3',
      name: 'Modern Certificate',
      preview: 'https://example.com/certificate3.jpg'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const { toast } = useToast();

  const filteredCertificates = certificates.filter(cert => 
    cert.recipientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.recipientEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.eventName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGenerateCertificates = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      toast({
        title: 'Certificates Generated',
        description: `Certificates have been generated for ${selectedEvent}`,
      });
      setLoading(false);
    }, 1500);
  };

  const handleSendCertificate = (id: string) => {
    // Simulate sending certificate
    toast({
      title: 'Certificate Sent',
      description: 'The certificate has been sent to the recipient.',
    });
    // Update certificate status
    setCertificates(prev => 
      prev.map(cert => cert.id === id ? {...cert, status: 'sent' as const} : cert)
    );
  };

  const handleDownloadCertificate = (id: string) => {
    // Simulate download certificate
    toast({
      title: 'Certificate Downloaded',
      description: 'The certificate has been downloaded.',
    });
    // Update certificate status
    setCertificates(prev => 
      prev.map(cert => cert.id === id ? {...cert, status: 'downloaded' as const} : cert)
    );
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Certificates</h1>
      <p className="text-muted-foreground">Generate and manage event certificates</p>
      
      <Tabs defaultValue="existing">
        <TabsList className="mb-4">
          <TabsTrigger value="existing">Existing Certificates</TabsTrigger>
          <TabsTrigger value="generate">Generate Certificates</TabsTrigger>
          <TabsTrigger value="templates">Certificate Templates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="existing">
          <Card>
            <CardHeader>
              <CardTitle>Existing Certificates</CardTitle>
              <CardDescription>
                {certificates.length} {certificates.length === 1 ? 'certificate' : 'certificates'} issued
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative mb-6">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search certificates..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Recipient</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCertificates.length > 0 ? (
                    filteredCertificates.map((cert) => (
                      <TableRow key={cert.id}>
                        <TableCell>{cert.eventName}</TableCell>
                        <TableCell className="font-medium">{cert.recipientName}</TableCell>
                        <TableCell>{cert.recipientEmail}</TableCell>
                        <TableCell>{new Date(cert.issueDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            cert.status === 'generated' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                            cert.status === 'sent' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                            'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
                          }`}>
                            {cert.status.charAt(0).toUpperCase() + cert.status.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleSendCertificate(cert.id)}
                              disabled={cert.status === 'sent'}
                            >
                              <Send className="h-4 w-4 mr-1" /> Send
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDownloadCertificate(cert.id)}
                            >
                              <Download className="h-4 w-4 mr-1" /> Download
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No certificates found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="generate">
          <Card>
            <CardHeader>
              <CardTitle>Generate Certificates</CardTitle>
              <CardDescription>
                Create certificates for event participants
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="event">Select Event</Label>
                  <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                    <SelectTrigger id="event">
                      <SelectValue placeholder="Select an event" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Tech Conference 2025</SelectItem>
                      <SelectItem value="2">Community Hackathon</SelectItem>
                      <SelectItem value="3">Design Workshop</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="template">Certificate Template</Label>
                  <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                    <SelectTrigger id="template">
                      <SelectValue placeholder="Select a template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Standard Certificate</SelectItem>
                      <SelectItem value="2">Premium Certificate</SelectItem>
                      <SelectItem value="3">Modern Certificate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Recipients</Label>
                  <div className="border rounded-md p-4 bg-muted/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Generate for all attendees</p>
                        <p className="text-sm text-muted-foreground">
                          Certificates will be generated for all participants who attended the selected event
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          onClick={handleGenerateCertificates} 
                          disabled={!selectedEvent || !selectedTemplate || loading}
                        >
                          {loading ? (
                            <>
                              <LoadingState variant="spinner" size="sm" className="mr-2" />
                              Generating...
                            </>
                          ) : (
                            <>
                              <Certificate className="h-4 w-4 mr-2" /> 
                              Generate Certificates
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="templates">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {templates.map(template => (
              <Card key={template.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md overflow-hidden h-48 mb-4 bg-gray-100 flex items-center justify-center">
                    <FileText className="h-16 w-16 text-gray-400" />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-1" /> Preview
                    </Button>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Dialog>
              <DialogTrigger asChild>
                <div className="border border-dashed rounded-lg flex items-center justify-center h-[252px] cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="text-center p-6">
                    <Plus className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="font-medium">Add New Template</p>
                    <p className="text-sm text-muted-foreground">Create a custom certificate template</p>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Template</DialogTitle>
                  <DialogDescription>
                    Add a new certificate template to use for your events.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Template Name</Label>
                    <Input id="name" placeholder="Enter template name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Template Design</Label>
                    <div className="border border-dashed rounded-md p-8 text-center">
                      <FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm font-medium">Drop your design file here or click to upload</p>
                      <p className="text-xs text-muted-foreground mt-1">Supports JPG, PNG, PDF</p>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button>Create Template</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
