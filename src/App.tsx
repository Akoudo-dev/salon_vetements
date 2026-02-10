import { Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home';
import Shop from './pages/Shop';
import CategoriesList from './pages/CategoriesList';
import Categories from './pages/Categories';
import Checkout from './pages/Checkout';
import Contact from './pages/Contact';
import Cart from './pages/Cart-New';
import Wishlist from './pages/Wishlist';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';

// Pages temporaires (seront créées plus tard)
/* const Shop = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-4xl font-bold">Boutique</h1>
    <p className="text-gray-600 mt-4">Liste des produits (à créer)</p>
  </div>
) */;

/* const Cart = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-4xl font-bold">Panier</h1>
    <p className="text-gray-600 mt-4">Votre panier (à créer)</p>
  </div>
);

/* const Wishlist = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-4xl font-bold">Liste de souhaits</h1>
    <p className="text-gray-600 mt-4">Votre wishlist (à créer)</p>
  </div>
); */

/* const Categories = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-4xl font-bold">Catégories</h1>
    <p className="text-gray-600 mt-4">Liste des catégories (à créer)</p>
  </div>
); */

function App() {
 
return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Navbar utilise maintenant le ShopContext */}
        <Navbar />
        
        {/* Main Content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/categories" element={<CategoriesList />} />
            <Route path="/product/:slug" element={<Categories />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/register" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
  );
}

export default App
