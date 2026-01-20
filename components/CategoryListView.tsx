
import React from 'react';
import { Category, Service } from '../types';
import { SERVICES } from '../constants';

interface CategoryListViewProps {
  category: Category;
  onBack: () => void;
  onSelectService: (service: Service) => void;
}

const CategoryListView: React.FC<CategoryListViewProps> = ({ category, onBack, onSelectService }) => {
  // Filter services that match the category name or fallback to showing similar services if mock data is limited
  const filteredServices = SERVICES.filter(s => s.category === category.name);
  
  // If no specific services found, show some "recommended" services for this view to avoid empty state in demo
  const displayServices = filteredServices.length > 0 ? filteredServices : SERVICES.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F7F9FA] pb-24">
      {/* Header */}
      <div className="bg-white px-5 pt-12 pb-4 flex items-center sticky top-0 z-40 border-b border-gray-50">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-400 active:opacity-60">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="flex-1 text-center font-bold text-gray-800 pr-8">{category.name}</h2>
      </div>

      {/* Hero / Filter Summary */}
      <div className="p-4">
        <div className={`rounded-2xl p-4 flex items-center gap-4 bg-white border border-gray-50 shadow-sm mb-4`}>
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-2xl">
            {category.icon}
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">分类浏览</p>
            <p className="text-[14px] font-black text-gray-800">{category.name}专业护理</p>
          </div>
        </div>

        {/* Service List */}
        <div className="space-y-3">
          {displayServices.map((service) => (
            <div 
              key={service.id} 
              onClick={() => onSelectService(service)}
              className="bg-white p-3 rounded-2xl flex gap-3 border border-gray-50 shadow-sm active:scale-[0.98] transition-transform cursor-pointer"
            >
              <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 shadow-inner">
                <img src={service.imageUrl} alt={service.name} className="w-full h-full object-cover" />
                {service.isHot && (
                  <div className="absolute top-0 left-0 bg-red-500 text-white text-[8px] px-1.5 py-0.5 rounded-br-lg font-black">
                    HOT
                  </div>
                )}
              </div>
              
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <h3 className="text-[14px] font-bold text-gray-800 line-clamp-1">{service.name}</h3>
                  <p className="text-[11px] text-gray-400 line-clamp-2 mt-1 leading-tight">
                    {service.description}
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline text-emerald-600">
                    <span className="text-[10px] font-bold">¥</span>
                    <span className="text-lg font-black ml-0.5">{service.price}</span>
                  </div>
                  <button className="bg-emerald-500 text-white px-4 py-1.5 rounded-lg text-[11px] font-bold shadow-sm active:bg-emerald-600 transition-colors">
                    预约
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="mt-8 text-center px-6">
            <p className="text-[11px] text-gray-300 italic">正在为您匹配更多 {category.name} 相关的专业护士，敬请期待...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryListView;
