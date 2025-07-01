
import { LocationSearch } from '@/components/LocationSearch';
import { AQIDisplay } from '@/components/AQIDisplay';
import { AQIPieChart } from '@/components/AQIPieChart';
import { HealthTips } from '@/components/HealthTips';
import { MaskRecommendation } from '@/components/MaskRecommendation';
import { useState } from 'react';
import { Shield, Wind, Activity, Heart, Eye, MapPin, Sparkles, Star, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  const [aqiData, setAqiData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAQILevel = (aqi: number) => {
    if (aqi <= 50) return { level: 'Good', color: 'from-green-400 to-green-600', textColor: 'text-green-700' };
    if (aqi <= 100) return { level: 'Moderate', color: 'from-yellow-400 to-orange-500', textColor: 'text-orange-700' };
    if (aqi <= 150) return { level: 'Unhealthy for Sensitive', color: 'from-orange-400 to-red-500', textColor: 'text-red-700' };
    if (aqi <= 200) return { level: 'Unhealthy', color: 'from-red-400 to-red-600', textColor: 'text-red-800' };
    if (aqi <= 300) return { level: 'Very Unhealthy', color: 'from-purple-400 to-purple-600', textColor: 'text-purple-800' };
    return { level: 'Hazardous', color: 'from-purple-600 to-black', textColor: 'text-white' };
  };

  const features = [
    {
      icon: Activity,
      title: 'Real-time AQI Monitoring',
      description: 'Get live air quality data from thousands of monitoring stations worldwide',
      color: 'from-blue-500 to-cyan-500',
      link: '/aqi-monitor'
    },
    {
      icon: Shield,
      title: 'Smart Mask Recommendations',
      description: 'AI-powered suggestions for the best protective masks based on air quality',
      color: 'from-green-500 to-emerald-500',
      link: '/masks'
    },
    {
      icon: Heart,
      title: 'Personalized Health Tips',
      description: 'Custom wellness advice tailored to your location\'s air quality conditions',
      color: 'from-red-500 to-pink-500',
      link: '/tips'
    },
    {
      icon: Eye,
      title: 'Detailed AQI Information',
      description: 'Learn about air quality indices, pollutants, and their health impacts',
      color: 'from-purple-500 to-indigo-500',
      link: '/aqi-info'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-blue-200 dark:bg-blue-800 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-60 right-20 w-32 h-32 bg-green-200 dark:bg-green-800 rounded-full opacity-20 animate-float animation-delay-2000"></div>
        <div className="absolute bottom-40 left-20 w-48 h-48 bg-purple-200 dark:bg-purple-800 rounded-full opacity-20 animate-float animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <div className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-3xl flex items-center justify-center shadow-2xl animate-float">
                  <Shield className="h-12 w-12 text-white" />
                </div>
                <Sparkles className="absolute -top-3 -right-3 h-8 w-8 text-yellow-500 animate-pulse" />
                <Star className="absolute -bottom-2 -left-2 h-6 w-6 text-blue-500 animate-bounce" />
                <Zap className="absolute top-2 -left-4 h-5 w-5 text-green-500 animate-pulse animation-delay-1000" />
              </div>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-8">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent animate-pulse">
                AirGuard AI
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
              Your intelligent companion for air quality monitoring, health protection, and personalized wellness guidance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-8 py-4 text-lg"
                asChild
              >
                <Link to="/aqi-monitor">
                  <Activity className="h-6 w-6 mr-2" />
                  Monitor Air Quality
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-8 py-4 text-lg"
                asChild
              >
                <Link to="/masks">
                  <Shield className="h-6 w-6 mr-2" />
                  Find Protection
                </Link>
              </Button>
            </div>
          </div>

          {/* Enhanced Location Search */}
          <div className="max-w-2xl mx-auto mb-16 animate-fade-in animation-delay-400">
            <Card className="p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-2xl">
              <div className="text-center mb-6">
                <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Check Your Air Quality
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Enter your location to get real-time air quality data and personalized recommendations
                </p>
              </div>
              <LocationSearch 
                onLocationSelect={() => {}} 
                onAQIDataUpdate={setAqiData}
                loading={loading}
                setLoading={setLoading}
              />
            </Card>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-center mb-16 animate-fade-in animation-delay-600">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Comprehensive Air Quality Protection
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Everything you need to stay healthy and protected from air pollution
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group p-8 text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 hover:scale-105 cursor-pointer animate-fade-in"
              style={{ animationDelay: `${800 + index * 200}ms` }}
              asChild
            >
              <Link to={feature.link}>
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                  <feature.icon className="h-8 w-8 text-white transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300 leading-relaxed">
                  {feature.description}
                </p>
              </Link>
            </Card>
          ))}
        </div>

        {/* AQI Data Display */}
        {aqiData && (
          <div className="space-y-12 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <AQIDisplay aqiData={aqiData} getAQILevel={getAQILevel} />
              <AQIPieChart aqiData={aqiData} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <HealthTips aqiData={aqiData} getAQILevel={getAQILevel} />
              <MaskRecommendation aqiData={aqiData} getAQILevel={getAQILevel} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
