import { useState } from 'react';
import { Heart, Loader2, RefreshCw, Sparkles, Shield, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ZoomModal } from './ZoomModal';

interface HealthTipsProps {
  aqiData: {
    aqi: number;
    location: string;
  };
  getAQILevel: (aqi: number) => any;
}

export const HealthTips = ({ aqiData, getAQILevel }: HealthTipsProps) => {
  const [tips, setTips] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTip, setSelectedTip] = useState<{ tip: string; index: number } | null>(null);
  const { toast } = useToast();

  const generateHealthTips = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBrVugq-g35-6OSMAL_YRmY8iq_j8uWfuE', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Generate 5-7 practical health and safety tips for dealing with air pollution at AQI level ${aqiData.aqi} in ${aqiData.location}. Include:
              - Indoor air quality improvements
              - Outdoor activity recommendations
              - Breathing exercises or techniques
              - Dietary suggestions for lung health
              - When to stay indoors
              - Hydration and general wellness tips
              Format as a simple list with each tip on a new line, starting with a dash (-).`
            }]
          }]
        })
      });

      const data = await response.json();
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Unable to generate tips';
      
      const tipsList = aiText
        .split('\n')
        .filter(line => line.trim().startsWith('-'))
        .map(line => line.replace(/^-\s*/, '').trim())
        .filter(tip => tip.length > 0);
      
      setTips(tipsList);

      toast({
        title: "Health Tips Generated",
        description: "AI-powered health tips are ready",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate health tips",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const aqiInfo = getAQILevel(aqiData.aqi);

  return (
    <>
      <Card className="overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-white via-green-50 to-blue-50 dark:from-gray-900 dark:via-green-900/10 dark:to-blue-900/10 backdrop-blur-sm animate-fade-in">
        {/* Header with gradient background */}
        <div className="relative p-8 bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 text-white overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 animate-float"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12 animate-float animation-delay-2000"></div>
          <Sparkles className="absolute top-4 right-4 h-6 w-6 text-yellow-300 animate-pulse" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm animate-float">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">
                  AI Health Assistant
                </h3>
                <p className="text-white/80 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Personalized wellness guidance
                </p>
              </div>
            </div>

            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${aqiInfo.color} text-white text-sm font-semibold shadow-lg backdrop-blur-sm`}>
              <Star className="h-4 w-4" />
              Air Quality: {aqiInfo.level} (AQI: {aqiData.aqi})
            </div>
          </div>
        </div>

        <div className="p-8">
          {tips.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
                <Heart className="h-10 w-10 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Get Your Personalized Health Tips
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto leading-relaxed">
                Receive AI-powered health and safety recommendations tailored to the current air quality in your area.
              </p>
              <Button 
                onClick={generateHealthTips}
                disabled={loading}
                size="lg"
                className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                    Generating Your Tips...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5 mr-3" />
                    Get Personalized Tips
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Your Health & Safety Guide
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  AI-generated recommendations for AQI {aqiData.aqi} in {aqiData.location}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {tips.map((tip, index) => (
                  <div 
                    key={index} 
                    className="group flex items-start gap-4 p-5 bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 dark:from-green-900/20 dark:via-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-green-200/50 dark:border-green-800/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] animate-fade-in cursor-pointer"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => setSelectedTip({ tip, index })}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '';
                    }}
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl flex items-center justify-center text-sm font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800 dark:text-gray-200 leading-relaxed group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-300">
                        {tip.length > 150 ? `${tip.substring(0, 150)}...` : tip}
                      </p>
                      {tip.length > 150 && (
                        <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">Click to read more</span>
                      )}
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Star className="h-5 w-5 text-yellow-500" />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center pt-6 border-t border-gray-200 dark:border-gray-700">
                <Button 
                  onClick={generateHealthTips}
                  disabled={loading}
                  variant="outline"
                  className="flex items-center gap-2 hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-600 hover:text-white hover:border-transparent transition-all duration-300 hover:scale-105"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                  Generate New Tips
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Zoom Modal */}
      <ZoomModal
        isOpen={!!selectedTip}
        onClose={() => setSelectedTip(null)}
        title={`Health Tip #${selectedTip ? selectedTip.index + 1 : ''}`}
      >
        {selectedTip && (
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl flex items-center justify-center text-lg font-bold shadow-lg">
                {selectedTip.index + 1}
              </div>
              <div className="flex-1">
                <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
                  {selectedTip.tip}
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>AQI Context:</strong> This tip is specifically generated for AQI level {aqiData.aqi} in {aqiData.location}
              </p>
            </div>
          </div>
        )}
      </ZoomModal>
    </>
  );
};
