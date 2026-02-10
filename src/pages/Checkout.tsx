import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiArrowLeft } from 'react-icons/fi';
import CheckoutForm from '../components/CheckoutForm';
import OrderSummary from '../components/OrderSummary';
import {
  mockCartItems,
  calculateSubtotal,
  calculateShipping,
  calculateTax,
  calculateDiscount,
  calculateTotal
} from '../data/cartMockData';
import type { CartItem, ShippingAddress } from '../types/types';

interface CheckoutFormData {
  shippingAddress: ShippingAddress;
  paymentMethod: 'card' | 'paypal';
  cardDetails?: {
    cardNumber: string;
    cardName: string;
    expiryDate: string;
    cvv: string;
  };
}

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const [cartItems] = useState<CartItem[]>(mockCartItems);
  const [promoCode] = useState<string | undefined>('WELCOME20'); // Exemple
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState<string>('');

  // Calculer les totaux
  const subtotal = useMemo(() => calculateSubtotal(cartItems), [cartItems]);
  const shipping = useMemo(() => calculateShipping(subtotal), [subtotal]);
  const discount = useMemo(() => calculateDiscount(subtotal, promoCode), [subtotal, promoCode]);
  const tax = useMemo(() => calculateTax(subtotal - discount), [subtotal, discount]);
  const total = useMemo(() => calculateTotal(subtotal, shipping, tax, discount), [subtotal, shipping, tax, discount]);

  // Vérifier si le panier est vide
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Votre panier est vide
          </h2>
          <p className="text-gray-600 mb-6">
            Ajoutez des articles à votre panier avant de passer commande.
          </p>
          <button
            onClick={() => navigate('/shop')}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all"
          >
            <FiArrowLeft />
            Retour à la boutique
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (formData: CheckoutFormData) => {
    setIsProcessing(true);

    // Simulation du traitement du paiement
    try {
      // Simuler un délai de traitement
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Générer un ID de commande
      const newOrderId = `CMD-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`;
      setOrderId(newOrderId);

      // Simuler le succès du paiement
      console.log('Commande validée:', {
        orderId: newOrderId,
        shippingAddress: formData.shippingAddress,
        paymentMethod: formData.paymentMethod,
        total: total,
        items: cartItems
      });

      // Afficher la confirmation
      setOrderComplete(true);
      
      // TODO: Envoyer les données au backend
      // TODO: Vider le panier
      // TODO: Envoyer email de confirmation

    } catch (error) {
      console.error('Erreur lors du traitement du paiement:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
      setIsProcessing(false);
    }
  };

  // Page de confirmation
  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            
            {/* Animation de succès */}
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
              <div className="mb-6 animate-bounce">
                <FiCheckCircle className="text-7xl text-green-600 mx-auto" />
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Commande confirmée ! 🎉
              </h1>

              <p className="text-lg text-gray-600 mb-8">
                Merci pour votre commande. Nous avons bien reçu votre paiement et préparons déjà votre colis.
              </p>

              {/* Numéro de commande */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-8">
                <p className="text-sm text-blue-800 font-medium mb-2">
                  Numéro de commande
                </p>
                <p className="text-2xl font-bold text-blue-900 font-mono">
                  {orderId}
                </p>
              </div>

              {/* Détails */}
              <div className="text-left space-y-4 mb-8">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl">📧</div>
                  <div>
                    <p className="font-semibold text-gray-900">Email de confirmation envoyé</p>
                    <p className="text-sm text-gray-600">Vérifiez votre boîte de réception</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl">🚚</div>
                  <div>
                    <p className="font-semibold text-gray-900">Livraison estimée</p>
                    <p className="text-sm text-gray-600">Sous 2-3 jours ouvrés</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl">💳</div>
                  <div>
                    <p className="font-semibold text-gray-900">Montant total</p>
                    <p className="text-sm text-gray-600">{total.toFixed(2)} € (TVA incluse)</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate('/')}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all"
                >
                  Retour à l'accueil
                </button>
                <button
                  onClick={() => navigate('/shop')}
                  className="flex-1 border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all"
                >
                  Continuer mes achats
                </button>
              </div>

              {/* Support */}
              <p className="text-sm text-gray-500 mt-8">
                Besoin d'aide ? <a href="/contact" className="text-blue-600 hover:underline">Contactez-nous</a>
              </p>
            </div>

            {/* Prochaines étapes */}
            <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Et maintenant ?
              </h3>
              <ol className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <span>Nous préparons votre commande avec soin</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <span>Vous recevrez un email avec le numéro de suivi</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <span>Votre colis sera livré sous 2-3 jours ouvrés</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Page de checkout
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl lg:text-5xl font-bold mb-2">Finaliser la commande</h1>
          <p className="text-lg text-white/90">
            Plus qu'une étape avant de recevoir vos produits !
          </p>
        </div>
      </div>

      {/* Contenu */}
      <div className="container mx-auto px-4 py-8">
        
        {/* Bouton retour */}
        <button
          onClick={() => navigate('/cart')}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-6 transition-colors"
        >
          <FiArrowLeft />
          Retour au panier
        </button>

        {/* Steps indicator */}
        <div className="mb-8 flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
              ✓
            </div>
            <span className="text-sm font-medium text-gray-700">Panier</span>
          </div>
          <div className="w-16 h-1 bg-blue-600"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              2
            </div>
            <span className="text-sm font-medium text-blue-600">Paiement</span>
          </div>
          <div className="w-16 h-1 bg-gray-300"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-300 text-white rounded-full flex items-center justify-center font-bold">
              3
            </div>
            <span className="text-sm font-medium text-gray-400">Confirmation</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Formulaire */}
          <div className="lg:col-span-2">
            <CheckoutForm onSubmit={handleSubmit} isProcessing={isProcessing} />
          </div>

          {/* Récapitulatif */}
          <div className="lg:col-span-1">
            <OrderSummary
              items={cartItems}
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              discount={discount}
              total={total}
              promoCode={promoCode}
            />
          </div>
        </div>

        {/* Réassurance */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="font-bold text-gray-900 mb-2">100% Sécurisé</h3>
            <p className="text-sm text-gray-600">
              Vos données bancaires sont cryptées et protégées
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-bold text-gray-900 mb-2">Paiement rapide</h3>
            <p className="text-sm text-gray-600">
              Processus simplifié pour un paiement en quelques clics
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <div className="text-4xl mb-3">📦</div>
            <h3 className="font-bold text-gray-900 mb-2">Livraison rapide</h3>
            <p className="text-sm text-gray-600">
              Recevez votre commande sous 2-3 jours ouvrés
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;