import React from 'react';
import { Link } from 'react-router-dom';
import { FiMinus, FiPlus, FiX, FiHeart } from 'react-icons/fi';
import type { CartItem as CartItemType } from '../types/types';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  onMoveToWishlist?: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
  onMoveToWishlist
}) => {
  const handleIncrement = () => {
    if (item.quantity < item.product.stock) {
      onUpdateQuantity(item.id, item.quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0 && value <= item.product.stock) {
      onUpdateQuantity(item.id, value);
    }
  };

  const subtotal = item.product.price * item.quantity;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex flex-col sm:flex-row gap-6">
        
        {/* Image produit */}
        <Link 
          to={`/product/${item.product.slug}`}
          className="flex-shrink-0"
        >
          <img
            src={item.product.image}
            alt={item.product.name}
            className="w-full sm:w-32 h-32 object-cover rounded-xl hover:scale-105 transition-transform"
          />
        </Link>

        {/* Informations produit */}
        <div className="flex-1 space-y-3">
          
          {/* Titre et catégorie */}
          <div>
            <Link 
              to={`/product/${item.product.slug}`}
              className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2"
            >
              {item.product.name}
            </Link>
            <p className="text-sm text-gray-600 mt-1">{item.product.category}</p>
          </div>

          {/* Options sélectionnées */}
          {(item.selectedSize || item.selectedColor) && (
            <div className="flex items-center gap-4 text-sm text-gray-600">
              {item.selectedSize && (
                <span>
                  Taille: <span className="font-semibold">{item.selectedSize}</span>
                </span>
              )}
              {item.selectedColor && (
                <span>
                  Couleur: <span className="font-semibold">{item.selectedColor}</span>
                </span>
              )}
            </div>
          )}

          {/* Stock */}
          {item.product.stock < 10 && item.product.stock > 0 && (
            <p className="text-sm text-orange-600 font-medium">
              ⚠️ Plus que {item.product.stock} en stock !
            </p>
          )}

          {item.product.stock === 0 && (
            <p className="text-sm text-red-600 font-medium">
              ❌ Rupture de stock
            </p>
          )}

          {/* Actions mobile */}
          <div className="flex sm:hidden items-center justify-between pt-3 border-t border-gray-200">
            <div className="flex items-center gap-3">
              {/* Quantité */}
              <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={handleDecrement}
                  disabled={item.quantity <= 1}
                  className="px-3 py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Diminuer la quantité"
                >
                  <FiMinus />
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={handleQuantityChange}
                  min="1"
                  max={item.product.stock}
                  className="w-16 text-center py-2 border-x-2 border-gray-200 focus:outline-none"
                />
                <button
                  onClick={handleIncrement}
                  disabled={item.quantity >= item.product.stock}
                  className="px-3 py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Augmenter la quantité"
                >
                  <FiPlus />
                </button>
              </div>

              {/* Prix */}
              <div className="text-right">
                <p className="text-xl font-bold text-gray-900">
                  {subtotal.toFixed(2)} €
                </p>
                <p className="text-sm text-gray-500">
                  {item.product.price.toFixed(2)} € / unité
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions desktop */}
        <div className="hidden sm:flex flex-col items-end justify-between">
          
          {/* Prix */}
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">
              {subtotal.toFixed(2)} €
            </p>
            <p className="text-sm text-gray-500">
              {item.product.price.toFixed(2)} € × {item.quantity}
            </p>
          </div>

          {/* Quantité */}
          <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={handleDecrement}
              disabled={item.quantity <= 1}
              className="px-3 py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Diminuer la quantité"
            >
              <FiMinus />
            </button>
            <input
              type="number"
              value={item.quantity}
              onChange={handleQuantityChange}
              min="1"
              max={item.product.stock}
              className="w-16 text-center py-2 border-x-2 border-gray-200 focus:outline-none"
            />
            <button
              onClick={handleIncrement}
              disabled={item.quantity >= item.product.stock}
              className="px-3 py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Augmenter la quantité"
            >
              <FiPlus />
            </button>
          </div>
        </div>
      </div>

      {/* Boutons d'action */}
      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-200">
        {onMoveToWishlist && (
          <button
            onClick={() => onMoveToWishlist(item.id)}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
          >
            <FiHeart />
            Déplacer vers favoris
          </button>
        )}
        
        <button
          onClick={() => onRemove(item.id)}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors ml-auto"
        >
          <FiX className="text-lg" />
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default CartItem;