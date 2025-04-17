
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { CalendarClock, Bell, Shield, User, Lock, BellRing, Mail, LogOut, Save } from 'lucide-react';

export default function Settings() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  
  const [formState, setFormState] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    notifications: {
      emailNotifications: true,
      newEvents: true,
      reminders: true,
      updates: false,
    }
  });
  
  const [loading, setLoading] = useState(false);
  
  const updateFormField = (field: string, value: string) => {
    setFormState(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const updateNotificationSetting = (field: string, value: boolean) => {
    setFormState(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: value
      }
    }));
  };
  
  const handleSaveProfile = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      toast({
        title: 'Profile Updated',
        description: 'Your profile information has been updated successfully.',
      });
      setLoading(false);
    }, 1000);
  };
  
  const handleChangePassword = () => {
    if (formState.newPassword !== formState.confirmPassword) {
      toast({
        title: 'Passwords Don\'t Match',
        description: 'New password and confirm password must match.',
        variant: 'destructive',
      });
      return;
    }
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      toast({
        title: 'Password Updated',
        description: 'Your password has been changed successfully.',
      });
      setFormState(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
      setLoading(false);
    }, 1000);
  };
  
  const handleSaveNotifications = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      toast({
        title: 'Notification Settings Updated',
        description: 'Your notification preferences have been saved.',
      });
      setLoading(false);
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      <p className="text-muted-foreground">Manage your account settings and preferences</p>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src="" />
                <AvatarFallback className="text-2xl">
                  {user?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-xl font-bold">{user?.name}</h2>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
                <Badge className="mt-2 capitalize">
                  {user?.role === 'admin' ? (
                    <Shield className="w-3 h-3 mr-1" />
                  ) : user?.role === 'host' ? (
                    <CalendarClock className="w-3 h-3 mr-1" />
                  ) : (
                    <User className="w-3 h-3 mr-1" />
                  )} 
                  {user?.role}
                </Badge>
              </div>
              <Button variant="outline" className="w-full" onClick={logout}>
                <LogOut className="w-4 h-4 mr-2" /> Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>
              Manage your account settings and preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="profile">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="password">
                  <Lock className="h-4 w-4 mr-2" />
                  Password
                </TabsTrigger>
                <TabsTrigger value="notifications">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input 
                        id="name" 
                        value={formState.name} 
                        onChange={(e) => updateFormField('name', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={formState.email} 
                        onChange={(e) => updateFormField('email', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-end">
                    <Button 
                      onClick={handleSaveProfile} 
                      disabled={loading}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="password" className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input 
                      id="current-password" 
                      type="password" 
                      value={formState.currentPassword} 
                      onChange={(e) => updateFormField('currentPassword', e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input 
                        id="new-password" 
                        type="password" 
                        value={formState.newPassword} 
                        onChange={(e) => updateFormField('newPassword', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input 
                        id="confirm-password" 
                        type="password" 
                        value={formState.confirmPassword} 
                        onChange={(e) => updateFormField('confirmPassword', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-end">
                    <Button 
                      onClick={handleChangePassword} 
                      disabled={
                        loading || 
                        !formState.currentPassword || 
                        !formState.newPassword || 
                        !formState.confirmPassword
                      }
                    >
                      <Lock className="h-4 w-4 mr-2" />
                      Change Password
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="notifications" className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch 
                      id="email-notifications" 
                      checked={formState.notifications.emailNotifications}
                      onCheckedChange={(value) => updateNotificationSetting('emailNotifications', value)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between py-4">
                    <div className="space-y-0.5">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        <Label htmlFor="new-events">New Events</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Get notified when new events are posted
                      </p>
                    </div>
                    <Switch 
                      id="new-events" 
                      checked={formState.notifications.newEvents}
                      onCheckedChange={(value) => updateNotificationSetting('newEvents', value)}
                      disabled={!formState.notifications.emailNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between py-4">
                    <div className="space-y-0.5">
                      <div className="flex items-center">
                        <BellRing className="h-4 w-4 mr-2 text-muted-foreground" />
                        <Label htmlFor="reminders">Event Reminders</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Receive reminders before your events
                      </p>
                    </div>
                    <Switch 
                      id="reminders" 
                      checked={formState.notifications.reminders}
                      onCheckedChange={(value) => updateNotificationSetting('reminders', value)}
                      disabled={!formState.notifications.emailNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between py-4">
                    <div className="space-y-0.5">
                      <div className="flex items-center">
                        <Bell className="h-4 w-4 mr-2 text-muted-foreground" />
                        <Label htmlFor="updates">System Updates</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Get notified about system updates and new features
                      </p>
                    </div>
                    <Switch 
                      id="updates" 
                      checked={formState.notifications.updates}
                      onCheckedChange={(value) => updateNotificationSetting('updates', value)}
                      disabled={!formState.notifications.emailNotifications}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-end">
                    <Button 
                      onClick={handleSaveNotifications} 
                      disabled={loading}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Preferences
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
