
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

export const LocationSearch = ({ onLocationSelect, onAQIDataUpdate, loading, setLoading }: LocationSearchProps) => {
  const [searchInput, setSearchInput] = useState('');
  const { toast } = useToast();

  const searchLocation = async () => {
    if (!searchInput.trim()) return;
    
    setLoading(true);
    try {
      // Mock API call - in real app would use actual AQI API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockAQI = Math.floor(Math.random() * 300) + 1;
      const aqiData = {
        aqi: mockAQI,
        location: searchInput,
        pm25: Math.floor(Math.random() * 100),
        pm10: Math.floor(Math.random() * 150),
        coordinates: { lat: 0, lng: 0 }
      };
      
      onLocationSelect(searchInput);
      onAQIDataUpdate(aqiData);
      
      toast({
        title: "Location Updated",
        description: `Air quality data loaded for ${searchInput}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch air quality data",
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
          
          // Mock reverse geocoding and AQI fetch
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          const mockAQI = Math.floor(Math.random() * 300) + 1;
          const aqiData = {
            aqi: mockAQI,
            location: 'Current Location',
            pm25: Math.floor(Math.random() * 100),
            pm10: Math.floor(Math.random() * 150),
            coordinates: { lat: latitude, lng: longitude }
          };
          
          onLocationSelect('Current Location');
          onAQIDataUpdate(aqiData);
          
          toast({
            title: "Location Detected",
            description: "Air quality data loaded for your current location",
          });
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to fetch air quality data",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      },
      (error) => {
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
              placeholder="Enter city name or pincode..."
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
