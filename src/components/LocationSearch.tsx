
import { useState } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface LocationSearchProps {
  onLocationSelect: (location: string) => void;
  onAQIDataUpdate: (data: any) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const AQI_API_KEY = 'c4be273320974f06b606241977fde51a';

export const LocationSearch = ({ onLocationSelect, onAQIDataUpdate, loading, setLoading }: LocationSearchProps) => {
  const [searchInput, setSearchInput] = useState('');
  const { toast } = useToast();

  const searchLocation = async () => {
    if (!searchInput.trim()) return;
    
    setLoading(true);
    try {
      console.log('Searching for location:', searchInput);
      
      // First get coordinates from geocoding (using HTTPS)
      const geoResponse = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(searchInput)}&limit=1&appid=${AQI_API_KEY}`);
      const geoData = await geoResponse.json();
      
      if (!geoData || geoData.length === 0) {
        throw new Error('Location not found');
      }

      const { lat, lon, name, country } = geoData[0];
      console.log('Coordinates found:', { lat, lon, name, country });

      // Get air quality data (using HTTPS)
      const aqiResponse = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${AQI_API_KEY}`);
      const aqiData = await aqiResponse.json();
      
      console.log('AQI API Response:', aqiData);

      if (!aqiResponse.ok || !aqiData.list || aqiData.list.length === 0) {
        throw new Error('Failed to fetch air quality data');
      }

      const pollution = aqiData.list[0];
      const components = pollution.components;
      
      // Convert OpenWeather AQI (1-5) to standard AQI (0-500)
      const convertToStandardAQI = (owAqi: number) => {
        const aqiMap = { 1: 50, 2: 100, 3: 150, 4: 200, 5: 300 };
        return aqiMap[owAqi as keyof typeof aqiMap] || 150;
      };

      const processedData = {
        aqi: convertToStandardAQI(pollution.main.aqi),
        location: `${name}, ${country}`,
        pm25: Math.round(components.pm2_5 || 0),
        pm10: Math.round(components.pm10 || 0),
        o3: Math.round(components.o3 || 0),
        no2: Math.round(components.no2 || 0),
        so2: Math.round(components.so2 || 0),
        co: Math.round(components.co || 0),
        coordinates: { lat, lng: lon },
        timestamp: new Date().toISOString(),
        owAqi: pollution.main.aqi
      };
      
      console.log('Processed AQI data:', processedData);
      
      onLocationSelect(`${name}, ${country}`);
      onAQIDataUpdate(processedData);
      
      toast({
        title: "Location Updated",
        description: `Air quality data loaded for ${name}, ${country}`,
      });
    } catch (error) {
      console.error('AQI API Error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch air quality data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Geolocation Error",
        description: "Geolocation is not supported by this browser",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          console.log('Current coordinates:', { latitude, longitude });
          
          // Get location name from reverse geocoding (using HTTPS)
          const geoResponse = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${AQI_API_KEY}`);
          const geoData = await geoResponse.json();
          
          let locationName = 'Current Location';
          if (geoData && geoData.length > 0) {
            locationName = `${geoData[0].name}, ${geoData[0].country}`;
          }

          // Get air quality data (using HTTPS)
          const aqiResponse = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${AQI_API_KEY}`);
          const aqiData = await aqiResponse.json();
          
          console.log('Current location AQI data:', aqiData);

          if (!aqiResponse.ok || !aqiData.list || aqiData.list.length === 0) {
            throw new Error('Failed to fetch air quality data');
          }

          const pollution = aqiData.list[0];
          const components = pollution.components;
          
          const convertToStandardAQI = (owAqi: number) => {
            const aqiMap = { 1: 50, 2: 100, 3: 150, 4: 200, 5: 300 };
            return aqiMap[owAqi as keyof typeof aqiMap] || 150;
          };

          const processedData = {
            aqi: convertToStandardAQI(pollution.main.aqi),
            location: locationName,
            pm25: Math.round(components.pm2_5 || 0),
            pm10: Math.round(components.pm10 || 0),
            o3: Math.round(components.o3 || 0),
            no2: Math.round(components.no2 || 0),
            so2: Math.round(components.so2 || 0),
            co: Math.round(components.co || 0),
            coordinates: { lat: latitude, lng: longitude },
            timestamp: new Date().toISOString(),
            owAqi: pollution.main.aqi
          };
          
          onLocationSelect(locationName);
          onAQIDataUpdate(processedData);
          
          toast({
            title: "Location Detected",
            description: `Air quality data loaded for ${locationName}`,
          });
        } catch (error) {
          console.error('Current location AQI error:', error);
          toast({
            title: "Error",
            description: "Failed to fetch air quality data for current location",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        setLoading(false);
        toast({
          title: "Location Access Denied",
          description: "Please search for your location manually",
          variant: "destructive",
        });
      }
    );
  };

  return (
    <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-0 shadow-lg">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <MapPin className="h-5 w-5 text-blue-500" />
          Find Air Quality Data
        </h3>
        
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Enter city name or location..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && searchLocation()}
              className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
            />
          </div>
          <Button 
            onClick={searchLocation} 
            disabled={loading || !searchInput.trim()}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          </Button>
          <Button 
            variant="outline" 
            onClick={getCurrentLocation}
            disabled={loading}
            className="border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </Card>
  );
};
