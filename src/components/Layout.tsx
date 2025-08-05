import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Shield,
  Menu,
  X,
  Wind,
  Info,
  Activity,
  Heart,
  Bot,
  Sparkles,
  Zap,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { ChatBot } from "./ChatBot";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const location = useLocation();

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    const initialTheme = savedTheme || systemTheme;
    setTheme(initialTheme);

    // Apply theme to document
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const navigation = [
    { name: "Home", href: "/", icon: Shield },
    { name: "AQI Monitor", href: "/aqi-monitor", icon: Activity },
    { name: "Mask Recommendation", href: "/mask-recommendation", icon: Zap },
    { name: "Masks", href: "/masks", icon: Wind },
    { name: "AQI Info", href: "/aqi-info", icon: Info },
    { name: "Health Tips", href: "/tips", icon: Heart },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <nav className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  OxyZen
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                  Smart Air Protection
                </p>
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
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${
                      isActive(item.href)
                        ? "bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-md"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
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
                className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
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
                      className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive(item.href)
                          ? "bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-md"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
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
      <main className="flex-1">{children}</main>

      {/* Enhanced Floating ChatBot Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {/* Floating tooltip */}
          <div className="absolute -top-12 -left-16 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
            <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg">
              AI Assistant
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-100"></div>
            </div>
          </div>

          <button
            onClick={() => setIsChatBotOpen(true)}
            className="group relative w-16 h-16 bg-gradient-to-br from-blue-600 via-purple-600 to-green-500 hover:from-blue-700 hover:via-purple-700 hover:to-green-600 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-110 animate-pulse-glow"
            title="Open AI Assistant"
          >
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-green-400 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

            {/* Main icon */}
            <div className="relative z-10 flex items-center justify-center h-full">
              <Bot className="h-7 w-7 group-hover:scale-110 transition-transform duration-300" />
            </div>

            {/* Pulsing indicator */}
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse border-2 border-white dark:border-gray-800 shadow-md">
              <div className="absolute inset-1 bg-white/30 rounded-full animate-ping"></div>
            </div>

            {/* Sparkle effects */}
            <Sparkles className="absolute -top-2 -left-2 h-4 w-4 text-yellow-300 animate-pulse animation-delay-1000" />
            <Zap className="absolute -bottom-1 -right-2 h-3 w-3 text-blue-300 animate-bounce animation-delay-2000" />
          </button>
        </div>
      </div>

      {/* Conditional ChatBot */}
      {isChatBotOpen && <ChatBot onClose={() => setIsChatBotOpen(false)} />}

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                AirGuard AI
              </span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
              <Link
                to="/aqi-info"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center space-x-1"
              >
                <Info className="h-4 w-4" />
                <span>About AQI</span>
              </Link>
              <Link
                to="/tips"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center space-x-1"
              >
                <Heart className="h-4 w-4" />
                <span>Health Tips</span>
              </Link>
              <Link
                to="/masks"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center space-x-1"
              >
                <Wind className="h-4 w-4" />
                <span>Masks</span>
              </Link>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>
              © 2024 AirGuard AI. Protecting your health with smart air quality
              insights.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
