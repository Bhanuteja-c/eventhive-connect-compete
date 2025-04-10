
import { useState } from 'react';
import { mockLeaderboard, LeaderboardEntry } from '@/data/mockLeaderboard';
import { ArrowUp, ArrowDown, Minus, Search } from 'lucide-react';

export default function Leaderboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<keyof LeaderboardEntry>('rank');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  const handleSort = (key: keyof LeaderboardEntry) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };
  
  // Filter and sort leaderboard data
  const filteredLeaderboard = mockLeaderboard
    .filter(entry => 
      entry.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[sortKey] > b[sortKey] ? 1 : -1;
      } else {
        return a[sortKey] < b[sortKey] ? 1 : -1;
      }
    });
  
  const getTrendIcon = (trend: 'up' | 'down' | 'same') => {
    switch (trend) {
      case 'up':
        return <ArrowUp className="text-green-500 h-4 w-4" />;
      case 'down':
        return <ArrowDown className="text-red-500 h-4 w-4" />;
      case 'same':
        return <Minus className="text-gray-500 h-4 w-4" />;
    }
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
      
      <div className="bg-white dark:bg-card rounded-lg shadow-sm mb-6">
        <div className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search participants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 input-primary"
            />
          </div>
          
          {/* Mobile Leaderboard */}
          <div className="md:hidden">
            {filteredLeaderboard.map(entry => (
              <div 
                key={entry.id} 
                className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700 last:border-0"
              >
                <div className="w-8 font-bold text-lg">{entry.rank}</div>
                <div className="flex items-center flex-1">
                  <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                    {entry.avatar ? (
                      <img 
                        src={entry.avatar} 
                        alt={entry.name} 
                        className="h-full w-full object-cover" 
                      />
                    ) : (
                      <div className="h-full w-full bg-eventhive-primary flex items-center justify-center text-white">
                        {entry.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{entry.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                      Score: {entry.score} {getTrendIcon(entry.trend)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Desktop Leaderboard */}
          <div className="hidden md:block">
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th 
                    className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                    onClick={() => handleSort('rank')}
                  >
                    Rank
                    {sortKey === 'rank' && (
                      <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th className="p-4">Participant</th>
                  <th 
                    className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                    onClick={() => handleSort('score')}
                  >
                    Score
                    {sortKey === 'score' && (
                      <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th className="p-4">Progress</th>
                  <th className="p-4">Trend</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeaderboard.map(entry => (
                  <tr 
                    key={entry.id} 
                    className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="p-4 font-bold">{entry.rank}</td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                          {entry.avatar ? (
                            <img 
                              src={entry.avatar} 
                              alt={entry.name} 
                              className="h-full w-full object-cover" 
                            />
                          ) : (
                            <div className="h-full w-full bg-eventhive-primary flex items-center justify-center text-white">
                              {entry.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <span>{entry.name}</span>
                      </div>
                    </td>
                    <td className="p-4">{entry.score.toLocaleString()}</td>
                    <td className="p-4 w-[200px]">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div 
                          className="bg-eventhive-primary h-2.5 rounded-full"
                          style={{ width: `${entry.progress}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="p-4">
                      {getTrendIcon(entry.trend)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
