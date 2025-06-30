
import { Thermometer, Wind, Eye } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { AQIPieChart } from './AQIPieChart';

interface AQIDisplayProps {
  aqiData: {
    aqi: number;
    location: string;
    pm25: number;
    pm10: number;
  };
  getAQILevel: (aqi: number) => {
    level: string;
    color: string;
    textColor: string;
  };
}

export const AQIDisplay = ({ aqiData, getAQILevel }: AQIDisplayProps) => {
  const aqiInfo = getAQILevel(aqiData.aqi);

  return (
    <div className="space-y-8">
      {/* Main AQI Card */}
      <Card className={`p-8 bg-gradient-to-r ${aqiInfo.color} text-white shadow-2xl rounded-3xl`}>
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">{aqiData.location}</h2>
          <div className="text-7xl font-bold mb-4">{aqiData.aqi}</div>
          <div className="text-2xl font-semibold mb-8">{aqiInfo.level}</div>
          
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
              <div className="text-3xl font-bold">{aqiData.aqi > 150 ? 'Poor' : aqiData.aqi > 100 ? 'Moderate' : 'Good'}</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Pie Chart Analysis */}
      <AQIPieChart aqiData={aqiData} />
    </div>
  );
};
