import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { FiUser, FiLogOut, FiEdit, FiMail, FiLock, FiX } from 'react-icons/fi';

const UserContext: React.FC = () => {
  const { user, isLoggedIn, login, logout, updateProfile } = useShop();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLoginMode) {
      await login(formData.email, formData.password);
    } else {
      await register(formData);
    }
    
    setShowAuthModal(false);
    setFormData({ name: '', email: '', password: '' });
  };

  const register = async (userData: typeof formData) => {
    // Simuler l'inscription
    await login(userData.email, userData.password);
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profileData);
    setShowProfileModal(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  if (!isLoggedIn) {
    return (
      <>
        <button
          onClick={() => setShowAuthModal(true)}
          className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-blue-600"
        >
          <FiUser size={20} />
          <span>Connexion</span>
        </button>

        {/* Auth Modal */}
        {showAuthModal && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-50" />
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">
                    {isLoginMode ? 'Connexion' : 'Inscription'}
                  </h2>
                  <button
                    onClick={() => setShowAuthModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <FiX size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLoginMode && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nom
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        required={!isLoginMode}
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mot de passe
                    </label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {isLoginMode ? 'Se connecter' : 'S\'inscrire'}
                  </button>
                </form>

                <div className="mt-4 text-center">
                  <button
                    onClick={() => setIsLoginMode(!isLoginMode)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    {isLoginMode 
                      ? 'Pas encore de compte ? S\'inscrire' 
                      : 'Déjà un compte ? Se connecter'
                    }
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setShowProfileModal(!showProfileModal)}
          className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-blue-600"
        >
          {user?.avatar ? (
            <img 
              src={user.avatar} 
              alt={user.name}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <FiUser size={20} />
          )}
          <span>{user?.name}</span>
        </button>

        {/* Profile Dropdown */}
        {showProfileModal && (
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border z-50">
            <div className="p-4 border-b">
              <div className="flex items-center space-x-3">
                {user?.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <FiUser className="text-gray-400" />
                  </div>
                )}
                <div>
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>
            </div>

            <div className="p-2">
              <button
                onClick={() => {
                  setShowProfileModal(false);
                  // Ouvrir le modal de profil détaillé
                }}
                className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded flex items-center space-x-2"
              >
                <FiEdit size={16} />
                <span>Modifier le profil</span>
              </button>
              
              <button
                onClick={() => {
                  logout();
                  setShowProfileModal(false);
                }}
                className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded flex items-center space-x-2"
              >
                <FiLogOut size={16} />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Profile Edit Modal */}
      {showProfileModal && user && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Modifier le profil</h2>
                <button
                  onClick={() => setShowProfileModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <FiX size={20} />
                </button>
              </div>

              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom
                  </label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Enregistrer
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowProfileModal(false)}
                    className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserContext;
