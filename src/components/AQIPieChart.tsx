
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card } from '@/components/ui/card';

interface AQIPieChartProps {
  aqiData: {
    aqi: number;
    pm25: number;
    pm10: number;
    location: string;
  };
}

export const AQIPieChart = ({ aqiData }: AQIPieChartProps) => {
  // Calculate pollutant breakdown
  const totalPollution = aqiData.pm25 + aqiData.pm10 + (aqiData.aqi * 0.3); // Include other factors
  
  const data = [
    {
      name: 'PM2.5',
      value: aqiData.pm25,
      color: '#ef4444',
      percentage: Math.round((aqiData.pm25 / totalPollution) * 100)
    },
    {
      name: 'PM10',
      value: aqiData.pm10,
      color: '#f97316',
      percentage: Math.round((aqiData.pm10 / totalPollution) * 100)
    },
    {
      name: 'Other Pollutants',
      value: aqiData.aqi * 0.3,
      color: '#8b5cf6',
      percentage: Math.round(((aqiData.aqi * 0.3) / totalPollution) * 100)
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

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-semibold text-gray-900 dark:text-white">{data.name}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Value: {data.value.toFixed(1)} μg/m³
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
    <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-2xl">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Air Quality Breakdown
        </h3>
        <p className="text-gray-600 dark:text-gray-300">{aqiData.location}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        {/* Pie Chart */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* AQI Info and Legend */}
        <div className="space-y-6">
          {/* Overall AQI */}
          <div className="text-center p-6 rounded-2xl" style={{ backgroundColor: `${getAQIColor(aqiData.aqi)}20` }}>
            <div className="text-4xl font-bold mb-2" style={{ color: getAQIColor(aqiData.aqi) }}>
              {aqiData.aqi}
            </div>
            <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              {getAQILevel(aqiData.aqi)}
            </div>
          </div>

          {/* Pollutant Breakdown */}
          <div className="space-y-3">
            {data.map((item, index) => (
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
                    {item.value.toFixed(1)} μg/m³
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {item.percentage}%
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Health Recommendation */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Recommendation</h4>
            <p className="text-sm text-blue-800 dark:text-blue-300">
              {aqiData.aqi <= 50 
                ? "Air quality is good. Enjoy outdoor activities!" 
                : aqiData.aqi <= 100 
                ? "Air quality is moderate. Sensitive individuals should consider reducing outdoor activities."
                : aqiData.aqi <= 150 
                ? "Unhealthy for sensitive groups. Wear a mask if you're sensitive to air pollution."
                : aqiData.aqi <= 200 
                ? "Unhealthy air quality. Everyone should wear a mask outdoors."
                : "Very unhealthy air. Avoid outdoor activities and use air purifiers indoors."
              }
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};
