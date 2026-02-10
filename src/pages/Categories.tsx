import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  FiShoppingCart, 
  FiHeart, 
  FiShare2, 
  FiTruck, 
  FiShield, 
  FiRefreshCw,
  FiStar,
  FiChevronRight,
  FiMinus,
  FiPlus,
  FiRotateCcw
} from 'react-icons/fi';
import ImageGallery from '../components/ImageGallery';
import ReviewCard from '../components/ReviewCard';
import RatingStats from '../components/RatingStats';
import ProductCard from '../components/ProductCard';
import { getProductBySlug, getReviewsByProductId, getRelatedProducts } from '../data/mockData-UPDATED';
import type { Product } from '../data/mockData-UPDATED';

const Categories: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState<'description' | 'reviews' | 'shipping'>('description');
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (slug) {
      const foundProduct = getProductBySlug(slug);
      if (foundProduct) {
        setProduct(foundProduct);
        window.scrollTo(0, 0);
      } else {
        navigate('/shop');
      }
    }
  }, [slug, navigate]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  const reviews = getReviewsByProductId(product.id);
  const relatedProducts = getRelatedProducts(product, 4);

  // Calculer la distribution des notes
  const ratingDistribution = reviews.reduce(
    (acc, review) => {
      acc[review.rating as keyof typeof acc]++;
      return acc;
    },
    { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  );

  const handleQuantityChange = (action: 'increment' | 'decrement') => {
    if (action === 'increment' && quantity < product.stock) {
      setQuantity(prev => prev + 1);
    } else if (action === 'decrement' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    console.log(`Ajout au panier: ${product.name} x${quantity}`);
    alert(`${product.name} (×${quantity}) ajouté au panier !`);
  };

  const handleBuyNow = () => {
    console.log(`Achat immédiat: ${product.name} x${quantity}`);
    alert(`Redirection vers le paiement...`);
    // navigate('/checkout');
  };

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    console.log(isWishlisted ? 'Retiré de la wishlist' : 'Ajouté à la wishlist');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papier !');
    }
  };

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">Accueil</Link>
            <FiChevronRight className="text-xs" />
            <Link to="/shop" className="hover:text-blue-600">Boutique</Link>
            <FiChevronRight className="text-xs" />
            <Link to={`/shop?category=${product.category}`} className="hover:text-blue-600">
              {product.category}
            </Link>
            <FiChevronRight className="text-xs" />
            <span className="text-gray-900 font-medium truncate">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 py-8">
        
        {/* Section produit */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          
          {/* Galerie d'images */}
          <div>
            <ImageGallery 
              images={product.images || [product.image]} 
              productName={product.name} 
            />
          </div>

          {/* Informations produit */}
          <div className="space-y-6">
            
            {/* Titre et note */}
            <div>
              {product.brand && (
                <p className="text-blue-600 font-semibold mb-2">{product.brand}</p>
              )}
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, index) => (
                    <FiStar
                      key={index}
                      className={`text-lg ${
                        index < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-700">
                  {product.rating} ({product.reviewsCount} avis)
                </span>
              </div>
            </div>

            {/* Prix */}
            <div className="border-t border-b border-gray-200 py-6">
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-gray-900">
                  {product.price.toFixed(2)} €
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <span className="text-2xl text-gray-500 line-through">
                      {product.originalPrice.toFixed(2)} €
                    </span>
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      -{discountPercentage}%
                    </span>
                  </>
                )}
              </div>
              <p className="text-gray-600 mt-2">TVA incluse · Livraison calculée à l'étape suivante</p>
            </div>

            {/* Description courte */}
            <p className="text-gray-700 text-lg leading-relaxed">{product.description}</p>

            {/* Stock */}
            <div className="flex items-center gap-3">
              {product.stock > 0 ? (
                <>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-green-700 font-semibold">
                    En stock ({product.stock} disponibles)
                  </span>
                </>
              ) : (
                <>
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-red-700 font-semibold">Rupture de stock</span>
                </>
              )}
            </div>

            {/* Quantité */}
            {product.stock > 0 && (
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900">
                  Quantité
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => handleQuantityChange('decrement')}
                      disabled={quantity <= 1}
                      className="px-4 py-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <FiMinus />
                    </button>
                    <span className="px-6 py-3 font-semibold text-lg border-x-2 border-gray-200">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange('increment')}
                      disabled={quantity >= product.stock}
                      className="px-4 py-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <FiPlus />
                    </button>
                  </div>
                  <span className="text-sm text-gray-600">
                    Max: {product.stock} unités
                  </span>
                </div>
              </div>
            )}

            {/* Boutons d'action */}
            <div className="space-y-3 pt-4">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
              >
                <FiShoppingCart className="text-xl" />
                Ajouter au panier
              </button>

              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
              >
                Acheter maintenant
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleToggleWishlist}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all border-2 flex items-center justify-center gap-2 ${
                    isWishlisted
                      ? 'bg-red-50 border-red-500 text-red-600'
                      : 'border-gray-200 text-gray-700 hover:border-red-500 hover:text-red-600'
                  }`}
                >
                  <FiHeart className={`text-xl ${isWishlisted ? 'fill-current' : ''}`} />
                  {isWishlisted ? 'Ajouté' : 'Favoris'}
                </button>

                <button
                  onClick={handleShare}
                  className="px-6 py-3 rounded-xl font-semibold border-2 border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-600 transition-all flex items-center justify-center gap-2"
                >
                  <FiShare2 className="text-xl" />
                  Partager
                </button>
              </div>
            </div>

            {/* Avantages */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <FiTruck className="text-3xl text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900">Livraison gratuite</p>
                <p className="text-xs text-gray-600">Dès 50€ d'achat</p>
              </div>
              <div className="text-center">
                <FiShield className="text-3xl text-green-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900">Garantie 2 ans</p>
                <p className="text-xs text-gray-600">Protection totale</p>
              </div>
              <div className="text-center">
                <FiRefreshCw className="text-3xl text-purple-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900">Retour 30 jours</p>
                <p className="text-xs text-gray-600">Satisfait ou remboursé</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-16">
          
          {/* Onglets */}
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setSelectedTab('description')}
                className={`flex-1 px-6 py-4 font-semibold transition-all ${
                  selectedTab === 'description'
                    ? 'text-blue-600 border-b-4 border-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setSelectedTab('reviews')}
                className={`flex-1 px-6 py-4 font-semibold transition-all ${
                  selectedTab === 'reviews'
                    ? 'text-blue-600 border-b-4 border-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Avis ({product.reviewsCount})
              </button>
              <button
                onClick={() => setSelectedTab('shipping')}
                className={`flex-1 px-6 py-4 font-semibold transition-all ${
                  selectedTab === 'shipping'
                    ? 'text-blue-600 border-b-4 border-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Livraison & Retours
              </button>
            </div>
          </div>

          {/* Contenu des tabs */}
          <div className="p-8">
            {selectedTab === 'description' && (
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold mb-4">À propos de ce produit</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {product.description}
                </p>
                
                <h3 className="text-xl font-bold mb-3">Caractéristiques</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Qualité premium garantie</li>
                  <li>Design moderne et élégant</li>
                  <li>Fabriqué avec des matériaux de haute qualité</li>
                  <li>Testé et approuvé par nos experts</li>
                </ul>
              </div>
            )}

            {selectedTab === 'reviews' && (
              <div>
                {/* Statistiques */}
                <RatingStats
                  averageRating={product.rating}
                  totalReviews={product.reviewsCount}
                  ratingDistribution={ratingDistribution}
                />

                {/* Liste des avis */}
                <div className="mt-8 space-y-6">
                  <h3 className="text-2xl font-bold">Avis clients</h3>
                  {reviews.length > 0 ? (
                    reviews.map(review => (
                      <ReviewCard key={review.id} review={review} />
                    ))
                  ) : (
                    <p className="text-gray-600">Aucun avis pour le moment.</p>
                  )}
                </div>
              </div>
            )}

            {selectedTab === 'shipping' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-3">
                    <FiTruck className="inline mr-2" />
                    Livraison
                  </h3>
                  <p className="text-gray-700 mb-2">
                    Livraison standard gratuite pour toute commande supérieure à 50€.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Standard (3-5 jours) : Gratuit dès 50€, sinon 4,99€</li>
                    <li>Express (1-2 jours) : 9,99€</li>
                    <li>Retrait en point relais : Gratuit</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3">
                    <FiRotateCcw className="inline mr-2" />
                    Retours
                  </h3>
                  <p className="text-gray-700 mb-2">
                    Vous disposez de 30 jours pour retourner votre produit gratuitement.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Retour gratuit sous 30 jours</li>
                    <li>Produit dans son emballage d'origine</li>
                    <li>Remboursement sous 7 jours ouvrés</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Produits similaires */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-8">Produits similaires</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;