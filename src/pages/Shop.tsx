import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FiGrid, FiList, FiFilter, FiSearch, FiX } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import Pagination from '../components/Pagination';
import { mockProducts, mockCategories } from '../data/mockData-UPDATED';
import type { Product, ProductFilters } from '../types/types';

const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // États
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 12;

  // Filtres
  const [filters, setFilters] = useState<ProductFilters>({
    category: searchParams.get('category') || undefined,
    minPrice: undefined,
    maxPrice: undefined,
    rating: undefined,
    inStock: undefined,
    sortBy: 'newest',
    search: ''
  });

  // Synchroniser les filtres avec l'URL
  useEffect(() => {
    const category = searchParams.get('category');
    if (category && category !== filters.category) {
      setFilters(prev => ({ ...prev, category }));
    }
  }, [searchParams]);

  // Filtrer et trier les produits
  const filteredProducts = useMemo(() => {
    let filtered = [...mockProducts];

    // Recherche
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        product =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    // Filtre par catégorie
    if (filters.category) {
      const categoryName = mockCategories.find(cat => cat.slug === filters.category)?.name;
      if (categoryName) {
        filtered = filtered.filter(
          product => product.category === categoryName
        );
      }
    }

    // Filtre par prix
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(product => product.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(product => product.price <= filters.maxPrice!);
    }

    // Filtre par note
    if (filters.rating) {
      filtered = filtered.filter(product => product.rating >= filters.rating!);
    }

    // Filtre par stock
    if (filters.inStock) {
      filtered = filtered.filter(product => product.stock > 0);
    }

    // Tri
    switch (filters.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
    }

    return filtered;
  }, [mockProducts, searchQuery, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage, itemsPerPage]);

  // Réinitialiser la page quand les filtres changent
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, searchQuery]);

  // Handlers
  const handleFilterChange = (newFilters: ProductFilters) => {
    setFilters(newFilters);
    
    // Mettre à jour l'URL si la catégorie change
    if (newFilters.category) {
      setSearchParams({ category: newFilters.category });
    } else {
      setSearchParams({});
    }
  };

  const handleSortChange = (sortBy: ProductFilters['sortBy']) => {
    setFilters(prev => ({ ...prev, sortBy }));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery('');
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const handleAddToCart = (product: Product) => {
    console.log('Ajout au panier:', product.name);
    alert(`${product.name} ajouté au panier !`);
  };

  const handleAddToWishlist = (product: Product) => {
    console.log('Ajout à la wishlist:', product.name);
  };

  // Extraire les catégories uniques
  const categories = useMemo(
    () => Array.from(new Set(mockProducts.map(p => p.category))),
    []
  );

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-center">Notre Boutique</h1>
          <p className="text-lg text-white/90 text-center">
            Découvrez notre sélection de {mockProducts.length} produits
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        
        {/* Barre de recherche et filtres */}
        <div className="mb-8 space-y-4">
          
          {/* Recherche */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Rechercher des produits..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pl-14 pr-12 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-lg shadow-md"
            />
            <FiSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-2xl" />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FiX className="text-2xl" />
              </button>
            )}
          </form>

          {/* Section des catégories */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Parcourir par catégorie</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {mockCategories.map((category) => (
                <Link
                  key={category.id}
                  to={`/shop?category=${category.slug}`}
                  className={`group relative overflow-hidden rounded-xl shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
                    filters.category === category.slug ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <div className="relative h-24 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-2 left-2 right-2">
                      <h3 className="text-white text-sm font-semibold text-center truncate">
                        {category.name}
                      </h3>
                      <p className="text-white/80 text-xs text-center">
                        {category.productsCount} produits
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {filters.category && (
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Filtrage par catégorie: <span className="font-semibold text-blue-600">
                    {mockCategories.find(cat => cat.slug === filters.category)?.name}
                  </span>
                </div>
                <button
                  onClick={() => handleFilterChange({ ...filters, category: undefined })}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Effacer le filtre
                </button>
              </div>
            )}
          </div>

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-md">
            
            {/* Résultats */}
            <div className="text-gray-700">
              <span className="font-semibold">{filteredProducts.length}</span> produit
              {filteredProducts.length > 1 ? 's' : ''} trouvé
              {filteredProducts.length > 1 ? 's' : ''}
              {searchQuery && (
                <span className="ml-2 text-blue-600">
                  pour "{searchQuery}"
                </span>
              )}
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto">
              
              {/* Tri */}
              <select
                value={filters.sortBy}
                onChange={(e) => handleSortChange(e.target.value as ProductFilters['sortBy'])}
                className="flex-1 sm:flex-none px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
              >
                <option value="newest">Plus récent</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="name">Nom A-Z</option>
                <option value="rating">Meilleures notes</option>
              </select>

              {/* Vue (Desktop) */}
              <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'grid'
                      ? 'bg-white text-blue-600 shadow-md'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                  title="Vue grille"
                >
                  <FiGrid className="text-xl" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'list'
                      ? 'bg-white text-blue-600 shadow-md'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                  title="Vue liste"
                >
                  <FiList className="text-xl" />
                </button>
              </div>

              {/* Bouton filtres mobile */}
              <button
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all"
              >
                <FiFilter />
                Filtres
              </button>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Sidebar Filtres (Desktop) */}
          <div className="hidden lg:block">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              categories={categories}
            />
          </div>

          {/* Grille de produits */}
          <div className="lg:col-span-3">
            {paginatedProducts.length > 0 ? (
              <>
                <div
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                      : 'space-y-6'
                  }
                >
                  {paginatedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Aucun produit trouvé
                </h3>
                <p className="text-gray-600 mb-6">
                  Essayez de modifier vos filtres ou votre recherche
                </p>
                <button
                  onClick={() => {
                    setFilters({
                      category: undefined,
                      minPrice: undefined,
                      maxPrice: undefined,
                      rating: undefined,
                      inStock: undefined,
                      sortBy: 'newest',
                      search: ''
                    });
                    setSearchQuery('');
                  }}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal filtres mobile */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl overflow-y-auto">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              categories={categories}
              onClose={() => setShowMobileFilters(false)}
              isMobile={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;