import React from 'react';
import CategoryCard from '../components/CategoryCard';
import { mockCategories } from '../data/mockData-UPDATED';

const CategoriesList: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-center">Toutes nos Catégories</h1>
          <p className="text-lg text-white/90 text-center">
            Explorez nos {mockCategories.length} catégories de produits
          </p>
        </div>
      </div>

      {/* Contenu */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        {/* Section statistiques */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-8">Pourquoi nous choisir ?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {mockCategories.reduce((sum, cat) => sum + (cat.productsCount || 0), 0)}+
              </div>
              <p className="text-gray-600">Produits disponibles</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {mockCategories.length}
              </div>
              <p className="text-gray-600">Catégories</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
              <p className="text-gray-600">Support client</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">30j</div>
              <p className="text-gray-600">Retour gratuit</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesList;
