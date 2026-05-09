import { Recipe, Comment } from "./types";

const DISH_TYPES = [
  { name: "Tavuk", emoji: "🍗", keywords: ["chicken"], photoIds: ['1567620832903-9fc6debc209f', '1598515214231-83d519b81201', '1632778149955-e80f8ce9a495'] },
  { name: "Et", emoji: "🥩", keywords: ["meat", "beef"], photoIds: ['1544025162-d76694265947', '1603048588665-791ca8aea617', '1607623814075-e4522b41548a'] },
  { name: "Makarna", emoji: "🍝", keywords: ["pasta"], photoIds: ['1473093226795-af9932fe5856', '1645112481338-3560e7f91572', '1551183053-bf91a1d81141'] },
  { name: "Salata", emoji: "🥗", keywords: ["salad"], photoIds: ['1512621776951-a57141f2eefd', '1546069901-ba9599a7e63c', '1540189549336-e6e99c3679fe'] },
  { name: "Tatlı", emoji: "🍰", keywords: ["dessert"], photoIds: ['1565958011703-44f9829ba187', '1551024601-bec78aea704b', '1587314168485-3236d6710bb1'] },
  { name: "Çorba", emoji: "🥣", keywords: ["soup"], photoIds: ['1547592166-d3ba8f7131d5', '1602964290726-24e50708f5cc', '1553163147-621aa101dff2'] },
  { name: "Deniz Ürünü", emoji: "🐟", keywords: ["seafood"], photoIds: ['1467003909585-2f8a72700288', '1519708227418-c8fd9a32b7a2', '1499125504711-519799bad187'] },
  { name: "Pizza", emoji: "🍕", keywords: ["pizza"], photoIds: ['1565299624-897d1740d02b', '1513104890138-7c749659a591', '1593560708920-61dd98c46a4e'] },
  { name: "Burger", emoji: "🍔", keywords: ["burger"], photoIds: ['1490645935967-10de6ba17051', '1568901346375-23c9450c58cd', '1571091723234-1051fffe69c2'] },
  { name: "Kahvaltı", emoji: "🍳", keywords: ["breakfast"], photoIds: ['1482049016688-2d3e1b311543', '1498837167922-ddd27525d352', '1533089860892-a7c6f0a88666'] },
  { name: "İçecek", emoji: "🍹", keywords: ["drink"], photoIds: ['1499638673619-89c672421ff9', '1513558161293-cdaf765ed2fd', '1544145945-f904253744ff'] },
  { name: "Sebze", emoji: "🥦", keywords: ["vegetable"], photoIds: ['1493770348161-369560ae357d', '1543339308-43e59d6b73a6', '1543339308-43e59d6b73a6'] }
];

const ADJECTIVES = ["Baharatlı", "Soslu", "Fırında", "Izgara", "Çıtır", "Hafif", "Geleneksel", "Modern", "Hızlı", "Gurme", "Ekonomik", "Sağlıklı"];
const AUTHORS = ["Chef Ali", "Anne Mutfağı", "Denizden Taze", "HealthLife", "Gurme Selin", "Mutfak Sırları", "Lezzet Avcısı", "Ege Esintisi"];

const generateRecipes = (count: number): Recipe[] => {
  const recipes: Recipe[] = [];
  
  for (let i = 0; i < count; i++) {
    const dishType = DISH_TYPES[i % DISH_TYPES.length];
    const adjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
    const author = AUTHORS[Math.floor(Math.random() * AUTHORS.length)];
    const photoId = dishType.photoIds[i % dishType.photoIds.length];
    
    const title = `${adjective} ${dishType.name} ${i > 20 ? i : ''}`;
    
    recipes.push({
      id: `gen-${i}`,
      title: title.trim(),
      image: `https://images.unsplash.com/photo-${photoId}?q=80&w=800&auto=format&fit=crop`,
      time: `${10 + (i % 5) * 10} dk`,
      servings: `${1 + (i % 4)} kişi`,
      difficulty: ["Kolay", "Orta", "Zor"][i % 3],
      calories: `${200 + (i % 10) * 50} kcal`,
      ingredients: [
        { name: dishType.name, amount: "500g" },
        { name: "Zeytinyağı", amount: "2 yk" },
        { name: "Tuz", amount: "1 çk" },
        { name: "Baharatlar", amount: "İstediğiniz kadar" }
      ],
      steps: [
        `${dishType.name} hazırlayın ve temizleyin.`,
        `${adjective} sosu hazırlayın.`,
        "Tüm malzemeleri karıştırın.",
        "İstediğiniz kıvama gelene kadar pişirin."
      ],
      isPublic: true,
      author: author
    });
  }
  
  return recipes;
};

const INITIAL_RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Baharatlı Tavuk Kanat',
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=800',
    youtubeUrl: 'https://www.youtube.com/watch?v=BDVg0u2YQqs',
    time: '35 dk',
    servings: '4 kişi',
    difficulty: 'Kolay',
    calories: '450 kcal',
    ingredients: [
      { name: 'Tavuk Kanat', amount: '1 kg' },
      { name: 'Zeytinyağı', amount: '3 yk' },
      { name: 'Toz Kırmızı Biber', amount: '2 tatlı kaşığı' },
      { name: 'Sarımsak Tozu', amount: '1 tatlı kaşığı' },
      { name: 'Tuz & Karabiber', amount: 'İstediğiniz kadar' },
      { name: 'Bal', amount: '1 yk' },
    ],
    steps: [
      'Tavuk kanatlarını yıkayıp kurulayın.',
      'Büyük bir kapta zeytinyağı, baharatlar ve balı karıştırın.',
      'Kanatları sosla iyice harmanlayın ve 30 dakika dinlendirin.',
      '200 derece fırında 25-30 dakika çıtırlaşana kadar pişirin.',
    ],
    isPublic: true,
    author: 'Chef Ali',
  },
  {
    id: '2',
    title: 'Mantar Soslu Fettuccine',
    image: 'https://images.unsplash.com/photo-1645112481338-3560e7f91572?q=80&w=800',
    youtubeUrl: 'https://youtu.be/wdUpTqd807w',
    time: '25 dk',
    servings: '2 kişi',
    difficulty: 'Orta',
    calories: '550 kcal',
    ingredients: [
      { name: 'Fettuccine', amount: '250g' },
      { name: 'Kültür Mantarı', amount: '200g' },
      { name: 'Krema', amount: '200ml' },
      { name: 'Sarımsak', amount: '2 diş' },
    ],
    steps: [
      'Makarnayı bol tuzlu suda haşlayın.',
      'Mantarları dilimleyip suyunu salıp çekene kadar soteleyin.',
      'Krema ve dövülmüş sarımsağı ekleyip koyulaşana kadar pişirin.',
      'Makarna ile sosu birleştirip servis yapın.'
    ],
    isPublic: true,
    author: 'Gurme Selin'
  },
  {
    id: '3',
    title: 'Kuzu Pirzola Izgara',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800',
    time: '20 dk',
    servings: '2 kişi',
    difficulty: 'Orta',
    calories: '600 kcal',
    ingredients: [
      { name: 'Kuzu Pirzola', amount: '6 adet' },
      { name: 'Biberiye', amount: '2 dal' },
      { name: 'Taze Kekik', amount: '1 dal' },
      { name: 'Tereyağı', amount: '1 yk' }
    ],
    steps: [
      'Etleri oda sıcaklığına getirin.',
      'Döküm tavayı iyice ısıtın.',
      'Pirzolaları her iki yüzü mühürlenene kadar 3-4 dakika pişirin.',
      'Tereyağı ve baharatları ekleyip kaşıkla üzerine gezdirin.'
    ],
    isPublic: true,
    author: 'Et Ustası'
  }
];

export const SEED_RECIPES: Recipe[] = [
  ...INITIAL_RECIPES,
  ...generateRecipes(997)
];

export const SEED_COMMENTS_INITIAL: Comment[] = [
  {
    id: 'seed1',
    recipeId: '1',
    recipeTitle: 'Baharatlı Tavuk Kanat',
    text: 'Müthiş bir tarif! Ailemin favorisi oldu, her hafta yapıyoruz.',
    date: '28.04.2026',
    rating: 5,
    author: 'ayse_mutfak',
  },
  {
    id: 'seed2',
    recipeId: '1',
    recipeTitle: 'Baharatlı Tavuk Kanat',
    text: 'Baharatları biraz fazla koydum ama yine de lezzetliydi 😄 Kesinlikle tavsiye ederim.',
    date: '30.04.2026',
    rating: 4,
    author: 'mehmet_chef',
  },
  {
    id: 'seed3',
    recipeId: '1',
    recipeTitle: 'Baharatlı Tavuk Kanat',
    text: 'Fırında 30 dakika tam tutunca çıtır çıtır oldu. Harika!',
    date: '02.05.2026',
    rating: 5,
    author: 'zeynep_y',
  },
];

export const FULL_CATEGORIES = [
  { id: 'kahvalti', name: 'Kahvaltı', emoji: '🍳', color: '#FFE0B2' },
  { id: 'ana-yemek', name: 'Ana Yemek', emoji: '🍝', color: '#FFCDD2' },
  { id: 'ogle', name: 'Öğle Yemeği', emoji: '🍱', color: '#C8E6C9' },
  { id: 'aksam', name: 'Akşam Yemeği', emoji: '🥩', color: '#F8BBD0' },
  { id: 'tatli', name: 'Tatlılar', emoji: '🍰', color: '#D1C4E9' },
  { id: 'icecek', name: 'İçecekler', emoji: '🍹', color: '#B3E5FC' },
  { id: 'atistirmalik', name: 'Atıştırmalık', emoji: '🍿', color: '#FFCCBC' },
  { id: 'vejetaryen', name: 'Vejetaryen', emoji: '🥦', color: '#DCEDC8' },
  { id: 'deniz-urunleri', name: 'Deniz Ürünleri', emoji: '🐟', color: '#B2EBF2' },
  { id: 'hamur-isleri', name: 'Hamur İşleri', emoji: '🥐', color: '#F5F5F5' },
];
