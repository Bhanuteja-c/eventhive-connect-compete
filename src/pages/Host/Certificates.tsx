
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CertificatesTable } from '@/components/certificates/CertificatesTable';
import { GenerateCertificatesForm } from '@/components/certificates/GenerateCertificatesForm';
import { CertificateTemplatesGrid } from '@/components/certificates/CertificateTemplatesGrid';
import { Certificate, CertificateTemplate } from '@/types/certificates';

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
    toast({
      title: 'Certificate Sent',
      description: 'The certificate has been sent to the recipient.',
    });
    setCertificates(prev => 
      prev.map(cert => cert.id === id ? {...cert, status: 'sent' as const} : cert)
    );
  };

  const handleDownloadCertificate = (id: string) => {
    toast({
      title: 'Certificate Downloaded',
      description: 'The certificate has been downloaded.',
    });
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

              <CertificatesTable 
                certificates={filteredCertificates}
                onSendCertificate={handleSendCertificate}
                onDownloadCertificate={handleDownloadCertificate}
              />
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
              <GenerateCertificatesForm
                selectedEvent={selectedEvent}
                selectedTemplate={selectedTemplate}
                loading={loading}
                onEventChange={setSelectedEvent}
                onTemplateChange={setSelectedTemplate}
                onGenerate={handleGenerateCertificates}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="templates">
          <CertificateTemplatesGrid templates={templates} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
