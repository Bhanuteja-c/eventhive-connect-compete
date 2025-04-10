
export interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  score: number;
  avatar?: string;
  progress: number; // 0-100
  trend: 'up' | 'down' | 'same';
}

export const mockLeaderboard: LeaderboardEntry[] = [
  {
    id: '1',
    rank: 1,
    name: 'Alex Johnson',
    score: 9845,
    avatar: 'https://i.pravatar.cc/150?img=1',
    progress: 100,
    trend: 'same'
  },
  {
    id: '2',
    rank: 2,
    name: 'Taylor Smith',
    score: 9720,
    avatar: 'https://i.pravatar.cc/150?img=2',
    progress: 98,
    trend: 'up'
  },
  {
    id: '3',
    rank: 3,
    name: 'Jamie Lee',
    score: 9450,
    avatar: 'https://i.pravatar.cc/150?img=3',
    progress: 96,
    trend: 'up'
  },
  {
    id: '4',
    rank: 4,
    name: 'Morgan Williams',
    score: 9380,
    avatar: 'https://i.pravatar.cc/150?img=4',
    progress: 95,
    trend: 'down'
  },
  {
    id: '5',
    rank: 5,
    name: 'Casey Thompson',
    score: 9210,
    avatar: 'https://i.pravatar.cc/150?img=5',
    progress: 93,
    trend: 'same'
  },
  {
    id: '6',
    rank: 6,
    name: 'Riley Davis',
    score: 9150,
    avatar: 'https://i.pravatar.cc/150?img=6',
    progress: 92,
    trend: 'up'
  },
  {
    id: '7',
    rank: 7,
    name: 'Jordan Miller',
    score: 8975,
    avatar: 'https://i.pravatar.cc/150?img=7',
    progress: 91,
    trend: 'down'
  },
  {
    id: '8',
    rank: 8,
    name: 'Quinn Wilson',
    score: 8820,
    avatar: 'https://i.pravatar.cc/150?img=8',
    progress: 89,
    trend: 'down'
  },
  {
    id: '9',
    rank: 9,
    name: 'Avery Brown',
    score: 8640,
    avatar: 'https://i.pravatar.cc/150?img=9',
    progress: 87,
    trend: 'same'
  },
  {
    id: '10',
    rank: 10,
    name: 'Reese Garcia',
    score: 8430,
    avatar: 'https://i.pravatar.cc/150?img=10',
    progress: 85,
    trend: 'up'
  }
];
