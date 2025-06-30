
import { useState, useEffect } from 'react';
import { LocationSearch } from '@/components/LocationSearch';
import { AQIDisplay } from '@/components/AQIDisplay';
import { MaskRecommendation } from '@/components/MaskRecommendation';
import { HealthTips } from '@/components/HealthTips';
import { MaskInfoHub } from '@/components/MaskInfoHub';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Toaster } from '@/components/ui/toaster';
import { useTheme } from '@/hooks/useTheme';

const Index = () => {
  const [location, setLocation] = useState('');
  const [aqiData, setAqiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const getAQILevel = (aqi) => {
    if (aqi <= 50) return { level: 'Good', color: 'from-green-400 to-green-600', textColor: 'text-green-700' };
    if (aqi <= 100) return { level: 'Moderate', color: 'from-yellow-400 to-orange-500', textColor: 'text-orange-700' };
    if (aqi <= 150) return { level: 'Unhealthy for Sensitive', color: 'from-orange-400 to-red-500', textColor: 'text-red-700' };
    if (aqi <= 200) return { level: 'Unhealthy', color: 'from-red-400 to-red-600', textColor: 'text-red-800' };
    if (aqi <= 300) return { level: 'Very Unhealthy', color: 'from-purple-400 to-purple-600', textColor: 'text-purple-800' };
    return { level: 'Hazardous', color: 'from-purple-600 to-black', textColor: 'text-white' };
  };

  useEffect(() => {
    // Auto-detect location on page load
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          // Mock AQI data for demo - in real app would call actual API
          const mockAQI = Math.floor(Math.random() * 300) + 1;
          setAqiData({
            aqi: mockAQI,
            location: 'Current Location',
            pm25: Math.floor(Math.random() * 100),
            pm10: Math.floor(Math.random() * 150),
            coordinates: { lat: latitude, lng: longitude }
          });
        },
        (error) => {
          console.log('Geolocation access denied or failed');
        }
      );
    }
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🌫️</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Pollution Mask Recommender
              </h1>
            </div>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            AI-Powered Air Quality & Mask Guidance
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Get real-time air quality data, personalized mask recommendations, and AI-generated health tips 
            to protect your respiratory health from pollution.
          </p>
        </div>

        {/* Location Search */}
        <div className="mb-8">
          <LocationSearch 
            onLocationSelect={setLocation} 
            onAQIDataUpdate={setAqiData}
            loading={loading}
            setLoading={setLoading}
          />
        </div>

        {/* AQI Display */}
        {aqiData && (
          <div className="mb-8">
            <AQIDisplay aqiData={aqiData} getAQILevel={getAQILevel} />
          </div>
        )}

        {/* Action Cards */}
        {aqiData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <MaskRecommendation aqiData={aqiData} getAQILevel={getAQILevel} />
            <HealthTips aqiData={aqiData} getAQILevel={getAQILevel} />
          </div>
        )}

        {/* Mask Information Hub */}
        <MaskInfoHub />
      </main>

      <Toaster />
    </div>
  );
};

export default Index;
