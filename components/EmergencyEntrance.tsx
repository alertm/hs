
import React from 'react';

interface EmergencyEntranceProps {
  onClick: () => void;
}

const EmergencyEntrance: React.FC<EmergencyEntranceProps> = ({ onClick }) => {
  return (
    <div className="px-4 py-2">
      <button 
        onClick={onClick}
        className="w-full bg-gradient-to-r from-red-500 to-rose-600 rounded-2xl p-4 flex items-center justify-between shadow-lg shadow-red-200 active:scale-[0.98] transition-all relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-2xl animate-pulse">
            🚑
          </div>
          <div className="text-left">
            <h3 className="text-white font-black text-base">紧急服务入口</h3>
            <p className="text-red-50 text-[11px] font-medium opacity-90">护士 1 小时内火速上门</p>
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg text-white text-[11px] font-bold border border-white/20 relative z-10">
          立即呼叫
        </div>
      </button>
    </div>
  );
};

export default EmergencyEntrance;
