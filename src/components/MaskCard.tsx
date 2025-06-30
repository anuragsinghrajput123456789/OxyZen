
import { Shield, Star, Clock, Users, AlertTriangle, Zap } from 'lucide-react';
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
    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      {/* Mask Image */}
      {mask.image && (
        <div className="relative overflow-hidden">
          <img 
            src={mask.image} 
            alt={mask.type}
            className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500 bg-gray-100 dark:bg-gray-700"
          />
          {/* Overlay with protection level */}
          <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
            {mask.protection}% Protection
          </div>
          {/* Price tag */}
          {mask.price && (
            <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {mask.price}
            </div>
          )}
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className={`p-4 rounded-xl bg-gradient-to-r ${mask.color} text-white mb-6 shadow-lg`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-bold">{mask.type}</h3>
            <Shield className="h-7 w-7" />
          </div>
          <p className="text-sm opacity-90 leading-relaxed">{mask.description}</p>
        </div>

        {/* Protection Level */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-base font-semibold text-gray-700 dark:text-gray-300">Protection Level</span>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">{mask.protection}%</span>
          </div>
          <Progress value={mask.protection} className="h-3 rounded-full" />
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-xl border border-yellow-200 dark:border-yellow-800">
            <Star className="h-6 w-6 mx-auto mb-2 text-yellow-600 dark:text-yellow-400" />
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Comfort</div>
            <div className="text-xl font-bold text-gray-900 dark:text-white">{mask.comfort}/5</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-xl border border-blue-200 dark:border-blue-800">
            <Clock className="h-6 w-6 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Lifespan</div>
            <div className="text-sm font-bold text-gray-900 dark:text-white">{mask.lifespan}</div>
          </div>
        </div>

        {/* Best For */}
        <div className="mb-6">
          <h4 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Best For:
          </h4>
          <div className="flex flex-wrap gap-2">
            {mask.bestFor.slice(0, 3).map((use, index) => (
              <Badge key={index} variant="secondary" className="text-sm px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-blue-800 dark:text-blue-200 border-0">
                {use}
              </Badge>
            ))}
            {mask.bestFor.length > 3 && (
              <Badge variant="outline" className="text-sm px-3 py-1 border-dashed">
                +{mask.bestFor.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* AQI Range */}
        <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 rounded-xl border border-green-200 dark:border-green-800">
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
            <div>
              <span className="text-sm font-medium text-green-800 dark:text-green-200 block">
                Recommended AQI Range
              </span>
              <span className="text-lg font-bold text-green-900 dark:text-green-100">
                {mask.aqiRange}
              </span>
            </div>
          </div>
        </div>

        {/* Click to view more */}
        <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 font-semibold group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
            <span>Click for detailed information</span>
            <Shield className="h-4 w-4 group-hover:rotate-12 transition-transform" />
          </div>
        </div>
      </div>
    </Card>
  );
};
