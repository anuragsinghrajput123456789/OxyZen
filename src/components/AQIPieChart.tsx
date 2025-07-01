
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card } from '@/components/ui/card';

interface AQIPieChartProps {
  aqiData: {
    aqi: number;
    pm25: number;
    pm10: number;
    o3?: number;
    no2?: number;
    so2?: number;
    co?: number;
    location: string;
  };
}

export const AQIPieChart = ({ aqiData }: AQIPieChartProps) => {
  // Calculate pollutant breakdown with real data
  const pollutantData = [
    {
      name: 'PM2.5',
      value: aqiData.pm25,
      color: '#ef4444',
      percentage: 0
    },
    {
      name: 'PM10',
      value: aqiData.pm10,
      color: '#f97316',
      percentage: 0
    },
    {
      name: 'O3',
      value: aqiData.o3 || 0,
      color: '#3b82f6',
      percentage: 0
    },
    {
      name: 'NO2',
      value: aqiData.no2 || 0,
      color: '#10b981',
      percentage: 0
    },
    {
      name: 'SO2',
      value: aqiData.so2 || 0,
      color: '#8b5cf6',
      percentage: 0
    },
    {
      name: 'CO',
      value: Math.round((aqiData.co || 0) / 1000), // Convert to mg/m³
      color: '#f59e0b',
      percentage: 0
    }
  ].filter(pollutant => pollutant.value > 0);

  // Calculate percentages
  const totalPollution = pollutantData.reduce((sum, p) => sum + p.value, 0);
  pollutantData.forEach(pollutant => {
    pollutant.percentage = totalPollution > 0 ? Math.round((pollutant.value / totalPollution) * 100) : 0;
  });

  // AQI Levels data
  const aqiLevelsData = [
    {
      name: 'Good',
      range: '0-50',
      color: '#10b981',
      active: aqiData.aqi <= 50
    },
    {
      name: 'Moderate',
      range: '51-100',
      color: '#f59e0b',
      active: aqiData.aqi > 50 && aqiData.aqi <= 100
    },
    {
      name: 'Unhealthy for Sensitive',
      range: '101-150',
      color: '#f97316',
      active: aqiData.aqi > 100 && aqiData.aqi <= 150
    },
    {
      name: 'Unhealthy',
      range: '151-200',
      color: '#ef4444',
      active: aqiData.aqi > 150 && aqiData.aqi <= 200
    },
    {
      name: 'Very Unhealthy',
      range: '201-300',
      color: '#8b5cf6',
      active: aqiData.aqi > 200 && aqiData.aqi <= 300
    },
    {
      name: 'Hazardous',
      range: '300+',
      color: '#7c2d12',
      active: aqiData.aqi > 300
    }
  ];

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return '#10b981';
    if (aqi <= 100) return '#f59e0b';
    if (aqi <= 150) return '#f97316';
    if (aqi <= 200) return '#ef4444';
    if (aqi <= 300) return '#8b5cf6';
    return '#7c2d12';
  };

  const getAQILevel = (aqi: number) => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  };

  const getHealthRecommendation = (aqi: number) => {
    if (aqi <= 50) return "Air quality is excellent. Perfect for all outdoor activities!";
    if (aqi <= 100) return "Air quality is acceptable. Sensitive individuals should monitor symptoms.";
    if (aqi <= 150) return "Sensitive groups should reduce prolonged outdoor activities. Consider wearing masks.";
    if (aqi <= 200) return "Everyone should limit outdoor activities. Wear N95 masks when outdoors.";
    if (aqi <= 300) return "Avoid outdoor activities. Use air purifiers indoors and N95/N99 masks if going outside.";
    return "Stay indoors. Use air purifiers and N99 masks. Seek medical attention if experiencing symptoms.";
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-semibold text-gray-900 dark:text-white">{data.name}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Value: {data.value} {data.name === 'CO' ? 'mg/m³' : 'μg/m³'}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Percentage: {data.percentage}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Pollutant Breakdown Chart */}
      <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-2xl">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Pollutant Breakdown
          </h3>
          <p className="text-gray-600 dark:text-gray-300">{aqiData.location}</p>
        </div>

        {pollutantData.length > 0 ? (
          <>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pollutantData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pollutantData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Pollutant Legend */}
            <div className="space-y-3 mt-4">
              {pollutantData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="font-medium text-gray-900 dark:text-white">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900 dark:text-white">
                      {item.value} {item.name === 'CO' ? 'mg/m³' : 'μg/m³'}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {item.percentage}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            No pollutant data available
          </div>
        )}
      </Card>

      {/* AQI Level Chart */}
      <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-2xl">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Current AQI Level
          </h3>
          <p className="text-gray-600 dark:text-gray-300">Air Quality Classification</p>
        </div>

        {/* Current AQI Display */}
        <div className="text-center p-6 rounded-2xl mb-6" style={{ backgroundColor: `${getAQIColor(aqiData.aqi)}20` }}>
          <div className="text-5xl font-bold mb-2" style={{ color: getAQIColor(aqiData.aqi) }}>
            {aqiData.aqi}
          </div>
          <div className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            {getAQILevel(aqiData.aqi)}
          </div>
        </div>

        {/* AQI Scale */}
        <div className="space-y-3 mb-6">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">AQI Scale Reference</h4>
          {aqiLevelsData.map((level, index) => (
            <div 
              key={index} 
              className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                level.active 
                  ? 'bg-gray-200 dark:bg-gray-600 ring-2 ring-blue-500 shadow-md' 
                  : 'bg-gray-50 dark:bg-gray-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div 
                  className={`w-4 h-4 rounded-full ${level.active ? 'ring-2 ring-white' : ''}`}
                  style={{ backgroundColor: level.color }}
                ></div>
                <span className={`font-medium ${level.active ? 'text-gray-900 dark:text-white font-bold' : 'text-gray-700 dark:text-gray-300'}`}>
                  {level.name}
                </span>
              </div>
              <div className={`text-sm font-medium ${level.active ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                {level.range}
              </div>
            </div>
          ))}
        </div>

        {/* Health Recommendation */}
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2 flex items-center gap-2">
            💡 Health Recommendation
          </h4>
          <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
            {getHealthRecommendation(aqiData.aqi)}
          </p>
        </div>
      </Card>
    </div>
  );
};
