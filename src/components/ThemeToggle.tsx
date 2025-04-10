
import { useTheme } from '@/context/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      size="sm"
      className="w-full justify-start px-2 group"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <div className="flex items-center">
          <div className="relative h-5 w-5 mr-2 group-hover:animate-bee-float">
            <Moon className="h-5 w-5 text-orange-500" />
            <div className="absolute bottom-[2px] right-[2px] w-1 h-1 rounded-full bg-yellow-400"></div>
          </div>
          <span className="ml-2">Dark Mode</span>
        </div>
      ) : (
        <div className="flex items-center">
          <div className="relative h-5 w-5 mr-2 group-hover:animate-bee-float">
            <Sun className="h-5 w-5 text-yellow-400" />
            <div className="absolute top-[2px] right-[2px] w-1 h-1 rounded-full bg-orange-500"></div>
          </div>
          <span className="ml-2">Light Mode</span>
        </div>
      )}
    </Button>
  );
}
