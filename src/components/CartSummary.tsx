import React from 'react';
import { Link } from 'react-router-dom';
import { FiTag, FiTruck, FiShield } from 'react-icons/fi';

interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  itemsCount: number;
  promoCode?: string;
  onApplyPromo?: (code: string) => void;
  onRemovePromo?: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  shipping,
  tax,
  discount,
  total,
  itemsCount,
  promoCode,
  onApplyPromo,
  onRemovePromo
}) => {
  const [promoInput, setPromoInput] = React.useState('');
  const [promoError, setPromoError] = React.useState('');

  const handleApplyPromo = () => {
    if (promoInput.trim()) {
      // Simulation de validation de code promo
      const validCodes = ['PROMO10', 'WELCOME20', 'SAVE15'];
      
      if (validCodes.includes(promoInput.toUpperCase())) {
        onApplyPromo?.(promoInput.toUpperCase());
        setPromoError('');
        setPromoInput('');
      } else {
        setPromoError('Code promo invalide');
      }
    }
  };

  const freeShippingThreshold = 50;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
      
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Résumé</h2>

      {/* Livraison gratuite */}
      {remainingForFreeShipping > 0 && (
        <div className="mb-6 p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
          <p className="text-sm text-blue-800 font-medium">
            🎉 Plus que <span className="font-bold">{remainingForFreeShipping.toFixed(2)} €</span> pour la livraison gratuite !
          </p>
          <div className="mt-2 h-2 bg-blue-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-500"
              style={{ width: `${Math.min((subtotal / freeShippingThreshold) * 100, 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Code promo */}
      {!promoCode && onApplyPromo && (
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Code promo
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={promoInput}
              onChange={(e) => {
                setPromoInput(e.target.value.toUpperCase());
                setPromoError('');
              }}
              placeholder="Entrez votre code"
              className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none uppercase"
            />
            <button
              onClick={handleApplyPromo}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Appliquer
            </button>
          </div>
          {promoError && (
            <p className="text-sm text-red-600 mt-2">{promoError}</p>
          )}
          <p className="text-xs text-gray-500 mt-2">
            Codes valides : PROMO10, WELCOME20, SAVE15
          </p>
        </div>
      )}

      {/* Code promo appliqué */}
      {promoCode && onRemovePromo && (
        <div className="mb-6 p-4 bg-green-50 rounded-xl border-2 border-green-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiTag className="text-green-600" />
            <div>
              <p className="text-sm font-semibold text-green-800">
                Code promo appliqué
              </p>
              <p className="text-xs text-green-600">{promoCode}</p>
            </div>
          </div>
          <button
            onClick={onRemovePromo}
            className="text-sm text-red-600 hover:text-red-800 font-medium"
          >
            Retirer
          </button>
        </div>
      )}

      {/* Détails prix */}
      <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
        <div className="flex items-center justify-between text-gray-700">
          <span>Sous-total ({itemsCount} article{itemsCount > 1 ? 's' : ''})</span>
          <span className="font-semibold">{subtotal.toFixed(2)} €</span>
        </div>

        {discount > 0 && (
          <div className="flex items-center justify-between text-green-600">
            <span>Réduction</span>
            <span className="font-semibold">- {discount.toFixed(2)} €</span>
          </div>
        )}

        <div className="flex items-center justify-between text-gray-700">
          <span>Livraison</span>
          <span className="font-semibold">
            {shipping === 0 ? (
              <span className="text-green-600">Gratuit</span>
            ) : (
              `${shipping.toFixed(2)} €`
            )}
          </span>
        </div>

        <div className="flex items-center justify-between text-gray-700">
          <span>TVA (20%)</span>
          <span className="font-semibold">{tax.toFixed(2)} €</span>
        </div>
      </div>

      {/* Total */}
      <div className="flex items-center justify-between mb-6 text-xl">
        <span className="font-bold text-gray-900">Total</span>
        <span className="font-bold text-blue-600 text-2xl">{total.toFixed(2)} €</span>
      </div>

      {/* Bouton Commander */}
      <Link
        to="/checkout"
        className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center px-6 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl mb-4"
      >
        Passer la commande
      </Link>

      <Link
        to="/shop"
        className="block w-full text-center px-6 py-3 border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:border-blue-500 hover:text-blue-600 transition-all"
      >
        Continuer mes achats
      </Link>

      {/* Avantages */}
      <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
        <div className="flex items-start gap-3">
          <FiTruck className="text-blue-600 text-xl flex-shrink-0 mt-1" />
          <div>
            <p className="text-sm font-semibold text-gray-900">Livraison rapide</p>
            <p className="text-xs text-gray-600">Sous 2-3 jours ouvrés</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <FiShield className="text-green-600 text-xl flex-shrink-0 mt-1" />
          <div>
            <p className="text-sm font-semibold text-gray-900">Paiement sécurisé</p>
            <p className="text-xs text-gray-600">Vos données sont protégées</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;