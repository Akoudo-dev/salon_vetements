import React from 'react';
import { Link } from 'react-router-dom';
import type { Category } from '../types/types';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link
      to={`/shop?category=${category.slug}`}
      className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
      </div>
      
      {/* Contenu */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="text-2xl font-bold mb-2 group-hover:text-yellow-300 transition-colors">
          {category.name}
        </h3>
        
        {category.description && (
          <p className="text-sm text-white/80 mb-3 line-clamp-2">
            {category.description}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
            {category.productsCount || 0} produits
          </span>
          
          <span className="text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
            Explorer
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
      
      {/* Badge "Nouveau" si applicable */}
      {category.productsCount && category.productsCount > 50 && (
        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
          Populaire
        </div>
      )}
    </Link>
  );
};

export default CategoryCard;