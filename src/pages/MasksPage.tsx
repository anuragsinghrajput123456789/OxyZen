
import { useState } from 'react';
import { Search, Filter, Shield } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MaskCard } from '@/components/MaskCard';
import { MaskDetailModal } from '@/components/MaskDetailModal';

const maskData = [
  {
    type: 'N95',
    protection: 95,
    bestFor: ['Heavy Pollution', 'PM2.5', 'Industrial Areas'],
    lifespan: 'Single Use',
    layers: 5,
    suitability: ['Adults', 'Healthcare Workers'],
    comfort: 3,
    breathability: 2,
    whenNotToUse: ['Exercise', 'Children under 2'],
    description: 'Filters at least 95% of airborne particles including PM2.5',
    aqiRange: '150-300',
    color: 'from-red-500 to-red-700',
    image: 'https://images.unsplash.com/photo-1584467735871-8e4d0d57e769?w=400&h=300&fit=crop',
    price: '$15-25',
    pros: ['High filtration efficiency', 'FDA approved', 'Reliable seal'],
    cons: ['Single use only', 'Can be uncomfortable', 'More expensive']
  },
  {
    type: 'N99',
    protection: 99,
    bestFor: ['Severe Pollution', 'Hazardous AQI', 'Chemical Exposure'],
    lifespan: 'Single Use',
    layers: 6,
    suitability: ['Adults', 'High-Risk Areas'],
    comfort: 2,
    breathability: 1,
    whenNotToUse: ['Long Duration', 'Physical Activity'],
    description: 'Filters at least 99% of airborne particles, maximum protection',
    aqiRange: '200+',
    color: 'from-purple-600 to-black',
    image: 'https://images.unsplash.com/photo-1603796846097-bee99e4a601f?w=400&h=300&fit=crop',
    price: '$25-40',
    pros: ['Maximum protection', 'Industrial grade', 'Chemical resistant'],
    cons: ['Very expensive', 'Hard to breathe', 'Bulky design']
  },
  {
    type: 'KN95',
    protection: 95,
    bestFor: ['Daily Commuting', 'Moderate Pollution', 'General Use'],
    lifespan: 'Single Use',
    layers: 5,
    suitability: ['Adults', 'General Public'],
    comfort: 4,
    breathability: 3,
    whenNotToUse: ['Tight Fit Required', 'Medical Settings'],
    description: 'Chinese standard equivalent to N95, good for general protection',
    aqiRange: '100-200',
    color: 'from-orange-500 to-red-500',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop',
    price: '$8-15',
    pros: ['Good protection', 'Comfortable fit', 'Affordable'],
    cons: ['Ear loops may break', 'Variable quality', 'Not FDA approved']
  },
  {
    type: 'Surgical',
    protection: 70,
    bestFor: ['Light Pollution', 'Droplet Protection', 'Indoor Use'],
    lifespan: 'Single Use',
    layers: 3,
    suitability: ['All Ages', 'Medical Settings'],
    comfort: 5,
    breathability: 4,
    whenNotToUse: ['Heavy Pollution', 'Fine Particles'],
    description: 'Protects against droplets and large particles',
    aqiRange: '50-100',
    color: 'from-blue-400 to-blue-600',
    image: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=400&h=300&fit=crop',
    price: '$5-10',
    pros: ['Very comfortable', 'Easy to breathe', 'Widely available'],
    cons: ['Limited protection', 'Loose fit', 'Single use only']
  },
  {
    type: 'Cloth',
    protection: 40,
    bestFor: ['Good Air Quality', 'Indoor Use', 'Fashion'],
    lifespan: 'Reusable',
    layers: 2,
    suitability: ['All Ages', 'Daily Wear'],
    comfort: 5,
    breathability: 5,
    whenNotToUse: ['Pollution Above AQI 100', 'Medical Protection'],
    description: 'Basic protection, washable and eco-friendly',
    aqiRange: '0-50',
    color: 'from-green-400 to-green-600',
    image: 'https://images.unsplash.com/photo-1586307834862-45af3b327894?w=400&h=300&fit=crop',
    price: '$3-8',
    pros: ['Reusable', 'Eco-friendly', 'Customizable'],
    cons: ['Limited protection', 'Needs regular washing', 'Variable quality']
  },
  {
    type: 'FFP2',
    protection: 94,
    bestFor: ['European Standard', 'Workplace Safety', 'Pollution'],
    lifespan: 'Single Use',
    layers: 4,
    suitability: ['Adults', 'Professional Use'],
    comfort: 3,
    breathability: 2,
    whenNotToUse: ['Facial Hair', 'Children'],
    description: 'European standard for respiratory protection',
    aqiRange: '100-200',
    color: 'from-indigo-500 to-purple-600',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop',
    price: '$12-20',
    pros: ['European certified', 'Good protection', 'Professional grade'],
    cons: ['Limited availability', 'Expensive', 'Tight fit required']
  }
];

const MasksPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedMask, setSelectedMask] = useState(null);

  const filteredMasks = maskData.filter(mask => {
    const matchesSearch = mask.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mask.bestFor.some(use => use.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (selectedFilter === 'all') return matchesSearch;
    if (selectedFilter === 'high-protection') return matchesSearch && mask.protection >= 95;
    if (selectedFilter === 'reusable') return matchesSearch && mask.lifespan === 'Reusable';
    if (selectedFilter === 'comfort') return matchesSearch && mask.comfort >= 4;
    
    return matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <Card className="p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white mb-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
            <Shield className="h-8 w-8" />
            Mask Collection
          </h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Explore our comprehensive collection of protective masks with detailed information and recommendations
          </p>
        </div>
      </Card>

      {/* Search and Filter Section */}
      <Card className="p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search mask types, uses, or protection levels..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <div className="flex gap-2">
              {[
                { key: 'all', label: 'All' },
                { key: 'high-protection', label: 'High Protection' },
                { key: 'reusable', label: 'Reusable' },
                { key: 'comfort', label: 'Comfort' }
              ].map(filter => (
                <Button
                  key={filter.key}
                  variant={selectedFilter === filter.key ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFilter(filter.key)}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Mask Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMasks.map((mask) => (
          <div key={mask.type} onClick={() => setSelectedMask(mask)} className="cursor-pointer">
            <MaskCard mask={mask} />
          </div>
        ))}
      </div>

      {filteredMasks.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            No masks found matching your search criteria. Try adjusting your filters.
          </p>
        </Card>
      )}

      {/* Mask Detail Modal */}
      {selectedMask && (
        <MaskDetailModal 
          mask={selectedMask} 
          onClose={() => setSelectedMask(null)} 
        />
      )}
    </div>
  );
};

export default MasksPage;
