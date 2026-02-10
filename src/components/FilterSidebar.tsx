import React, { useState } from 'react';
import { FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import type { ProductFilters } from '../types/types';

interface FilterSidebarProps {
  filters: ProductFilters;
  onFilterChange: (filters: ProductFilters) => void;
  categories: string[];
  onClose?: () => void;
  isMobile?: boolean;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  categories,
  onClose,
  isMobile = false
}) => {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    rating: true,
    availability: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCategoryChange = (category: string) => {
    onFilterChange({
      ...filters,
      category: filters.category === category ? undefined : category
    });
  };

  const handlePriceChange = (min?: number, max?: number) => {
    onFilterChange({
      ...filters,
      minPrice: min,
      maxPrice: max
    });
  };

  const handleRatingChange = (rating: number) => {
    onFilterChange({
      ...filters,
      rating: filters.rating === rating ? undefined : rating
    });
  };

  const handleStockChange = (inStock: boolean) => {
    onFilterChange({
      ...filters,
      inStock: filters.inStock === inStock ? undefined : inStock
    });
  };

  const clearFilters = () => {
    onFilterChange({
      category: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      rating: undefined,
      inStock: undefined,
      sortBy: filters.sortBy,
      search: filters.search
    });
  };

  const priceRanges = [
    { label: 'Moins de 50€', min: 0, max: 50 },
    { label: '50€ - 100€', min: 50, max: 100 },
    { label: '100€ - 250€', min: 100, max: 250 },
    { label: '250€ - 500€', min: 250, max: 500 },
    { label: 'Plus de 500€', min: 500, max: undefined }
  ];

  const ratings = [5, 4, 3, 2, 1];

  const hasActiveFilters = !!(
    filters.category ||
    filters.minPrice !== undefined ||
    filters.maxPrice !== undefined ||
    filters.rating ||
    filters.inStock !== undefined
  );

  return (
    <div className={`bg-white ${isMobile ? 'h-full overflow-y-auto' : 'rounded-2xl shadow-lg'} p-6`}>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Filtres</h2>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Réinitialiser
            </button>
          )}
          {isMobile && onClose && (
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <FiX className="text-2xl" />
            </button>
          )}
        </div>
      </div>

      {/* Catégories */}
      <div className="mb-6 border-b border-gray-200 pb-6">
        <button
          onClick={() => toggleSection('category')}
          className="flex items-center justify-between w-full mb-4"
        >
          <h3 className="text-lg font-semibold text-gray-900">Catégories</h3>
          {expandedSections.category ? (
            <FiChevronUp className="text-gray-500" />
          ) : (
            <FiChevronDown className="text-gray-500" />
          )}
        </button>
        
        {expandedSections.category && (
          <div className="space-y-3">
            {categories.map((category) => (
              <label
                key={category}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={filters.category === category}
                  onChange={() => handleCategoryChange(category)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                  {category}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Prix */}
      <div className="mb-6 border-b border-gray-200 pb-6">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full mb-4"
        >
          <h3 className="text-lg font-semibold text-gray-900">Prix</h3>
          {expandedSections.price ? (
            <FiChevronUp className="text-gray-500" />
          ) : (
            <FiChevronDown className="text-gray-500" />
          )}
        </button>
        
        {expandedSections.price && (
          <div className="space-y-3">
            {priceRanges.map((range, index) => {
              const isActive = 
                filters.minPrice === range.min && 
                filters.maxPrice === range.max;
              
              return (
                <label
                  key={index}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="price"
                    checked={isActive}
                    onChange={() => handlePriceChange(range.min, range.max)}
                    className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                    {range.label}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Note */}
      <div className="mb-6 border-b border-gray-200 pb-6">
        <button
          onClick={() => toggleSection('rating')}
          className="flex items-center justify-between w-full mb-4"
        >
          <h3 className="text-lg font-semibold text-gray-900">Note minimum</h3>
          {expandedSections.rating ? (
            <FiChevronUp className="text-gray-500" />
          ) : (
            <FiChevronDown className="text-gray-500" />
          )}
        </button>
        
        {expandedSections.rating && (
          <div className="space-y-3">
            {ratings.map((rating) => (
              <label
                key={rating}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="rating"
                  checked={filters.rating === rating}
                  onChange={() => handleRatingChange(rating)}
                  className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, index) => (
                      <span
                        key={index}
                        className={`text-lg ${
                          index < rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                    et plus
                  </span>
                </div>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Disponibilité */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('availability')}
          className="flex items-center justify-between w-full mb-4"
        >
          <h3 className="text-lg font-semibold text-gray-900">Disponibilité</h3>
          {expandedSections.availability ? (
            <FiChevronUp className="text-gray-500" />
          ) : (
            <FiChevronDown className="text-gray-500" />
          )}
        </button>
        
        {expandedSections.availability && (
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.inStock === true}
                onChange={() => handleStockChange(true)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                En stock uniquement
              </span>
            </label>
          </div>
        )}
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="mt-6 p-4 bg-blue-50 rounded-xl">
          <h4 className="text-sm font-semibold text-blue-900 mb-2">
            Filtres actifs :
          </h4>
          <div className="flex flex-wrap gap-2">
            {filters.category && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-xs rounded-full">
                {filters.category}
                <button
                  onClick={() => handleCategoryChange(filters.category!)}
                  className="hover:bg-blue-700 rounded-full p-0.5"
                >
                  <FiX className="text-xs" />
                </button>
              </span>
            )}
            {(filters.minPrice !== undefined || filters.maxPrice !== undefined) && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-xs rounded-full">
                {filters.minPrice || 0}€ - {filters.maxPrice || '∞'}€
                <button
                  onClick={() => handlePriceChange(undefined, undefined)}
                  className="hover:bg-blue-700 rounded-full p-0.5"
                >
                  <FiX className="text-xs" />
                </button>
              </span>
            )}
            {filters.rating && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-xs rounded-full">
                {filters.rating}★ et +
                <button
                  onClick={() => handleRatingChange(filters.rating!)}
                  className="hover:bg-blue-700 rounded-full p-0.5"
                >
                  <FiX className="text-xs" />
                </button>
              </span>
            )}
            {filters.inStock && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-xs rounded-full">
                En stock
                <button
                  onClick={() => handleStockChange(true)}
                  className="hover:bg-blue-700 rounded-full p-0.5"
                >
                  <FiX className="text-xs" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSidebar;