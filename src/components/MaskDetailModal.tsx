
import { X, Shield, Star, Clock, Users, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

interface MaskDetailModalProps {
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
    pros?: string[];
    cons?: string[];
  };
  onClose: () => void;
}

export const MaskDetailModal = ({ mask, onClose }: MaskDetailModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className={`p-6 bg-gradient-to-r ${mask.color} text-white relative`}>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-4">
            <Shield className="h-12 w-12" />
            <div>
              <h2 className="text-3xl font-bold">{mask.type} Mask</h2>
              <p className="text-lg opacity-90">{mask.description}</p>
              {mask.price && (
                <p className="text-xl font-semibold mt-2">Price Range: {mask.price}</p>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Image and Basic Info */}
          <div className="space-y-6">
            {mask.image && (
              <div className="overflow-hidden rounded-lg">
                <img 
                  src={mask.image} 
                  alt={mask.type}
                  className="w-full h-64 object-cover"
                />
              </div>
            )}

            {/* Protection Level */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Protection Level</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Filtration Efficiency</span>
                <span className="text-xl font-bold">{mask.protection}%</span>
              </div>
              <Progress value={mask.protection} className="h-3" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Star className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
                <div className="text-sm text-gray-600 dark:text-gray-400">Comfort</div>
                <div className="text-xl font-bold">{mask.comfort}/5</div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Clock className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                <div className="text-sm text-gray-600 dark:text-gray-400">Breathability</div>
                <div className="text-xl font-bold">{mask.breathability}/5</div>
              </div>
            </div>
          </div>

          {/* Right Column - Detailed Info */}
          <div className="space-y-6">
            {/* Technical Details */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Technical Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Layers:</span>
                  <span className="font-medium">{mask.layers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Lifespan:</span>
                  <span className="font-medium">{mask.lifespan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">AQI Range:</span>
                  <span className="font-medium">{mask.aqiRange}</span>
                </div>
              </div>
            </div>

            {/* Best For */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Best For</h3>
              <div className="flex flex-wrap gap-2">
                {mask.bestFor.map((use, index) => (
                  <Badge key={index} variant="secondary">
                    {use}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Suitability */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Suitable For</h3>
              <div className="flex flex-wrap gap-2">
                {mask.suitability.map((group, index) => (
                  <Badge key={index} variant="outline">
                    {group}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Pros and Cons */}
            {(mask.pros || mask.cons) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mask.pros && (
                  <div>
                    <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Pros
                    </h4>
                    <ul className="space-y-1 text-sm">
                      {mask.pros.map((pro, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="w-1 h-1 bg-green-500 rounded-full mt-2"></span>
                          <span className="text-green-700 dark:text-green-300">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {mask.cons && (
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2 flex items-center gap-2">
                      <XCircle className="h-4 w-4" />
                      Cons
                    </h4>
                    <ul className="space-y-1 text-sm">
                      {mask.cons.map((con, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="w-1 h-1 bg-red-500 rounded-full mt-2"></span>
                          <span className="text-red-700 dark:text-red-300">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* When Not to Use */}
            <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <h4 className="font-semibold text-red-700 dark:text-red-300">When NOT to use:</h4>
              </div>
              <ul className="text-sm text-red-600 dark:text-red-400 space-y-1">
                {mask.whenNotToUse.map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
