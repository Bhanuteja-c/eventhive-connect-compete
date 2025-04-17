
export interface Certificate {
  id: string;
  eventName: string;
  recipientName: string;
  recipientEmail: string;
  issueDate: string;
  status: 'generated' | 'sent' | 'downloaded';
}

export interface CertificateTemplate {
  id: string;
  name: string;
  preview: string;
}
