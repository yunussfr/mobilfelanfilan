import React, { useState } from 'react';
import { motion as Motion } from 'motion/react';
import { cn } from '../lib/utils';

const INGREDIENTS = [
  "Domates", "Sarımsak", "Tavuk", "Limon", 
  "Soğan", "Zeytinyağı", "Un", "Yumurta"
];

const MOCK_RESULTS = [
  { name: "Sarımsaklı Limonlu Tavuk", matched: 3, total: 5, percentage: 60 },
  { name: "Pratik Domates Çorbası", matched: 2, total: 4, percentage: 50 },
];

export function AIChef() {
  const [selected, setSelected] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const toggleIngredient = (name: string) => {
    setSelected(prev => 
      prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]
    );
  };

  return (
    <div className="min-h-full bg-[#1A1A2E] p-5 pb-24">
      <div className="flex items-center gap-4 mb-8">
        {/* Robot Mascot */}
        <Motion.div 
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[72px] h-[72px] bg-[#FF6B00] rounded-[18px] border-[3px] border-white shadow-[4px_4px_0_white] flex items-center justify-center text-4xl relative"
        >
          🤖
          <span className="absolute -top-3 -right-3 text-2xl">👨‍🍳</span>
        </Motion.div>

        {/* Speech Bubble */}
        <div className="flex-1 bg-white rounded-2xl p-4 border-[3px] border-[#FF6B00] relative">
          <p className="font-['Nunito'] font-black text-[#1A1A2E] text-sm">
            Elindeki malzemeleri seç, sana tarif bulayım!
          </p>
          <div className="absolute left-[-10px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[10px] border-r-white" />
        </div>
      </div>

      {/* Ingredient Selection */}
      <div className="flex flex-wrap gap-3 mb-8">
        {INGREDIENTS.map((item) => {
          const isSelected = selected.includes(item);
          return (
            <Motion.button
              key={item}
              whileTap={{ scale: 0.95 }}
              animate={isSelected ? { scale: 1.1 } : { scale: 1 }}
              onClick={() => toggleIngredient(item)}
              className={cn(
                "px-4 py-2 rounded-full border-[3px] font-['Nunito'] font-black transition-colors duration-200",
                isSelected 
                  ? "bg-[#FF6B00] border-[#1A1A2E] text-white shadow-[3px_3px_0_#1A1A2E]" 
                  : "bg-transparent border-[#44445e] text-[#44445e]"
              )}
            >
              {item}
            </Motion.button>
          );
        })}
      </div>

      <div className="mb-6 flex justify-between items-center">
        <span className="bg-[#FF6B00] text-white px-3 py-1 rounded-full text-xs font-black border-2 border-white">
          {selected.length} malzeme seçildi
        </span>
      </div>

      <button 
        onClick={() => setShowResults(true)}
        className="w-full bg-[#FF6B00] py-4 rounded-[22px] border-[3px] border-white shadow-[5px_5px_0_white] font-['Righteous'] text-white text-lg mb-8 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_white]"
      >
        Tarif Bul ✨
      </button>

      {/* Results */}
      {showResults && (
        <div className="flex flex-col gap-4">
          {MOCK_RESULTS.map((recipe) => (
            <div key={recipe.name} className="bg-white rounded-2xl border-[3px] border-[#FF6B00] p-4 shadow-[4px_4px_0_#FF6B00]">
              <h4 className="font-['Righteous'] text-[#1A1A2E] text-base mb-2">{recipe.name}</h4>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-black text-[#666]">{recipe.matched}/{recipe.total} malzeme eşleşti</span>
                <span className="text-xs font-black text-[#00C853]">{recipe.percentage}%</span>
              </div>
              <div className="w-full h-3 bg-[#f0f0f0] rounded-full overflow-hidden border-2 border-[#1A1A2E]">
                <div 
                  className="h-full bg-[#00C853]" 
                  style={{ width: `${recipe.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
