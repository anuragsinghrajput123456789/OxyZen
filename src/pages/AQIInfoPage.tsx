
import { Info, AlertTriangle, CheckCircle, Heart, Thermometer, Wind, Factory, Car } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const aqiLevels = [
  {
    range: '0-50',
    level: 'Good',
    color: 'from-green-400 to-green-600',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-200 dark:border-green-800',
    textColor: 'text-green-700 dark:text-green-300',
    description: 'Air quality is satisfactory, and air pollution poses little or no risk.',
    healthEffects: 'None for the general population',
    recommendations: ['Perfect for outdoor activities', 'No mask needed', 'Great for exercise'],
    sensitiveGroups: 'None',
    emoji: '😊'
  },
  {
    range: '51-100',
    level: 'Moderate',
    color: 'from-yellow-400 to-orange-500',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    borderColor: 'border-yellow-200 dark:border-yellow-800',
    textColor: 'text-orange-700 dark:text-orange-300',
    description: 'Air quality is acceptable. However, there may be a risk for some people.',
    healthEffects: 'Unusually sensitive people may experience minor breathing discomfort',
    recommendations: ['Generally safe for outdoor activities', 'Sensitive people should limit prolonged outdoor exertion', 'Consider light mask for sensitive individuals'],
    sensitiveGroups: 'People with respiratory or heart conditions',
    emoji: '😐'
  },
  {
    range: '101-150',
    level: 'Unhealthy for Sensitive Groups',
    color: 'from-orange-400 to-red-500',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    borderColor: 'border-orange-200 dark:border-orange-800',
    textColor: 'text-red-700 dark:text-red-300',
    description: 'Members of sensitive groups may experience health effects.',
    healthEffects: 'Breathing discomfort for sensitive groups, possible respiratory symptoms',
    recommendations: ['Sensitive groups should reduce outdoor activities', 'Use N95 or KN95 masks', 'Keep windows closed'],
    sensitiveGroups: 'Children, elderly, people with asthma, heart disease, or lung disease',
    emoji: '😷'
  },
  {
    range: '151-200',
    level: 'Unhealthy',
    color: 'from-red-400 to-red-600',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    borderColor: 'border-red-200 dark:border-red-800',
    textColor: 'text-red-800 dark:text-red-300',
    description: 'Everyone may begin to experience health effects.',
    healthEffects: 'Breathing difficulties, throat irritation, chest discomfort',
    recommendations: ['Everyone should limit outdoor activities', 'Use N95 masks when outdoors', 'Use air purifiers indoors'],
    sensitiveGroups: 'Everyone, especially sensitive groups',
    emoji: '😨'
  },
  {
    range: '201-300',
    level: 'Very Unhealthy',
    color: 'from-purple-400 to-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    borderColor: 'border-purple-200 dark:border-purple-800',
    textColor: 'text-purple-800 dark:text-purple-300',
    description: 'Health alert: The risk of health effects is increased for everyone.',
    healthEffects: 'Serious aggravation of respiratory and cardiovascular diseases',
    recommendations: ['Avoid outdoor activities', 'Use N95/N99 masks if going outside', 'Stay indoors with air purifiers'],
    sensitiveGroups: 'Everyone should take precautions',
    emoji: '😰'
  },
  {
    range: '301+',
    level: 'Hazardous',
    color: 'from-purple-600 to-black',
    bgColor: 'bg-gray-100 dark:bg-gray-800',
    borderColor: 'border-gray-300 dark:border-gray-700',
    textColor: 'text-white',
    description: 'Health warning of emergency conditions. Everyone is likely to be affected.',
    healthEffects: 'Serious risk of respiratory effects for everyone',
    recommendations: ['Stay indoors', 'Use N99 masks if must go outside', 'Seek medical attention if experiencing symptoms'],
    sensitiveGroups: 'Everyone is at risk',
    emoji: '☠️'
  }
];

const pollutants = [
  {
    name: 'PM2.5',
    fullName: 'Fine Particulate Matter',
    description: 'Particles smaller than 2.5 micrometers in diameter that can penetrate deep into lungs',
    sources: ['Vehicle exhaust', 'Industrial emissions', 'Burning of fossil fuels', 'Wildfires'],
    healthEffects: ['Lung irritation', 'Cardiovascular problems', 'Respiratory diseases', 'Premature death'],
    icon: Thermometer,
    color: 'from-red-500 to-pink-500',
    image: '🫁'
  },
  {
    name: 'PM10',
    fullName: 'Coarse Particulate Matter',
    description: 'Particles between 2.5 and 10 micrometers that affect upper respiratory system',
    sources: ['Dust storms', 'Construction activities', 'Agricultural operations', 'Road dust'],
    healthEffects: ['Eye irritation', 'Throat irritation', 'Coughing', 'Respiratory problems'],
    icon: Wind,
    color: 'from-orange-500 to-yellow-500',
    image: '💨'
  },
  {
    name: 'O3',
    fullName: 'Ground-level Ozone',
    description: 'Secondary pollutant formed by chemical reactions in sunlight',
    sources: ['Vehicle emissions', 'Industrial processes', 'Chemical solvents', 'Gasoline vapors'],
    healthEffects: ['Chest pain', 'Coughing', 'Throat irritation', 'Airway inflammation'],
    icon: AlertTriangle,
    color: 'from-blue-500 to-cyan-500',
    image: '☀️'
  },
  {
    name: 'NO2',
    fullName: 'Nitrogen Dioxide',
    description: 'Reddish-brown gas with characteristic sharp, biting odor',
    sources: ['Vehicle emissions', 'Power plants', 'Industrial facilities', 'Gas stoves'],
    healthEffects: ['Respiratory infections', 'Airway inflammation', 'Reduced lung function'],
    icon: Car,
    color: 'from-green-500 to-emerald-500',
    image: '🚗'
  },
  {
    name: 'SO2',
    fullName: 'Sulfur Dioxide',
    description: 'Colorless gas with sharp, irritating odor from sulfur compounds',
    sources: ['Coal burning', 'Oil refining', 'Metal processing', 'Volcanic eruptions'],
    healthEffects: ['Breathing difficulties', 'Throat irritation', 'Chest tightness'],
    icon: Factory,
    color: 'from-purple-500 to-indigo-500',
    image: '🏭'
  },
  {
    name: 'CO',
    fullName: 'Carbon Monoxide',
    description: 'Colorless, odorless gas that can be deadly in high concentrations',
    sources: ['Vehicle exhaust', 'Gas appliances', 'Generators', 'Charcoal grills'],
    healthEffects: ['Headaches', 'Dizziness', 'Confusion', 'Carbon monoxide poisoning'],
    icon: AlertTriangle,
    color: 'from-red-500 to-rose-500',
    image: '⚠️'
  }
];

const AQIInfoPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Animated Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center animate-bounce">
              <Info className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Air Quality Index
            </span>
            <br />
            Complete Guide
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Understanding air quality levels, health implications, and protective measures to keep you safe
          </p>
          <div className="flex justify-center mt-6 space-x-4 text-4xl animate-pulse">
            <span>🌫️</span>
            <span>📊</span>
            <span>🛡️</span>
          </div>
        </div>

        {/* AQI Levels */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            AQI Levels & Health Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aqiLevels.map((level, index) => (
              <Card key={index} className={`overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${level.bgColor} ${level.borderColor} border-2 group animate-fade-in`} style={{animationDelay: `${index * 100}ms`}}>
                <div className={`p-6 bg-gradient-to-r ${level.color} text-white relative overflow-hidden`}>
                  <div className="absolute top-2 right-2 text-3xl group-hover:animate-bounce">
                    {level.emoji}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{level.level}</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold">AQI {level.range}</p>
                    <Progress value={(parseInt(level.range.split('-')[0]) / 300) * 100} className="w-20 h-2 bg-white/30" />
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{level.description}</p>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center gap-2">
                        <Heart className="h-4 w-4" />
                        Health Effects
                      </h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                        {level.healthEffects}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Recommendations
                      </h4>
                      <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                        {level.recommendations.map((rec, idx) => (
                          <li key={idx} className="flex items-start gap-2 bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
                            <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <h4 className="font-semibold text-yellow-700 dark:text-yellow-300 text-sm mb-2 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Sensitive Groups:
                      </h4>
                      <p className="text-sm text-yellow-600 dark:text-yellow-400">{level.sensitiveGroups}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Pollutants Information */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Common Air Pollutants
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Learn about the different types of pollutants that affect air quality
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pollutants.map((pollutant, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-gray-800 border-0 shadow-lg animate-fade-in" style={{animationDelay: `${index * 150}ms`}}>
                <div className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="flex flex-col items-center space-y-2">
                      <div className={`w-16 h-16 bg-gradient-to-r ${pollutant.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <pollutant.icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-3xl group-hover:animate-bounce">{pollutant.image}</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {pollutant.name}
                      </h3>
                      <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        {pollutant.fullName}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                        {pollutant.description}
                      </p>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                            <Factory className="h-4 w-4" />
                            Sources:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {pollutant.sources.map((source, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs px-3 py-1 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
                                {source}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-red-600 dark:text-red-400 mb-3 flex items-center gap-2">
                            <Heart className="h-4 w-4" />
                            Health Effects:
                          </h4>
                          <ul className="space-y-2">
                            {pollutant.healthEffects.map((effect, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                                <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                                {effect}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Protection Guidelines */}
        <Card className="p-12 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 border-0 shadow-2xl">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            General Protection Guidelines
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: CheckCircle, title: 'Monitor Daily', desc: 'Check AQI levels before going outside', color: 'from-green-500 to-emerald-500' },
              { icon: Heart, title: 'Protect Yourself', desc: 'Use appropriate masks when needed', color: 'from-blue-500 to-cyan-500' },
              { icon: AlertTriangle, title: 'Stay Healthy', desc: 'Maintain good respiratory health', color: 'from-purple-500 to-pink-500' },
              { icon: Info, title: 'Seek Help', desc: 'Consult doctors if symptoms persist', color: 'from-red-500 to-orange-500' }
            ].map((item, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform duration-300 animate-fade-in" style={{animationDelay: `${index * 200}ms`}}>
                <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300 shadow-lg`}>
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AQIInfoPage;
