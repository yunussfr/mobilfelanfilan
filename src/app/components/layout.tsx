import React from 'react';
import { Outlet, NavLink } from 'react-router';
import { Home, Book, Utensils, User, MessageSquare } from 'lucide-react';
import { cn } from '../lib/utils';

export function Layout() {
  return (
    <div className="flex flex-col h-screen w-full max-w-[375px] mx-auto bg-[#FFF8F0] overflow-hidden relative border-x border-[#1A1A2E]">
      {/* Decorative Organic Background Motifs */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] overflow-hidden">
        <div className="absolute top-10 left-5 rotate-12 scale-150 text-[#1A1A2E]">🍃</div>
        <div className="absolute top-40 right-10 -rotate-45 scale-125 text-[#1A1A2E]">🍎</div>
        <div className="absolute bottom-60 left-20 rotate-90 scale-150 text-[#1A1A2E]">🌿</div>
        <div className="absolute bottom-20 right-5 -rotate-12 scale-110 text-[#1A1A2E]">🍋</div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto z-10 scrollbar-hide">
        <Outlet />
      </main>

      {/* Navigation Bar */}
      <nav className="z-20 bg-[#FFF8F0] border-t-[3px] border-[#1A1A2E] px-2 py-2 flex justify-around items-center h-[75px]">
        <NavItem to="/" icon={<Home size={22} />} label="Keşfet" />
        <NavItem to="/my-recipes" icon={<Utensils size={22} />} label="Tariflerim" />
        <NavItem to="/my-comments" icon={<MessageSquare size={22} />} label="Yorumlar" />
        <NavItem to="/notebook" icon={<Book size={22} />} label="Defterim" />
        <NavItem to="/profile" icon={<User size={22} />} label="Profil" />
      </nav>
    </div>
  );
}

function NavItem({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex flex-col items-center justify-center transition-all duration-200 gap-1",
          isActive ? "text-brand scale-110" : "text-[#1A1A2E]"
        )
      }
    >
      {icon}
      <span className="text-[10px] font-black font-['Nunito']">{label}</span>
    </NavLink>
  );
}
