
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CertificateTemplate } from '@/types/certificates';

interface CertificateTemplatesGridProps {
  templates: CertificateTemplate[];
}

export function CertificateTemplatesGrid({ templates }: CertificateTemplatesGridProps) {
  return (
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
  );
}
