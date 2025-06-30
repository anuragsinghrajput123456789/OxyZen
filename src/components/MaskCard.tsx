
import { Shield, Star, Clock, Users, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface MaskCardProps {
  mask: {
    type: string;
    protection: number;
    bestFor: string[];
    lifespan: string;
    layers: number;
    suitability: string[];
    comfort: number;
    breathability: number;
    whenNotToUse: string[];
    description: string;
    aqiRange: string;
    color: string;
    image?: string;
    price?: string;
  };
}

export const MaskCard = ({ mask }: MaskCardProps) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
      {/* Mask Image */}
      {mask.image && (
        <div className="mb-4 overflow-hidden rounded-lg">
          <img 
            src={mask.image} 
            alt={mask.type}
            className="w-full h-48 object-cover hover:scale-110 transition-transform duration-300"
          />
        </div>
      )}

      {/* Header */}
      <div className={`p-4 rounded-lg bg-gradient-to-r ${mask.color} text-white mb-4`}>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">{mask.type}</h3>
          <Shield className="h-6 w-6" />
        </div>
        <p className="text-sm opacity-90 mt-1">{mask.description}</p>
        {mask.price && (
          <p className="text-sm font-semibold mt-2">Price: {mask.price}</p>
        )}
      </div>

      {/* Protection Level */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Protection Level</span>
          <span className="text-lg font-bold text-gray-900 dark:text-white">{mask.protection}%</span>
        </div>
        <Progress value={mask.protection} className="h-2" />
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <Star className="h-5 w-5 mx-auto mb-1 text-yellow-500" />
          <div className="text-sm text-gray-600 dark:text-gray-400">Comfort</div>
          <div className="font-semibold text-gray-900 dark:text-white">{mask.comfort}/5</div>
        </div>
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <Clock className="h-5 w-5 mx-auto mb-1 text-blue-500" />
          <div className="text-sm text-gray-600 dark:text-gray-400">Lifespan</div>
          <div className="font-semibold text-gray-900 dark:text-white text-xs">{mask.lifespan}</div>
        </div>
      </div>

      {/* Best For */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Best For:</h4>
        <div className="flex flex-wrap gap-1">
          {mask.bestFor.slice(0, 3).map((use, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {use}
            </Badge>
          ))}
          {mask.bestFor.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{mask.bestFor.length - 3} more
            </Badge>
          )}
        </div>
      </div>

      {/* AQI Range */}
      <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
            Recommended AQI: {mask.aqiRange}
          </span>
        </div>
      </div>

      {/* Click to view more */}
      <div className="text-center pt-2 border-t border-gray-200 dark:border-gray-700">
        <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
          Click to view detailed information
        </span>
      </div>
    </Card>
  );
};
