
import { useState, useEffect } from 'react';
import { LocationSearch } from '@/components/LocationSearch';
import { AQIDisplay } from '@/components/AQIDisplay';
import { MaskRecommendation } from '@/components/MaskRecommendation';
import { HealthTips } from '@/components/HealthTips';
import { Shield, Heart, Zap, Users, ArrowRight, Wind, Eye, Activity, TrendingUp, CheckCircle } from 'lucide-react';
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
      description: 'AI-powered suggestions based on real-time air quality data and your specific needs',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      icon: Activity,
      title: 'Real-time AQI Monitoring',
      description: 'Live air quality updates with detailed pollutant breakdown for your location',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      icon: Heart,
      title: 'Health Protection Tips',
      description: 'Personalized advice to keep you safe from pollution based on health conditions',
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-50 dark:bg-red-900/20'
    },
    {
      icon: TrendingUp,
      title: 'Trend Analysis',
      description: 'Historical data and predictions to help you plan your outdoor activities',
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    }
  ];

  const stats = [
    { icon: Users, value: '50K+', label: 'Users Protected', color: 'text-blue-600' },
    { icon: Shield, value: '1M+', label: 'Recommendations Made', color: 'text-green-600' },
    { icon: Eye, value: '24/7', label: 'Monitoring', color: 'text-purple-600' },
    { icon: Wind, value: '99%', label: 'Accuracy', color: 'text-orange-600' }
  ];

  const benefits = [
    'Real-time air quality monitoring',
    'AI-powered mask recommendations',
    'Personalized health tips',
    'Historical trend analysis',
    'Multi-location tracking',
    'Mobile-friendly interface'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-40 left-1/2 w-60 h-60 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-800 dark:text-blue-200 text-sm font-semibold">
                  <Zap className="w-4 h-4 mr-2" />
                  AI-Powered Protection
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                  Breathe
                  <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    {" "}Safer
                  </span>
                  <br />
                  with AI Guidance
                </h1>
                
                <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl">
                  Get real-time air quality insights, smart mask recommendations, and personalized health tips powered by advanced AI technology.
                </p>
              </div>

              {/* Benefits List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animation-delay-400">
                <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Link to="/aqi-info">
                  <Button variant="outline" className="px-8 py-4 text-lg rounded-xl border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-105">
                    Learn About AQI
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Content - Visual */}
            <div className="relative animate-fade-in animation-delay-200">
              <div className="relative w-full h-96 lg:h-[500px]">
                {/* Main Card */}
                <Card className="absolute inset-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl p-8 animate-float">
                  <div className="h-full flex flex-col justify-center space-y-6">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🌫️</div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Air Quality Index</h3>
                      <div className="text-4xl font-bold text-blue-600 mb-2">156</div>
                      <div className="text-orange-600 font-semibold">Unhealthy for Sensitive</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                        <div className="text-sm text-gray-600 dark:text-gray-400">PM2.5</div>
                        <div className="text-xl font-bold text-gray-900 dark:text-white">65</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 dark:bg-green-900/30 rounded-xl">
                        <div className="text-sm text-gray-600 dark:text-gray-400">PM10</div>
                        <div className="text-xl font-bold text-gray-900 dark:text-white">89</div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg animate-float animation-delay-2000">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg animate-float animation-delay-4000">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white dark:bg-gray-800 py-16 border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="flex justify-center mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-lg`}>
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Location Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Check Your Air Quality
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Enter your location to get personalized recommendations and real-time air quality data
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 animate-fade-in">
          <AQIDisplay aqiData={aqiData} getAQILevel={getAQILevel} />
        </div>
      )}

      {/* Action Cards */}
      {aqiData && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
            <MaskRecommendation aqiData={aqiData} getAQILevel={getAQILevel} />
            <HealthTips aqiData={aqiData} getAQILevel={getAQILevel} />
          </div>
        </div>
      )}

      {/* Enhanced Features Section */}
      <div className="bg-gray-50 dark:bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose AirGuard AI?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Advanced AI technology meets real-time data to provide you with the most accurate air quality protection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-white dark:bg-gray-800 border-0 shadow-lg overflow-hidden">
                <div className="p-8 text-center h-full flex flex-col">
                  <div className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <feature.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex-shrink-0">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed flex-grow">
                    {feature.description}
                  </p>
                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                      <span className="text-sm">Learn More</span>
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Breathe Safer?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join thousands of users who trust our AI-powered recommendations for their health protection
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/masks">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Explore Masks
                <Shield className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/tips">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg rounded-xl transition-all duration-300 hover:scale-105">
                Health Tips
                <Heart className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
