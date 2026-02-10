import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiHeart, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { useShop } from '../context/ShopContext';
import logo from '../assets/logo.png';
// Types et Interfaces
interface NavbarProps {
  cartItemsCount?: number;
  wishlistCount?: number;
  isLoggedIn?: boolean;
  userName?: string;
}

const Navbar: React.FC = () => {
  const { 
    cartItemsCount, 
    wishlistCount, 
    isLoggedIn, 
    user 
  } = useShop();
  
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMenuOpen(false); // Fermer le menu mobile après recherche
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      {/* Top Bar - Annonces */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 text-sm">
        <p> Livraison gratuite pour toute commande supérieure à 50€ !</p>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="  px-4 py-2 rounded-lg">
            <img src={logo} alt="" className='w-25 h-25' />
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <form 
            onSubmit={handleSearch}
            className="hidden lg:flex items-center flex-1 max-w-xl mx-8"
          >
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Rechercher des produits..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full px-4 py-2.5 pl-12 border-2 border-gray-200 rounded-full focus:outline-none focus:border-blue-500 transition-all"
              />
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            </div>
            <button
              type="submit"
              className="ml-2 bg-blue-600 text-white px-6 py-2.5 rounded-full hover:bg-blue-700 transition-all font-medium"
            >
              Chercher
            </button>
          </form>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-all"
            >
              Accueil
            </Link>
            <Link 
              to="/shop" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-all"
            >
              Boutique
            </Link>
            <Link 
              to="/categories" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-all"
            >
              Catégories
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-all"
            >
              Contact
            </Link>
          </div>

          {/* Icons - Desktop */}
          <div className="hidden lg:flex items-center space-x-6">
            
            {/* Wishlist */}
            <Link 
              to="/wishlist" 
              className="relative text-gray-700 hover:text-red-500 transition-all"
              aria-label="Liste de souhaits"
            >
              <FiHeart className="text-2xl" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link 
              to="/cart" 
              className="relative text-gray-700 hover:text-blue-600 transition-all"
              aria-label="Panier"
            >
              <FiShoppingCart className="text-2xl" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* User Account */}
            {isLoggedIn ? (
              <Link 
                to="/profile" 
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-all"
              >
                <FiUser className="text-2xl" />
                <span className="font-medium">
                  {user?.name || 'Mon Compte'}
                </span>
              </Link>
            ) : (
              <Link 
                to="/login" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-full hover:shadow-lg transition-all font-medium"
              >
                Connexion
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-gray-700 text-3xl focus:outline-none"
            aria-label="Menu"
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Search Bar - Mobile */}
        <form 
          onSubmit={handleSearch}
          className="lg:hidden pb-4"
        >
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-2.5 pl-12 border-2 border-gray-200 rounded-full focus:outline-none focus:border-blue-500"
            />
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          </div>
        </form>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-4 space-y-4">
            
            {/* Mobile Navigation Links */}
            <Link 
              to="/" 
              className="block text-gray-700 hover:text-blue-600 font-medium py-2"
              onClick={toggleMenu}
            >
               Accueil
            </Link>
            <Link 
              to="/shop" 
              className="block text-gray-700 hover:text-blue-600 font-medium py-2"
              onClick={toggleMenu}
            >
               Boutique
            </Link>
            <Link 
              to="/categories" 
              className="block text-gray-700 hover:text-blue-600 font-medium py-2"
              onClick={toggleMenu}
            >
              Catégories
            </Link>
            <Link 
              to="/contact" 
              className="block text-gray-700 hover:text-blue-600 font-medium py-2"
              onClick={toggleMenu}
            >
               Contact
            </Link>

            <div className="border-t border-gray-200 pt-4 mt-4">
              <Link 
                to="/wishlist" 
                className="flex items-center justify-between text-gray-700 hover:text-red-500 font-medium py-2"
                onClick={toggleMenu}
              >
                <span> Ma Liste de Souhaits</span>
                {wishlistCount > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              
              <Link 
                to="/cart" 
                className="flex items-center justify-between text-gray-700 hover:text-blue-600 font-medium py-2"
                onClick={toggleMenu}
              >
                <span> Mon Panier</span>
                {cartItemsCount > 0 && (
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    {cartItemsCount}
                  </span>
                )}
              </Link>

              {isLoggedIn ? (
                <Link 
                  to="/profile" 
                  className="block text-gray-700 hover:text-blue-600 font-medium py-2"
                  onClick={toggleMenu}
                >
                  👤 {user?.name || 'Mon Compte'}
                </Link>
              ) : (
                <Link 
                  to="/login" 
                  className="block bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center px-6 py-3 rounded-full hover:shadow-lg transition-all font-medium mt-2"
                  onClick={toggleMenu}
                >
                  Connexion / Inscription
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;