import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Shield, Info, Lightbulb, Sparkles, Zap, MessageCircle } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';
import { ChatBot } from './ChatBot';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home, color: 'text-blue-600', hoverColor: 'hover:text-blue-700' },
    { path: '/masks', label: 'Masks', icon: Shield, color: 'text-green-600', hoverColor: 'hover:text-green-700' },
    { path: '/aqi-info', label: 'AQI Info', icon: Info, color: 'text-purple-600', hoverColor: 'hover:text-purple-700' },
    { path: '/tips', label: 'Tips', icon: Lightbulb, color: 'text-yellow-600', hoverColor: 'hover:text-yellow-700' },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Enhanced Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 shadow-lg border-b border-gray-200/50 dark:border-gray-700/50' 
          : 'backdrop-blur-sm bg-white/70 dark:bg-gray-900/70'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Enhanced Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <span className="text-white font-bold text-xl">🌫️</span>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                    <Sparkles className="h-2 w-2 text-white" />
                  </div>
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 w-12 h-12 bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-green-500/30 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                  AirGuard AI
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 -mt-1 flex items-center">
                  <Zap className="h-3 w-3 mr-1 text-yellow-500" />
                  Smart Protection
                </p>
              </div>
            </Link>

            {/* Enhanced Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group relative flex items-center space-x-2 px-5 py-3 rounded-2xl text-base font-semibold transition-all duration-300 hover:scale-105 ${
                    isActivePath(item.path)
                      ? 'bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-blue-700 dark:text-blue-300 shadow-lg'
                      : `text-gray-600 dark:text-gray-300 hover:bg-gray-100/70 dark:hover:bg-gray-800/70 hover:text-gray-900 dark:hover:text-white ${item.hoverColor}`
                  }`}
                >
                  <item.icon className={`h-5 w-5 ${isActivePath(item.path) ? item.color : 'group-hover:scale-110'} transition-all duration-300`} />
                  <span>{item.label}</span>
                  {isActivePath(item.path) && (
                    <>
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-purple-100/50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl blur-lg"></div>
                    </>
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
                className="md:hidden w-12 h-12 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <div className="relative">
                  {isMobileMenuOpen ? (
                    <X className="h-6 w-6 transition-transform duration-300 rotate-90" />
                  ) : (
                    <Menu className="h-6 w-6 transition-transform duration-300 hover:rotate-12" />
                  )}
                </div>
              </Button>
            </div>
          </div>

          {/* Enhanced Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-6 border-t border-gray-200/50 dark:border-gray-700/50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl animate-fade-in">
              <nav className="space-y-2">
                {navItems.map((item, index) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-4 rounded-2xl text-base font-semibold transition-all duration-300 hover:scale-105 animate-fade-in ${
                      isActivePath(item.path)
                        ? 'bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-blue-700 dark:text-blue-300 shadow-lg'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100/70 dark:hover:bg-gray-800/70'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <item.icon className={`h-5 w-5 ${item.color} transition-transform duration-300 hover:scale-110`} />
                    <span>{item.label}</span>
                    {isActivePath(item.path) && (
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse ml-auto" />
                    )}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Floating ChatBot Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setShowChatBot(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-bounce"
          style={{ animationDuration: '3s' }}
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      </div>

      {/* ChatBot Modal */}
      {showChatBot && <ChatBot onClose={() => setShowChatBot(false)} />}

      {/* Main Content with proper spacing */}
      <main className="pt-20 min-h-screen">
        {children}
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-3 mb-6 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-lg">🌫️</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                AirGuard AI
              </span>
            </div>
            <p className="text-gray-300 text-lg mb-4">
              Protecting your health with AI-powered air quality insights
            </p>
            <div className="flex justify-center space-x-6 mb-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-gray-400 hover:text-white transition-colors duration-300 hover:scale-110 transform"
                >
                  <item.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
            <p className="text-gray-500">
              © 2024 AirGuard AI. Made with ❤️ for cleaner breathing.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
