
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, LoaderCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

const eventSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters.' }),
  description: z.string().min(20, { message: 'Description must be at least 20 characters.' }),
  date: z.date({ required_error: 'Event date is required.' }),
  location: z.string().min(3, { message: 'Location must be at least 3 characters.' }),
  criteria: z.string().optional(),
  image_url: z.string().url({ message: 'Invalid URL format.' }).optional().or(z.literal('')),
});

type EventFormValues = z.infer<typeof eventSchema>;

export default function SubmitEvent() {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  
  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated && !user) {
      toast({
        title: "Authentication required",
        description: "You need to be logged in to submit an event.",
        variant: "destructive",
      });
      navigate('/signin');
    }
  }, [isAuthenticated, user, navigate, toast]);

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: '',
      description: '',
      location: '',
      criteria: '',
      image_url: '',
    },
  });

  const onSubmit = async (data: EventFormValues) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You need to be logged in to submit an event.",
        variant: "destructive",
      });
      return;
    }
    
    setSubmitting(true);
    try {
      console.log("Submitting event with user_id:", user.id);
      
      const { error } = await supabase
        .from('events')
        .insert({
          title: data.title,
          description: data.description,
          date: data.date.toISOString(),
          location: data.location,
          criteria: data.criteria || null,
          image_url: data.image_url || null,
          user_id: user.id,
          status: 'pending'
        });

      if (error) {
        console.error("Error submitting event:", error);
        throw error;
      }

      toast({
        title: "Event submitted successfully",
        description: "Your event has been submitted and is pending approval.",
      });
      
      navigate('/manage-events');
    } catch (error: any) {
      console.error("Failed to submit event:", error);
      toast({
        title: "Failed to submit event",
        description: error.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (!isAuthenticated || !user) {
    return null; // Don't render anything if not authenticated
  }

  return (
    <div className="container max-w-3xl py-8">
      <h1 className="text-3xl font-bold mb-8">Submit New Event</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Event Details</CardTitle>
          <CardDescription>
            Fill out the form below to submit your event for approval.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter event title" {...field} />
                    </FormControl>
                    <FormDescription>
                      Choose a clear and descriptive title for your event.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe your event in detail" 
                        className="min-h-[120px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Include important details about your event.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Event Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0))
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Select the date when your event will take place.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter event location" {...field} />
                      </FormControl>
                      <FormDescription>
                        Specify where your event will be held.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="criteria"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Participation Criteria (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Specify any requirements for participants" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Describe any specific requirements or criteria for event participants.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="image_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Image URL (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/image.jpg" {...field} />
                    </FormControl>
                    <FormDescription>
                      Provide a direct URL to an image for your event.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <CardFooter className="px-0 pt-6 flex justify-end">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="mr-2"
                  onClick={() => navigate('/manage-events')}
                  disabled={submitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting ? (
                    <>
                      <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Event'
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
