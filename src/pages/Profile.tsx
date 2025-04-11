
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { ProfileCard } from '@/components/profile/ProfileCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, BellRing, KeyRound } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground">
          View and manage your account settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ProfileCard />
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="general">
                <TabsList className="mb-4">
                  <TabsTrigger value="general">
                    <Settings className="h-4 w-4 mr-2" />
                    General
                  </TabsTrigger>
                  <TabsTrigger value="notifications">
                    <BellRing className="h-4 w-4 mr-2" />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger value="security">
                    <KeyRound className="h-4 w-4 mr-2" />
                    Security
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-4">
                  <p>
                    This is a placeholder for account settings. In a production application, 
                    you would be able to update your profile information here.
                  </p>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-4">
                  <p>
                    This is a placeholder for notification settings. In a production application,
                    you would be able to configure email and push notification preferences here.
                  </p>
                </TabsContent>

                <TabsContent value="security" className="space-y-4">
                  <p>
                    This is a placeholder for security settings. In a production application,
                    you would be able to change your password and set up two-factor authentication here.
                  </p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
