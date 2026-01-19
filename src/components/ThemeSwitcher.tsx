import { useTheme } from '../context/ThemeContext';
import { SunMedium, Droplet, Moon, Layers } from 'lucide-react';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const btnBase = 'flex items-center space-x-2 px-2 py-1 rounded-md transition-all focus:outline-none focus:ring-2';

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setTheme('clean')}
        aria-label="Clean theme"
        className={`${btnBase} ${theme === 'clean' ? 'bg-accent-gradient text-white ring-2 ring-blue-300' : 'bg-white/20 text-gray-800 hover:bg-white/30'}`}
      >
        <SunMedium className="w-4 h-4" />
        <span className="sr-only">Clean</span>
      </button>

      <button
        onClick={() => setTheme('glass')}
        aria-label="Glass (frosted) theme"
        className={`${btnBase} ${theme === 'glass' ? 'bg-white/20 text-white ring-2 ring-white/30 glass-nav' : 'bg-white/10 text-gray-800 hover:bg-white/20'}`}
      >
        <Droplet className="w-4 h-4" />
        <span className="sr-only">Glass</span>
      </button>

      <button
        onClick={() => setTheme('dark')}
        aria-label="Dark theme"
        className={`${btnBase} ${theme === 'dark' ? 'bg-gradient-to-r from-indigo-500 to-pink-500 text-white ring-2 ring-pink-300' : 'bg-neutral-900/70 text-white hover:bg-neutral-900/85'}`}
      >
        <Moon className="w-4 h-4" />
        <span className="sr-only">Dark</span>
      </button>

      <button
        onClick={() => setTheme('material')}
        aria-label="Material / Neumorphism theme"
        className={`${btnBase} ${theme === 'material' ? 'bg-white shadow-md text-gray-800 ring-2 ring-gray-200' : 'bg-white/90 text-gray-800 hover:shadow-lg'}`}
      >
        <Layers className="w-4 h-4" />
        <span className="sr-only">Material</span>
      </button>
    </div>
  );
}
