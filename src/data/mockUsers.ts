
import { User, UserRole } from '@/types/auth';
import { generateUUID } from '@/utils/uuid';

export const mockUsers = [
  { id: generateUUID(), name: 'Admin User', email: 'admin@eventhive.com', password: 'password', role: 'admin' as UserRole },
  { id: generateUUID(), name: 'Host User', email: 'host@eventhive.com', password: 'password', role: 'host' as UserRole },
  { id: generateUUID(), name: 'Participant User', email: 'user@eventhive.com', password: 'password', role: 'user' as UserRole },
];
