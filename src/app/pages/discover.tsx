import React, { useState, useMemo, forwardRef } from 'react';
import { motion as Motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { Search, User, ChevronRight, Bookmark, Clock as ClockIcon, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { cn } from '../lib/utils';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useData } from '../contexts/DataContext';
import { FULL_CATEGORIES } from '../lib/seed-data';

export function Discover() {
  const navigate = useNavigate();
  const { recipes, addToNotebook } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  // Swipe Logic
  const [currentIndex, setCurrentIndex] = useState(0);
  const swipeRecipes = useMemo(() => recipes.filter(r => r.isPublic), [recipes]);
  
  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      const recipe = swipeRecipes[currentIndex];
      if (recipe) addToNotebook(recipe.id, 'Genel');
    }
    setCurrentIndex(prev => prev + 1);
  };

  const popularRecipes = useMemo(() => recipes.slice(0, 15), [recipes]);
  const newRecipes = useMemo(() => recipes.slice(15, 30), [recipes]);

  return (
    <div className="flex flex-col min-h-full bg-[#FFF8F0] pb-24">
      {/* Header & Search */}
      <div className="sticky top-0 z-50 bg-[#FFF8F0] border-b-[3px] border-[#1A1A2E] px-4 py-4 space-y-4 shadow-sm">
        <header className="flex items-center justify-between">
          <Link 
            to="/profile"
            className="w-10 h-10 rounded-full bg-[#FFD600] border-[3px] border-[#1A1A2E] shadow-[3px_3px_0_#1A1A2E] flex items-center justify-center text-[#1A1A2E] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0_#1A1A2E]"
          >
            <User size={20} strokeWidth={3} />
          </Link>
          
          <h1 className="font-['Righteous'] text-2xl text-[#1A1A2E] flex items-center gap-1">
            <span className="text-[#FF6B00]">LEZZET</span>
            <span className="bg-[#FF6B00] text-white px-2 py-0.5 rounded-lg border-2 border-[#1A1A2E] shadow-[2px_2px_0_#1A1A2E] -rotate-2">TAT</span>
          </h1>

          <div className="bg-[#FF6B00] text-white font-black px-3 py-1 rounded-full text-xs border-[3px] border-[#1A1A2E] shadow-[3px_3px_0_#1A1A2E]">
            {recipes.length}
          </div>
        </header>

        <div className="relative">
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="lezzettat'ta ara..."
            className="w-full bg-white border-[3px] border-[#1A1A2E] shadow-[5px_5px_0_#1A1A2E] rounded-2xl py-3 px-12 font-['Nunito'] font-bold text-[#1A1A2E] placeholder:italic placeholder:text-[#1A1A2E]/50 focus:outline-none focus:shadow-[3px_3px_0_#1A1A2E] focus:ring-4 focus:ring-[#FF6B00]/20 transition-all"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A2E]" size={20} strokeWidth={3} />
        </div>
      </div>

      {/* Hero Swipe Area */}
      <div className="px-4 mt-8 h-[380px] relative">
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="font-['Righteous'] text-xl text-[#1A1A2E] uppercase italic flex items-center gap-2">
            <Sparkles className="text-[#FFD600]" size={24} fill="#FFD600" /> Keşfet
          </h2>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i, idx) => (
              <div key={i} className={cn("w-2 h-2 rounded-full border border-[#1A1A2E]", (currentIndex % 5) === idx ? "bg-[#FF6B00]" : "bg-[#1A1A2E]/10")} />
            ))}
          </div>
        </div>

        <div className="relative h-full perspective-1000">
          <AnimatePresence mode="popLayout">
            {currentIndex < swipeRecipes.length ? (
              <SwipeCard 
                key={swipeRecipes[currentIndex].id}
                recipe={swipeRecipes[currentIndex]}
                onSwipe={handleSwipe}
              />
            ) : (
              <div className="w-full h-full rounded-[28px] border-[3px] border-dashed border-[#1A1A2E]/20 flex flex-col items-center justify-center bg-white/50">
                <p className="font-['Righteous'] text-[#1A1A2E]/40 text-center px-10">
                  Bugünlük bu kadar! Yarın yeni tariflerle buradayız.
                </p>
                <button 
                  onClick={() => setCurrentIndex(0)}
                  className="mt-4 font-['Nunito'] font-black text-[#FF6B00] underline"
                >
                  Tekrar Göz At
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-14 px-4">
        <RecipeSection 
          title="Popüler" 
          recipes={popularRecipes} 
          isExpanded={expandedSection === 'Popüler'}
          onToggleExpand={() => setExpandedSection(expandedSection === 'Popüler' ? null : 'Popüler')}
        />
      </div>

      <div className="mt-8 px-4">
        <RecipeSection 
          title="Yeni Tarifler" 
          recipes={newRecipes} 
          isExpanded={expandedSection === 'Yeni Tarifler'}
          onToggleExpand={() => setExpandedSection(expandedSection === 'Yeni Tarifler' ? null : 'Yeni Tarifler')}
        />
      </div>

      {/* Categories Grid at the bottom */}
      <div className="px-4 mt-12 mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-['Righteous'] text-2xl text-[#1A1A2E] border-b-4 border-[#FF6B00] pb-1">Kategoriler</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {FULL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigate(`/category/${cat.id}`)}
              className="flex items-center gap-3 p-3 bg-white border-[3px] border-[#1A1A2E] shadow-[4px_4px_0_#1A1A2E] rounded-2xl active:translate-x-1 active:translate-y-1 active:shadow-none transition-all group"
            >
              <div 
                style={{ backgroundColor: cat.color }}
                className="w-12 h-12 rounded-xl border-2 border-[#1A1A2E] flex items-center justify-center text-xl group-hover:rotate-12 transition-transform"
              >
                {cat.emoji}
              </div>
              <span className="font-['Nunito'] font-black text-sm text-[#1A1A2E] uppercase tracking-tight">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

interface SwipeCardProps {
  recipe: any;
  onSwipe: (dir: 'left' | 'right') => void;
}

const SwipeCard = forwardRef<HTMLDivElement, SwipeCardProps>(({ recipe, onSwipe }, ref) => {
  const navigate = useNavigate();
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-30, 30]);
  const opacity = useTransform(x, [-250, -150, 0, 150, 250], [0, 1, 1, 1, 0]);
  
  const passOpacity = useTransform(x, [-120, -60], [1, 0]);
  const saveOpacity = useTransform(x, [60, 120], [0, 1]);

  return (
    <Motion.div
      ref={ref}
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={(_, info) => {
        if (info.offset.x > 120) onSwipe('right');
        else if (info.offset.x < -120) onSwipe('left');
      }}
      className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-30"
    >
      <div 
        onClick={() => {
          if (Math.abs(x.get()) < 5) {
            navigate(`/recipe/${recipe.id}`);
          }
        }}
        className="relative w-full h-full rounded-[32px] border-[4px] border-[#1A1A2E] shadow-[10px_10px_0_#1A1A2E] overflow-hidden bg-white group"
      >
        <ImageWithFallback 
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full h-full object-cover pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E] via-[#1A1A2E]/20 to-transparent pointer-events-none" />
        
        <Motion.div style={{ opacity: passOpacity }} className="absolute top-10 left-6 -rotate-12 bg-[#FF1744] border-[3px] border-[#1A1A2E] px-4 py-1 rounded-xl shadow-[4px_4px_0_#1A1A2E] pointer-events-none">
          <span className="font-['Righteous'] text-white text-xl uppercase italic">Geç</span>
        </Motion.div>
        <Motion.div style={{ opacity: saveOpacity }} className="absolute top-10 right-6 rotate-12 bg-[#00C853] border-[3px] border-[#1A1A2E] px-4 py-1 rounded-xl shadow-[4px_4px_0_#1A1A2E] pointer-events-none">
          <span className="font-['Righteous'] text-white text-xl uppercase italic">Kaydet</span>
        </Motion.div>

        <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
          <div className="flex gap-2 mb-3">
            <span className="bg-white/20 backdrop-blur-md border border-white/30 px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-wider">
              {recipe.difficulty}
            </span>
            <span className="bg-white/20 backdrop-blur-md border border-white/30 px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-wider">
              {recipe.time}
            </span>
          </div>
          <h3 className="font-['Righteous'] text-2xl text-white drop-shadow-[2px_2px_0_#1A1A2E] leading-tight">
            {recipe.title}
          </h3>
          <p className="font-['Nunito'] text-sm text-white/70 font-bold mt-1">
            Chef: {recipe.author}
          </p>
        </div>
      </div>
    </Motion.div>
  );
});

SwipeCard.displayName = 'SwipeCard';

RecipeSection.displayName = 'RecipeSection';

function RecipeSection({ 
  title, 
  recipes, 
  isExpanded, 
  onToggleExpand 
}: { 
  title: string, 
  recipes: any[], 
  isExpanded: boolean, 
  onToggleExpand: () => void 
}) {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-['Righteous'] text-xl text-[#1A1A2E] uppercase italic flex items-center gap-2">
          <span className="w-1.5 h-5 bg-[#FFD600] block" /> {title}
        </h2>
        <button 
          onClick={onToggleExpand}
          className="text-[#FF6B00] font-black text-xs uppercase tracking-wider flex items-center gap-1 active:scale-95 transition-transform"
        >
          {isExpanded ? 'Kapat' : 'Tümü'} <ChevronRight size={14} strokeWidth={4} className={cn("transition-transform", isExpanded && "rotate-90")} />
        </button>
      </div>

      {isExpanded ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-4 duration-300">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} onClick={() => navigate(`/recipe/${recipe.id}`)} />
          ))}
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-6 snap-x no-scrollbar -mx-4 px-4 scroll-smooth">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="min-w-[200px] snap-start first:ml-0 last:mr-0">
              <RecipeCard recipe={recipe} onClick={() => navigate(`/recipe/${recipe.id}`)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function RecipeCard({ recipe, onClick }: { recipe: any, onClick: () => void }) {
  return (
    <Motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="w-full bg-white rounded-2xl border-[3px] border-[#1A1A2E] shadow-[6px_6px_0_#1A1A2E] overflow-hidden cursor-pointer active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
    >
      <div className="h-32 w-full border-b-[3px] border-[#1A1A2E] relative">
        <ImageWithFallback 
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm border-2 border-[#1A1A2E] px-2 py-0.5 rounded-lg">
          <span className="text-[10px] font-black text-[#1A1A2E]">{recipe.time}</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-['Righteous'] text-sm text-[#1A1A2E] leading-tight mb-3 line-clamp-2 h-10">
          {recipe.title}
        </h3>
        <div className="flex justify-between items-center text-[10px] font-black text-[#1A1A2E]/50 uppercase">
          <span className="flex items-center gap-1"><User size={12} /> {recipe.author.split(' ')[0]}</span>
          <span className="bg-[#FF6B00]/10 text-[#FF6B00] px-2 py-0.5 rounded border-2 border-[#FF6B00]/30">{recipe.difficulty}</span>
        </div>
      </div>
    </Motion.div>
  );
}
