import React from 'react';
import { Link } from 'react-router-dom';
import type { CartItem } from '../types/types';

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  promoCode?: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  subtotal,
  shipping,
  tax,
  discount,
  total,
  promoCode
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Récapitulatif</h2>

      {/* Liste des articles */}
      <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4">
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 text-sm line-clamp-1">
                {item.product.name}
              </h4>
              <p className="text-sm text-gray-600">
                Qté: {item.quantity}
              </p>
              {(item.selectedSize || item.selectedColor) && (
                <p className="text-xs text-gray-500">
                  {item.selectedSize && `Taille: ${item.selectedSize}`}
                  {item.selectedSize && item.selectedColor && ' • '}
                  {item.selectedColor && `Couleur: ${item.selectedColor}`}
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">
                {(item.product.price * item.quantity).toFixed(2)} €
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modifier le panier */}
      <Link
        to="/cart"
        className="block w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium mb-6 transition-colors"
      >
        Modifier mon panier
      </Link>

      {/* Détails des prix */}
      <div className="space-y-3 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between text-gray-700">
          <span>Sous-total ({items.length} article{items.length > 1 ? 's' : ''})</span>
          <span className="font-semibold">{subtotal.toFixed(2)} €</span>
        </div>

        {discount > 0 && (
          <div className="flex items-center justify-between text-green-600">
            <span>
              Réduction {promoCode && `(${promoCode})`}
            </span>
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
      <div className="flex items-center justify-between pt-6 mt-6 border-t-2 border-gray-300">
        <span className="text-xl font-bold text-gray-900">Total</span>
        <span className="text-2xl font-bold text-blue-600">{total.toFixed(2)} €</span>
      </div>

      {/* Sécurité */}
      <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="text-green-600">✓</div>
          <span>Paiement 100% sécurisé</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="text-green-600">✓</div>
          <span>Livraison sous 2-3 jours</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="text-green-600">✓</div>
          <span>Retour gratuit sous 30 jours</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;