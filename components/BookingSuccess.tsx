
import React from 'react';

interface BookingSuccessProps {
  orderId: string;
  onGoHome: () => void;
  onGoOrders: () => void;
}

const BookingSuccess: React.FC<BookingSuccessProps> = ({ orderId, onGoHome, onGoOrders }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-10 text-center animate-in fade-in duration-500">
      <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
        <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-200">
           <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </div>
      
      <h2 className="text-2xl font-black text-gray-800 mb-2">预约提交成功</h2>
      <p className="text-sm text-gray-400 mb-10 leading-relaxed">
        订单号：{orderId}<br/>
        系统正在指派附近最优护士，预计 <span className="text-emerald-600 font-bold">10分钟内</span> 接单。
      </p>

      <div className="w-full space-y-4">
        <button 
          onClick={onGoOrders}
          className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-bold shadow-xl shadow-emerald-500/20 active:scale-[0.98] transition-all"
        >
          查看订单进度
        </button>
        <button 
          onClick={onGoHome}
          className="w-full py-4 bg-gray-50 text-gray-600 rounded-2xl font-bold active:bg-gray-100 transition-all"
        >
          返回首页
        </button>
      </div>

      <div className="mt-20 p-4 bg-blue-50 rounded-2xl border border-blue-100 text-left">
        <p className="text-[11px] font-black text-blue-800 mb-1 flex items-center gap-1">
          <span>🔔</span> 温馨提示
        </p>
        <p className="text-[10px] text-blue-600/80 leading-relaxed">
          护士上门前会进行电话确认，请保持手机通畅。若15分钟未接单，系统将自动退款或优先加急派单。
        </p>
      </div>
    </div>
  );
};

export default BookingSuccess;
