import React, { useState } from 'react';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiCheck } from 'react-icons/fi';
import type { RegisterFormData } from '../types/types';

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => void;
  isLoading: boolean;
  error?: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, isLoading, error }) => {
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Calculer la force du mot de passe
  const getPasswordStrength = (password: string): { strength: number; label: string; color: string } => {
    if (!password) return { strength: 0, label: '', color: '' };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 1) return { strength: 1, label: 'Faible', color: 'bg-red-500' };
    if (strength <= 2) return { strength: 2, label: 'Moyen', color: 'bg-orange-500' };
    if (strength <= 3) return { strength: 3, label: 'Bon', color: 'bg-yellow-500' };
    return { strength: 4, label: 'Excellent', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validation prénom
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Prénom requis';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'Minimum 2 caractères';
    }

    // Validation nom
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Nom requis';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Minimum 2 caractères';
    }

    // Validation email
    if (!formData.email.trim()) {
      newErrors.email = 'Email requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    // Validation mot de passe
    if (!formData.password) {
      newErrors.password = 'Mot de passe requis';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Minimum 8 caractères';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password = 'Doit contenir majuscules et minuscules';
    } else if (!/(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Doit contenir au moins un chiffre';
    }

    // Validation confirmation mot de passe
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmation requise';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    // Validation conditions
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Vous devez accepter les conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof RegisterFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Effacer l'erreur du champ
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* Message d'erreur global */}
      {error && (
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
          <p className="text-red-800 text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Prénom et Nom */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Prénom */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Prénom *
          </label>
          <div className="relative">
            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                errors.firstName ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
              }`}
              placeholder="Jean"
              disabled={isLoading}
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
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                errors.lastName ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
              }`}
              placeholder="Dupont"
              disabled={isLoading}
            />
          </div>
          {errors.lastName && (
            <p className="text-sm text-red-600 mt-1">{errors.lastName}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Adresse email *
        </label>
        <div className="relative">
          <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
              errors.email ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
            }`}
            placeholder="exemple@email.com"
            disabled={isLoading}
          />
        </div>
        {errors.email && (
          <p className="text-sm text-red-600 mt-1">{errors.email}</p>
        )}
      </div>

      {/* Mot de passe */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Mot de passe *
        </label>
        <div className="relative">
          <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
              errors.password ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
            }`}
            placeholder="••••••••"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isLoading}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
        
        {/* Force du mot de passe */}
        {formData.password && (
          <div className="mt-2">
            <div className="flex items-center gap-2 mb-1">
              {[1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`h-2 flex-1 rounded-full transition-all ${
                    level <= passwordStrength.strength
                      ? passwordStrength.color
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-gray-600">
              Force : <span className="font-semibold">{passwordStrength.label}</span>
            </p>
          </div>
        )}

        {errors.password && (
          <p className="text-sm text-red-600 mt-1">{errors.password}</p>
        )}

        {/* Critères mot de passe */}
        <div className="mt-3 space-y-1">
          <div className={`flex items-center gap-2 text-xs ${
            formData.password.length >= 8 ? 'text-green-600' : 'text-gray-500'
          }`}>
            <FiCheck className={formData.password.length >= 8 ? 'text-green-600' : 'text-gray-400'} />
            <span>Au moins 8 caractères</span>
          </div>
          <div className={`flex items-center gap-2 text-xs ${
            /(?=.*[a-z])(?=.*[A-Z])/.test(formData.password) ? 'text-green-600' : 'text-gray-500'
          }`}>
            <FiCheck className={/(?=.*[a-z])(?=.*[A-Z])/.test(formData.password) ? 'text-green-600' : 'text-gray-400'} />
            <span>Majuscules et minuscules</span>
          </div>
          <div className={`flex items-center gap-2 text-xs ${
            /(?=.*\d)/.test(formData.password) ? 'text-green-600' : 'text-gray-500'
          }`}>
            <FiCheck className={/(?=.*\d)/.test(formData.password) ? 'text-green-600' : 'text-gray-400'} />
            <span>Au moins un chiffre</span>
          </div>
        </div>
      </div>

      {/* Confirmation mot de passe */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Confirmer le mot de passe *
        </label>
        <div className="relative">
          <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
            }`}
            placeholder="••••••••"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isLoading}
          >
            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-red-600 mt-1">{errors.confirmPassword}</p>
        )}
      </div>

      {/* Accepter les conditions */}
      <div>
        <div className="flex items-start">
          <input
            type="checkbox"
            id="acceptTerms"
            checked={formData.acceptTerms}
            onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
            className={`w-4 h-4 mt-1 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 ${
              errors.acceptTerms ? 'border-red-500' : ''
            }`}
            disabled={isLoading}
          />
          <label htmlFor="acceptTerms" className="ml-2 text-sm text-gray-700">
            J'accepte les{' '}
            <a href="/terms" className="text-blue-600 hover:underline font-medium">
              conditions d'utilisation
            </a>{' '}
            et la{' '}
            <a href="/privacy" className="text-blue-600 hover:underline font-medium">
              politique de confidentialité
            </a>
          </label>
        </div>
        {errors.acceptTerms && (
          <p className="text-sm text-red-600 mt-1">{errors.acceptTerms}</p>
        )}
      </div>

      {/* Bouton d'inscription */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Création du compte...
          </>
        ) : (
          'Créer mon compte'
        )}
      </button>
    </form>
  );
};

export default RegisterForm;