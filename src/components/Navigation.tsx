import { Menu, X, Code2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ThemeSwitcher from './ThemeSwitcher';
import { useTheme } from '../context/ThemeContext';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState<string>('#home');
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  // Track scroll for nav styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // observe sections to set active nav item
  useEffect(() => {
    const ids = navItems.map((i) => i.href);
    const observers: IntersectionObserver[] = [];

    const onIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive('#' + (entry.target as HTMLElement).id);
        }
      });
    };

    const obs = new IntersectionObserver(onIntersect, { threshold: 0.5 });
    ids.forEach((id) => {
      const el = document.querySelector(id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, []);

  const { theme } = useTheme();

  const navBase = 'fixed top-0 w-full z-50 transition-all duration-300';
  const navThemeClass =
    theme === 'glass'
      ? scrolled
        ? 'bg-white/40 backdrop-blur-md shadow-lg border-b border-white/20'
        : 'bg-white/10 backdrop-blur-md'
      : theme === 'dark'
      ? scrolled
        ? 'bg-slate-900/95 backdrop-blur-sm shadow-lg'
        : 'bg-transparent'
      : theme === 'material'
      ? scrolled
        ? 'bg-white/95 shadow-lg'
        : 'bg-white/90'
      : scrolled
      ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-blue-200'
      : 'bg-white/60 backdrop-blur-md';

  return (
    <motion.nav
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45 }}
      className={`${navBase} ${navThemeClass}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent flex items-center gap-2 cursor-pointer"
            onClick={() => scrollToSection('#home')}
          >
            <Code2 size={28} />
            Portfolio
          </motion.div>

          <div className="hidden md:flex space-x-8 relative">
            {navItems.map((item, idx) => {
              const isActive = active === item.href;
              return (
                <motion.div
                  key={item.label}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <motion.button
                    onClick={() => scrollToSection(item.href)}
                    aria-current={isActive ? 'page' : undefined}
                    whileHover={{ color: '#0284c7' }}
                    className={`font-medium transition-colors ${
                      isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="mt-2 block h-0.5 w-8 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>

          <div className="flex items-center space-x-3">
            <div className="hidden md:block">
              <ThemeSwitcher />
            </div>
            <motion.button
              className="md:hidden p-2 rounded-lg hover:bg-blue-100 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ rotate: 90 }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={`md:hidden ${
            theme === 'glass' ? 'bg-white/20 backdrop-blur-md border-t border-white/10' : theme === 'dark' ? 'bg-neutral-900/80 border-t border-neutral-800' : theme === 'material' ? 'bg-white/95 border-t border-gray-100' : 'bg-white border-t'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                  theme === 'dark'
                    ? 'text-gray-100 hover:bg-neutral-800 hover:text-white'
                    : theme === 'glass'
                    ? 'text-gray-800 hover:bg-white/10 hover:text-white'
                    : theme === 'material'
                    ? 'text-gray-800 hover:bg-gray-100'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
