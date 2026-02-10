import React, { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../data/mockData-UPDATED';

// Types pour le contexte
export interface CartItem {
  product: Product;
  quantity: number;
  addedAt: Date;
}

export interface WishlistItem {
  product: Product;
  addedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isLoggedIn: boolean;
  addresses: Address[];
  paymentMethods: PaymentMethod[];
}

export interface Address {
  id: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'bank';
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}

export interface ShopState {
  // Panier
  cart: CartItem[];
  cartTotal: number;
  cartItemsCount: number;
  
  // Wishlist
  wishlist: WishlistItem[];
  wishlistCount: number;
  
  // Utilisateur
  user: User | null;
  isLoggedIn: boolean;
  
  // États de chargement
  loading: {
    cart: boolean;
    wishlist: boolean;
    user: boolean;
  };
  
  // Erreurs
  errors: {
    cart: string | null;
    wishlist: string | null;
    user: string | null;
  };
}

export interface ShopContextType extends ShopState {
  // Actions panier
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Actions wishlist
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
  
  // Actions utilisateur
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Omit<User, 'id' | 'isLoggedIn' | 'addresses' | 'paymentMethods'>) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
  
  // Actions utilitaires
  setLoading: (section: keyof ShopState['loading'], loading: boolean) => void;
  setError: (section: keyof ShopState['errors'], error: string | null) => void;
}

// Types d'actions
type ShopAction =
  | { type: 'SET_LOADING'; payload: { section: keyof ShopState['loading']; loading: boolean } }
  | { type: 'SET_ERROR'; payload: { section: keyof ShopState['errors']; error: string | null } }
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_TO_WISHLIST'; payload: Product }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string }
  | { type: 'CLEAR_WISHLIST' }
  | { type: 'SET_USER'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_PROFILE'; payload: Partial<User> };

// État initial
const initialState: ShopState = {
  cart: [],
  cartTotal: 0,
  cartItemsCount: 0,
  wishlist: [],
  wishlistCount: 0,
  user: null,
  isLoggedIn: false,
  loading: {
    cart: false,
    wishlist: false,
    user: false,
  },
  errors: {
    cart: null,
    wishlist: null,
    user: null,
  },
};

// Reducer
const shopReducer = (state: ShopState, action: ShopAction): ShopState => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload.section]: action.payload.loading,
        },
      };

    case 'SET_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.section]: action.payload.error,
        },
      };

    case 'ADD_TO_CART': {
      const existingItem = state.cart.find(item => item.product.id === action.payload.product.id);
      let newCart: CartItem[];

      if (existingItem) {
        newCart = state.cart.map(item =>
          item.product.id === action.payload.product.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        newCart = [...state.cart, {
          product: action.payload.product,
          quantity: action.payload.quantity,
          addedAt: new Date(),
        }];
      }

      const cartTotal = newCart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
      const cartItemsCount = newCart.reduce((total, item) => total + item.quantity, 0);

      return {
        ...state,
        cart: newCart,
        cartTotal,
        cartItemsCount,
      };
    }

    case 'REMOVE_FROM_CART': {
      const newCart = state.cart.filter(item => item.product.id !== action.payload);
      const cartTotal = newCart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
      const cartItemsCount = newCart.reduce((total, item) => total + item.quantity, 0);

      return {
        ...state,
        cart: newCart,
        cartTotal,
        cartItemsCount,
      };
    }

    case 'UPDATE_CART_QUANTITY': {
      const newCart = state.cart.map(item =>
        item.product.id === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0);

      const cartTotal = newCart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
      const cartItemsCount = newCart.reduce((total, item) => total + item.quantity, 0);

      return {
        ...state,
        cart: newCart,
        cartTotal,
        cartItemsCount,
      };
    }

    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
        cartTotal: 0,
        cartItemsCount: 0,
      };

    case 'ADD_TO_WISHLIST': {
      const exists = state.wishlist.some(item => item.product.id === action.payload.id);
      if (exists) return state;

      return {
        ...state,
        wishlist: [...state.wishlist, {
          product: action.payload,
          addedAt: new Date(),
        }],
        wishlistCount: state.wishlistCount + 1,
      };
    }

    case 'REMOVE_FROM_WISHLIST': {
      const newWishlist = state.wishlist.filter(item => item.product.id !== action.payload);
      return {
        ...state,
        wishlist: newWishlist,
        wishlistCount: newWishlist.length,
      };
    }

    case 'CLEAR_WISHLIST':
      return {
        ...state,
        wishlist: [],
        wishlistCount: 0,
      };

    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };

    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isLoggedIn: false,
      };

    case 'UPDATE_PROFILE':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };

    default:
      return state;
  }
};

// Création du contexte
const ShopContext = createContext<ShopContextType | undefined>(undefined);

// Provider
export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(shopReducer, initialState);

  // Actions utilitaires
  const setLoading = (section: keyof ShopState['loading'], loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: { section, loading } });
  };

  const setError = (section: keyof ShopState['errors'], error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: { section, error } });
  };

  // Actions panier
  const addToCart = (product: Product, quantity: number = 1) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } });
    
    // Sauvegarder dans localStorage
    const cart = [...state.cart, { product, quantity, addedAt: new Date() }];
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    
    // Mettre à jour localStorage
    const newCart = state.cart.filter(item => item.product.id !== productId);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const updateCartItemQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { productId, quantity } });
    
    // Mettre à jour localStorage
    const newCart = state.cart.map(item =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    localStorage.removeItem('cart');
  };

  // Actions wishlist
  const addToWishlist = (product: Product) => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
    
    // Sauvegarder dans localStorage
    const wishlist = [...state.wishlist, { product, addedAt: new Date() }];
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  };

  const removeFromWishlist = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
    
    // Mettre à jour localStorage
    const newWishlist = state.wishlist.filter(item => item.product.id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
  };

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
    localStorage.removeItem('wishlist');
  };

  const isInWishlist = (productId: string): boolean => {
    return state.wishlist.some(item => item.product.id === productId);
  };

  // Actions utilisateur
  const login = async (email: string, password: string) => {
    setLoading('user', true);
    setError('user', null);

    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock user data
      const mockUser: User = {
        id: '1',
        name: 'Jean Dupont',
        email: email,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        isLoggedIn: true,
        addresses: [
          {
            id: '1',
            street: '123 Rue de la République',
            city: 'Paris',
            postalCode: '75001',
            country: 'France',
            isDefault: true,
          },
        ],
        paymentMethods: [
          {
            id: '1',
            type: 'card',
            last4: '4242',
            brand: 'Visa',
            expiryMonth: 12,
            expiryYear: 2025,
            isDefault: true,
          },
        ],
      };

      dispatch({ type: 'SET_USER', payload: mockUser });
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      setError('user', 'Erreur lors de la connexion');
    } finally {
      setLoading('user', false);
    }
  };

  const register = async (userData: Omit<User, 'id' | 'isLoggedIn' | 'addresses' | 'paymentMethods'>) => {
    setLoading('user', true);
    setError('user', null);

    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newUser: User = {
        ...userData,
        id: Date.now().toString(),
        isLoggedIn: true,
        addresses: [],
        paymentMethods: [],
      };

      dispatch({ type: 'SET_USER', payload: newUser });
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (error) {
      setError('user', 'Erreur lors de l\'inscription');
    } finally {
      setLoading('user', false);
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('user');
  };

  const updateProfile = (userData: Partial<User>) => {
    dispatch({ type: 'UPDATE_PROFILE', payload: userData });
    
    if (state.user) {
      const updatedUser = { ...state.user, ...userData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  // Charger les données depuis localStorage au montage
  React.useEffect(() => {
    // Charger le panier
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const cart = JSON.parse(savedCart);
        cart.forEach((item: CartItem) => {
          dispatch({ type: 'ADD_TO_CART', payload: { product: item.product, quantity: item.quantity } });
        });
      } catch (error) {
        console.error('Erreur lors du chargement du panier:', error);
      }
    }

    // Charger la wishlist
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        const wishlist = JSON.parse(savedWishlist);
        wishlist.forEach((item: WishlistItem) => {
          dispatch({ type: 'ADD_TO_WISHLIST', payload: item.product });
        });
      } catch (error) {
        console.error('Erreur lors du chargement de la wishlist:', error);
      }
    }

    // Charger l'utilisateur
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({ type: 'SET_USER', payload: user });
      } catch (error) {
        console.error('Erreur lors du chargement de l\'utilisateur:', error);
      }
    }
  }, []);

  const value: ShopContextType = {
    ...state,
    setLoading,
    setError,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
    login,
    register,
    logout,
    updateProfile,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

// Hook pour utiliser le contexte
export const useShop = (): ShopContextType => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('useShop doit être utilisé dans un ShopProvider');
  }
  return context;
};
