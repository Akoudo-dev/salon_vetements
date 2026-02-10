import React from 'react';
import { Link } from 'react-router-dom';
import { FiTrendingUp, FiTag, FiClock, FiArrowRight } from 'react-icons/fi';
import Hero from '../components/Hero';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import { mockCategories, getPopularProducts, getDiscountedProducts, getNewProducts } from '../data/mockData-UPDATED';
import type { Product } from '../types/types';

const Home: React.FC = () => {
  // Récupérer les produits
  const popularProducts = getPopularProducts(8);
  const discountedProducts = getDiscountedProducts(4);
  const newProducts = getNewProducts(4);

  // Handlers pour le panier et wishlist (à implémenter avec Context/Redux plus tard)
  const handleAddToCart = (product: Product) => {
    console.log('Ajout au panier:', product.name);
    // TODO: Implémenter avec votre state management
    alert(`${product.name} ajouté au panier !`);
  };

  const handleAddToWishlist = (product: Product) => {
    console.log('Ajout à la wishlist:', product.name);
    // TODO: Implémenter avec votre state management
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <Hero />

      {/* Section Catégories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Explorer par Catégorie
              </h2>
              <p className="text-gray-600">
                Trouvez exactement ce que vous cherchez
              </p>
            </div>
            <Link
              to="/categories"
              className="hidden md:flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all"
            >
              Voir tout
              <FiArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>

          <div className="md:hidden mt-8 text-center">
            <Link
              to="/categories"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all"
            >
              Voir toutes les catégories
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Section Promotions Flash */}
      <section className="py-16 bg-gradient-to-r from-orange-50 to-red-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <div className="bg-red-500 text-white p-3 rounded-xl">
                <FiTag className="text-2xl" />
              </div>
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-1">
                  Promotions Flash
                </h2>
                <p className="text-gray-600">
                  Jusqu'à -50% sur une sélection de produits
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {discountedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/shop?filter=discount"
              className="inline-flex items-center gap-2 bg-red-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-red-600 transition-all shadow-lg hover:shadow-xl"
            >
              Voir toutes les promotions
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Section Produits Populaires */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 text-white p-3 rounded-xl">
                <FiTrendingUp className="text-2xl" />
              </div>
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-1">
                  Produits Populaires
                </h2>
                <p className="text-gray-600">
                  Les meilleures ventes du moment
                </p>
              </div>
            </div>
            <Link
              to="/shop?sort=popular"
              className="hidden md:flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all"
            >
              Voir tout
              <FiArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section Nouveautés */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <div className="bg-green-600 text-white p-3 rounded-xl">
                <FiClock className="text-2xl" />
              </div>
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-1">
                  Nouveautés
                </h2>
                <p className="text-gray-600">
                  Les derniers produits ajoutés
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/shop?sort=newest"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-green-700 transition-all shadow-lg hover:shadow-xl"
            >
              Découvrir plus de nouveautés
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Section Newsletter */}
      <section className="py-16  bg-blue-600  text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Restez informé de nos offres
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Inscrivez-vous à notre newsletter et recevez -10% sur votre première commande
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-6 py-4 rounded-full text-black focus:outline-none focus:ring-4 focus:ring-white/30"
                required
              />
              <button
                type="submit"
                className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-yellow-300 hover:text-blue-900 transition-all shadow-lg hover:shadow-xl"
              >
                S'inscrire
              </button>
            </form>
            
            <p className="text-sm text-white/70 mt-4">
              En vous inscrivant, vous acceptez notre politique de confidentialité
            </p>
          </div>
        </div>
      </section>

      {/* Section Avantages */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Livraison Gratuite</h3>
              <p className="text-gray-600 text-sm">Pour toute commande supérieure à 50€</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Paiement Sécurisé</h3>
              <p className="text-gray-600 text-sm">Transactions 100% sécurisées</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 text-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Retour 30 jours</h3>
              <p className="text-gray-600 text-sm">Satisfait ou remboursé</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 text-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Support 24/7</h3>
              <p className="text-gray-600 text-sm">Assistance client disponible</p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;