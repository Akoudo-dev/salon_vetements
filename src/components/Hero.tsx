import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiShoppingBag } from 'react-icons/fi';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gray-400 to-pink-500 text-black overflow-hidden">
      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Texte */}
          <div className="space-y-6 animate-fadeIn">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
               Nouvelle Collection 2026
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Découvrez le Shopping
              <span className="block text-blue-900">de Nouvelle Génération</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-white/90 max-w-xl">
              Des milliers de produits tendance, des prix imbattables et une livraison ultra rapide. 
              Transformez votre expérience shopping dès aujourd'hui.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/shop"
                className="group bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-yellow-300 hover:text-blue-900 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <FiShoppingBag className="text-xl" />
                Explorer la Boutique
                <FiArrowRight className="text-xl group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/categories"
                className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Voir les Catégories
              </Link>
            </div>
            
            {/* Stats */}
            <div className="flex gap-8 pt-8">
              <div>
                <div className="text-3xl font-bold">10K+</div>
                <div className="text-white/80 text-sm">Produits</div>
              </div>
              <div>
                <div className="text-3xl font-bold">50K+</div>
                <div className="text-white/80 text-sm">Clients Satisfaits</div>
              </div>
              <div>
                <div className="text-3xl font-bold">4.9/5</div>
                <div className="text-white/80 text-sm">Note Moyenne</div>
              </div>
            </div>
          </div>
          
          {/* Image/Illustration */}
          <div className="relative hidden lg:block">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
                alt="Shopping"
                className="rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            {/* Badges flottants */}
            <div className="absolute top-10 -right-6 bg-white text-gray-800 px-6 py-3 rounded-full shadow-xl animate-bounce">
              <div className="text-sm font-semibold"> -50% Aujourd'hui</div>
            </div>
            
            <div className="absolute bottom-10 -left-6 bg-blue-900 text-gray-900 px-6 py-3 rounded-full shadow-xl">
              <div className="text-sm font-semibold"> Livraison Gratuite</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Vagues décoratives */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 80C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="rgb(249, 250, 251)"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;