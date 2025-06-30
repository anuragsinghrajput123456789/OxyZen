
import { Info, AlertTriangle, CheckCircle, XCircle, Heart, Lungs } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const aqiLevels = [
  {
    range: '0-50',
    level: 'Good',
    color: 'from-green-400 to-green-600',
    textColor: 'text-green-700',
    description: 'Air quality is satisfactory, and air pollution poses little or no risk.',
    healthEffects: 'None for the general population',
    recommendations: ['Perfect for outdoor activities', 'No mask needed', 'Great for exercise'],
    sensitiveGroups: 'None'
  },
  {
    range: '51-100',
    level: 'Moderate',
    color: 'from-yellow-400 to-orange-500',
    textColor: 'text-orange-700',
    description: 'Air quality is acceptable. However, there may be a risk for some people.',
    healthEffects: 'Unusually sensitive people may experience minor breathing discomfort',
    recommendations: ['Generally safe for outdoor activities', 'Sensitive people should limit prolonged outdoor exertion', 'Consider light mask for sensitive individuals'],
    sensitiveGroups: 'People with respiratory or heart conditions'
  },
  {
    range: '101-150',
    level: 'Unhealthy for Sensitive Groups',
    color: 'from-orange-400 to-red-500',
    textColor: 'text-red-700',
    description: 'Members of sensitive groups may experience health effects.',
    healthEffects: 'Breathing discomfort for sensitive groups, possible respiratory symptoms',
    recommendations: ['Sensitive groups should reduce outdoor activities', 'Use N95 or KN95 masks', 'Keep windows closed'],
    sensitiveGroups: 'Children, elderly, people with asthma, heart disease, or lung disease'
  },
  {
    range: '151-200',
    level: 'Unhealthy',
    color: 'from-red-400 to-red-600',
    textColor: 'text-red-800',
    description: 'Everyone may begin to experience health effects.',
    healthEffects: 'Breathing difficulties, throat irritation, chest discomfort',
    recommendations: ['Everyone should limit outdoor activities', 'Use N95 masks when outdoors', 'Use air purifiers indoors'],
    sensitiveGroups: 'Everyone, especially sensitive groups'
  },
  {
    range: '201-300',
    level: 'Very Unhealthy',
    color: 'from-purple-400 to-purple-600',
    textColor: 'text-purple-800',
    description: 'Health alert: The risk of health effects is increased for everyone.',
    healthEffects: 'Serious aggravation of respiratory and cardiovascular diseases',
    recommendations: ['Avoid outdoor activities', 'Use N95/N99 masks if going outside', 'Stay indoors with air purifiers'],
    sensitiveGroups: 'Everyone should take precautions'
  },
  {
    range: '301+',
    level: 'Hazardous',
    color: 'from-purple-600 to-black',
    textColor: 'text-white',
    description: 'Health warning of emergency conditions. Everyone is likely to be affected.',
    healthEffects: 'Serious risk of respiratory effects for everyone',
    recommendations: ['Stay indoors', 'Use N99 masks if must go outside', 'Seek medical attention if experiencing symptoms'],
    sensitiveGroups: 'Everyone is at risk'
  }
];

const pollutants = [
  {
    name: 'PM2.5',
    fullName: 'Fine Particulate Matter',
    description: 'Particles smaller than 2.5 micrometers in diameter',
    sources: ['Vehicle exhaust', 'Industrial emissions', 'Burning of fossil fuels', 'Wildfires'],
    healthEffects: ['Lung irritation', 'Cardiovascular problems', 'Respiratory diseases', 'Premature death'],
    icon: '🫁'
  },
  {
    name: 'PM10',
    fullName: 'Coarse Particulate Matter',
    description: 'Particles between 2.5 and 10 micrometers in diameter',
    sources: ['Dust storms', 'Construction activities', 'Agricultural operations', 'Road dust'],
    healthEffects: ['Eye irritation', 'Throat irritation', 'Coughing', 'Respiratory problems'],
    icon: '💨'
  },
  {
    name: 'O3',
    fullName: 'Ozone',
    description: 'Ground-level ozone formed by chemical reactions',
    sources: ['Vehicle emissions', 'Industrial processes', 'Chemical solvents', 'Gasoline vapors'],
    healthEffects: ['Chest pain', 'Coughing', 'Throat irritation', 'Airway inflammation'],
    icon: '☀️'
  },
  {
    name: 'NO2',
    fullName: 'Nitrogen Dioxide',
    description: 'Reddish-brown gas with a characteristic sharp, biting odor',
    sources: ['Vehicle emissions', 'Power plants', 'Industrial facilities', 'Gas stoves'],
    healthEffects: ['Respiratory infections', 'Airway inflammation', 'Reduced lung function'],
    icon: '🚗'
  },
  {
    name: 'SO2',
    fullName: 'Sulfur Dioxide',
    description: 'Colorless gas with a sharp, irritating odor',
    sources: ['Coal burning', 'Oil refining', 'Metal processing', 'Volcanic eruptions'],
    healthEffects: ['Breathing difficulties', 'Throat irritation', 'Chest tightness'],
    icon: '🏭'
  },
  {
    name: 'CO',
    fullName: 'Carbon Monoxide',
    description: 'Colorless, odorless gas that can be deadly',
    sources: ['Vehicle exhaust', 'Gas appliances', 'Generators', 'Charcoal grills'],
    healthEffects: ['Headaches', 'Dizziness', 'Confusion', 'Carbon monoxide poisoning'],
    icon: '⚠️'
  }
];

const AQIInfoPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <Card className="p-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white mb-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
            <Info className="h-8 w-8" />
            Air Quality Index (AQI) Information
          </h1>
          <p className="text-lg opacity-90 max-w-3xl mx-auto">
            Understanding air quality levels, health implications, and protective measures to keep you safe
          </p>
        </div>
      </Card>

      {/* AQI Levels */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">AQI Levels & Health Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aqiLevels.map((level, index) => (
            <Card key={index} className="overflow-hidden">
              <div className={`p-4 bg-gradient-to-r ${level.color} text-white`}>
                <h3 className="text-xl font-bold">{level.level}</h3>
                <p className="text-lg font-semibold">AQI {level.range}</p>
              </div>
              <div className="p-4 space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-300">{level.description}</p>
                
                <div>
                  <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    Health Effects
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{level.healthEffects}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Recommendations
                  </h4>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    {level.recommendations.map((rec, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1 h-1 bg-blue-500 rounded-full mt-2"></span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
                  <h4 className="font-semibold text-yellow-700 dark:text-yellow-300 text-sm mb-1">Sensitive Groups:</h4>
                  <p className="text-xs text-yellow-600 dark:text-yellow-400">{level.sensitiveGroups}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Pollutants Information */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Common Air Pollutants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pollutants.map((pollutant, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-start gap-4">
                <div className="text-3xl">{pollutant.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {pollutant.name} - {pollutant.fullName}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{pollutant.description}</p>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Sources:</h4>
                      <div className="flex flex-wrap gap-1">
                        {pollutant.sources.map((source, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {source}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center gap-2">
                        <Lungs className="h-4 w-4" />
                        Health Effects:
                      </h4>
                      <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                        {pollutant.healthEffects.map((effect, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-1 h-1 bg-red-500 rounded-full mt-2"></span>
                            {effect}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Protection Guidelines */}
      <Card className="p-8 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">General Protection Guidelines</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="space-y-2">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Monitor Daily</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Check AQI levels before going outside</p>
          </div>
          
          <div className="space-y-2">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
              <Lungs className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Protect Yourself</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Use appropriate masks when needed</p>
          </div>
          
          <div className="space-y-2">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Stay Healthy</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Maintain good respiratory health</p>
          </div>
          
          <div className="space-y-2">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Seek Help</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Consult doctors if symptoms persist</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AQIInfoPage;
