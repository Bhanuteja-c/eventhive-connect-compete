
import { useState } from 'react';
import { Search, Calendar, Filter } from 'lucide-react';

interface EventFilterProps {
  onFilterChange: (filters: {
    search?: string;
    date?: string;
    category?: string;
  }) => void;
}

export function EventFilter({ onFilterChange }: EventFilterProps) {
  const [filters, setFilters] = useState({
    search: '',
    date: '',
    category: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white dark:bg-card p-4 rounded-lg shadow-sm mb-6">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            name="search"
            placeholder="Search events..."
            value={filters.search}
            onChange={handleChange}
            className="pl-10 input-primary"
          />
        </div>
        
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <select
            name="date"
            value={filters.date}
            onChange={handleChange}
            className="pl-10 input-primary"
          >
            <option value="">All Dates</option>
            <option value="today">Today</option>
            <option value="tomorrow">Tomorrow</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
        
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <select
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="pl-10 input-primary"
          >
            <option value="">All Categories</option>
            <option value="hackathon">Hackathon</option>
            <option value="competition">Competition</option>
            <option value="workshop">Workshop</option>
            <option value="webinar">Webinar</option>
          </select>
        </div>
      </div>
    </div>
  );
}
