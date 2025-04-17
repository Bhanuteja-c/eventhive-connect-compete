
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { LoadingState } from '@/components/ui/loading-state';
import { UserRole } from '@/types/auth';
import { Search, UserCog, Shield, BadgeHelp } from 'lucide-react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  created_at: string;
}

export default function Users() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // This is a mock implementation since we're using mock data
      // In a real app, you would fetch from Supabase
      
      // Mock data for demonstration
      const mockUsers = [
        { id: '1', name: 'Admin User', email: 'admin@eventhive.com', role: 'admin', created_at: new Date().toISOString() },
        { id: '2', name: 'Host User', email: 'host@eventhive.com', role: 'host', created_at: new Date().toISOString() },
        { id: '3', name: 'Regular User', email: 'user@eventhive.com', role: 'user', created_at: new Date().toISOString() },
        { id: '4', name: 'Another Host', email: 'host2@eventhive.com', role: 'host', created_at: new Date().toISOString() },
        { id: '5', name: 'Another User', email: 'user2@eventhive.com', role: 'user', created_at: new Date().toISOString() },
      ];

      setUsers(mockUsers as UserData[]);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: 'Error',
        description: 'Failed to load users. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return <Badge variant="default" className="bg-red-500"><Shield className="w-3 h-3 mr-1" /> Admin</Badge>;
      case 'host':
        return <Badge variant="default" className="bg-blue-500"><UserCog className="w-3 h-3 mr-1" /> Host</Badge>;
      default:
        return <Badge variant="outline"><BadgeHelp className="w-3 h-3 mr-1" /> User</Badge>;
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <LoadingState 
          variant="spinner" 
          text="Loading users..." 
          size="lg" 
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Users Management</h1>
      <p className="text-muted-foreground">View and manage all users in the system</p>
      
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            {users.length} registered {users.length === 1 ? 'user' : 'users'} in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select
              value={roleFilter}
              onValueChange={setRoleFilter}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="host">Host</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{getRoleBadge(user.role as UserRole)}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No users found matching your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
