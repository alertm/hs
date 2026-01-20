
import React, { useState } from 'react';

interface EmergencyBookingProps {
  onBack: () => void;
}

const EmergencyBooking: React.FC<EmergencyBookingProps> = ({ onBack }) => {
  const [desc, setDesc] = useState('');

  return (
    <div className="min-h-screen bg-white">
      <div className="px-5 pt-12 pb-4 flex items-center sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-400">
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth={2.5}/></svg>
        </button>
        <h2 className="flex-1 text-center font-black text-rose-600 pr-8">紧急护理呼叫</h2>
      </div>

      <div className="p-6 space-y-8">
        <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4">
          <p className="text-rose-700 text-[13px] font-bold flex items-center gap-2">
             <span className="text-xl">📢</span> 紧急服务说明
          </p>
          <p className="text-rose-600/70 text-[11px] mt-1 leading-relaxed">
            紧急服务将优先指派距离您最近的特级护士。加急费 50 元已包含在总价中。
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-3">1. 选择服务类型</h3>
          <div className="grid grid-cols-2 gap-3">
             {['紧急换药', '紧急吸痰', '紧急止血', '突发不适咨询'].map(item => (
               <button key={item} className="py-4 border border-gray-100 rounded-xl text-[12px] font-bold text-gray-600 active:bg-rose-50 active:border-rose-200">
                 {item}
               </button>
             ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-3">2. 情况描述</h3>
          <textarea 
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="请简单描述突发情况（如：刚出院伤口裂开、插管脱落等）"
            className="w-full h-32 bg-gray-50 rounded-2xl p-4 text-sm outline-none focus:ring-1 focus:ring-rose-500 border border-transparent"
          />
        </div>

        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-3">3. 服务地址</h3>
          <div className="p-4 bg-gray-50 rounded-2xl flex items-center justify-between">
             <div className="flex items-center gap-3">
               <span className="text-rose-500">📍</span>
               <span className="text-[13px] font-bold text-gray-700">上海市浦东新区张江路1号</span>
             </div>
             <button className="text-[11px] text-emerald-600 font-bold">修改</button>
          </div>
        </div>

        <button className="w-full py-5 bg-rose-500 text-white rounded-2xl font-black shadow-xl shadow-rose-200 active:scale-[0.98] transition-all">
          立即呼叫护士 (¥ 239)
        </button>
      </div>
    </div>
  );
};

export default EmergencyBooking;
