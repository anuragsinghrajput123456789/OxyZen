
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Shield, Info, Lightbulb, Sparkles } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home, color: 'text-blue-600' },
    { path: '/masks', label: 'Masks', icon: Shield, color: 'text-green-600' },
    { path: '/aqi-info', label: 'AQI Info', icon: Info, color: 'text-purple-600' },
    { path: '/tips', label: 'Tips', icon: Lightbulb, color: 'text-yellow-600' },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <span className="text-white font-bold text-xl">🌫️</span>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Sparkles className="h-2 w-2 text-white" />
                  </div>
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
                  AirGuard AI
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 -mt-1">
                  Smart Protection
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group flex items-center space-x-2 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 hover:scale-105 ${
                    isActivePath(item.path)
                      ? 'bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-blue-700 dark:text-blue-300 shadow-lg'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100/70 dark:hover:bg-gray-800/70 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <item.icon className={`h-5 w-5 ${isActivePath(item.path) ? item.color : 'group-hover:text-current'} transition-colors`} />
                  <span className="font-semibold">{item.label}</span>
                  {isActivePath(item.path) && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center space-x-3">
              <ThemeToggle theme={theme} onToggle={toggleTheme} />
              
              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden w-12 h-12 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-6 border-t border-gray-200/50 dark:border-gray-700/50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl">
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                      isActivePath(item.path)
                        ? 'bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-blue-700 dark:text-blue-300'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100/70 dark:hover:bg-gray-800/70'
                    }`}
                  >
                    <item.icon className={`h-5 w-5 ${item.color}`} />
                    <span>{item.label}</span>
                    {isActivePath(item.path) && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse ml-auto" />
                    )}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">🌫️</span>
            </div>
            <span className="text-xl font-bold">AirGuard AI</span>
          </div>
          <p className="text-gray-400 text-lg">
            Protecting your health with AI-powered air quality insights
          </p>
          <p className="text-gray-500 mt-2">
            © 2024 AirGuard AI. Made with ❤️ for cleaner breathing.
          </p>
        </div>
      </footer>
    </div>
  );
};
