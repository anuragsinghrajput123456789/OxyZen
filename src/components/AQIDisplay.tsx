
import { Thermometer, Wind, Eye } from 'lucide-react';
import { Card } from '@/components/ui/card';

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
    <Card className={`p-8 bg-gradient-to-r ${aqiInfo.color} text-white shadow-xl`}>
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">{aqiData.location}</h2>
        <div className="text-6xl font-bold mb-4">{aqiData.aqi}</div>
        <div className="text-xl font-semibold mb-6">{aqiInfo.level}</div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center justify-center mb-2">
              <Thermometer className="h-6 w-6 mr-2" />
              <span className="font-semibold">PM2.5</span>
            </div>
            <div className="text-2xl font-bold">{aqiData.pm25} μg/m³</div>
          </div>
          
          <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center justify-center mb-2">
              <Wind className="h-6 w-6 mr-2" />
              <span className="font-semibold">PM10</span>
            </div>
            <div className="text-2xl font-bold">{aqiData.pm10} μg/m³</div>
          </div>
          
          <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center justify-center mb-2">
              <Eye className="h-6 w-6 mr-2" />
              <span className="font-semibold">Visibility</span>
            </div>
            <div className="text-2xl font-bold">{aqiData.aqi > 150 ? 'Poor' : aqiData.aqi > 100 ? 'Moderate' : 'Good'}</div>
          </div>
        </div>
      </div>
    </Card>
  );
};
