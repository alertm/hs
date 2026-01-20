
import React, { useState, useEffect } from 'react';
import { NurseInfo, Order } from '../types';
import NurseTaskDetail from './NurseTaskDetail';
import NurseCertification from './NurseCertification';

interface NurseWorkbenchProps {
  nurseInfo: NurseInfo;
  setNurseInfo: (info: NurseInfo) => void;
}

const MOCK_POOL_ORDERS: Order[] = [
  {
    id: 'POOL001',
    serviceName: '【单次】护士上门打针',
    status: 'waiting_acceptance',
    price: 89,
    paidAmount: 89,
    createTime: '2024-05-24 08:00',
    date: '今日 14:00',
    imageUrl: 'https://picsum.photos/seed/n1/100/100',
    address: '浦东新区张江镇高科中路128号',
    distance: '1.2km',
    customerName: '王女士',
    patientCondition: '术后常规抗生素注射，处方药物已自备',
    isEmergency: false
  },
  {
    id: 'EMER_001',
    serviceName: '紧急伤口换药',
    status: 'waiting_acceptance',
    price: 239,
    paidAmount: 239,
    createTime: '2024-05-24 10:15',
    date: '1小时内火速上门',
    imageUrl: 'https://picsum.photos/seed/emer/100/100',
    address: '黄浦区西藏南路568号',
    distance: '2.8km',
    customerName: '李先生',
    patientCondition: '伤口敷料渗血，需紧急二次包扎评估',
    isEmergency: true
  }
];

const NurseWorkbench: React.FC<NurseWorkbenchProps> = ({ nurseInfo, setNurseInfo }) => {
  const [selectedTask, setSelectedTask] = useState<Order | null>(null);
  const [isCertifying, setIsCertifying] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState<string | null>(null);

  if (isCertifying) return <NurseCertification onBack={() => setIsCertifying(false)} />;
  if (selectedTask) return <NurseTaskDetail order={selectedTask} onBack={() => setSelectedTask(null)} onGrab={() => { alert('抢单成功！已进入待服务列表'); setSelectedTask(null); }} />;

  const toggleOnline = () => {
    if (nurseInfo.certStatus !== 'verified') {
      alert('资质审核通过后方可开启接单。请先在“我的”页面完善认证。');
      return;
    }
    setNurseInfo({ ...nurseInfo, isOnline: !nurseInfo.isOnline });
  };

  const handleReject = (orderId: string, reason: string) => {
    if (nurseInfo.rejectionsToday >= 2) {
      alert('今日拒单次数已达上限（2次），请谨慎操作。');
      return;
    }
    setNurseInfo({ ...nurseInfo, rejectionsToday: nurseInfo.rejectionsToday + 1 });
    setShowRejectModal(null);
    alert('已拒单，订单将返回派单池。');
  };

  return (
    <div className="min-h-screen pb-24 bg-[#F7F9FA]">
      {/* 顶部状态栏 */}
      <div className={`pt-16 pb-8 px-6 transition-all duration-500 rounded-b-[40px] shadow-lg ${nurseInfo.isOnline ? 'bg-emerald-600' : 'bg-gray-400'}`}>
        <div className="flex justify-between items-center text-white mb-6">
          <div>
            <h1 className="text-2xl font-black tracking-tight">接单中心</h1>
            <p className="text-[11px] opacity-80 mt-1 font-bold">
              {nurseInfo.isOnline ? '🟢 系统实时派单中' : '😴 当前休息中，不接收推送'}
            </p>
          </div>
          <button 
            onClick={toggleOnline}
            className={`w-14 h-8 rounded-full relative transition-all duration-300 ${nurseInfo.isOnline ? 'bg-white' : 'bg-white/40 shadow-inner'}`}
          >
            <div className={`absolute top-1 w-6 h-6 rounded-full shadow-md transition-all duration-300 ${nurseInfo.isOnline ? 'right-1 bg-emerald-500' : 'left-1 bg-gray-200'}`}></div>
          </button>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-5 border border-white/20 flex justify-between text-white">
          <div className="text-center flex-1 border-r border-white/10">
            <p className="text-xl font-black">{nurseInfo.todayOrders}</p>
            <p className="text-[10px] opacity-70 font-bold uppercase tracking-widest">今日单数</p>
          </div>
          <div className="text-center flex-1 border-r border-white/10">
            <p className="text-xl font-black">¥{nurseInfo.todayEarnings}</p>
            <p className="text-[10px] opacity-70 font-bold uppercase tracking-widest">预估收益</p>
          </div>
          <div className="text-center flex-1">
            <p className="text-xl font-black">{nurseInfo.maxDistance}km</p>
            <p className="text-[10px] opacity-70 font-bold uppercase tracking-widest">接收范围</p>
          </div>
        </div>
      </div>

      <div className="px-5 mt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-4 bg-emerald-500 rounded-full"></div>
            <h2 className="text-base font-bold text-gray-800">可接任务池</h2>
          </div>
          <span className="text-[10px] text-gray-400 font-bold">拒单次数: {nurseInfo.rejectionsToday}/2</span>
        </div>

        {nurseInfo.isOnline ? (
          <div className="space-y-4">
            {MOCK_POOL_ORDERS.map(order => (
              <div 
                key={order.id} 
                className={`bg-white rounded-2xl p-5 shadow-sm border overflow-hidden relative active:scale-[0.98] transition-all ${order.isEmergency ? 'border-rose-100 bg-rose-50/20' : 'border-gray-50'}`}
              >
                {order.isEmergency && (
                  <div className="absolute top-0 right-0 bg-rose-500 text-white text-[9px] font-black px-3 py-1 rounded-bl-xl animate-pulse">
                    紧急订单
                  </div>
                )}
                
                <div onClick={() => setSelectedTask(order)}>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className={`font-black text-[15px] ${order.isEmergency ? 'text-rose-600' : 'text-gray-800'}`}>{order.serviceName}</h3>
                    <p className="text-emerald-600 font-black text-lg">¥{(order.price * 0.7).toFixed(2)}</p>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <p className="text-[11px] text-gray-500 flex items-center gap-1">
                      <span className="text-gray-300">📍</span> {order.address} <span className="text-emerald-500 font-bold ml-1">{order.distance}</span>
                    </p>
                    <p className="text-[11px] text-gray-500 flex items-center gap-1 line-clamp-2">
                      <span className="text-gray-300">👤</span> {order.patientCondition}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 pt-3 border-t border-gray-50">
                  <button 
                    onClick={() => setShowRejectModal(order.id)}
                    className="flex-1 py-2 text-[12px] font-bold text-gray-400 bg-gray-50 rounded-lg"
                  >
                    拒绝
                  </button>
                  <button 
                    onClick={() => setSelectedTask(order)}
                    className={`flex-[2] py-2 rounded-lg text-[12px] font-bold text-white shadow-sm transition-all ${order.isEmergency ? 'bg-rose-500 shadow-rose-200' : 'bg-emerald-500 shadow-emerald-200'}`}
                  >
                    立即抢单
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 flex flex-col items-center justify-center text-gray-300">
             <span className="text-5xl mb-4">📴</span>
             <p className="text-sm font-bold">离线状态不接收订单</p>
             <p className="text-[11px] mt-1">请开启上方开关进入接单状态</p>
          </div>
        )}
      </div>

      {/* 拒单原因选择 */}
      {showRejectModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowRejectModal(null)}></div>
          <div className="bg-white w-full rounded-2xl p-6 relative animate-in zoom-in-95 duration-200">
            <h3 className="text-lg font-black text-gray-800 mb-4">请选择拒单原因</h3>
            <div className="space-y-2">
              {['距离过远', '时间冲突', '病情描述不清', '其它原因'].map(reason => (
                <button 
                  key={reason} 
                  onClick={() => handleReject(showRejectModal, reason)}
                  className="w-full py-3 text-left px-4 bg-gray-50 rounded-xl text-[13px] font-bold text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                >
                  {reason}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-rose-500 mt-4 font-bold text-center">注意：拒单后该订单将返回公海派单池</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NurseWorkbench;
