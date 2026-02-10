import React from 'react';
import { FiUser, FiMapPin, FiEdit2, FiLock, FiLogOut, FiShoppingBag, FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

const Profile: React.FC = () => {
  const { user, isLoggedIn, logout } = useShop();

  const handleLogout = () => {
    logout();
  };

  if (!isLoggedIn || !user) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-lg p-12">
              <FiUser className="text-6xl text-gray-300 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Non connecté</h1>
              <p className="text-gray-600 mb-8">
                Vous devez être connecté pour accéder à votre profil.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all"
              >
                <FiUser />
                Se connecter
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
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Mon Profil</h1>
            <p className="text-gray-600">
              Gérez vos informations personnelles et vos préférences
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiUser className="text-4xl text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {user.name}
                  </h2>
                  <p className="text-gray-600">{user.email}</p>
                </div>

                <nav className="space-y-2">
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg font-medium"
                  >
                    <FiUser />
                    Informations
                  </Link>
                  <Link
                    to="/orders"
                    className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <FiShoppingBag />
                    Commandes
                  </Link>
                  <Link
                    to="/addresses"
                    className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <FiMapPin />
                    Adresses
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <FiLock />
                    Sécurité
                  </Link>
                </nav>

                <button
                  onClick={handleLogout}
                  className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors"
                >
                  <FiLogOut />
                  Déconnexion
                </button>
              </div>
            </div>

            {/* Contenu principal */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Informations personnelles */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Informations personnelles</h2>
                  <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors">
                    <FiEdit2 />
                    Modifier
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet
                    </label>
                    <p className="text-gray-900">{user.name}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <p className="text-gray-900">{user.email}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <p className="text-gray-900">Non renseigné</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date d'inscription
                    </label>
                    <p className="text-gray-900">N/A</p>
                  </div>
                </div>
              </div>

              {/* Statistiques */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Mes activités</h2>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <FiShoppingBag className="text-3xl text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">12</div>
                    <div className="text-sm text-gray-600">Commandes</div>
                  </div>

                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <FiHeart className="text-3xl text-red-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">8</div>
                    <div className="text-sm text-gray-600">Favoris</div>
                  </div>

                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl mx-auto mb-2">🎉</div>
                    <div className="text-2xl font-bold text-gray-900">3</div>
                    <div className="text-sm text-gray-600">Avis</div>
                  </div>
                </div>
              </div>

              {/* Adresses */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Adresses de livraison</h2>
                  <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                    Ajouter une adresse
                  </button>
                </div>

                {user.addresses && user.addresses.length > 0 ? (
                  <div className="space-y-4">
                    {user.addresses.map((address, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900">{address.street}</p>
                            <p className="text-gray-600">
                              {address.postalCode} {address.city}
                            </p>
                            {address.isDefault && (
                              <span className="inline-block mt-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                Adresse par défaut
                              </span>
                            )}
                          </div>
                          <button className="text-gray-400 hover:text-gray-600">
                            <FiEdit2 />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <FiMapPin className="text-4xl mx-auto mb-2" />
                    <p>Aucune adresse enregistrée</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
