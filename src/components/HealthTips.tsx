
import { useState } from 'react';
import { Heart, Loader2, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();

  const generateHealthTips = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyC8fekQzgrly17DLFoZKVMpBxl-Z5NW8n8', {
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
      
      // Parse the AI response into individual tips
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
    <Card className="p-6 h-fit">
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
            <Heart className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            AI Health Tips
          </h3>
        </div>

        <div className={`p-3 rounded-lg bg-gradient-to-r ${aqiInfo.color} text-white text-sm font-medium`}>
          Air Quality: {aqiInfo.level} (AQI: {aqiData.aqi})
        </div>

        {tips.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Get personalized health and safety tips based on current air quality using AI analysis.
            </p>
            <Button 
              onClick={generateHealthTips}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating Tips...
                </>
              ) : (
                'Get Health Tips'
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-3">
              {tips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                  <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-sm text-green-900 dark:text-green-100 flex-1">
                    {tip}
                  </p>
                </div>
              ))}
            </div>
            
            <Button 
              onClick={generateHealthTips}
              disabled={loading}
              variant="outline"
              className="w-full flex items-center gap-2"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              Refresh Tips
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};
