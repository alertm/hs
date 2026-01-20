
import React from 'react';
import { Service } from '../types';

interface PopularRecommendationsProps {
  services: Service[];
  onSelectService: (service: Service) => void;
}

const PopularRecommendations: React.FC<PopularRecommendationsProps> = ({ services, onSelectService }) => {
  return (
    <div className="mt-6 mb-2">
      <div className="px-5 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-4 bg-emerald-500 rounded-full"></div>
          <h2 className="text-base font-bold text-gray-800">热门推荐</h2>
        </div>
      </div>

      <div className="flex overflow-x-auto no-scrollbar gap-4 px-5 pb-4">
        {services.map((service) => (
          <div 
            key={service.id}
            onClick={() => onSelectService(service)}
            className="w-[280px] shrink-0 bg-white rounded-2xl overflow-hidden border border-gray-50 shadow-sm active:scale-[0.98] transition-transform cursor-pointer"
          >
            <div className="relative h-32">
              <img src={service.imageUrl} alt={service.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-white font-bold flex items-center gap-1">
                ⭐ {service.rating}
              </div>
            </div>
            
            <div className="p-3">
              <h3 className="text-sm font-bold text-gray-800 line-clamp-1 mb-1">{service.name}</h3>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] text-gray-400 flex items-center gap-0.5">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth={2}/></svg>
                  {service.duration}
                </span>
                <span className="w-px h-2 bg-gray-100"></span>
                <span className="text-[10px] text-emerald-600 font-bold">平均 4.9+ 高分护士</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-baseline text-emerald-600">
                  <span className="text-[10px] font-bold">¥</span>
                  <span className="text-lg font-black ml-0.5">{service.price}</span>
                </div>
                <button className="bg-emerald-50 hover:bg-emerald-500 text-emerald-600 hover:text-white px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all">
                  预约
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularRecommendations;
