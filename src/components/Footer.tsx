import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FiFacebook, 
  FiTwitter, 
  FiInstagram, 
  FiYoutube, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiTruck, 
  FiShield, 
  FiRefreshCw,
  FiCreditCard,
  FiPackage
} from 'react-icons/fi';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
     {/*  <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">
              <FiMail className="inline mr-2" />
              Restez informé
            </h3>
            <p className="text-white/90 mb-6">
              Inscrivez-vous à notre newsletter pour recevoir nos offres exclusives et les dernières nouveautés
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all">
                S'inscrire
              </button>
            </div>
          </div>
        </div>
      </div> */}

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* About Section */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold mb-4">À propos</h4>
            <p className="text-gray-400 leading-relaxed">
              VetShope est votre boutique en ligne de confiance pour des produits de qualité. 
              Nous nous engageons à offrir la meilleure expérience shopping avec des produits 
              soigneusement sélectionnés et un service client exceptionnel.
            </p>
            <div className="flex space-x-4 pt-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <FiFacebook className="text-xl" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <FiTwitter className="text-xl" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <FiInstagram className="text-xl" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <FiYoutube className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link 
                  to="/shop" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Boutique
                </Link>
              </li>
              <li>
                <Link 
                  to="/categories" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Catégories
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Qui sommes-nous ?
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold mb-4">Service client</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/help" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Aide & FAQ
                </Link>
              </li>
              <li>
                <Link 
                  to="/shipping" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Livraison & Retours
                </Link>
              </li>
              <li>
                <Link 
                  to="/payment" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Modes de paiement
                </Link>
              </li>
              <li>
                <Link 
                  to="/warranty" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Garantie
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Conditions générales
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400">
                <FiMapPin className="text-xl flex-shrink-0" />
                <span>123 Avenue des Champs-Élysées<br />75008 Paris, France</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <FiPhone className="text-xl flex-shrink-0" />
                <span>+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <FiMail className="text-xl flex-shrink-0" />
                <span>contact@vetshope.fr</span>
              </div>
            </div>
            
           {/*  <div className="pt-4">
              <p className="text-sm text-gray-400 mb-2">Horaires d'ouverture</p>
              <p className="text-sm text-gray-400">
                Lun-Ven: 9h-18h<br />
                Sam: 10h-17h<br />
                Dim: Fermé
              </p>
            </div> */}
          </div>
        </div>
      </div>

      {/* Features Section */}
      {/* <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <FiTruck className="text-2xl text-blue-400 flex-shrink-0" />
              <div>
                <h5 className="font-semibold">Livraison gratuite</h5>
                <p className="text-sm text-gray-400">Dès 50€ d'achat</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FiShield className="text-2xl text-green-400 flex-shrink-0" />
              <div>
                <h5 className="font-semibold">Paiement sécurisé</h5>
                <p className="text-sm text-gray-400">Transactions 100% protégées</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FiRefreshCw className="text-2xl text-purple-400 flex-shrink-0" />
              <div>
                <h5 className="font-semibold">Retour 30 jours</h5>
                <p className="text-sm text-gray-400">Satisfait ou remboursé</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FiPackage className="text-2xl text-orange-400 flex-shrink-0" />
              <div>
                <h5 className="font-semibold">Emballage premium</h5>
                <p className="text-sm text-gray-400">Protection maximale</p>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Payment Methods */}
      {/* <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Moyens de paiement acceptés :</span>
              <div className="flex items-center gap-3">
                <FiCreditCard className="text-xl text-gray-400" />
                <span className="text-sm text-gray-400">Visa, Mastercard, PayPal, Apple Pay</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visa/visa-original.svg" alt="Visa" className="h-6 opacity-60" />
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mastercard/mastercard-original.svg" alt="Mastercard" className="h-6 opacity-60" />
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/paypal/paypal-original.svg" alt="PayPal" className="h-6 opacity-60" />
            </div>
          </div>
        </div>
      </div>
 */}
      {/* Copyright */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-400">
                © {currentYear} VetShope. Tous droits réservés.
              </p>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link 
                to="/privacy" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                Confidentialité
              </Link>
              <Link 
                to="/cookies" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                Cookies
              </Link>
              <Link 
                to="/legal" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                Mentions légales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
