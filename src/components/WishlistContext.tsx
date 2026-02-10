import React from 'react';
import { useShop } from '../context/ShopContext';
import { FiHeart, FiTrash2, FiX, FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const WishlistContext: React.FC = () => {
  const { 
    wishlist, 
    wishlistCount, 
    removeFromWishlist, 
    clearWishlist,
    addToCart,
    isInWishlist 
  } = useShop();

  const handleAddToCart = (product: any) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
              <FiHeart className="mr-2 text-red-500" />
              <h2 className="text-lg font-semibold">Wishlist ({wishlistCount})</h2>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <FiX size={20} />
            </button>
          </div>

          {/* Wishlist Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {wishlist.length === 0 ? (
              <div className="text-center py-8">
                <FiHeart className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-500">Votre wishlist est vide</p>
                <Link 
                  to="/shop" 
                  className="inline-block mt-4 text-blue-600 hover:text-blue-800"
                >
                  Découvrir nos produits
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {wishlist.map((item) => (
                  <div key={item.product.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    {/* Product Image */}
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name}
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/64x64?text=No+Image';
                        }}
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                      <p className="text-sm text-gray-500">{item.product.brand}</p>
                      <p className="text-sm font-medium text-blue-600">
                        {formatPrice(item.product.price)}
                      </p>
                      {item.product.discount && (
                        <p className="text-xs text-red-600">
                          -{item.product.discount}% de remise
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => handleAddToCart(item.product)}
                        className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        title="Ajouter au panier"
                      >
                        <FiShoppingCart size={16} />
                      </button>
                      <button
                        onClick={() => removeFromWishlist(item.product.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                        title="Retirer de la wishlist"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {wishlist.length > 0 && (
            <div className="border-t p-4 space-y-2">
              <button
                onClick={clearWishlist}
                className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Vider la wishlist
              </button>
              <Link
                to="/shop"
                className="block w-full py-2 px-4 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700"
              >
                Continuer vos achats
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistContext;
