
import { ReactNode, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, Wind, Info, Activity, Heart, Bot } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { ChatBot } from './ChatBot';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const location = useLocation();

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || systemTheme;
    setTheme(initialTheme);
    
    // Apply theme to document
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const navigation = [
    { name: 'Home', href: '/', icon: Shield },
    { name: 'AQI Monitor', href: '/aqi-monitor', icon: Activity },
    { name: 'Masks', href: '/masks', icon: Wind },
    { name: 'AQI Info', href: '/aqi-info', icon: Info },
    { name: 'Health Tips', href: '/tips', icon: Heart },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  AirGuard AI
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">Smart Air Protection</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group ${
                      isActive(item.href)
                        ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                  >
                    <Icon className={`h-4 w-4 transition-transform duration-300 ${isActive(item.href) ? 'scale-110' : 'group-hover:scale-110'}`} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-3">
              <ThemeToggle theme={theme} onToggle={toggleTheme} />
              
              {/* ChatBot Toggle Button */}
              <button
                onClick={() => setIsChatBotOpen(true)}
                className="p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110"
                title="Open AI Assistant"
              >
                <Bot className="h-5 w-5" />
              </button>
              
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
              <div className="space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                        isActive(item.href)
                          ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Conditional ChatBot */}
      {isChatBotOpen && (
        <ChatBot onClose={() => setIsChatBotOpen(false)} />
      )}

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                AirGuard AI
              </span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
              <Link to="/aqi-info" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                About AQI
              </Link>
              <Link to="/tips" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Health Tips
              </Link>
              <Link to="/masks" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Masks
              </Link>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>© 2024 AirGuard AI. Protecting your health with smart air quality insights.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
