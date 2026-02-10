import React, { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiCreditCard, FiLock } from 'react-icons/fi';
import type { ShippingAddress } from '../types/types';

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => void;
  isProcessing: boolean;
}

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

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit, isProcessing }) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [formData, setFormData] = useState<CheckoutFormData>({
    shippingAddress: {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      postalCode: '',
      country: 'France',
      phone: ''
    },
    paymentMethod: 'card',
    cardDetails: {
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: ''
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    section: 'shippingAddress' | 'cardDetails',
    field: string,
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    // Effacer l'erreur du champ
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validation adresse
    if (!formData.shippingAddress.firstName.trim()) {
      newErrors.firstName = 'Prénom requis';
    }
    if (!formData.shippingAddress.lastName.trim()) {
      newErrors.lastName = 'Nom requis';
    }
    if (!formData.shippingAddress.address.trim()) {
      newErrors.address = 'Adresse requise';
    }
    if (!formData.shippingAddress.city.trim()) {
      newErrors.city = 'Ville requise';
    }
    if (!formData.shippingAddress.postalCode.trim()) {
      newErrors.postalCode = 'Code postal requis';
    } else if (!/^\d{5}$/.test(formData.shippingAddress.postalCode)) {
      newErrors.postalCode = 'Code postal invalide (5 chiffres)';
    }
    if (!formData.shippingAddress.phone.trim()) {
      newErrors.phone = 'Téléphone requis';
    } else if (!/^(?:(?:\+|00)33|0)[1-9](?:\d{8})$/.test(formData.shippingAddress.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Numéro de téléphone invalide';
    }

    // Validation carte bancaire (si paiement par carte)
    if (paymentMethod === 'card' && formData.cardDetails) {
      if (!formData.cardDetails.cardNumber.trim()) {
        newErrors.cardNumber = 'Numéro de carte requis';
      } else if (!/^\d{16}$/.test(formData.cardDetails.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Numéro de carte invalide (16 chiffres)';
      }
      if (!formData.cardDetails.cardName.trim()) {
        newErrors.cardName = 'Nom sur la carte requis';
      }
      if (!formData.cardDetails.expiryDate.trim()) {
        newErrors.expiryDate = 'Date d\'expiration requise';
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.cardDetails.expiryDate)) {
        newErrors.expiryDate = 'Format invalide (MM/AA)';
      }
      if (!formData.cardDetails.cvv.trim()) {
        newErrors.cvv = 'CVV requis';
      } else if (!/^\d{3,4}$/.test(formData.cardDetails.cvv)) {
        newErrors.cvv = 'CVV invalide (3-4 chiffres)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        paymentMethod
      });
    }
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(' ') : cleaned;
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      
      {/* Adresse de livraison */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
            <FiMapPin className="text-2xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Adresse de livraison</h2>
            <p className="text-sm text-gray-600">Où souhaitez-vous recevoir votre commande ?</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Prénom */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Prénom *
            </label>
            <div className="relative">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={formData.shippingAddress.firstName}
                onChange={(e) => handleInputChange('shippingAddress', 'firstName', e.target.value)}
                className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                  errors.firstName ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                }`}
                placeholder="Jean"
              />
            </div>
            {errors.firstName && (
              <p className="text-sm text-red-600 mt-1">{errors.firstName}</p>
            )}
          </div>

          {/* Nom */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Nom *
            </label>
            <div className="relative">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={formData.shippingAddress.lastName}
                onChange={(e) => handleInputChange('shippingAddress', 'lastName', e.target.value)}
                className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                  errors.lastName ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                }`}
                placeholder="Dupont"
              />
            </div>
            {errors.lastName && (
              <p className="text-sm text-red-600 mt-1">{errors.lastName}</p>
            )}
          </div>

          {/* Adresse */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Adresse *
            </label>
            <input
              type="text"
              value={formData.shippingAddress.address}
              onChange={(e) => handleInputChange('shippingAddress', 'address', e.target.value)}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                errors.address ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
              }`}
              placeholder="123 Rue de la Paix"
            />
            {errors.address && (
              <p className="text-sm text-red-600 mt-1">{errors.address}</p>
            )}
          </div>

          {/* Ville */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Ville *
            </label>
            <input
              type="text"
              value={formData.shippingAddress.city}
              onChange={(e) => handleInputChange('shippingAddress', 'city', e.target.value)}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                errors.city ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
              }`}
              placeholder="Paris"
            />
            {errors.city && (
              <p className="text-sm text-red-600 mt-1">{errors.city}</p>
            )}
          </div>

          {/* Code postal */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Code postal *
            </label>
            <input
              type="text"
              value={formData.shippingAddress.postalCode}
              onChange={(e) => handleInputChange('shippingAddress', 'postalCode', e.target.value)}
              maxLength={5}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                errors.postalCode ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
              }`}
              placeholder="75001"
            />
            {errors.postalCode && (
              <p className="text-sm text-red-600 mt-1">{errors.postalCode}</p>
            )}
          </div>

          {/* Pays */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Pays *
            </label>
            <select
              value={formData.shippingAddress.country}
              onChange={(e) => handleInputChange('shippingAddress', 'country', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
            >
              <option value="France">France</option>
              <option value="Belgique">Belgique</option>
              <option value="Suisse">Suisse</option>
              <option value="Luxembourg">Luxembourg</option>
            </select>
          </div>

          {/* Téléphone */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Téléphone *
            </label>
            <div className="relative">
              <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                value={formData.shippingAddress.phone}
                onChange={(e) => handleInputChange('shippingAddress', 'phone', e.target.value)}
                className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                  errors.phone ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                }`}
                placeholder="06 12 34 56 78"
              />
            </div>
            {errors.phone && (
              <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
            )}
          </div>
        </div>
      </div>

      {/* Méthode de paiement */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-green-100 text-green-600 p-3 rounded-xl">
            <FiCreditCard className="text-2xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Paiement</h2>
            <p className="text-sm text-gray-600">Choisissez votre mode de paiement</p>
          </div>
        </div>

        {/* Choix du mode de paiement */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <button
            type="button"
            onClick={() => setPaymentMethod('card')}
            className={`p-4 border-2 rounded-xl transition-all ${
              paymentMethod === 'card'
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <FiCreditCard className="text-2xl text-blue-600" />
              <div className="text-left">
                <p className="font-semibold text-gray-900">Carte bancaire</p>
                <p className="text-sm text-gray-600">Visa, Mastercard, Amex</p>
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod('paypal')}
            className={`p-4 border-2 rounded-xl transition-all ${
              paymentMethod === 'paypal'
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl">💳</div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">PayPal</p>
                <p className="text-sm text-gray-600">Paiement sécurisé</p>
              </div>
            </div>
          </button>
        </div>

        {/* Formulaire carte bancaire */}
        {paymentMethod === 'card' && (
          <div className="space-y-6 p-6 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <FiLock className="text-green-600" />
              <span>Paiement 100% sécurisé avec Stripe</span>
            </div>

            {/* Numéro de carte */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Numéro de carte *
              </label>
              <input
                type="text"
                value={formData.cardDetails?.cardNumber || ''}
                onChange={(e) => {
                  const formatted = formatCardNumber(e.target.value);
                  if (formatted.replace(/\s/g, '').length <= 16) {
                    handleInputChange('cardDetails', 'cardNumber', formatted);
                  }
                }}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                  errors.cardNumber ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                }`}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
              {errors.cardNumber && (
                <p className="text-sm text-red-600 mt-1">{errors.cardNumber}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                💳 Test: 4242 4242 4242 4242
              </p>
            </div>

            {/* Nom sur la carte */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Nom sur la carte *
              </label>
              <input
                type="text"
                value={formData.cardDetails?.cardName || ''}
                onChange={(e) => handleInputChange('cardDetails', 'cardName', e.target.value.toUpperCase())}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                  errors.cardName ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                }`}
                placeholder="JEAN DUPONT"
              />
              {errors.cardName && (
                <p className="text-sm text-red-600 mt-1">{errors.cardName}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Date d'expiration */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Date d'expiration *
                </label>
                <input
                  type="text"
                  value={formData.cardDetails?.expiryDate || ''}
                  onChange={(e) => {
                    const formatted = formatExpiryDate(e.target.value);
                    if (formatted.length <= 5) {
                      handleInputChange('cardDetails', 'expiryDate', formatted);
                    }
                  }}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                    errors.expiryDate ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                  }`}
                  placeholder="MM/AA"
                  maxLength={5}
                />
                {errors.expiryDate && (
                  <p className="text-sm text-red-600 mt-1">{errors.expiryDate}</p>
                )}
              </div>

              {/* CVV */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  CVV *
                </label>
                <input
                  type="text"
                  value={formData.cardDetails?.cvv || ''}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    if (value.length <= 4) {
                      handleInputChange('cardDetails', 'cvv', value);
                    }
                  }}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                    errors.cvv ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                  }`}
                  placeholder="123"
                  maxLength={4}
                />
                {errors.cvv && (
                  <p className="text-sm text-red-600 mt-1">{errors.cvv}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Message PayPal */}
        {paymentMethod === 'paypal' && (
          <div className="p-6 bg-blue-50 border-2 border-blue-200 rounded-xl">
            <p className="text-blue-800 font-medium mb-2">
              Vous serez redirigé vers PayPal pour finaliser votre paiement.
            </p>
            <p className="text-sm text-blue-600">
              Connectez-vous à votre compte PayPal pour compléter la transaction en toute sécurité.
            </p>
          </div>
        )}
      </div>

      {/* Bouton de soumission */}
      <button
        type="submit"
        disabled={isProcessing}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
      >
        {isProcessing ? (
          <>
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            Traitement en cours...
          </>
        ) : (
          <>
            <FiLock />
            Payer maintenant
          </>
        )}
      </button>

      <p className="text-center text-sm text-gray-600">
        🔒 Vos données sont cryptées et sécurisées
      </p>
    </form>
  );
};

export default CheckoutForm;