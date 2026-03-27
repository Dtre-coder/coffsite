import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { coffeeShops, getFavorites } from '../data/coffeeData';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const saved = getFavorites();
    setFavorites(saved);
  }, []);

  // Get favorite products with shop info
  const favoriteProducts = useMemo(() => {
    const products: { id: string; name: string; image: string; description: string; price: number; shopName: string; shopId: string }[] = [];
    
    for (const shop of coffeeShops) {
      for (const product of shop.products) {
        if (favorites.includes(product.id)) {
          products.push({
            id: product.id,
            name: product.name,
            image: product.image,
            description: product.description,
            price: product.basePrice,
            shopName: shop.name,
            shopId: shop.id
          });
        }
      }
    }
    return products;
  }, [favorites]);

  const handleRemoveFavorite = (productId: string) => {
    const newFavorites = favorites.filter(f => f !== productId);
    setFavorites(newFavorites);
    localStorage.setItem('kofein_favorites', JSON.stringify(newFavorites));
  };

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
              <h1 className="text-xl font-bold text-white">Избранное</h1>
              <p className="text-white/50 text-sm">{favoriteProducts.length} товаров</p>
            </div>
          </div>
        </div>
      </header>

      {/* Favorites List */}
      <div className="px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {favoriteProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-white/30" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"/>
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">Пока ничего нет</h2>
              <p className="text-white/50 mb-6">Добавьте любимые напитки в избранное</p>
              <Link 
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-xl transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Выбрать кофейню
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {favoriteProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-500/50 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <div className="flex">
                    <div className="w-28 h-28 flex-shrink-0 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 p-4 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="min-w-0 flex-1">
                          <h3 className="text-lg font-semibold text-white group-hover:text-amber-400 transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-amber-400/70 text-sm">{product.shopName}</p>
                          <p className="text-white/50 text-sm line-clamp-1 mt-1">{product.description}</p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleRemoveFavorite(product.id);
                          }}
                          className="p-2 text-white/40 hover:text-red-500 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                          </svg>
                        </button>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xl font-bold text-amber-400">{product.price} ₽</span>
                        <svg className="w-5 h-5 text-white/30 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
