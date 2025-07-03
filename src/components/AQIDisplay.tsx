
import { Thermometer, Wind, Eye, Zap, Factory, Car } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface AQIDisplayProps {
  aqiData: {
    aqi: number;
    location: string;
    pm25: number;
    pm10: number;
    o3?: number;
    no2?: number;
    so2?: number;
    co?: number;
    timestamp?: string;
  };
  getAQILevel: (aqi: number) => {
    level: string;
    color: string;
    textColor: string;
  };
}

export const AQIDisplay = ({ aqiData, getAQILevel }: AQIDisplayProps) => {
  const aqiInfo = getAQILevel(aqiData.aqi);

  const pollutants = [
    {
      name: 'PM2.5',
      value: aqiData.pm25,
      unit: 'μg/m³',
      icon: Thermometer,
      description: 'Fine particles',
      color: 'from-red-500 to-pink-500'
    },
    {
      name: 'PM10',
      value: aqiData.pm10,
      unit: 'μg/m³',
      icon: Wind,
      description: 'Coarse particles',
      color: 'from-orange-500 to-yellow-500'
    },
    {
      name: 'O3',
      value: aqiData.o3 || 0,
      unit: 'μg/m³',
      icon: Zap,
      description: 'Ozone',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'NO2',
      value: aqiData.no2 || 0,
      unit: 'μg/m³',
      icon: Car,
      description: 'Nitrogen dioxide',
      color: 'from-green-500 to-emerald-500'
    },
    {
      name: 'SO2',
      value: aqiData.so2 || 0,
      unit: 'μg/m³',
      icon: Factory,
      description: 'Sulfur dioxide',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      name: 'CO',
      value: Math.round((aqiData.co || 0) / 1000),
      unit: 'mg/m³',
      icon: Eye,
      description: 'Carbon monoxide',
      color: 'from-red-500 to-rose-500'
    }
  ];

  const getVisibility = () => {
    if (aqiData.aqi <= 50) return 'Excellent';
    if (aqiData.aqi <= 100) return 'Good';
    if (aqiData.aqi <= 150) return 'Moderate';
    if (aqiData.aqi <= 200) return 'Poor';
    return 'Very Poor';
  };

  return (
    <div className="space-y-8">
      {/* Main AQI Card */}
      <Card className={`p-8 bg-gradient-to-r ${aqiInfo.color} text-white shadow-2xl rounded-3xl`}>
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">{aqiData.location}</h2>
          <div className="text-7xl font-bold mb-4">{aqiData.aqi}</div>
          <div className="text-2xl font-semibold mb-2">{aqiInfo.level}</div>
          {aqiData.timestamp && (
            <div className="text-sm opacity-90 mb-6">
              Last updated: {new Date(aqiData.timestamp).toLocaleString()}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-center mb-3">
                <Thermometer className="h-7 w-7 mr-2" />
                <span className="font-semibold text-lg">PM2.5</span>
              </div>
              <div className="text-3xl font-bold">{aqiData.pm25} μg/m³</div>
            </div>
            
            <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-center mb-3">
                <Wind className="h-7 w-7 mr-2" />
                <span className="font-semibold text-lg">PM10</span>
              </div>
              <div className="text-3xl font-bold">{aqiData.pm10} μg/m³</div>
            </div>
            
            <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-center mb-3">
                <Eye className="h-7 w-7 mr-2" />
                <span className="font-semibold text-lg">Visibility</span>
              </div>
              <div className="text-3xl font-bold">{getVisibility()}</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Detailed Pollutants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pollutants.map((pollutant, index) => (
          <Card key={index} className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-2xl hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${pollutant.color} rounded-xl flex items-center justify-center`}>
                <pollutant.icon className="h-6 w-6 text-white" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {pollutant.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {pollutant.unit}
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {pollutant.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {pollutant.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
