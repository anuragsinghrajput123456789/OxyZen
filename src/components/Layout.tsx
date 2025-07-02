
import { ReactNode, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, Wind, Info, Activity, Heart, Bot, Sparkles, Zap } from 'lucide-react';
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
    { name: 'Mask Recommendation', href: '/mask-recommendation', icon: Zap },
    { name: 'Masks', href: '/masks', icon: Wind },
    { name: 'AQI Info', href: '/aqi-info', icon: Info },
    { name: 'Health Tips', href: '/tips', icon: Heart },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Enhanced Navigation */}
      <nav className="bg-white/98 dark:bg-gray-800/98 backdrop-blur-xl border-b-2 border-gradient-to-r from-blue-200 to-green-200 dark:border-gray-700 sticky top-0 z-50 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18">
            {/* Enhanced Logo */}
            <Link to="/" className="flex items-center space-x-4 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-green-600 rounded-2xl flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <Shield className="h-7 w-7 text-white transition-transform duration-500 group-hover:scale-125" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full animate-pulse shadow-lg border-2 border-white dark:border-gray-800"></div>
                <Sparkles className="absolute -top-3 -left-3 h-4 w-4 text-yellow-400 animate-pulse" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent transition-all duration-500 group-hover:scale-105">
                  AirGuard AI
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 -mt-1 font-medium transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  Smart Air Protection
                </p>
              </div>
            </Link>

            {/* Enhanced Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navigation.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-3 px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-400 group hover:scale-110 relative overflow-hidden ${
                      isActive(item.href)
                        ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 text-white shadow-2xl transform scale-110 border-2 border-white/20'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-100 hover:via-purple-50 hover:to-green-100 dark:hover:from-blue-900/30 dark:hover:via-purple-900/20 dark:hover:to-green-900/30 hover:text-blue-700 dark:hover:text-blue-300 hover:shadow-lg'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`transition-all duration-400 ${
                      isActive(item.href) 
                        ? 'scale-125 rotate-12' 
                        : 'group-hover:scale-125 group-hover:rotate-12'
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="transition-all duration-400 font-medium tracking-wide">
                      {item.name}
                    </span>
                    {isActive(item.href) && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-green-600/10 rounded-2xl animate-pulse"></div>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Enhanced Right side actions */}
            <div className="flex items-center space-x-4">
              <ThemeToggle theme={theme} onToggle={toggleTheme} />
              
              {/* Enhanced Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-3 rounded-2xl text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 transition-all duration-400 hover:scale-110 shadow-lg"
              >
                <div className="relative">
                  {isMenuOpen ? (
                    <X className="h-6 w-6 transform rotate-180 transition-transform duration-400" />
                  ) : (
                    <Menu className="h-6 w-6 transition-transform duration-400 hover:rotate-12" />
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Enhanced Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-6 border-t-2 border-gradient-to-r from-blue-200 to-green-200 dark:border-gray-700 animate-fade-in bg-gradient-to-b from-white/95 to-gray-50/95 dark:from-gray-800/95 dark:to-gray-900/95 backdrop-blur-xl rounded-b-2xl shadow-2xl">
              <div className="space-y-3 px-2">
                {navigation.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center space-x-4 px-6 py-4 rounded-2xl text-base font-semibold transition-all duration-400 hover:scale-105 animate-fade-in group ${
                        isActive(item.href)
                          ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 text-white shadow-2xl border-2 border-white/20'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-100 hover:via-purple-50 hover:to-green-100 dark:hover:from-blue-900/30 dark:hover:via-purple-900/20 dark:hover:to-green-900/30 hover:text-blue-700 dark:hover:text-blue-300 hover:shadow-lg'
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className={`transition-all duration-400 ${
                        isActive(item.href) ? 'scale-125' : 'group-hover:scale-125 group-hover:rotate-6'
                      }`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="font-medium tracking-wide">{item.name}</span>
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

      {/* Enhanced Floating ChatBot Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={() => setIsChatBotOpen(true)}
          className="w-18 h-18 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-800 text-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-115 group animate-float border-4 border-white/20"
          title="Open AI Assistant"
        >
          <Bot className="h-9 w-9 mx-auto transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12" />
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full animate-pulse border-3 border-white shadow-lg"></div>
          <Sparkles className="absolute -top-3 -left-3 h-5 w-5 text-yellow-300 animate-pulse" />
        </button>
      </div>

      {/* Conditional ChatBot */}
      {isChatBotOpen && (
        <ChatBot onClose={() => setIsChatBotOpen(false)} />
      )}

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-r from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 border-t-2 border-gradient-to-r from-blue-200 to-green-200 dark:border-gray-700 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-6 md:mb-0 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-green-600 rounded-2xl flex items-center justify-center transition-all duration-400 group-hover:scale-125 shadow-xl">
                <Shield className="h-6 w-6 text-white transition-transform duration-400 group-hover:rotate-12" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
                AirGuard AI
              </span>
            </div>
            <div className="flex items-center space-x-8 text-sm text-gray-600 dark:text-gray-400">
              <Link to="/aqi-info" className="hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-400 hover:scale-110 flex items-center space-x-2 font-medium">
                <Info className="h-5 w-5" />
                <span>About AQI</span>
              </Link>
              <Link to="/tips" className="hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-400 hover:scale-110 flex items-center space-x-2 font-medium">
                <Heart className="h-5 w-5" />
                <span>Health Tips</span>
              </Link>
              <Link to="/masks" className="hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-400 hover:scale-110 flex items-center space-x-2 font-medium">
                <Wind className="h-5 w-5" />
                <span>Masks</span>
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t-2 border-gradient-to-r from-blue-200 to-green-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
            <p className="animate-fade-in font-medium">© 2024 AirGuard AI. Protecting your health with smart air quality insights.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
