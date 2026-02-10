import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FiUser, FiUserPlus } from 'react-icons/fi';
import { useShop } from '../context/ShopContext';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import type { LoginFormData, RegisterFormData } from '../types/types';

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { login, register } = useShop();
  
  // Déterminer le mode (login ou register) depuis l'URL
  const initialMode = searchParams.get('mode') === 'register' ? 'register' : 'login';
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const switchMode = (newMode: 'login' | 'register') => {
    setMode(newMode);
    setSearchParams({ mode: newMode });
    setError(undefined);
  };

  // Gérer la connexion avec le ShopContext
  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(undefined);

    try {
      // Utiliser le ShopContext pour la connexion
      await login(data.email, data.password);
      
      // Rediriger vers la page d'origine ou le profil
      const from = searchParams.get('from') || '/profile';
      navigate(from);
    } catch (err: any) {
      // Gérer les erreurs de connexion
      if (err.message === 'User not found') {
        setError('Aucun compte trouvé avec cet email');
      } else if (err.message === 'Invalid password') {
        setError('Mot de passe incorrect');
      } else {
        setError('Une erreur est survenue. Veuillez réessayer.');
      }
      console.error('Erreur de connexion:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Gérer l'inscription avec le ShopContext
  const handleRegister = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError(undefined);

    try {
      // Validation des termes
      if (!data.acceptTerms) {
        setError('Vous devez accepter les conditions d\'utilisation');
        setIsLoading(false);
        return;
      }

      // Validation de la correspondance des mots de passe
      if (data.password !== data.confirmPassword) {
        setError('Les mots de passe ne correspondent pas');
        setIsLoading(false);
        return;
      }

      // Utiliser le ShopContext pour l'inscription
      await register({
        name: `${data.firstName} ${data.lastName}`,
        email: data.email
      });
      
      // Rediriger vers le profil après inscription
      navigate('/profile');
    } catch (err: any) {
      // Gérer les erreurs d'inscription
      if (err.message === 'Email already exists') {
        setError('Cet email est déjà utilisé');
      } else if (err.message === 'Weak password') {
        setError('Le mot de passe est trop faible (min 8 caractères)');
      } else {
        setError('Une erreur est survenue lors de l\'inscription. Veuillez réessayer.');
      }
      console.error('Erreur d\'inscription:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Gérer la connexion Google
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(undefined);

    try {
      // Simuler l'authentification Google
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Créer un utilisateur factice pour la démo
      const googleUser = {
        id: 'google_' + Date.now(),
        name: 'Utilisateur Google',
        email: 'user@gmail.com',
        firstName: 'Utilisateur',
        lastName: 'Google',
        role: 'user' as const,
        createdAt: new Date()
      };

      // Simuler la connexion réussie
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUser', JSON.stringify(googleUser));
      localStorage.setItem('authToken', 'google-token-' + Date.now());
      
      // Rediriger vers le profil
      navigate('/profile');
    } catch (err) {
      setError('La connexion Google a échoué. Veuillez réessayer.');
      console.error('Erreur Google:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Background décoratif */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 items-center">
          
          {/* Section gauche - Informations */}
          <div className="hidden lg:block space-y-8">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                Bienvenue sur
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  ShopLuxe
                </span>
              </h1>
              <p className="text-xl text-gray-600">
                Découvrez notre sélection de produits premium et profitez d'une expérience shopping unique.
              </p>
            </div>

            {/* Avantages */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-md">
                <div className="bg-blue-100 text-blue-600 p-3 rounded-lg flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Livraison gratuite</h3>
                  <p className="text-sm text-gray-600">
                    Pour toute commande supérieure à 50€
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-md">
                <div className="bg-green-100 text-green-600 p-3 rounded-lg flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Paiement sécurisé</h3>
                  <p className="text-sm text-gray-600">
                    Vos transactions sont 100% protégées
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-md">
                <div className="bg-purple-100 text-purple-600 p-3 rounded-lg flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Retour gratuit</h3>
                  <p className="text-sm text-gray-600">
                    30 jours pour changer d'avis
                  </p>
                </div>
              </div>
            </div>

            {/* Statistiques */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
                <div className="text-sm text-gray-600">Produits</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">50K+</div>
                <div className="text-sm text-gray-600">Clients</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">4.9/5</div>
                <div className="text-sm text-gray-600">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Section droite - Formulaires */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
            
            {/* Toggle Login/Register */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1 mb-8">
              <button
                onClick={() => switchMode('login')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-all ${
                  mode === 'login'
                    ? 'bg-white text-blue-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <FiUser />
                Connexion
              </button>
              <button
                onClick={() => switchMode('register')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-all ${
                  mode === 'register'
                    ? 'bg-white text-blue-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <FiUserPlus />
                Inscription
              </button>
            </div>

            {/* Titre */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {mode === 'login' ? 'Bon retour !' : 'Créer un compte'}
              </h2>
              <p className="text-gray-600">
                {mode === 'login'
                  ? 'Connectez-vous pour accéder à votre compte'
                  : 'Rejoignez notre communauté de shoppers'}
              </p>
            </div>

            {/* Formulaires */}
            {mode === 'login' ? (
              <LoginForm
                onSubmit={handleLogin}
                isLoading={isLoading}
                error={error}
              />
            ) : (
              <RegisterForm
                onSubmit={handleRegister}
                isLoading={isLoading}
                error={error}
              />
            )}

            {/* Lien vers l'autre mode */}
            <div className="mt-6 text-center text-sm text-gray-600">
              {mode === 'login' ? (
                <>
                  Pas encore de compte ?{' '}
                  <button
                    onClick={() => switchMode('register')}
                    className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                  >
                    Inscrivez-vous gratuitement
                  </button>
                </>
              ) : (
                <>
                  Vous avez déjà un compte ?{' '}
                  <button
                    onClick={() => switchMode('login')}
                    className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                  >
                    Connectez-vous
                  </button>
                </>
              )}
            </div>

            {/* Social login */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Ou continuer avec</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all font-medium text-gray-700"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </button>

                <button
                  type="button"
                  className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all font-medium text-gray-700"
                >
                  <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;