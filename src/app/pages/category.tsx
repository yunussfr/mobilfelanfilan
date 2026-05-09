import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const CATEGORY_RECIPES: Record<string, any[]> = {
  kahvalti: [
    { id: 7, name: "Sağlıklı Sandviç", image: "https://images.unsplash.com/photo-1771285119294-96a87cd118ab?q=80&w=400" },
    { id: 9, name: "Çırpılmış Yumurta", image: "https://images.unsplash.com/photo-1771285119294-96a87cd118ab?q=80&w=400" },
  ],
  ogle: [
    { id: 1, name: "Gurme Pizza", image: "https://images.unsplash.com/photo-1617119815789-67ed56c65984?q=80&w=400" },
    { id: 2, name: "Kremalı Makarna", image: "https://images.unsplash.com/photo-1622257892554-c162e47a3a5e?q=80&w=400" },
  ],
  // ... rest can be mocked
};

const CATEGORY_NAMES: Record<string, string> = {
  kahvalti: 'Kahvaltı',
  ogle: 'Öğle Yemeği',
  aksam: 'Akşam Yemeği',
  tatli: 'Tatlılar',
  icecek: 'İçecekler',
  atistirmalik: 'Atıştırmalık',
};

export function CategoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const categoryName = id ? CATEGORY_NAMES[id] || 'Kategori' : 'Kategori';
  const recipes = id ? CATEGORY_RECIPES[id] || [] : [];

  return (
    <div className="p-4 bg-[#FFF8F0] min-h-full pb-20">
      <header className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 bg-white rounded-full border-[3px] border-[#1A1A2E] shadow-[3px_3px_0_#1A1A2E] flex items-center justify-center active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0_#1A1A2E]"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-['Righteous'] text-2xl text-[#1A1A2E]">{categoryName}</h1>
      </header>

      {recipes.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {recipes.map((recipe) => (
            <div 
              key={recipe.id}
              onClick={() => navigate(`/recipe/${recipe.id}`)}
              className="bg-white rounded-2xl border-[3px] border-[#1A1A2E] shadow-[6px_6px_0_#1A1A2E] overflow-hidden cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-[4px_4px_0_#1A1A2E]"
            >
              <div className="h-32 w-full border-b-[3px] border-[#1A1A2E]">
                <ImageWithFallback src={recipe.image} alt={recipe.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <h3 className="font-['Nunito'] font-black text-[#1A1A2E] text-sm leading-tight">
                  {recipe.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-2xl border-[3px] border-[#1A1A2E] shadow-[6px_6px_0_#1A1A2E] text-center">
          <p className="font-['Nunito'] font-bold text-[#1A1A2E]">Bu kategoride henüz tarif bulunmuyor.</p>
        </div>
      )}
    </div>
  );
}
