
import { ReactNode, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, Wind, Info, Activity, Heart, Bot, Sparkles } from 'lucide-react';
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
      <nav className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Shield className="h-6 w-6 text-white transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-sm"></div>
                <Sparkles className="absolute -top-2 -left-2 h-3 w-3 text-yellow-400 animate-pulse" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent transition-all duration-300">
                  AirGuard AI
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1 transition-colors duration-300">Smart Air Protection</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navigation.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group hover:scale-105 ${
                      isActive(item.href)
                        ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg transform scale-105'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-green-50 dark:hover:from-blue-900/20 dark:hover:to-green-900/20 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Icon className={`h-4 w-4 transition-all duration-300 ${
                      isActive(item.href) 
                        ? 'scale-110 rotate-3' 
                        : 'group-hover:scale-110 group-hover:rotate-3'
                    }`} />
                    <span className="transition-all duration-300">{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-3">
              <ThemeToggle theme={theme} onToggle={toggleTheme} />
              
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110"
              >
                <div className="relative">
                  {isMenuOpen ? (
                    <X className="h-5 w-5 transform rotate-180 transition-transform duration-300" />
                  ) : (
                    <Menu className="h-5 w-5 transition-transform duration-300 hover:rotate-3" />
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700 animate-fade-in">
              <div className="space-y-2">
                {navigation.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 animate-fade-in ${
                        isActive(item.href)
                          ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-green-50 dark:hover:from-blue-900/20 dark:hover:to-green-900/20'
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <Icon className={`h-5 w-5 transition-all duration-300 ${
                        isActive(item.href) ? 'scale-110' : 'hover:scale-110'
                      }`} />
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

      {/* Floating ChatBot Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsChatBotOpen(true)}
          className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group animate-float"
          title="Open AI Assistant"
        >
          <Bot className="h-8 w-8 mx-auto transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse border-2 border-white"></div>
          <Sparkles className="absolute -top-2 -left-2 h-4 w-4 text-yellow-300 animate-pulse" />
        </button>
      </div>

      {/* Conditional ChatBot */}
      {isChatBotOpen && (
        <ChatBot onClose={() => setIsChatBotOpen(false)} />
      )}

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0 group">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <Shield className="h-5 w-5 text-white transition-transform duration-300 group-hover:rotate-3" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                AirGuard AI
              </span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
              <Link to="/aqi-info" className="hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105 flex items-center space-x-1">
                <Info className="h-4 w-4" />
                <span>About AQI</span>
              </Link>
              <Link to="/tips" className="hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105 flex items-center space-x-1">
                <Heart className="h-4 w-4" />
                <span>Health Tips</span>
              </Link>
              <Link to="/masks" className="hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105 flex items-center space-x-1">
                <Wind className="h-4 w-4" />
                <span>Masks</span>
              </Link>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
            <p className="animate-fade-in">© 2024 AirGuard AI. Protecting your health with smart air quality insights.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
