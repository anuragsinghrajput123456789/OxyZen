
import { useState } from 'react';
import { Lightbulb, RefreshCw, Loader2, Home, Car, Utensils, Heart, Shield, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const staticTips = [
  {
    category: 'Indoor Air Quality',
    icon: Home,
    color: 'from-blue-500 to-blue-600',
    tips: [
      'Use air purifiers with HEPA filters to remove fine particles',
      'Keep windows closed during high pollution days',
      'Add indoor plants like spider plants and peace lilies',
      'Avoid smoking indoors and limit use of aerosols',
      'Regular cleaning to reduce dust accumulation'
    ]
  },
  {
    category: 'Outdoor Protection',
    icon: Shield,
    color: 'from-green-500 to-green-600',
    tips: [
      'Check AQI before planning outdoor activities',
      'Wear appropriate masks (N95/N99) during high pollution',
      'Plan outdoor exercise during early morning hours',
      'Choose routes with less traffic for walking/cycling',
      'Limit outdoor exposure during rush hours'
    ]
  },
  {
    category: 'Transportation',
    icon: Car,
    color: 'from-purple-500 to-purple-600',
    tips: [
      'Use public transportation to reduce vehicle emissions',
      'Keep car windows closed and use recirculated air',
      'Maintain your vehicle to reduce emissions',
      'Consider electric or hybrid vehicles',
      'Walk or cycle for short distances when AQI is good'
    ]
  },
  {
    category: 'Health & Nutrition',
    icon: Heart,
    color: 'from-red-500 to-red-600',
    tips: [
      'Stay hydrated to help flush out toxins',
      'Eat antioxidant-rich foods (berries, leafy greens)',
      'Include vitamin C and E in your diet',
      'Practice breathing exercises and yoga',
      'Get regular health check-ups'
    ]
  },
  {
    category: 'Diet for Lung Health',
    icon: Utensils,
    color: 'from-orange-500 to-orange-600',
    tips: [
      'Consume turmeric for its anti-inflammatory properties',
      'Eat garlic and onions to boost immunity',
      'Include omega-3 rich foods like fish and walnuts',
      'Drink green tea for antioxidants',
      'Avoid processed and fried foods'
    ]
  },
  {
    category: 'Energy & Lifestyle',
    icon: Zap,
    color: 'from-yellow-500 to-yellow-600',
    tips: [
      'Use energy-efficient appliances to reduce emissions',
      'Switch to LED bulbs and solar power if possible',
      'Reduce, reuse, and recycle to minimize waste',
      'Support clean energy initiatives in your community',
      'Educate others about air pollution prevention'
    ]
  }
];

const TipsPage = () => {
  const [aiTips, setAiTips] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedAQI, setSelectedAQI] = useState(150);
  const { toast } = useToast();

  const generateAITips = async () => {
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
              text: `Generate 8-10 comprehensive pollution prevention and health protection tips for AQI level ${selectedAQI}. Include:
              - Specific actions for this AQI level
              - Indoor air quality management
              - Outdoor protection strategies
              - Health and dietary recommendations
              - Long-term preventive measures
              - Emergency precautions if needed
              Make tips actionable and practical. Format as a simple list with each tip on a new line, starting with a dash (-).`
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
      
      setAiTips(tipsList);

      toast({
        title: "AI Tips Generated",
        description: `Generated ${tipsList.length} personalized tips for AQI ${selectedAQI}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate AI tips",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getAQILevel = (aqi: number) => {
    if (aqi <= 50) return { level: 'Good', color: 'from-green-400 to-green-600' };
    if (aqi <= 100) return { level: 'Moderate', color: 'from-yellow-400 to-orange-500' };
    if (aqi <= 150) return { level: 'Unhealthy for Sensitive', color: 'from-orange-400 to-red-500' };
    if (aqi <= 200) return { level: 'Unhealthy', color: 'from-red-400 to-red-600' };
    if (aqi <= 300) return { level: 'Very Unhealthy', color: 'from-purple-400 to-purple-600' };
    return { level: 'Hazardous', color: 'from-purple-600 to-black' };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <Card className="p-8 bg-gradient-to-r from-yellow-500 to-orange-500 text-white mb-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
            <Lightbulb className="h-8 w-8" />
            Pollution Prevention Tips
          </h1>
          <p className="text-lg opacity-90 max-w-3xl mx-auto">
            Comprehensive guidelines and AI-powered tips to protect yourself from air pollution and maintain good health
          </p>
        </div>
      </Card>

      {/* AI Tips Section */}
      <Card className="p-6 mb-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            AI-Powered Personalized Tips
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Get customized pollution prevention tips based on current AQI levels using AI analysis
          </p>
          
          {/* AQI Selector */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Select AQI Level:
            </label>
            <select 
              value={selectedAQI}
              onChange={(e) => setSelectedAQI(Number(e.target.value))}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value={25}>Good (0-50)</option>
              <option value={75}>Moderate (51-100)</option>
              <option value={125}>Unhealthy for Sensitive (101-150)</option>
              <option value={175}>Unhealthy (151-200)</option>
              <option value={250}>Very Unhealthy (201-300)</option>
              <option value={350}>Hazardous (301+)</option>
            </select>
          </div>

          <div className={`inline-block px-4 py-2 rounded-lg bg-gradient-to-r ${getAQILevel(selectedAQI).color} text-white font-semibold mb-4`}>
            AQI {selectedAQI} - {getAQILevel(selectedAQI).level}
          </div>
        </div>

        {aiTips.length === 0 ? (
          <div className="text-center py-8">
            <Button 
              onClick={generateAITips}
              disabled={loading}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Generating AI Tips...
                </>
              ) : (
                <>
                  <Lightbulb className="h-5 w-5 mr-2" />
                  Generate AI Tips for AQI {selectedAQI}
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aiTips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-sm text-blue-900 dark:text-blue-100 flex-1">
                    {tip}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="text-center pt-4">
              <Button 
                onClick={generateAITips}
                disabled={loading}
                variant="outline"
                className="flex items-center gap-2"
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
      </Card>

      {/* Static Tips Categories */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Essential Prevention Guidelines
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staticTips.map((category, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className={`p-4 bg-gradient-to-r ${category.color} text-white`}>
                <div className="flex items-center gap-3">
                  <category.icon className="h-6 w-6" />
                  <h3 className="text-lg font-bold">{category.category}</h3>
                </div>
              </div>
              <div className="p-4">
                <ul className="space-y-3">
                  {category.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Emergency Guidelines */}
      <Card className="p-6 bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800">
        <h2 className="text-xl font-bold text-red-800 dark:text-red-200 mb-4 text-center">
          ⚠️ Emergency Guidelines for Severe Pollution
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-red-700 dark:text-red-300 mb-3">Immediate Actions:</h3>
            <ul className="space-y-2 text-sm text-red-600 dark:text-red-400">
              <li>• Stay indoors with windows and doors closed</li>
              <li>• Use air purifiers on highest setting</li>
              <li>• Avoid all outdoor physical activities</li>
              <li>• Wear N99 masks if you must go outside</li>
              <li>• Keep emergency medications handy</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-red-700 dark:text-red-300 mb-3">Seek Medical Help If:</h3>
            <ul className="space-y-2 text-sm text-red-600 dark:text-red-400">
              <li>• Experiencing severe breathing difficulties</li>
              <li>• Chest pain or tightness</li>
              <li>• Persistent coughing or wheezing</li>
              <li>• Dizziness or lightheadedness</li>
              <li>• Symptoms worsen despite precautions</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TipsPage;
