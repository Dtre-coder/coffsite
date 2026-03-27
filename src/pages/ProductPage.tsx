import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { coffeeShops, volumeOptions, syrupOptions, milkOptions, getFavorites } from '../data/coffeeData';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [selectedVolume, setSelectedVolume] = useState(volumeOptions[1].id);
  const [selectedSyrup, setSelectedSyrup] = useState(syrupOptions[0].id);
  const [selectedMilk, setSelectedMilk] = useState(milkOptions[0].id);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showOrderPopup, setShowOrderPopup] = useState(false);

  // Find product
  const product = useMemo(() => {
    for (const shop of coffeeShops) {
      const found = shop.products.find(p => p.id === id);
      if (found) return found;
    }
    return null;
  }, [id]);

  const shop = useMemo(() => {
    for (const s of coffeeShops) {
      const found = s.products.find(p => p.id === id);
      if (found) return s;
    }
    return null;
  }, [id]);

  useEffect(() => {
    const favorites = getFavorites();
    setIsFavorite(favorites.includes(id || ''));
  }, [id]);

  const totalPrice = useMemo(() => {
    if (!product) return 0;
    const volume = volumeOptions.find(v => v.id === selectedVolume);
    const syrup = syrupOptions.find(s => s.id === selectedSyrup);
    const milk = milkOptions.find(m => m.id === selectedMilk);
    return Math.round(product.basePrice * (volume?.multiplier || 1) + (syrup?.price || 0) + (milk?.price || 0));
  }, [product, selectedVolume, selectedSyrup, selectedMilk]);

  const handleToggleFavorite = () => {
    const favorites = getFavorites();
    if (isFavorite) {
      const filtered = favorites.filter(f => f !== id);
      localStorage.setItem('kofein_favorites', JSON.stringify(filtered));
      setIsFavorite(false);
    } else {
      favorites.push(id || '');
      localStorage.setItem('kofein_favorites', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  const handleOrder = () => {
    setShowOrderPopup(true);
    setTimeout(() => setShowOrderPopup(false), 3000);
  };

  if (!product || !shop) {
    return (
      <div className="min-h-screen bg-stone-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Товар не найден</h1>
          <Link to="/" className="text-amber-500 hover:text-amber-400">Вернуться на карту</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 pb-24">
      {/* Header */}
      <header className="bg-black/40 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link 
              to={`/coffee/${shop.id}`}
              className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-white">{product.name}</h1>
              <p className="text-white/50 text-sm">{shop.name}</p>
            </div>
            <button 
              onClick={handleToggleFavorite}
              className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all"
            >
              <svg 
                className={`w-6 h-6 transition-colors ${isFavorite ? 'text-red-500 fill-red-500' : 'text-white/70'}`} 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Product Image */}
      <div className="relative h-72">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/30 to-transparent"></div>
      </div>

      {/* Product Info */}
      <div className="px-4 -mt-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-stone-800/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
            <h2 className="text-2xl font-bold text-white mb-2">{product.name}</h2>
            <p className="text-white/60">{product.description}</p>
          </div>

          {/* Volume Options */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-white mb-3">Объём</h3>
            <div className="flex gap-3">
              {volumeOptions.map((volume) => (
                <button
                  key={volume.id}
                  onClick={() => setSelectedVolume(volume.id)}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                    selectedVolume === volume.id
                      ? 'bg-amber-500 text-white'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {volume.name}
                </button>
              ))}
            </div>
          </div>

          {/* Syrup Options */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-white mb-3">Сироп</h3>
            <div className="grid grid-cols-2 gap-3">
              {syrupOptions.map((syrup) => (
                <button
                  key={syrup.id}
                  onClick={() => setSelectedSyrup(syrup.id)}
                  className={`py-3 px-4 rounded-xl font-medium transition-all ${
                    selectedSyrup === syrup.id
                      ? 'bg-amber-500 text-white'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {syrup.name}
                  {syrup.price > 0 && <span className="text-white/50 ml-1">+{syrup.price}₽</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Milk Options */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-white mb-3">Молоко</h3>
            <div className="grid grid-cols-2 gap-3">
              {milkOptions.map((milk) => (
                <button
                  key={milk.id}
                  onClick={() => setSelectedMilk(milk.id)}
                  className={`py-3 px-4 rounded-xl font-medium transition-all ${
                    selectedMilk === milk.id
                      ? 'bg-amber-500 text-white'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {milk.name}
                  {milk.price > 0 && <span className="text-white/50 ml-1">+{milk.price}₽</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Order Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-stone-900/90 backdrop-blur-xl border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={handleOrder}
            className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-lg rounded-2xl transition-all shadow-lg shadow-amber-500/25 active:scale-95"
          >
            Заказать за {totalPrice} ₽
          </button>
        </div>
      </div>

      {/* Order Popup */}
      {showOrderPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowOrderPopup(false)}></div>
          <div className="relative bg-stone-800 border border-white/10 rounded-3xl p-8 max-w-sm w-full text-center animate-bounce-in">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Заказ оформлен!</h3>
            <p className="text-white/60">Демо-режим: данные никуда не отправляются</p>
          </div>
        </div>
      )}
    </div>
  );
}
