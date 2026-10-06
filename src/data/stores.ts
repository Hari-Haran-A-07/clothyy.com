import { StoreLocation } from '../types';

export const STORES: StoreLocation[] = [
  {
    id: 'store-kwt',
    name: 'CLOTHYYY Flagship Salon — Kuwait City',
    city: 'Kuwait City',
    country: 'Kuwait',
    address: 'Al Hamra Luxury Center, Level 2, Al Shuhada St, Sharq',
    postal: 'PO Box 1284',
    phone: '+965 2205 8899',
    email: 'kuwait.concierge@clothyyy.com',
    hours: 'Saturday – Thursday: 10:00 AM – 10:00 PM | Friday: 2:00 PM – 10:00 PM',
    services: [
      'Private VIP Styling Suites',
      'Master Bespoke Tailoring & Alterations',
      'Champagne & Arabic Coffee Hospitality Bar',
      'Same-Day Gulf White-Glove Courier',
      'Private Salon Showings by Appointment'
    ],
    image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1200&q=85',
    isFlagship: true,
    coordinates: {
      lat: 29.3797,
      lng: 47.9912
    }
  },
  {
    id: 'store-lon',
    name: 'CLOTHYYY Maison — London Mayfair',
    city: 'London',
    country: 'United Kingdom',
    address: '42 New Bond Street, Mayfair, London W1S 2RY',
    postal: 'W1S 2RY',
    phone: '+44 20 7946 0880',
    email: 'london.maison@clothyyy.com',
    hours: 'Monday – Saturday: 10:00 AM – 7:00 PM | Sunday: 12:00 PM – 6:00 PM',
    services: [
      'Savile Row Trained Master Tailor in Residence',
      'Private Archival Fitting Room',
      'White-Glove Central London Delivery',
      'Virtual Global Concierge Appointments'
    ],
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85',
    isFlagship: true,
    coordinates: {
      lat: 51.5113,
      lng: -0.1444
    }
  },
  {
    id: 'store-par',
    name: 'CLOTHYYY Atelier — Paris Place Vendôme',
    city: 'Paris',
    country: 'France',
    address: '18 Place Vendôme, 75001 Paris',
    postal: '75001',
    phone: '+33 1 42 68 55 00',
    email: 'paris.atelier@clothyyy.com',
    hours: 'Monday – Saturday: 10:30 AM – 7:30 PM | Sunday: Closed',
    services: [
      'Haute Couture Made-to-Measure Consultations',
      'Silk & Cashmere Fabric Library',
      'Private Salon with Courtyard Garden',
      'Same-Day Paris Delivery'
    ],
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=85',
    isFlagship: true,
    coordinates: {
      lat: 48.8675,
      lng: 2.3294
    }
  },
  {
    id: 'store-nyc',
    name: 'CLOTHYYY Flagship — New York Madison',
    city: 'New York',
    country: 'United States',
    address: '680 Madison Avenue, New York, NY 10065',
    postal: 'NY 10065',
    phone: '+1 212 555 0192',
    email: 'madison.concierge@clothyyy.com',
    hours: 'Monday – Saturday: 10:00 AM – 7:00 PM | Sunday: 12:00 PM – 6:00 PM',
    services: [
      'Private Rooftop VIP Suite',
      'Dedicated Wardrobe Stylists',
      'Manhattan Same-Day Chauffeur Delivery',
      'Corporate Gifting Concierge'
    ],
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=85',
    isFlagship: true,
    coordinates: {
      lat: 40.7648,
      lng: -73.9712
    }
  },
  {
    id: 'store-tyo',
    name: 'CLOTHYYY Salon — Tokyo Omotesando',
    city: 'Tokyo',
    country: 'Japan',
    address: '4-12-10 Jingumae, Shibuya-ku, Tokyo 150-0001',
    postal: '150-0001',
    phone: '+81 3 5770 3300',
    email: 'tokyo.salon@clothyyy.com',
    hours: 'Everyday: 11:00 AM – 8:00 PM',
    services: [
      'Japanese Selvedge & Cashmere Archive Gallery',
      'Tea Ceremony Hospitality Lounge',
      'Bespoke Kimono Silk Lining Service',
      'Tokyo Metro Area VIP Dispatch'
    ],
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=85',
    isFlagship: false,
    coordinates: {
      lat: 35.6653,
      lng: 139.7123
    }
  }
];
