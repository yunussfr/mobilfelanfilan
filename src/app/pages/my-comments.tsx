import React from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Calendar, ChevronRight, Plus } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const DAYS = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];

export function MyComments() {
  const navigate = useNavigate();
  const { weeklyPlan } = useData();

  return (
    <div className="min-h-full pb-24 bg-[#FFF8F0]">
      {/* Header */}
      <div className="p-5 flex items-center gap-4 bg-white border-b-4 border-[#1A1A2E]">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full border-[3px] border-[#1A1A2E] flex items-center justify-center bg-white shadow-[3px_3px_0_#1A1A2E] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0_#1A1A2E] transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-2">
          <div className="p-2 bg-[#FFD600] border-2 border-[#1A1A2E] rounded-lg rotate-3 shadow-[3px_3px_0_#1A1A2E]">
            <Calendar size={18} />
          </div>
          <h1 className="font-['Righteous'] text-2xl text-[#1A1A2E]">Haftalık Planım</h1>
        </div>
      </div>

      <div className="p-5 space-y-3">
        {DAYS.map((day, idx) => {
          const colors = ['#FF6B00', '#E83F6F', '#00C853', '#0091FF', '#FFD600', '#8B5CF6', '#F43F5E'];
          const color = colors[idx % colors.length];
          const isPlanned = !!weeklyPlan[day];

          return (
            <div
              key={day}
              className={`bg-white border-[3px] border-[#1A1A2E] rounded-xl p-3 flex justify-between items-center shadow-[4px_4px_0_#1A1A2E] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_#1A1A2E] transition-all cursor-pointer group`}
              onClick={() => !isPlanned && navigate('/')}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-2 h-10 rounded-full border-2 border-[#1A1A2E]"
                  style={{ backgroundColor: color }}
                />
                <div>
                  <span className="text-[10px] font-black uppercase text-[#1A1A2E]/40 block mb-0.5">{day}</span>
                  {isPlanned ? (
                    <span className="font-['Righteous'] text-[#1A1A2E] group-hover:text-[#FF6B00] transition-colors">
                      {weeklyPlan[day]?.recipeTitle}
                    </span>
                  ) : (
                    <span className="font-['Nunito'] font-bold text-[#1A1A2E]/30 italic text-sm">Bugün ne pişiriyoruz?</span>
                  )}
                </div>
              </div>
              {isPlanned ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/recipe/${weeklyPlan[day]?.recipeId}`);
                  }}
                  className="w-10 h-10 rounded-xl bg-white border-2 border-[#1A1A2E] flex items-center justify-center text-[#1A1A2E] hover:bg-[#FFD600] transition-colors shadow-[2px_2px_0_#1A1A2E]"
                >
                  <ChevronRight size={18} />
                </button>
              ) : (
                <button className="w-10 h-10 rounded-xl bg-[#FFF8F0] border-2 border-[#1A1A2E] border-dashed flex items-center justify-center text-[#1A1A2E]/20">
                  <Plus size={18} />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
