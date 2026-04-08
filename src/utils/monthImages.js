/**
 * Hero images for each month using high-quality Unsplash photos.
 * Each month has a curated landscape image and an accent color theme.
 */

const MONTH_IMAGES = [
  {
    // January — Snow mountains
    url: 'https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=1200&h=800&fit=crop&q=80',
    accent: '#2196F3',
    accentLight: '#E3F2FD',
    accentDark: '#1565C0',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    theme: 'cool',
  },
  {
    // February — Cherry blossoms
    url: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=1200&h=800&fit=crop&q=80',
    accent: '#E91E63',
    accentLight: '#FCE4EC',
    accentDark: '#AD1457',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    theme: 'warm',
  },
  {
    // March — Spring meadow
    url: 'https://images.unsplash.com/photo-1470252649378-9c29740c9_51e?w=1210&h=800&fit=crop&q=80',
    accent: '#4CAF50',
    accentLight: '#E8F5E9',
    accentDark: '#2E7D32',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    theme: 'cool',
  },
  {
    // April — Rainy countryside
    url: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=1200&h=800&fit=crop&q=80',
    accent: '#9C27B0',
    accentLight: '#F3E5F5',
    accentDark: '#6A1B9A',
    gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    theme: 'cool',
  },
  {
    // May — Sunflower field
    url: 'https://images.unsplash.com/photo-1470509037663-253afd7f0f51?w=1200&h=800&fit=crop&q=80',
    accent: '#FF9800',
    accentLight: '#FFF3E0',
    accentDark: '#E65100',
    gradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    theme: 'warm',
  },
  {
    // June — Tropical beach
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop&q=80',
    accent: '#00BCD4',
    accentLight: '#E0F7FA',
    accentDark: '#00838F',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    theme: 'cool',
  },
  {
    // July — Summer sunset
    url: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=1200&h=800&fit=crop&q=80',
    accent: '#FF5722',
    accentLight: '#FBE9E7',
    accentDark: '#BF360C',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    theme: 'warm',
  },
  {
    // August — Dense forest
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop&q=80',
    accent: '#388E3C',
    accentLight: '#E8F5E9',
    accentDark: '#1B5E20',
    gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    theme: 'cool',
  },
  {
    // September — Autumn foliage
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop&q=80',
    accent: '#FF6F00',
    accentLight: '#FFF8E1',
    accentDark: '#E65100',
    gradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    theme: 'warm',
  },
  {
    // October — Autumn road
    url: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=1200&h=800&fit=crop&q=80',
    accent: '#E64A19',
    accentLight: '#FBE9E7',
    accentDark: '#BF360C',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    theme: 'warm',
  },
  {
    // November — Misty hills
    url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=800&fit=crop&q=80',
    accent: '#795548',
    accentLight: '#EFEBE9',
    accentDark: '#4E342E',
    gradient: 'linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)',
    theme: 'cool',
  },
  {
    // December — Winter wonderland
    url: 'https://images.unsplash.com/photo-1457269449834-928af64c684d?w=1200&h=800&fit=crop&q=80',
    accent: '#C62828',
    accentLight: '#FFEBEE',
    accentDark: '#B71C1C',
    gradient: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
    theme: 'cool',
  },
];

export default MONTH_IMAGES;
