import React, { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { cn } from '../lib/utils';

const POPULAR_SEARCHES = [
  { text: "Makarna", color: "#FF6B00", size: "16px" },
  { text: "Burger", color: "#00C853", size: "14px" },
  { text: "Salata", color: "#FF1744", size: "12px" },
  { text: "Sushi", color: "#00BCD4", size: "15px" },
  { text: "Kek", color: "#7C4DFF", size: "13px" },
  { text: "Çorba", color: "#FF9A3C", size: "14px" },
];

const CUISINES = [
  { name: "British", count: 59 },
  { name: "Spanish", count: 48 },
  { name: "Turkish", count: 30 },
  { name: "French", count: 28 },
  { name: "Italian", count: 25 },
  { name: "Mexican", count: 20 },
  { name: "Chinese", count: 18 },
  { name: "Indian", count: 15 },
];

export function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCuisines, setActiveCuisines] = useState<string[]>(["Turkish"]);

  const toggleCuisine = (name: string) => {
    setActiveCuisines(prev => 
      prev.includes(name) ? prev.filter(c => c !== name) : [...prev, name]
    );
  };

  return (
    <div className="p-5 pb-24">
      <h1 className="font-['Righteous'] text-2xl text-[#1A1A2E] mb-6">Tarif Ara</h1>

      {/* Search Bar */}
      <div className="relative mb-8">
        <input 
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tarif, malzeme veya mutfak ara..."
          className="w-full bg-white h-14 pl-12 pr-4 rounded-full border-[3px] border-[#1A1A2E] focus:outline-none focus:ring-4 focus:ring-[#FF6B00]/30 font-['Nunito'] font-bold text-[#1A1A2E]"
        />
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A2E]" size={20} />
      </div>

      {/* Popular Searches Tag Cloud */}
      <section className="mb-8">
        <h3 className="font-['Righteous'] text-[#1A1A2E] text-base mb-4">Popüler Aramalar</h3>
        <div className="flex flex-wrap gap-3">
          {POPULAR_SEARCHES.map((tag) => (
            <button
              key={tag.text}
              className="px-4 py-2 rounded-full border-2 border-[#1A1A2E] shadow-[2px_2px_0_#1A1A2E] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0_#1A1A2E] font-['Nunito'] font-black"
              style={{ 
                backgroundColor: tag.color + '20', 
                color: tag.color,
                fontSize: tag.size
              }}
            >
              {tag.text}
            </button>
          ))}
        </div>
      </section>

      {/* Cuisine Filter */}
      <section className="mb-8">
        <h3 className="font-['Righteous'] text-[#1A1A2E] text-base mb-4">Mutfak Türleri</h3>
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide -mx-5 px-5">
          {CUISINES.map((cuisine) => {
            const isActive = activeCuisines.includes(cuisine.name);
            return (
              <button
                key={cuisine.name}
                onClick={() => toggleCuisine(cuisine.name)}
                className={cn(
                  "flex-shrink-0 px-4 py-2 rounded-full border-2 border-[#1A1A2E] font-['Nunito'] font-black transition-all",
                  isActive 
                    ? "bg-[#FF6B00] text-white shadow-[3px_3px_0_#1A1A2E]" 
                    : "bg-white text-[#1A1A2E]"
                )}
              >
                {cuisine.name} <span className="opacity-60 text-[10px] ml-1">{cuisine.count}</span>
              </button>
            );
          })}
          <button className="flex-shrink-0 px-4 py-2 rounded-full border-2 border-[#1A1A2E] bg-white text-[#1A1A2E] font-['Nunito'] font-black">
            + 29 daha
          </button>
        </div>
      </section>

      <div className="flex justify-between items-center mb-6">
        <p className="font-['Nunito'] font-black text-[#1A1A2E]">
          <span className="text-[#FF6B00]">248</span> tarif bulundu
        </p>
        <button className="text-xs font-black text-[#FF1744] underline">Temizle</button>
      </div>
    </div>
  );
}
