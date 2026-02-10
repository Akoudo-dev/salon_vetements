import React, { useMemo, useState } from 'react';
import { FiShoppingCart, FiArrowLeft, FiTruck, FiShield, FiRefreshCw, FiCreditCard, FiSmartphone } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';

const Cart: React.FC = () => {
  const { 
    cart, 
    updateCartItemQuantity, 
    removeFromCart, 
    clearCart 
  } = useShop();

  const [promoCode, setPromoCode] = useState<string | undefined>(undefined);

  // Calculer les totaux
  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0), [cart]);
  const shipping = useMemo(() => subtotal >= 50 ? 0 : 5.99, [subtotal]);
  const discount = useMemo(() => promoCode === 'SAVE10' ? subtotal * 0.1 : 0, [subtotal, promoCode]);
  const tax = useMemo(() => (subtotal - discount) * 0.2, [subtotal, discount]);
  const total = useMemo(() => subtotal + shipping + tax - discount, [subtotal, shipping, tax, discount]);

  // Mettre à jour la quantité
  const handleUpdateQuantity = (id: string, quantity: number) => {
    updateCartItemQuantity(id, quantity);
  };

  // Supprimer un article
  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
  };

  // Déplacer vers la wishlist
  const handleMoveToWishlist = (productId: string) => {
    const item = cart.find(item => item.product.id === productId);
    if (item) {
      console.log(`Déplacement vers wishlist: ${item.product.name}`);
      removeFromCart(productId);
      // TODO: Ajouter à la wishlist via Context
    }
  };

  // Vider le panier
  const handleClearCart = () => {
    if (window.confirm('Êtes-vous sûr de vouloir vider le panier ?')) {
      clearCart();
      setPromoCode(undefined);
    }
  };

  // Appliquer un code promo
  const handleApplyPromo = (code: string) => {
    setPromoCode(code);
  };

  // Retirer le code promo
  const handleRemovePromo = () => {
    setPromoCode(undefined);
  };

  // Panier vide
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl lg:text-5xl font-bold mb-2">Panier</h1>
            <p className="text-lg text-white/90">Votre panier est vide</p>
          </div>
        </div>

        {/* Contenu panier vide */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-lg p-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiShoppingCart className="text-5xl text-gray-400" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Votre panier est vide
              </h2>
              
              <p className="text-gray-600 mb-8">
                Découvrez nos produits et ajoutez-les à votre panier pour commencer vos achats.
              </p>

              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
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
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <FiShoppingCart className="text-4xl" />
            <h1 className="text-4xl lg:text-5xl font-bold">Panier</h1>
          </div>
          <p className="text-lg text-white/90">
            {cart.length} article{cart.length > 1 ? 's' : ''} dans votre panier
          </p>
        </div>
      </div>

      {/* Contenu */}
      <div className="container mx-auto px-4 py-8">
        
        {/* Bouton retour */}
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-6 transition-colors"
        >
          <FiArrowLeft />
          Continuer mes achats
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Liste des articles */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Actions globales */}
            <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-md">
              <p className="text-gray-700">
                <span className="font-semibold">{cart.length}</span> article{cart.length > 1 ? 's' : ''} au total
              </p>
              <button
                onClick={handleClearCart}
                className="text-sm text-red-600 hover:text-red-800 font-medium transition-colors"
              >
                Vider le panier
              </button>
            </div>

            {/* Articles du panier */}
            {cart.map((item: any) => (
              <CartItem
                key={item.product.id}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemoveItem}
                onMoveToWishlist={handleMoveToWishlist}
              />
            ))}

            {/* Suggestions */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-2">
                <FiTruck className="inline mr-2" />
                Astuce
              </h3>
              <p className="text-blue-800 text-sm">
                Ajoutez pour {(50 - subtotal).toFixed(2)} € de plus pour bénéficier de la livraison gratuite !
              </p>
            </div>
          </div>

          {/* Résumé */}
          <div className="lg:col-span-1">
            <CartSummary
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              discount={discount}
              total={total}
              itemsCount={cart.length}
              promoCode={promoCode}
              onApplyPromo={handleApplyPromo}
              onRemovePromo={handleRemovePromo}
            />
          </div>
        </div>

        {/* Garanties */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <FiTruck className="text-4xl mb-3 text-blue-600 mx-auto" />
            <h3 className="font-bold text-gray-900 mb-2">Livraison rapide</h3>
            <p className="text-sm text-gray-600">
              Recevez vos articles sous 2-3 jours ouvrés
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <FiShield className="text-4xl mb-3 text-green-600 mx-auto" />
            <h3 className="font-bold text-gray-900 mb-2">Paiement sécurisé</h3>
            <p className="text-sm text-gray-600">
              Transactions 100% sécurisées
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <FiRefreshCw className="text-4xl mb-3 text-purple-600 mx-auto" />
            <h3 className="font-bold text-gray-900 mb-2">Retour gratuit</h3>
            <p className="text-sm text-gray-600">
              30 jours pour changer d'avis
            </p>
          </div>
        </div>

        {/* Moyens de paiement */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-md">
          <p className="text-center text-gray-600 mb-4">Moyens de paiement acceptés</p>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <FiCreditCard className="text-3xl text-gray-600" />
            <FiSmartphone className="text-3xl text-gray-600" />
            <span className="text-gray-500 text-sm">Visa, Mastercard, PayPal, Apple Pay</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;