
import React, { useState } from 'react';
import { SERVICE_TABS, SERVICES } from '../constants';
import { Service } from '../types';

interface ServiceTabsProps {
  onSelectService: (service: Service) => void;
}

const ServiceTabs: React.FC<ServiceTabsProps> = ({ onSelectService }) => {
  const [activeTab, setActiveTab] = useState(SERVICE_TABS[0]);

  const filteredServices = activeTab === '推荐' 
    ? SERVICES 
    : SERVICES.filter(s => s.category === activeTab);

  return (
    <div className="px-4 mt-3">
      <div className="bg-white rounded-xl p-1.5 shadow-sm border border-gray-50">
        <div className="flex overflow-x-auto no-scrollbar gap-1 mb-4 p-0.5 bg-gray-50 rounded-lg">
          {SERVICE_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap flex-1 py-2 px-3 text-[12px] rounded-md transition-all font-bold ${
                activeTab === tab 
                  ? 'bg-white text-emerald-600 shadow-sm' 
                  : 'text-gray-400'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="px-1 pb-3 space-y-3">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <div 
                key={service.id} 
                onClick={() => onSelectService(service)}
                className="flex gap-3 p-2 rounded-lg hover:bg-gray-50/50 transition-colors cursor-pointer border border-transparent"
              >
                <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
                  <img src={service.imageUrl} alt={service.name} className="w-full h-full object-cover" />
                  {service.isHot && (
                    <div className="absolute top-0 left-0 bg-red-500 text-white text-[8px] px-1.5 py-0.5 rounded-br-md font-black">
                      HOT
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col justify-between flex-grow py-0.5">
                  <div>
                    <h3 className="text-sm font-bold text-gray-800 line-clamp-1 mb-1">{service.name}</h3>
                    <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-0.5 text-emerald-600">
                      <span className="text-[9px] font-bold">¥</span>
                      <span className="text-base font-bold">{service.price}</span>
                    </div>
                    <button className="bg-emerald-500 text-white px-4 py-1.5 rounded-lg text-[11px] font-bold shadow-sm active:scale-95 transition-all">
                      预约
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 flex flex-col items-center justify-center text-gray-300">
              <p className="text-[11px] font-bold">暂无相关服务</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceTabs;
