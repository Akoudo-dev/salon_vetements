import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiEye, FiStar } from 'react-icons/fi';
import type { Product } from '../types/types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useShop();
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const isWishlisted = isInWishlist(product.id.toString());

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist(product.id.toString())) {
      removeFromWishlist(product.id.toString());
    } else {
      addToWishlist(product);
    }
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden">
      
      {/* Image Container */}
      <Link to={`/product/${product.slug}`} className="relative block overflow-hidden">
        <div className="relative h-72 bg-gray-100">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}
          
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Overlay sur hover */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            <button
              onClick={handleAddToCart}
              className="bg-white text-blue-600 p-3 rounded-full hover:bg-blue-600 hover:text-white transition-all transform hover:scale-110"
              title="Ajouter au panier"
            >
              <FiShoppingCart className="text-xl" />
            </button>
            
            <Link
              to={`/product/${product.slug}`}
              className="bg-white text-blue-600 p-3 rounded-full hover:bg-blue-600 hover:text-white transition-all transform hover:scale-110"
              title="Voir détails"
            >
              <FiEye className="text-xl" />
            </Link>
          </div>
        </div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discountPercentage > 0 && (
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              -{discountPercentage}%
            </span>
          )}
          
          {product.stock < 10 && product.stock > 0 && (
            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              Stock limité
            </span>
          )}
          
          {product.stock === 0 && (
            <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              Rupture
            </span>
          )}
        </div>
        
        {/* Bouton Wishlist */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all ${
            isWishlisted 
              ? 'bg-red-500 text-white' 
              : 'bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white'
          }`}
          title={isWishlisted ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        >
          <FiHeart className={`text-xl ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
      </Link>
      
      {/* Informations Produit */}
      <div className="p-4 space-y-3">
        {/* Catégorie */}
        <Link 
          to={`/shop?category=${product.category}`}
          className="text-xs text-blue-600 font-semibold uppercase tracking-wide hover:underline"
        >
          {product.category}
        </Link>
        
        {/* Nom du produit */}
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-bold text-lg text-gray-800 hover:text-blue-600 transition-colors line-clamp-2 min-h-[3.5rem]">
            {product.name}
          </h3>
        </Link>
        
        {/* Note et avis */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, index) => (
              <FiStar
                key={index}
                className={`text-sm ${
                  index < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {product.rating.toFixed(1)} ({product.reviewsCount})
          </span>
        </div>
        
        {/* Prix */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">
              {product.price.toFixed(2)} €
            </span>
            
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                {product.originalPrice.toFixed(2)} €
              </span>
            )}
          </div>
        </div>
        
        {/* Bouton Ajouter au panier */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
            product.stock === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5'
          }`}
        >
          <FiShoppingCart className="text-xl" />
          {product.stock === 0 ? 'Rupture de stock' : 'Ajouter au panier'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;