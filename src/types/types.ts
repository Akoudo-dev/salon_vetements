// 📦 TYPES POUR LE PROJET E-COMMERCE
// Copiez ce fichier dans : src/types/types.ts

// Types pour le Navbar
export interface NavbarProps {
  cartItemsCount?: number;
  wishlistCount?: number;
  isLoggedIn?: boolean;
  userName?: string;
}

// Types pour les Produits
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  images?: string[];
  category: string;
  stock: number;
  rating: number;
  reviewsCount: number;
  brand?: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

// Types pour le Panier
export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemsCount: number;
}

// Types pour l'Utilisateur
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  role: 'user' | 'admin';
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
}

// Types pour les Commandes
export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  image: string;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  shippingAddress: ShippingAddress;
  paymentMethod: 'card' | 'paypal' | 'cash';
  paymentStatus: 'pending' | 'paid' | 'failed';
  orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

// Types pour les Catégories
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  productsCount?: number;
}

// Types pour les Reviews
export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  productId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

// Types pour les Filtres
export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  inStock?: boolean;
  sortBy?: 'price-asc' | 'price-desc' | 'name' | 'rating' | 'newest';
  search?: string;
}

// Types pour la Pagination
export interface PaginationData {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
}

// Types pour les Réponses API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

// Types pour le Formulaire de Login
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

// Types pour le Formulaire d'Inscription
export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

// Types pour le Checkout
export interface CheckoutFormData {
  shippingAddress: ShippingAddress;
  paymentMethod: 'card' | 'paypal' | 'cash';
  cardDetails?: {
    cardNumber: string;
    cardName: string;
    expiryDate: string;
    cvv: string;
  };
}

// Types pour la Wishlist
export interface WishlistItem {
  id: string;
  product: Product;
  addedAt: Date;
}

export interface Wishlist {
  items: WishlistItem[];
  count: number;
}