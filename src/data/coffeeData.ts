// Coffee shop data
export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  basePrice: number;
  category: string;
}

export interface CoffeeShop {
  id: string;
  name: string;
  description: string;
  image: string;
  address: string;
  coordinates: [number, number];
  products: Product[];
}

export const coffeeShops: CoffeeShop[] = [
  {
    id: 'simple-coffee',
    name: 'Simple Coffee',
    description: 'Уютная кофейня с авторским кофе и домашней атмосферой',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop',
    address: 'ул. Ленина, 25',
    coordinates: [56.8389, 60.5975],
    products: [
      {
        id: 'simple-latte',
        name: 'Латте',
        description: 'Классический латте с нежной молочной пенкой. Идеальный баланс кофе и молока.',
        image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400&h=400&fit=crop',
        basePrice: 220,
        category: 'Напитки'
      },
      {
        id: 'simple-cappuccino',
        name: 'Капучино',
        description: 'Традиционный капучино с плотной пенкой из свежего молока.',
        image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=400&fit=crop',
        basePrice: 200,
        category: 'Напитки'
      },
      {
        id: 'simple-raf',
        name: 'Раф',
        description: 'Нежный раф-кофе с ванильным сиропом и взбитыми сливками.',
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=400&fit=crop',
        basePrice: 250,
        category: 'Напитки'
      }
    ]
  },
  {
    id: 'duo',
    name: 'DUO',
    description: 'Современная кофейня с минималистичным интерьером и премиальным кофе',
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400&h=300&fit=crop',
    address: 'ул. 8 Марта, 45',
    coordinates: [56.8330, 60.5833],
    products: [
      {
        id: 'duo-latte',
        name: 'Латте',
        description: 'Латте с сиропом на выбор. мягкий сливочный вкус с нотками кофе.',
        image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&h=400&fit=crop',
        basePrice: 240,
        category: 'Напитки'
      },
      {
        id: 'duo-cappuccino',
        name: 'Капучино',
        description: 'Капучино по итальянскому рецепту. Насыщенный кофейный вкус.',
        image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=400&h=400&fit=crop',
        basePrice: 220,
        category: 'Напитки'
      },
      {
        id: 'duo-raf',
        name: 'Раф',
        description: 'Раф с добавлением сливок и ванили. Особенно нежный вкус.',
        image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=400&h=400&fit=crop',
        basePrice: 270,
        category: 'Напитки'
      }
    ]
  },
  {
    id: 'drinkit',
    name: 'Drinkit',
    description: 'Кофейня с быстрым сервисом и вкусными сезонными напитками',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop',
    address: 'ул. Ключевская, 15',
    coordinates: [56.8427, 60.6140],
    products: [
      {
        id: 'drinkit-latte',
        name: 'Латте',
        description: 'Латте с идеальной текстурой молока. Бодрящий и мягкий одновременно.',
        image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=400&h=400&fit=crop',
        basePrice: 210,
        category: 'Напитки'
      },
      {
        id: 'drinkit-cappuccino',
        name: 'Капучино',
        description: 'Капучино с плотной пенкой. Классика, которую любит каждый.',
        image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&h=400&fit=crop',
        basePrice: 190,
        category: 'Напитки'
      },
      {
        id: 'drinkit-raf',
        name: 'Раф',
        description: 'Раф с амаретто и корицей. Согревающий и изысканный вкус.',
        image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&h=400&fit=crop',
        basePrice: 260,
        category: 'Напитки'
      }
    ]
  }
];

// Volume options
export const volumeOptions = [
  { id: 'small', name: '0.2л', multiplier: 0.8 },
  { id: 'medium', name: '0.3л', multiplier: 1 },
  { id: 'large', name: '0.4л', multiplier: 1.3 }
];

// Syrup options
export const syrupOptions = [
  { id: 'none', name: 'Без сиропа', price: 0 },
  { id: 'vanilla', name: 'Ваниль', price: 30 },
  { id: 'caramel', name: 'Карамель', price: 30 },
  { id: 'hazelnut', name: 'Лесной орех', price: 30 }
];

// Milk options
export const milkOptions = [
  { id: 'regular', name: 'Обычное', price: 0 },
  { id: 'oat', name: 'Овсяное', price: 50 },
  { id: 'almond', name: 'Миндальное', price: 50 },
  { id: 'coconut', name: 'Кокосовое', price: 50 }
];

// LocalStorage helpers
const FAVORITES_KEY = 'kofein_favorites';

export const getFavorites = (): string[] => {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const addToFavorites = (productId: string): void => {
  const favorites = getFavorites();
  if (!favorites.includes(productId)) {
    favorites.push(productId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
};

export const removeFromFavorites = (productId: string): void => {
  const favorites = getFavorites();
  const filtered = favorites.filter(id => id !== productId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
};

export const isFavorite = (productId: string): boolean => {
  return getFavorites().includes(productId);
};

export const toggleFavorite = (productId: string): boolean => {
  if (isFavorite(productId)) {
    removeFromFavorites(productId);
    return false;
  } else {
    addToFavorites(productId);
    return true;
  }
};
