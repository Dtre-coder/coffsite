import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { coffeeShops } from '../data/coffeeData';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom coffee icon
const coffeeIcon = new L.DivIcon({
  html: `<div class="w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-700 rounded-full flex items-center justify-center shadow-lg border-3 border-white transform hover:scale-110 transition-transform cursor-pointer">
    <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M2,21H20V19H2M20,8H18V5H20M20,3H4V13A4,4 0 0,0 8,17H14A4,4 0 0,0 18,13V10H20A2,2 0 0,0 22,8V5C22,3.89 21.1,3 20,3Z"/>
    </svg>
  </div>`,
  className: 'custom-coffee-icon',
  iconSize: [48, 48],
  iconAnchor: [24, 48],
  popupAnchor: [0, -48]
});

function MapControls() {
  const map = useMap();
  
  useEffect(() => {
    map.setView([56.8389, 60.5975], 13);
  }, []);
  
  return null;
}

export default function HomePage() {
  const mapRef = useRef<L.Map | null>(null);

  const center: [number, number] = [56.8389, 60.5975];

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900">
      {/* Header */}
      <header className="bg-black/40 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2,21H20V19H2M20,8H18V5H20M20,3H4V13A4,4 0 0,0 8,17H14A4,4 0 0,0 18,13V10H20A2,2 0 0,0 22,8V5C22,3.89 21.1,3 20,3Z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                КофеИн
              </h1>
              <p className="text-xs text-white/50">Екатеринбург</p>
            </div>
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
      </header>

      {/* Hero Section */}
      <div className="px-4 pt-6 pb-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Выберите кофейню
          </h2>
          <p className="text-white/60 text-lg">
            Найдите лучшую кофейню рядом с вами
          </p>
        </div>
      </div>

      {/* Map Container */}
      <div className="px-4 pb-6">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <div className="absolute top-4 left-4 z-[1000] bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-white/80 text-sm font-medium">{coffeeShops.length} кофеен</span>
            </div>
            <MapContainer 
              center={center} 
              zoom={13} 
              className="h-[400px] w-full"
              ref={mapRef}
            >
              <MapControls />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              />
              {coffeeShops.map((shop) => (
                <Marker 
                  key={shop.id} 
                  position={shop.coordinates}
                  icon={coffeeIcon}
                >
                  <Popup className="custom-popup">
                    <div className="text-center p-2">
                      <h3 className="font-bold text-gray-900">{shop.name}</h3>
                      <p className="text-sm text-gray-600">{shop.address}</p>
                      <Link 
                        to={`/coffee/${shop.id}`}
                        className="mt-2 inline-block bg-amber-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors"
                      >
                        Открыть меню
                      </Link>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>

      {/* Coffee Shops List */}
      <div className="px-4 pb-8">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-xl font-semibold text-white mb-4">Доступные кофейни</h3>
          <div className="grid gap-4">
            {coffeeShops.map((shop) => (
              <Link
                key={shop.id}
                to={`/coffee/${shop.id}`}
                className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-500/50 rounded-2xl p-4 transition-all duration-300"
              >
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <img 
                      src={shop.image} 
                      alt={shop.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg font-semibold text-white group-hover:text-amber-400 transition-colors">
                      {shop.name}
                    </h4>
                    <p className="text-white/50 text-sm mb-2 line-clamp-2">{shop.description}</p>
                    <div className="flex items-center gap-2 text-white/40 text-sm">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z"/>
                      </svg>
                      <span>{shop.address}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-amber-500 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
                    </svg>
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
