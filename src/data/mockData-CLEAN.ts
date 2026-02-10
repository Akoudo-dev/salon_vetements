// Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productsCount: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  images: string[];
  category: string;
  stock: number;
  rating: number;
  reviewsCount: number;
  brand?: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

// Imports des images locales pour les catégories
import electroImg from '../assets/categories/electro.jpg';
import hommeImg from '../assets/categories/homme.jpg';
import femmeImg from '../assets/categories/femme.jpg';
import maisonImg from '../assets/categories/maison.jpg';
import sportImg from '../assets/categories/sport.jpg';

// Imports des images locales pour les produits - Électronique
import electro1 from '../assets/products/electronique/electro1.jpg';
import electro2 from '../assets/products/electronique/electro2.jpg';
import electro3 from '../assets/products/electronique/electro3.jpg';
import electro4 from '../assets/products/electronique/electro4.jpg';
import electro5 from '../assets/products/electronique/electro5.jpg';
import electro6 from '../assets/products/electronique/electro6.jpg';
import electro7 from '../assets/products/electronique/electro7.jpg';
import electro8 from '../assets/products/electronique/electro8.jpg';
import electro9 from '../assets/products/electronique/electro9.jpg';
import electro10 from '../assets/products/electronique/electro10.jpg';
import electro11 from '../assets/products/electronique/electro11.jpg';
import electro12 from '../assets/products/electronique/electro12.jpg';

// Imports des images locales pour les produits - Mode Femme
import femme1 from '../assets/products/mode-femme/femme1.jpg';
import femme2 from '../assets/products/mode-femme/femme2.jpg';
import femme3 from '../assets/products/mode-femme/femme3.jpg';
import femme4 from '../assets/products/mode-femme/femme4.jpg';
import femme5 from '../assets/products/mode-femme/femme5.jpg';
import femme6 from '../assets/products/mode-femme/femme6.jpg';

// Imports des images locales pour les produits - Mode Homme
import homme1 from '../assets/products/mode-homme/Image (1).png';
import homme2 from '../assets/products/mode-homme/Image (2).png';
import homme3 from '../assets/products/mode-homme/Image (3) - Copie.png';
import homme4 from '../assets/products/mode-homme/Image (4) - Copie.png';
import homme5 from '../assets/products/mode-homme/Image (4).png';
import homme6 from '../assets/products/mode-homme/Image (5) - Copie.png';

// Imports des images locales pour les produits - Maison & Déco
import maison1 from '../assets/products/maison-deco/maison1.jpg';
import maison2 from '../assets/products/maison-deco/maison2.jpg';
import maison3 from '../assets/products/maison-deco/maison3.jpg';
import maison4 from '../assets/products/maison-deco/maison4.jpg';

// Imports des images locales pour les produits - Sport & Fitness
import sport1 from '../assets/products/sport-fitness/sport1.jpg';
import sport2 from '../assets/products/sport-fitness/sport2.jpg';
import sport3 from '../assets/products/sport-fitness/sport3.jpg';
import sport4 from '../assets/products/sport-fitness/sport4.jpg';

// Catégories mockées
export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Électronique',
    slug: 'electronique',
    description: 'Smartphones, laptops, accessoires et plus',
    image: electroImg,
    productsCount: 156
  },
  {
    id: '2',
    name: 'Mode Homme',
    slug: 'mode-homme',
    description: 'Vêtements, chaussures et accessoires pour hommes',
    image: hommeImg,
    productsCount: 243
  },
  {
    id: '3',
    name: 'Mode Femme',
    slug: 'mode-femme',
    description: 'Robes, tops, chaussures et accessoires',
    image: femmeImg,
    productsCount: 387
  },
  {
    id: '4',
    name: 'Maison & Déco',
    slug: 'maison-deco',
    description: 'Meubles, décorations et accessoires maison',
    image: maisonImg,
    productsCount: 198
  },
  {
    id: '5',
    name: 'Sport & Fitness',
    slug: 'sport-fitness',
    description: 'Équipements sportifs et vêtements de sport',
    image: sportImg,
    productsCount: 127
  }
];

// Produits mockés - Organisés par catégorie
export const mockProducts: Product[] = [
  // ÉLECTRONIQUE
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    description: 'Le smartphone le plus avancé avec puce A17 Pro, appareil photo professionnel et design en titane.',
    price: 1299.99,
    originalPrice: 1499.99,
    discount: 13,
    image: electro1,
    images: [electro1, electro2, electro3, electro4],
    category: 'Électronique',
    stock: 45,
    rating: 4.8,
    reviewsCount: 1247,
    brand: 'Apple',
    slug: 'iphone-15-pro-max',
    createdAt: new Date('2026-01-15'),
    updatedAt: new Date('2026-02-01')
  },
  {
    id: '2',
    name: 'MacBook Pro 16" M3',
    description: 'Performance exceptionnelle avec la puce M3, écran Liquid Retina XDR et autonomie toute la journée.',
    price: 2899.00,
    originalPrice: 3299.00,
    image: electro5,
    images: [electro5, electro6, electro8],
    category: 'Électronique',
    stock: 23,
    rating: 4.9,
    reviewsCount: 856,
    brand: 'Apple',
    slug: 'macbook-pro-16-m3',
    createdAt: new Date('2026-01-10'),
    updatedAt: new Date('2026-02-05')
  },
  {
    id: '3',
    name: 'AirPods Pro 3',
    description: 'Réduction de bruit active améliorée, son spatial personnalisé et design ergonomique.',
    price: 279.99,
    image: electro11,
    images: [electro11, electro12],
    category: 'Électronique',
    stock: 234,
    rating: 4.8,
    reviewsCount: 1456,
    brand: 'Apple',
    slug: 'airpods-pro-3',
    createdAt: new Date('2026-01-18'),
    updatedAt: new Date('2026-02-04')
  },

  // MODE HOMME
  {
    id: '4',
    name: 'Veste en cuir premium',
    description: 'Veste en cuir véritable de haute qualité. Style intemporel et confort optimal.',
    price: 349.99,
    originalPrice: 499.99,
    image: homme1,
    images: [homme1, homme2],
    category: 'Mode Homme',
    stock: 34,
    rating: 4.7,
    reviewsCount: 267,
    slug: 'veste-cuir-premium',
    createdAt: new Date('2026-01-12'),
    updatedAt: new Date('2026-02-01')
  },
  {
    id: '5',
    name: 'Chemise blanche classique',
    description: 'Chemise en coton premium, coupe moderne et finition impeccable. Indispensable du dressing.',
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    image: homme3,
    images: [homme3, homme4],
    category: 'Mode Homme',
    stock: 156,
    rating: 4.5,
    reviewsCount: 432,
    slug: 'chemise-blanche-classique',
    createdAt: new Date('2026-01-20'),
    updatedAt: new Date('2026-02-03')
  },
  {
    id: '6',
    name: 'Jean slim fit noir',
    description: 'Jean stretch moderne avec coupe slim. Confortable et élégant pour toutes occasions.',
    price: 129.99,
    image: homme5,
    images: [homme5, homme6],
    category: 'Mode Homme',
    stock: 89,
    rating: 4.6,
    reviewsCount: 298,
    slug: 'jean-slim-fit-noir',
    createdAt: new Date('2026-01-25'),
    updatedAt: new Date('2026-02-06')
  },

  // MODE FEMME
  {
    id: '7',
    name: 'Robe d\'été florale',
    description: 'Robe légère et élégante parfaite pour l\'été. Tissu respirant et coupe flatteuse.',
    price: 89.99,
    image: femme1,
    images: [femme1, femme2],
    category: 'Mode Femme',
    stock: 67,
    rating: 4.7,
    reviewsCount: 523,
    slug: 'robe-ete-florale',
    createdAt: new Date('2026-01-14'),
    updatedAt: new Date('2026-02-02')
  },
  {
    id: '8',
    name: 'Sac à main cuir luxe',
    description: 'Sac élégant en cuir véritable italien. Multiple compartiments et bandoulière ajustable.',
    price: 449.99,
    originalPrice: 599.99,
    image: femme3,
    images: [femme3, femme4],
    category: 'Mode Femme',
    stock: 28,
    rating: 4.8,
    reviewsCount: 367,
    slug: 'sac-main-cuir-luxe',
    createdAt: new Date('2026-01-16'),
    updatedAt: new Date('2026-02-03')
  },
  {
    id: '9',
    name: 'Bottines élégantes',
    description: 'Bottines en cuir avec talon confortable. Style moderne et polyvalent.',
    price: 189.99,
    originalPrice: 249.99,
    discount: 24,
    image: femme5,
    images: [femme5, femme6],
    category: 'Mode Femme',
    stock: 45,
    rating: 4.6,
    reviewsCount: 189,
    slug: 'bottines-elegantes',
    createdAt: new Date('2026-01-22'),
    updatedAt: new Date('2026-02-05')
  },

  // MAISON & DÉCO
  {
    id: '10',
    name: 'Canapé d\'angle moderne',
    description: 'Canapé spacieux avec tissu haute qualité et design contemporain. Idéal pour les grands espaces.',
    price: 1299.00,
    originalPrice: 1599.00,
    discount: 19,
    image: maison1,
    images: [maison1, maison2],
    category: 'Maison & Déco',
    stock: 12,
    rating: 4.5,
    reviewsCount: 89,
    slug: 'canape-angle-moderne',
    createdAt: new Date('2026-01-05'),
    updatedAt: new Date('2026-01-30')
  },
  {
    id: '11',
    name: 'Lampe design scandinave',
    description: 'Lampe de table au design minimaliste. Lumination chaude et ambiance cosy.',
    price: 79.99,
    image: maison3,
    images: [maison3, maison4],
    category: 'Maison & Déco',
    stock: 134,
    rating: 4.4,
    reviewsCount: 156,
    slug: 'lampe-design-scandinave',
    createdAt: new Date('2026-01-14'),
    updatedAt: new Date('2026-02-02')
  },

  // SPORT & FITNESS
  {
    id: '12',
    name: 'Nike Air Max 2026',
    description: 'Confort ultime et style iconique. La nouvelle génération de Air Max pour tous vos mouvements.',
    price: 179.99,
    originalPrice: 219.99,
    image: sport1,
    images: [sport1, sport2],
    category: 'Sport & Fitness',
    stock: 78,
    rating: 4.6,
    reviewsCount: 542,
    brand: 'Nike',
    slug: 'nike-air-max-2026',
    createdAt: new Date('2026-01-08'),
    updatedAt: new Date('2026-02-03')
  },
  {
    id: '13',
    name: 'Tapis de yoga premium',
    description: 'Tapis antidérapant en caoutchouc naturel. Épaisseur optimale et design ergonomique.',
    price: 49.99,
    image: sport3,
    images: [sport3, sport4],
    category: 'Sport & Fitness',
    stock: 234,
    rating: 4.7,
    reviewsCount: 423,
    slug: 'tapis-yoga-premium',
    createdAt: new Date('2026-01-11'),
    updatedAt: new Date('2026-02-01')
  }
];

// Fonctions utilitaires
export const getProductBySlug = (slug: string): Product | undefined => {
  return mockProducts.find(product => product.slug === slug);
};

export const getProductsByCategory = (category: string): Product[] => {
  return mockProducts.filter(product => product.category === category);
};

export const getRelatedProducts = (product: Product, limit: number = 4): Product[] => {
  return mockProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
};
