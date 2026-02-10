import React, { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { Product, Category } from '../data/mockData-UPDATED';
import { mockProducts, mockCategories } from '../data/mockData-UPDATED';

// Types pour le contexte
export interface ApiState {
  products: Product[];
  categories: Category[];
  loading: boolean;
  error: string | null;
}

export interface ApiContextType extends ApiState {
  // Produits
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Catégories
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  
  // Actions générales
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  refreshData: () => void;
}

// Types d'actions
type ApiAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'SET_CATEGORIES'; payload: Category[] }
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'UPDATE_PRODUCT'; payload: { id: string; product: Partial<Product> } }
  | { type: 'DELETE_PRODUCT'; payload: string }
  | { type: 'ADD_CATEGORY'; payload: Category }
  | { type: 'UPDATE_CATEGORY'; payload: { id: string; category: Partial<Category> } }
  | { type: 'DELETE_CATEGORY'; payload: string }
  | { type: 'REFRESH_DATA' };

// État initial
const initialState: ApiState = {
  products: [],
  categories: [],
  loading: false,
  error: null,
};

// Reducer
const apiReducer = (state: ApiState, action: ApiAction): ApiState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload, loading: false };
    
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload, loading: false };
    
    case 'ADD_PRODUCT':
      return { 
        ...state, 
        products: [...state.products, action.payload],
        loading: false 
      };
    
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(p => 
          p.id === action.payload.id ? { ...p, ...action.payload.product, updatedAt: new Date() } : p
        ),
        loading: false
      };
    
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(p => p.id !== action.payload),
        loading: false
      };
    
    case 'ADD_CATEGORY':
      return {
        ...state,
        categories: [...state.categories, action.payload],
        loading: false
      };
    
    case 'UPDATE_CATEGORY':
      return {
        ...state,
        categories: state.categories.map(c => 
          c.id === action.payload.id ? { ...c, ...action.payload.category } : c
        ),
        loading: false
      };
    
    case 'DELETE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter(c => c.id !== action.payload),
        loading: false
      };
    
    case 'REFRESH_DATA':
      return { ...state, loading: true };
    
    default:
      return state;
  }
};

// Création du contexte
const ApiContext = createContext<ApiContextType | undefined>(undefined);

// Provider
export const ApiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(apiReducer, initialState);

  // Actions
  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const setError = (error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  const refreshData = async () => {
    setLoading(true);
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 500));
      dispatch({ type: 'SET_PRODUCTS', payload: mockProducts });
      dispatch({ type: 'SET_CATEGORIES', payload: mockCategories });
    } catch (error) {
      setError('Erreur lors du chargement des données');
    }
  };

  const addProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    setLoading(true);
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const newProduct: Product = {
        ...productData,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
    } catch (error) {
      setError('Erreur lors de l\'ajout du produit');
    }
  };

  const updateProduct = async (id: string, productData: Partial<Product>) => {
    setLoading(true);
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 300));
      dispatch({ type: 'UPDATE_PRODUCT', payload: { id, product: productData } });
    } catch (error) {
      setError('Erreur lors de la mise à jour du produit');
    }
  };

  const deleteProduct = async (id: string) => {
    setLoading(true);
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 300));
      dispatch({ type: 'DELETE_PRODUCT', payload: id });
    } catch (error) {
      setError('Erreur lors de la suppression du produit');
    }
  };

  const addCategory = async (categoryData: Omit<Category, 'id'>) => {
    setLoading(true);
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const newCategory: Category = {
        ...categoryData,
        id: Date.now().toString(),
      };
      
      dispatch({ type: 'ADD_CATEGORY', payload: newCategory });
    } catch (error) {
      setError('Erreur lors de l\'ajout de la catégorie');
    }
  };

  const updateCategory = async (id: string, categoryData: Partial<Category>) => {
    setLoading(true);
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 300));
      dispatch({ type: 'UPDATE_CATEGORY', payload: { id, category: categoryData } });
    } catch (error) {
      setError('Erreur lors de la mise à jour de la catégorie');
    }
  };

  const deleteCategory = async (id: string) => {
    setLoading(true);
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 300));
      dispatch({ type: 'DELETE_CATEGORY', payload: id });
    } catch (error) {
      setError('Erreur lors de la suppression de la catégorie');
    }
  };

  // Charger les données au montage
  React.useEffect(() => {
    refreshData();
  }, []);

  const value: ApiContextType = {
    ...state,
    setLoading,
    setError,
    refreshData,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    updateCategory,
    deleteCategory,
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

// Hook pour utiliser le contexte
export const useApi = (): ApiContextType => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error('useApi doit être utilisé dans un ApiProvider');
  }
  return context;
};
