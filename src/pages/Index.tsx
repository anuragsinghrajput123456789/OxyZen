
import { useState, useEffect } from 'react';
import { LocationSearch } from '@/components/LocationSearch';
import { AQIDisplay } from '@/components/AQIDisplay';
import { MaskRecommendation } from '@/components/MaskRecommendation';
import { HealthTips } from '@/components/HealthTips';
import { Shield, Heart, Zap, Users, ArrowRight, Wind, Eye, Activity } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  const [location, setLocation] = useState('');
  const [aqiData, setAqiData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAQILevel = (aqi) => {
    if (aqi <= 50) return { level: 'Good', color: 'from-green-400 to-green-600', textColor: 'text-green-700' };
    if (aqi <= 100) return { level: 'Moderate', color: 'from-yellow-400 to-orange-500', textColor: 'text-orange-700' };
    if (aqi <= 150) return { level: 'Unhealthy for Sensitive', color: 'from-orange-400 to-red-500', textColor: 'text-red-700' };
    if (aqi <= 200) return { level: 'Unhealthy', color: 'from-red-400 to-red-600', textColor: 'text-red-800' };
    if (aqi <= 300) return { level: 'Very Unhealthy', color: 'from-purple-400 to-purple-600', textColor: 'text-purple-800' };
    return { level: 'Hazardous', color: 'from-purple-600 to-black', textColor: 'text-white' };
  };

  useEffect(() => {
    // Auto-detect location on page load
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          // Mock AQI data for demo - in real app would call actual API
          const mockAQI = Math.floor(Math.random() * 300) + 1;
          setAqiData({
            aqi: mockAQI,
            location: 'Current Location',
            pm25: Math.floor(Math.random() * 100),
            pm10: Math.floor(Math.random() * 150),
            coordinates: { lat: latitude, lng: longitude }
          });
        },
        (error) => {
          console.log('Geolocation access denied or failed');
        }
      );
    }
  }, []);

  const features = [
    {
      icon: Shield,
      title: 'Smart Mask Recommendations',
      description: 'AI-powered suggestions based on real-time air quality data',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Activity,
      title: 'Real-time AQI Monitoring',
      description: 'Live air quality updates for your location',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Heart,
      title: 'Health Protection Tips',
      description: 'Personalized advice to keep you safe from pollution',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Zap,
      title: 'Instant Analysis',
      description: 'Get immediate insights about air quality risks',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const stats = [
    { icon: Users, value: '50K+', label: 'Users Protected' },
    { icon: Shield, value: '1M+', label: 'Recommendations Made' },
    { icon: Eye, value: '24/7', label: 'Monitoring' },
    { icon: Wind, value: '99%', label: 'Accuracy' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Animation */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-40 left-1/2 w-60 h-60 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="text-center space-y-8">
            {/* Main Heading with Animation */}
            <div className="space-y-4 animate-fade-in">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  AI-Powered
                </span>
                <br />
                Air Quality Protection
              </h1>
              <div className="flex justify-center space-x-4 text-6xl animate-bounce">
                <span>🌫️</span>
                <span>😷</span>
                <span>🌍</span>
              </div>
            </div>

            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed animate-fade-in animation-delay-200">
              Get real-time air quality data, personalized mask recommendations, and AI-generated health tips 
              to protect your respiratory health from pollution.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in animation-delay-400">
              <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Link to="/aqi-info">
                <Button variant="outline" className="px-8 py-3 text-lg rounded-full border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-105">
                  Learn About AQI
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white dark:bg-gray-800 py-12 border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Location Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Check Your Air Quality
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Enter your location to get personalized recommendations
          </p>
        </div>
        
        <LocationSearch 
          onLocationSelect={setLocation} 
          onAQIDataUpdate={setAqiData}
          loading={loading}
          setLoading={setLoading}
        />
      </div>

      {/* AQI Display */}
      {aqiData && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 animate-fade-in">
          <AQIDisplay aqiData={aqiData} getAQILevel={getAQILevel} />
        </div>
      )}

      {/* Action Cards */}
      {aqiData && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
            <MaskRecommendation aqiData={aqiData} getAQILevel={getAQILevel} />
            <HealthTips aqiData={aqiData} getAQILevel={getAQILevel} />
          </div>
        </div>
      )}

      {/* Features Section */}
      <div className="bg-gray-50 dark:bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Advanced AI technology meets real-time data to keep you protected
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-gray-800 border-0 shadow-lg">
                <div className="p-8 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Breathe Safer?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join thousands of users who trust our AI-powered recommendations for their health protection
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/masks">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Explore Masks
              </Button>
            </Link>
            <Link to="/tips">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg rounded-full transition-all duration-300 hover:scale-105">
                Health Tips
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
