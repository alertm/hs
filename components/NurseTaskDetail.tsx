
import React, { useState, useEffect } from 'react';
import { Order } from '../types';

interface NurseTaskDetailProps {
  order: Order;
  onBack: () => void;
  onGrab: () => void;
}

const NurseTaskDetail: React.FC<NurseTaskDetailProps> = ({ order, onBack, onGrab }) => {
  const [timeLeft, setTimeLeft] = useState(180); // 3分钟计时

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else {
      alert('订单抢单超时已关闭');
      onBack();
    }
  }, [timeLeft, onBack]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleNavigation = () => {
    alert('正在调起高德地图导航至：' + order.address);
  };

  const handleContact = () => {
    alert('正在通过系统虚拟号转接：170 **** 8888\n您的真实手机号已隐藏，通话将被录音。');
  };

  return (
    <div className="min-h-screen bg-[#F7F9FA] pb-32">
      <div className="bg-white px-5 pt-12 pb-4 flex items-center sticky top-0 z-40 border-b border-gray-50">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth={2}/></svg>
        </button>
        <h2 className="flex-1 text-center font-bold text-gray-800 pr-8">任务详情</h2>
      </div>

      <div className="p-4 space-y-4">
        {/* 抢单计时器 */}
        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 flex items-center justify-between">
           <div className="flex items-center gap-2">
             <span className="text-xl animate-bounce">⏱️</span>
             <span className="text-[13px] font-black text-orange-700">抢单剩余时间</span>
           </div>
           <span className="text-xl font-black text-orange-600 tabular-nums">{formatTime(timeLeft)}</span>
        </div>

        {/* 收益详情 */}
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-5 text-white shadow-xl shadow-emerald-500/10">
          <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest mb-1">结算给您的金额 (70%)</p>
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-bold">¥</span>
            <span className="text-3xl font-black tracking-tighter">{(order.price * 0.7).toFixed(2)}</span>
            <span className="text-[10px] opacity-60 ml-3">订单原价: ¥{order.price}</span>
          </div>
        </div>

        {/* 详细内容 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50 space-y-5">
          <div>
            <h3 className="text-[10px] text-gray-400 font-bold mb-3 uppercase tracking-widest">被服务人信息</h3>
            <div className="flex justify-between items-center">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-xl">👤</div>
                 <div>
                    <p className="text-[14px] font-black text-gray-800">{order.customerName} (脱敏)</p>
                    <p className="text-[11px] text-gray-400">72岁 | 既往病史无</p>
                 </div>
               </div>
               <button onClick={handleContact} className="text-emerald-600 text-[11px] font-bold border border-emerald-100 rounded-lg px-3 py-1.5 active:bg-emerald-50">虚拟号联系</button>
            </div>
          </div>

          <div className="pt-5 border-t border-gray-50">
            <h3 className="text-[10px] text-gray-400 font-bold mb-3 uppercase tracking-widest">服务地址及病情</h3>
            <p className="text-[13px] font-bold text-gray-800 leading-snug">{order.address}</p>
            <div onClick={handleNavigation} className="mt-3 w-full h-32 bg-gray-50 rounded-xl border border-gray-100 flex flex-col items-center justify-center relative overflow-hidden active:opacity-80 transition-opacity">
               <div className="absolute inset-0 opacity-10 bg-[url('https://picsum.photos/seed/map/400/200')] bg-cover"></div>
               <span className="text-xl relative z-10">🗺️</span>
               <p className="text-[10px] text-emerald-600 font-bold mt-1 relative z-10">点击开启导航</p>
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded-xl border-l-4 border-emerald-500">
               <p className="text-[11px] text-gray-400 font-bold mb-1">患者病情描述:</p>
               <p className="text-[12px] text-gray-700 leading-relaxed italic">{order.patientCondition}</p>
            </div>
          </div>
        </div>

        {/* 平台保障说明 */}
        <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-3">
           <span className="text-xl">🛡️</span>
           <div>
             <h4 className="text-[12px] font-black text-blue-800">平台安全保障</h4>
             <p className="text-[10px] text-blue-600/70 mt-0.5 leading-relaxed">本次服务已由平台责任险覆盖。若产生医疗纠纷，请第一时间联系 18582227595 寻求协助。</p>
           </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-5 pb-safe z-50 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] flex gap-4">
        <button 
          onClick={onBack}
          className="flex-1 py-4 border border-gray-100 text-gray-400 font-bold rounded-xl active:bg-gray-50"
        >
          暂不考虑
        </button>
        <button 
          onClick={onGrab}
          className="flex-[2] py-4 bg-emerald-500 text-white rounded-xl text-[14px] font-bold shadow-lg shadow-emerald-500/30 active:scale-95 transition-all"
        >
          确认抢单
        </button>
      </div>
    </div>
  );
};

export default NurseTaskDetail;
