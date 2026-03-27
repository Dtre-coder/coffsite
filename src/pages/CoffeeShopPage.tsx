import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { coffeeShops } from '../data/coffeeData';

export default function CoffeeShopPage() {
  const { id } = useParams<{ id: string }>();
  const shop = coffeeShops.find(s => s.id === id);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    const saved = localStorage.getItem('kofein_favorites');
    if (saved) {
      setFavorites(new Set(JSON.parse(saved)));
    }
  }, []);

  const handleToggleFavorite = (productId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
    localStorage.setItem('kofein_favorites', JSON.stringify([...newFavorites]));
  };

  if (!shop) {
    return (
      <div className="min-h-screen bg-stone-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Кофейня не найдена</h1>
          <Link to="/" className="text-amber-500 hover:text-amber-400">Вернуться на карту</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900">
      {/* Header */}
      <header className="bg-black/40 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-white">{shop.name}</h1>
              <p className="text-white/50 text-sm">{shop.address}</p>
            </div>
            <Link 
              to="/favorites" 
              className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all group"
            >
              <svg className="w-6 h-6 text-white/70 group-hover:text-amber-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"/>
              </svg>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="relative h-48 md:h-64">
        <img 
          src={shop.image} 
          alt={shop.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p className="text-white/80 text-lg">{shop.description}</p>
        </div>
      </div>

      {/* Menu */}
      <div className="px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Меню</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {shop.products.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-500/50 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleToggleFavorite(product.id);
                    }}
                    className="absolute top-3 right-3 p-2 bg-black/40 backdrop-blur-sm rounded-full transition-all hover:bg-black/60"
                  >
                    <svg 
                      className={`w-5 h-5 transition-colors ${favorites.has(product.id) ? 'text-red-500 fill-red-500' : 'text-white'}`} 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"/>
                    </svg>
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white group-hover:text-amber-400 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-white/50 text-sm line-clamp-2 mt-1">{product.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xl font-bold text-amber-400">от {product.basePrice} ₽</span>
                    <span className="text-white/40 text-sm">{product.category}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
