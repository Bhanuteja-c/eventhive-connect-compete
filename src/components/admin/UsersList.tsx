import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { BeeLoading } from '@/components/ui/bee-spinner';
import { UserRole } from '@/context/AuthContext';
import { format } from 'date-fns';

interface ProfileData {
  id: string;
  full_name: string | null;
  created_at: string | null;
  avatar_url: string | null;
  updated_at: string | null;
}

type SupabaseRole = 'admin' | 'host' | 'user';

interface RoleData {
  id: string;
  user_id: string;
  role: SupabaseRole;
  created_at: string | null;
}

interface UserData {
  id: string;
  full_name: string | null;
  created_at: string | null;
  avatar_url: string | null;
  email: string;
  role: UserRole;
}

export function UsersList() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*');

      if (profilesError) throw profilesError;

      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('*');

      if (rolesError) throw rolesError;

      const userList = profiles?.map((profile: ProfileData) => {
        const userRoleData = roles?.find((r: { user_id: string }) => r.user_id === profile.id);
        
        let userRole: UserRole = 'participant';
        if (userRoleData) {
          const supabaseRole = userRoleData.role as SupabaseRole;
          if (supabaseRole === 'admin') userRole = 'admin';
          else if (supabaseRole === 'host') userRole = 'host';
        }
        
        const email = `user-${profile.id.substring(0, 6)}@example.com`;
        
        return {
          id: profile.id,
          full_name: profile.full_name,
          email,
          created_at: profile.created_at,
          avatar_url: profile.avatar_url,
          role: userRole
        };
      }) || [];

      setUsers(userList);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRoleBadgeVariant = (role: string): "default" | "destructive" | "outline" | "secondary" => {
    switch (role) {
      case 'admin':
        return 'destructive';
      case 'host':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  if (loading) {
    return <BeeLoading message="Loading users..." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Users</CardTitle>
        <CardDescription>Manage and view all users in the system</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.full_name || 'Unknown'}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={getRoleBadgeVariant(user.role)}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>{user.created_at ? format(new Date(user.created_at), 'MMM d, yyyy') : 'Unknown'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
