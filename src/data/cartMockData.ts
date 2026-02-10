// Données mockées pour le panier
// Ajoutez ceci à votre mockData.ts ou créez un fichier séparé

import type { CartItem } from '../types/types';
import { mockProducts } from './mockData-UPDATED';

// Panier mocké (simulation de données)
export const mockCartItems: CartItem[] = [
  {
    id: 'cart-1',
    product: mockProducts[0], // iPhone 15 Pro Max
    quantity: 1,
    selectedColor: 'Titane Naturel',
    selectedSize: '256GB'
  },
  {
    id: 'cart-2',
    product: mockProducts[2], // Nike Air Max
    quantity: 2,
    selectedSize: '42'
  },
  {
    id: 'cart-3',
    product: mockProducts[5], // AirPods Pro
    quantity: 1
  }
];

// Fonction pour calculer le sous-total
export const calculateSubtotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => {
    return total + (item.product.price * item.quantity);
  }, 0);
};

// Fonction pour calculer les frais de livraison
export const calculateShipping = (subtotal: number): number => {
  // Livraison gratuite au-dessus de 50€
  return subtotal >= 50 ? 0 : 4.99;
};

// Fonction pour calculer la TVA (20%)
export const calculateTax = (subtotal: number): number => {
  return subtotal * 0.20;
};

// Fonction pour calculer la réduction avec code promo
export const calculateDiscount = (subtotal: number, promoCode?: string): number => {
  if (!promoCode) return 0;

  const discounts: Record<string, number> = {
    'PROMO10': 0.10,   // 10% de réduction
    'WELCOME20': 0.20, // 20% de réduction
    'SAVE15': 0.15     // 15% de réduction
  };

  const discountRate = discounts[promoCode] || 0;
  return subtotal * discountRate;
};

// Fonction pour calculer le total final
export const calculateTotal = (
  subtotal: number,
  shipping: number,
  tax: number,
  discount: number
): number => {
  return subtotal + shipping + tax - discount;
};