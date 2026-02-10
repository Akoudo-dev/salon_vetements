import React from 'react';
import { FiHeart, FiTrash2, FiShoppingCart, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

const Wishlist: React.FC = () => {
  const { 
    wishlist, 
    wishlistCount, 
    removeFromWishlist, 
    clearWishlist,
    addToCart,
    isInWishlist 
  } = useShop();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  const handleAddToCart = (product: any) => {
    addToCart(product, 1);
    removeFromWishlist(product.id.toString());
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-lg p-12">
              <FiHeart className="text-6xl text-gray-300 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Votre liste de souhaits est vide</h1>
              <p className="text-gray-600 mb-8">
                Ajoutez des produits à votre liste de souhaits pour les retrouver facilement !
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all"
              >
                <FiArrowLeft />
                Découvrir nos produits
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Ma Liste de Souhaits</h1>
              <p className="text-gray-600">
                {wishlistCount} produit{wishlistCount > 1 ? 's' : ''} dans votre liste
              </p>
            </div>
            <button
              onClick={clearWishlist}
              className="text-red-500 hover:text-red-700 font-medium transition-colors"
            >
              Vider la liste
            </button>
          </div>

          {/* Grid des produits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((item) => (
              <div key={item.product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all">
                
                {/* Image */}
                <div className="relative">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-48 object-cover"
                  />
                  
                  {/* Badge wishlist */}
                  <div className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full">
                    <FiHeart className="text-lg fill-current" />
                  </div>
                  
                  {/* Badge discount */}
                  {item.product.originalPrice && item.product.originalPrice > item.product.price && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      -{Math.round(((item.product.originalPrice - item.product.price) / item.product.originalPrice) * 100)}%
                    </div>
                  )}
                </div>

                {/* Contenu */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                    {item.product.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-3">
                    {item.product.category}
                  </p>
                  
                  {/* Prix */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl font-bold text-gray-900">
                      {formatPrice(item.product.price)}
                    </span>
                    {item.product.originalPrice && item.product.originalPrice > item.product.price && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(item.product.originalPrice)}
                      </span>
                    )}
                  </div>
                  
                  {/* Stock */}
                  <div className="mb-4">
                    {item.product.stock > 0 ? (
                      <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded">
                        En stock ({item.product.stock} disponible{item.product.stock > 1 ? 's' : ''})
                      </span>
                    ) : (
                      <span className="text-sm text-red-600 bg-red-50 px-2 py-1 rounded">
                        Rupture de stock
                      </span>
                    )}
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(item.product)}
                      disabled={item.product.stock === 0}
                      className={`flex-1 py-2 px-3 rounded-lg font-medium transition-all text-sm ${
                        item.product.stock === 0
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      <FiShoppingCart className="inline mr-1" />
                      {item.product.stock === 0 ? 'Indisponible' : 'Ajouter'}
                    </button>
                    
                    <button
                      onClick={() => removeFromWishlist(item.product.id.toString())}
                      className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                      title="Retirer de la liste"
                    >
                      <FiTrash2 className="text-sm" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Actions globales */}
          <div className="mt-8 bg-white rounded-xl shadow-md p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-gray-700">
                <span className="font-semibold">{wishlistCount}</span> produit{wishlistCount > 1 ? 's' : ''} dans votre liste de souhaits
              </p>
              <div className="flex gap-3">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  <FiArrowLeft />
                  Continuer mes achats
                </Link>
                <button
                  onClick={clearWishlist}
                  className="text-red-500 hover:text-red-700 font-medium transition-colors"
                >
                  Vider la liste
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
