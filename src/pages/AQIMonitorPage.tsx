
import { useState } from 'react';
import { LocationSearch } from '@/components/LocationSearch';
import { AQIDisplay } from '@/components/AQIDisplay';
import { AQIPieChart } from '@/components/AQIPieChart';
import { Wind, Eye, Activity, MapPin } from 'lucide-react';
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
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Wind,
      title: 'Detailed Pollutants',
      description: 'Track PM2.5, PM10, O3, NO2, SO2, and CO levels',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Eye,
      title: 'Visual Analytics',
      description: 'Interactive charts and comprehensive data visualization',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: MapPin,
      title: 'Global Coverage',
      description: 'Monitor air quality in cities around the world',
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              AQI
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                {" "}Monitor
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Real-time air quality monitoring with detailed pollutant analysis and visual insights for locations worldwide
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>

          {/* Location Search */}
          <LocationSearch 
            onLocationSelect={setLocation} 
            onAQIDataUpdate={setAqiData}
            loading={loading}
            setLoading={setLoading}
          />
        </div>
      </div>

      {/* AQI Display */}
      {aqiData && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="space-y-12">
            <AQIDisplay aqiData={aqiData} getAQILevel={getAQILevel} />
            <AQIPieChart aqiData={aqiData} />
          </div>
        </div>
      )}

      {/* Empty State */}
      {!aqiData && !loading && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <Card className="p-12 text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="text-6xl mb-6">🌫️</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Search for a Location
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Enter a city name or use your current location to view detailed air quality information
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <Activity className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-900 dark:text-white">Real-time Data</div>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <Wind className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-900 dark:text-white">All Pollutants</div>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                <Eye className="h-8 w-8 text-purple-600 mx-auto mb-2" />
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
