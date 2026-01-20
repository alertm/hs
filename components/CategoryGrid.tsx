
import React from 'react';
import { CATEGORIES } from '../constants';
import { Category } from '../types';

interface CategoryGridProps {
  onSelectCategory: (category: Category) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ onSelectCategory }) => {
  const vibrantColors: Record<string, string> = {
    'bg-emerald-100': 'bg-[#E6F9F3] text-emerald-600',
    'bg-green-100': 'bg-[#F0FDF4] text-green-600',
    'bg-emerald-50': 'bg-[#FFFBEB] text-amber-600',
    'bg-green-50': 'bg-[#FDF2F8] text-pink-600',
    'bg-teal-100': 'bg-[#F0F9FF] text-blue-600',
    'bg-gray-100': 'bg-gray-50 text-gray-500'
  };

  return (
    <div className="px-4 py-3">
      <div className="grid grid-cols-4 gap-y-5 px-1 py-5 bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-50">
        {CATEGORIES.map((cat) => (
          <div 
            key={cat.id} 
            onClick={() => onSelectCategory(cat)}
            className="flex flex-col items-center group cursor-pointer active:opacity-70"
          >
            <div className={`w-12 h-12 ${vibrantColors[cat.color] || cat.color} rounded-lg flex items-center justify-center text-xl mb-1.5 border border-white transition-transform group-active:scale-90`}>
              {cat.icon}
            </div>
            <span className="text-[11px] text-gray-600 font-bold">{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
