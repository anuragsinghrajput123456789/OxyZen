
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
    image: '/lovable-uploads/f6fde5c5-a5ad-4a11-9d17-a30de37d7420.png',
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
    image: '/lovable-uploads/00895ed5-d04c-4600-bda8-d7fdde4b67d7.png',
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
    image: '/lovable-uploads/ba194f65-df63-4c3d-beb0-749b33069328.png',
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
    image: '/lovable-uploads/3aaf7af0-e6c3-40b6-bbb7-d52a8e1340a9.png',
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
    image: '/lovable-uploads/cb37434f-9bf7-45d8-853d-7505352d4802.png',
    pros: ['Reusable', 'Eco-friendly', 'Customizable'],
    cons: ['Limited protection', 'Needs regular washing', 'Variable quality']
  },
  {
    type: 'Advanced Smart Mask',
    protection: 98,
    bestFor: ['Tech-Savvy Users', 'Long Duration', 'Professional Use'],
    lifespan: 'Reusable with Filters',
    layers: 6,
    suitability: ['Adults', 'Professional Use'],
    comfort: 4,
    breathability: 4,
    whenNotToUse: ['Budget Constraints', 'Simple Needs'],
    description: 'Smart mask with air filtration and breathing assistance',
    aqiRange: '100-300',
    color: 'from-indigo-500 to-purple-600',
    image: '/lovable-uploads/7b79a71d-6b9a-4fb2-bf4e-981dfab1f721.png',
    pros: ['Smart features', 'High protection', 'Comfortable for long use'],
    cons: ['Complex technology', 'Requires maintenance', 'Learning curve']
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
    if (selectedFilter === 'reusable') return matchesSearch && mask.lifespan.includes('Reusable');
    if (selectedFilter === 'comfort') return matchesSearch && mask.comfort >= 4;
    
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <Card className="p-8 mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white shadow-2xl animate-fade-in">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm animate-float">
                <Shield className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Protective Mask Collection
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              Explore our comprehensive collection of protective masks with detailed information, 
              real images, and AI-powered recommendations for your health and safety.
            </p>
          </div>
        </Card>

        {/* Search and Filter Section */}
        <Card className="p-6 mb-8 shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm animate-fade-in animation-delay-200">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search mask types, uses, or protection levels..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 text-base border-2 focus:border-blue-500 transition-colors"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <Filter className="h-5 w-5 text-gray-500" />
              <div className="flex gap-2 flex-wrap">
                {[
                  { key: 'all', label: 'All Masks', icon: '🎭' },
                  { key: 'high-protection', label: 'High Protection', icon: '🛡️' },
                  { key: 'reusable', label: 'Reusable', icon: '♻️' },
                  { key: 'comfort', label: 'Comfort', icon: '😌' }
                ].map(filter => (
                  <Button
                    key={filter.key}
                    variant={selectedFilter === filter.key ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedFilter(filter.key)}
                    className="text-sm px-4 py-2 h-10 transition-all hover:scale-105"
                  >
                    <span className="mr-2">{filter.icon}</span>
                    {filter.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Results Counter */}
        <div className="mb-6 animate-fade-in animation-delay-400">
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Showing {filteredMasks.length} mask{filteredMasks.length !== 1 ? 's' : ''} 
            {selectedFilter !== 'all' && (
              <span className="text-blue-600 dark:text-blue-400 ml-1">
                in "{selectedFilter.replace('-', ' ')}" category
              </span>
            )}
          </p>
        </div>

        {/* Mask Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 animate-fade-in animation-delay-600">
          {filteredMasks.map((mask, index) => (
            <div 
              key={mask.type} 
              onClick={() => setSelectedMask(mask)} 
              className="cursor-pointer transform hover:scale-105 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${600 + index * 100}ms` }}
            >
              <MaskCard mask={mask} />
            </div>
          ))}
        </div>

        {filteredMasks.length === 0 && (
          <Card className="p-12 text-center shadow-lg animate-fade-in">
            <div className="text-6xl mb-4 animate-float">😷</div>
            <h3 className="text-2xl font-semibold mb-2 text-gray-700 dark:text-gray-300">
              No masks found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No masks found matching your search criteria. Try adjusting your filters or search terms.
            </p>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setSelectedFilter('all');
              }}
              className="mt-4"
              variant="outline"
            >
              Clear Filters
            </Button>
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
    </div>
  );
};

export default MasksPage;
