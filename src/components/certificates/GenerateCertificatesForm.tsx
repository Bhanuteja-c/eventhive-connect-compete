
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { LoadingState } from '@/components/ui/loading-state';
import { Plus } from 'lucide-react';

interface GenerateCertificatesFormProps {
  selectedEvent: string;
  selectedTemplate: string;
  loading: boolean;
  onEventChange: (value: string) => void;
  onTemplateChange: (value: string) => void;
  onGenerate: () => void;
}

export function GenerateCertificatesForm({
  selectedEvent,
  selectedTemplate,
  loading,
  onEventChange,
  onTemplateChange,
  onGenerate,
}: GenerateCertificatesFormProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="event">Select Event</Label>
        <Select value={selectedEvent} onValueChange={onEventChange}>
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
        <Select value={selectedTemplate} onValueChange={onTemplateChange}>
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
            <Button 
              onClick={onGenerate} 
              disabled={!selectedEvent || !selectedTemplate || loading}
            >
              {loading ? (
                <>
                  <LoadingState variant="spinner" size="sm" className="mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" /> 
                  Generate Certificates
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
