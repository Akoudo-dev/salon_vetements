import React from 'react';
import { FiShoppingCart, FiTrash2, FiPlus, FiMinus, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

const Cart: React.FC = () => {
  const { 
    cart, 
    cartTotal, 
    cartItemsCount, 
    updateCartItemQuantity, 
    removeFromCart, 
    clearCart 
  } = useShop();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity > 0) {
      updateCartItemQuantity(productId, newQuantity);
    }
  };

  const shippingCost = cartTotal >= 50 ? 0 : cartTotal > 0 ? 5.99 : 0;
  const finalTotal = cartTotal + shippingCost;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-lg p-12">
              <FiShoppingCart className="text-6xl text-gray-300 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Votre panier est vide</h1>
              <p className="text-gray-600 mb-8">
                Découvrez nos produits et remplissez votre panier !
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all"
              >
                <FiArrowLeft />
                Continuer mes achats
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Mon Panier</h1>
            <p className="text-gray-600">
              {cartItemsCount} article{cartItemsCount > 1 ? 's' : ''} dans votre panier
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Articles du panier */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={item.product.id} className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex gap-6">
                    
                    {/* Image produit */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </div>

                    {/* Informations produit */}
                    <div className="flex-grow">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-semibold text-lg text-gray-900">
                          {item.product.name}
                        </h3>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                          title="Supprimer"
                        >
                          <FiTrash2 className="text-xl" />
                        </button>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-3">
                        {item.product.category}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-gray-600">Quantité:</span>
                          <div className="flex items-center gap-2 bg-gray-100 rounded-lg">
                            <button
                              onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                              className="p-2 hover:bg-gray-200 transition-colors rounded-l-lg"
                              disabled={item.quantity <= 1}
                            >
                              <FiMinus className="text-sm" />
                            </button>
                            <span className="px-3 py-1 font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                              className="p-2 hover:bg-gray-200 transition-colors rounded-r-lg"
                            >
                              <FiPlus className="text-sm" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-bold text-lg text-gray-900">
                            {formatPrice(item.product.price * item.quantity)}
                          </div>
                          <div className="text-sm text-gray-500">
                            {formatPrice(item.product.price)} × {item.quantity}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Actions */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-center">
                  <button
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700 font-medium transition-colors"
                  >
                    Vider le panier
                  </button>
                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    <FiArrowLeft />
                    Continuer mes achats
                  </Link>
                </div>
              </div>
            </div>

            {/* Résumé de la commande */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Résumé</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Sous-total</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600">
                    <span>Livraison</span>
                    <span>
                      {shippingCost === 0 ? 'Gratuite' : formatPrice(shippingCost)}
                    </span>
                  </div>
                  
                  {cartTotal < 50 && cartTotal > 0 && (
                    <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                      🎁 Plus que {formatPrice(50 - cartTotal)} pour la livraison gratuite !
                    </div>
                  )}
                  
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-bold text-lg text-gray-900">
                      <span>Total</span>
                      <span>{formatPrice(finalTotal)}</span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all mb-3">
                  Commander
                </button>
                
                <Link
                  to="/checkout"
                  className="block w-full bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all text-center"
                >
                  Finaliser la commande
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
