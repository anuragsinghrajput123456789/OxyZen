
import { useState } from 'react';
import { LocationSearch } from '@/components/LocationSearch';
import { AQIDisplay } from '@/components/AQIDisplay';
import { AQIPieChart } from '@/components/AQIPieChart';
import { Wind, Eye, Activity, MapPin, Zap, Shield, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';

const AQIMonitorPage = () => {
  const [location, setLocation] = useState('');
  const [aqiData, setAqiData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAQILevel = (aqi: number) => {
    if (aqi <= 50) return { level: 'Good', color: 'from-green-400 to-green-600', textColor: 'text-green-700' };
    if (aqi <= 100) return { level: 'Moderate', color: 'from-yellow-400 to-orange-500', textColor: 'text-orange-700' };
    if (aqi <= 150) return { level: 'Unhealthy for Sensitive', color: 'from-orange-400 to-red-500', textColor: 'text-red-700' };
    if (aqi <= 200) return { level: 'Unhealthy', color: 'from-red-400 to-red-600', textColor: 'text-red-800' };
    if (aqi <= 300) return { level: 'Very Unhealthy', color: 'from-purple-400 to-purple-600', textColor: 'text-purple-800' };
    return { level: 'Hazardous', color: 'from-purple-600 to-black', textColor: 'text-white' };
  };

  const features = [
    {
      icon: Activity,
      title: 'Real-time Monitoring',
      description: 'Get live air quality updates for any location worldwide',
      color: 'from-blue-500 to-cyan-500',
      delay: '0ms'
    },
    {
      icon: Wind,
      title: 'Detailed Pollutants',
      description: 'Track PM2.5, PM10, O3, NO2, SO2, and CO levels',
      color: 'from-green-500 to-emerald-500',
      delay: '200ms'
    },
    {
      icon: Eye,
      title: 'Visual Analytics',
      description: 'Interactive charts and comprehensive data visualization',
      color: 'from-purple-500 to-indigo-500',
      delay: '400ms'
    },
    {
      icon: MapPin,
      title: 'Global Coverage',
      description: 'Monitor air quality in cities around the world',
      color: 'from-orange-500 to-red-500',
      delay: '600ms'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 dark:bg-blue-800 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-green-200 dark:bg-green-800 rounded-full opacity-20 animate-float animation-delay-2000"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-purple-200 dark:bg-purple-800 rounded-full opacity-20 animate-float animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <div className="relative py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl flex items-center justify-center shadow-2xl animate-float">
                  <Activity className="h-10 w-10 text-white" />
                </div>
                <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-yellow-500 animate-pulse" />
                <Zap className="absolute -bottom-2 -left-2 h-5 w-5 text-blue-500 animate-bounce" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              AQI
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent animate-pulse">
                {" "}Monitor
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animation-delay-200 animate-fade-in">
              Real-time air quality monitoring with detailed pollutant analysis and visual insights for locations worldwide
            </p>
          </div>

          {/* Enhanced Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="p-6 text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 group animate-fade-in"
                style={{ animationDelay: feature.delay }}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                  <feature.icon className="h-6 w-6 text-white transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>

          {/* Enhanced Location Search */}
          <div className="animate-fade-in animation-delay-600">
            <LocationSearch 
              onLocationSelect={setLocation} 
              onAQIDataUpdate={setAqiData}
              loading={loading}
              setLoading={setLoading}
            />
          </div>
        </div>
      </div>

      {/* AQI Display */}
      {aqiData && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 animate-fade-in">
          <div className="space-y-12">
            <AQIDisplay aqiData={aqiData} getAQILevel={getAQILevel} />
            <AQIPieChart aqiData={aqiData} />
          </div>
        </div>
      )}

      {/* Enhanced Empty State */}
      {!aqiData && !loading && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 animate-fade-in animation-delay-400">
          <Card className="p-12 text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 group">
            <div className="text-6xl mb-6 animate-float">
              <div className="relative inline-block">
                🌫️
                <Shield className="absolute -top-2 -right-2 h-8 w-8 text-blue-500 animate-pulse" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              Search for a Location
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Enter a city name or use your current location to view detailed air quality information
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300 hover:scale-105 group/card">
                <Activity className="h-8 w-8 text-blue-600 mx-auto mb-2 group-hover/card:scale-110 group-hover/card:rotate-6 transition-all duration-300" />
                <div className="text-sm font-medium text-gray-900 dark:text-white">Real-time Data</div>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/30 transition-all duration-300 hover:scale-105 group/card animation-delay-200">
                <Wind className="h-8 w-8 text-green-600 mx-auto mb-2 group-hover/card:scale-110 group-hover/card:rotate-6 transition-all duration-300" />
                <div className="text-sm font-medium text-gray-900 dark:text-white">All Pollutants</div>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300 hover:scale-105 group/card animation-delay-400">
                <Eye className="h-8 w-8 text-purple-600 mx-auto mb-2 group-hover/card:scale-110 group-hover/card:rotate-6 transition-all duration-300" />
                <div className="text-sm font-medium text-gray-900 dark:text-white">Visual Charts</div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AQIMonitorPage;
