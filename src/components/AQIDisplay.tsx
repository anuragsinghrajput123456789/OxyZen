import { Thermometer, Wind, Eye, Zap, Factory, Car } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ZoomModal } from './ZoomModal';
import { useState } from 'react';

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
  const [selectedPollutant, setSelectedPollutant] = useState<any>(null);
  const aqiInfo = getAQILevel(aqiData.aqi);

  const pollutants = [
    {
      name: 'PM2.5',
      value: aqiData.pm25,
      unit: 'μg/m³',
      icon: Thermometer,
      description: 'Fine particles',
      color: 'from-red-500 to-pink-500',
      detailedInfo: 'Fine particulate matter with diameter less than 2.5 micrometers. These particles can penetrate deep into the respiratory system and enter the bloodstream.',
      healthEffects: ['Respiratory irritation', 'Cardiovascular problems', 'Reduced lung function', 'Aggravated asthma'],
      sources: ['Vehicle exhaust', 'Power plants', 'Industrial processes', 'Wildfires']
    },
    {
      name: 'PM10',
      value: aqiData.pm10,
      unit: 'μg/m³',
      icon: Wind,
      description: 'Coarse particles',
      color: 'from-orange-500 to-yellow-500',
      detailedInfo: 'Particulate matter with diameter less than 10 micrometers. These larger particles typically affect the upper respiratory system.',
      healthEffects: ['Throat and nose irritation', 'Coughing', 'Reduced visibility', 'Eye irritation'],
      sources: ['Dust storms', 'Construction sites', 'Agricultural activities', 'Road dust']
    },
    {
      name: 'O3',
      value: aqiData.o3 || 0,
      unit: 'μg/m³',
      icon: Zap,
      description: 'Ozone',
      color: 'from-blue-500 to-cyan-500',
      detailedInfo: 'Ground-level ozone is a secondary pollutant formed by chemical reactions between nitrogen oxides and volatile organic compounds in sunlight.',
      healthEffects: ['Chest pain', 'Coughing', 'Throat irritation', 'Airway inflammation'],
      sources: ['Vehicle emissions', 'Industrial emissions', 'Chemical solvents', 'Gasoline vapors']
    },
    {
      name: 'NO2',
      value: aqiData.no2 || 0,
      unit: 'μg/m³',
      icon: Car,
      description: 'Nitrogen dioxide',
      color: 'from-green-500 to-emerald-500',
      detailedInfo: 'A reddish-brown gas that is primarily produced from burning fossil fuels. It contributes to the formation of ground-level ozone and fine particle pollution.',
      healthEffects: ['Respiratory symptoms', 'Increased susceptibility to infections', 'Airway inflammation', 'Reduced lung function'],
      sources: ['Motor vehicles', 'Power plants', 'Industrial boilers', 'Gas stoves']
    },
    {
      name: 'SO2',
      value: aqiData.so2 || 0,
      unit: 'μg/m³',
      icon: Factory,
      description: 'Sulfur dioxide',
      color: 'from-purple-500 to-indigo-500',
      detailedInfo: 'A colorless gas with a sharp odor that is produced when sulfur-containing fossil fuels are burned. It can react in the atmosphere to form fine particles.',
      healthEffects: ['Respiratory irritation', 'Difficulty breathing', 'Aggravated asthma', 'Eye irritation'],
      sources: ['Coal-fired power plants', 'Oil refineries', 'Metal smelting', 'Volcanic eruptions']
    },
    {
      name: 'CO',
      value: Math.round((aqiData.co || 0) / 1000),
      unit: 'mg/m³',
      icon: Eye,
      description: 'Carbon monoxide',
      color: 'from-red-500 to-rose-500',
      detailedInfo: 'A colorless, odorless gas that is produced by incomplete combustion of carbon-containing materials. It reduces the blood\'s ability to carry oxygen.',
      healthEffects: ['Reduced oxygen delivery', 'Fatigue', 'Chest pain', 'Impaired vision and coordination'],
      sources: ['Motor vehicles', 'Machinery', 'Fireplaces', 'Gas appliances']
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
    <>
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
            <Card 
              key={index} 
              className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105"
              onClick={() => setSelectedPollutant(pollutant)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '';
              }}
            >
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
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-2 font-medium">
                  Click for detailed information
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Zoom Modal for Pollutants */}
      <ZoomModal
        isOpen={!!selectedPollutant}
        onClose={() => setSelectedPollutant(null)}
        title={selectedPollutant ? `${selectedPollutant.name} - Detailed Information` : ''}
      >
        {selectedPollutant && (
          <div className="space-y-6">
            {/* Header */}
            <div className={`p-6 rounded-xl bg-gradient-to-r ${selectedPollutant.color} text-white shadow-lg`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <selectedPollutant.icon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold">{selectedPollutant.name}</h3>
                    <p className="text-lg opacity-90">{selectedPollutant.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold">{selectedPollutant.value}</div>
                  <div className="text-lg opacity-90">{selectedPollutant.unit}</div>
                </div>
              </div>
            </div>

            {/* Detailed Information */}
            <Card className="p-6">
              <h4 className="text-xl font-bold mb-4">What is {selectedPollutant.name}?</h4>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {selectedPollutant.detailedInfo}
              </p>
            </Card>

            {/* Health Effects */}
            <Card className="p-6 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10">
              <h4 className="text-xl font-bold mb-4 text-red-700 dark:text-red-400">Health Effects</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedPollutant.healthEffects.map((effect, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span className="text-gray-700 dark:text-gray-300">{effect}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Sources */}
            <Card className="p-6 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/10">
              <h4 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-400">Common Sources</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedPollutant.sources.map((source, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span className="text-gray-700 dark:text-gray-300">{source}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Current Level Context */}
            <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-800">
              <h4 className="text-xl font-bold mb-4 text-green-700 dark:text-green-400">Current Level Context</h4>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {selectedPollutant.value} {selectedPollutant.unit}
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Current measurement in {aqiData.location}
                </p>
              </div>
            </Card>
          </div>
        )}
      </ZoomModal>
    </>
  );
};
