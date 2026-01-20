
import React from 'react';

const Banner: React.FC = () => {
  return (
    <div className="px-4 pt-3 pb-1">
      <div className="relative h-40 w-full rounded-xl overflow-hidden bg-gradient-to-br from-[#10B981] to-[#059669] shadow-sm">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full blur-2xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-200 rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 h-full flex items-center px-6">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white leading-tight mb-1">
              专业护士上门
            </h2>
            <p className="text-xs text-emerald-50 opacity-90 mb-3">
              让居家护理更专业、更安心
            </p>
            <button className="bg-white text-emerald-600 px-4 py-1.5 rounded-lg text-[11px] font-bold shadow-sm active:scale-95 transition-transform">
              立即预约
            </button>
          </div>
          <div className="relative w-28 h-full flex items-end">
             <img 
                src="https://picsum.photos/seed/nurse-p/200/300" 
                alt="Nurse" 
                className="w-full h-auto max-h-[90%] object-contain rounded-lg drop-shadow-md"
             />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
