
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download, Send } from 'lucide-react';
import { Certificate } from '@/types/certificates';

interface CertificatesTableProps {
  certificates: Certificate[];
  onSendCertificate: (id: string) => void;
  onDownloadCertificate: (id: string) => void;
}

export function CertificatesTable({ 
  certificates, 
  onSendCertificate, 
  onDownloadCertificate 
}: CertificatesTableProps) {
  return (
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
        {certificates.length > 0 ? (
          certificates.map((cert) => (
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
                    onClick={() => onSendCertificate(cert.id)}
                    disabled={cert.status === 'sent'}
                  >
                    <Send className="h-4 w-4 mr-1" /> Send
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onDownloadCertificate(cert.id)}
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
  );
}
