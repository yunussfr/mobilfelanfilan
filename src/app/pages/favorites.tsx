import React from 'react';
import { Pin } from 'lucide-react';
import { cn } from '../lib/utils';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const FAVORITES_DATA = [
  { id: 1, name: "Pizza Margherita", image: "https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?q=80&w=400", rotation: "-2deg", size: "small" },
  { id: 2, name: "Berry Smoothie Bowl", image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=400", rotation: "3deg", size: "large" },
  { id: 3, name: "Classic Cheeseburger", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400", rotation: "-1deg", size: "small" },
  { id: 4, name: "Pasta Carbonara", image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=400", rotation: "2deg", size: "small" },
];

export function Favorites() {
  const isEmpty = false;

  if (isEmpty) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-10 text-center">
        <div className="text-8xl mb-6">📌</div>
        <h2 className="font-['Righteous'] text-2xl text-[#1A1A2E] mb-2">Henüz favori yok</h2>
        <p className="font-['Nunito'] font-bold text-[#1A1A2E]/60 mb-8">Yeni tarifler keşfet ve panona iğnele!</p>
        <button className="w-full bg-[#FF6B00] py-4 rounded-[22px] border-3 border-[#1A1A2E] shadow-[4px_4px_0_#1A1A2E] font-['Righteous'] text-white">
          Tarif Keşfet 🚀
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#FFF8F0] p-5 pb-24 relative overflow-hidden">
      {/* Cork-board Dot Grid */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1A1A2E 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

      <h1 className="font-['Righteous'] text-2xl text-[#1A1A2E] mb-8 relative z-10">Pinboard</h1>

      <div className="grid grid-cols-2 gap-x-4 gap-y-10 relative z-10">
        {FAVORITES_DATA.map((fav, idx) => (
          <div 
            key={fav.id}
            className={cn(
              "bg-white border-2 border-gray-200 shadow-xl p-2 relative",
              fav.size === 'large' ? "col-span-2" : "col-span-1"
            )}
            style={{ transform: `rotate(${fav.rotation})` }}
          >
            {/* Pushpin */}
            <div className="absolute top-[-15px] left-1/2 -translate-x-1/2 text-[#FF1744] drop-shadow-md">
              <Pin size={32} fill="currentColor" strokeWidth={1} />
            </div>

            <div className={cn(
              "overflow-hidden border border-gray-100",
              fav.size === 'large' ? "h-[200px]" : "h-[120px]"
            )}>
              <ImageWithFallback 
                src={fav.image} 
                alt={fav.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="pt-3 pb-1">
              <h3 className="font-['Righteous'] text-[#1A1A2E] text-xs truncate">{fav.name}</h3>
              <div className="flex gap-1 mt-1">
                <span className="text-[8px] bg-[#FF6B00]/10 text-[#FF6B00] px-1.5 py-0.5 rounded-full font-black">Mutfak</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
