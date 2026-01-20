
import React, { useState } from 'react';
import { Order, OrderStatus } from '../types';

interface OrderDetailViewProps {
  order: Order;
  onBack: () => void;
}

const OrderDetailView: React.FC<OrderDetailViewProps> = ({ order, onBack }) => {
  const [isCancelling, setIsCancelling] = useState(false);

  const getStatusInfo = (status: OrderStatus) => {
    switch (status) {
      case 'waiting_acceptance': return { label: '等待护士接单', icon: '⏳', desc: '系统正在为您匹配最优护士', color: 'text-orange-500' };
      case 'waiting_service': return { label: '待护士上门', icon: '📅', desc: '护士已确认，请保持电话通畅', color: 'text-emerald-500' };
      case 'ongoing': return { label: '服务正在进行', icon: '🩺', desc: '护士正在为您提供专业护理', color: 'text-blue-500' };
      case 'completed': return { label: '服务已完成', icon: '✅', desc: '感谢您的信任，请对本次服务进行评价', color: 'text-gray-500' };
      case 'cancelled': return { label: '订单已取消', icon: '✖️', desc: '订单已关闭，期待下次为您服务', color: 'text-gray-300' };
      default: return { label: '未知状态', icon: '❓', desc: '', color: 'text-gray-400' };
    }
  };

  const statusInfo = getStatusInfo(order.status);

  const steps = [
    { label: '提交', active: true },
    { label: '接单', active: ['waiting_service', 'ongoing', 'completed'].includes(order.status) },
    { label: '出发', active: ['ongoing', 'completed'].includes(order.status) },
    { label: '完成', active: order.status === 'completed' }
  ];

  const handleCancelOrder = () => {
    if (window.confirm('确定要取消该预约吗？（服务开始前2小时取消可能产生违约金）')) {
      alert('订单取消申请已提交');
      onBack();
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9FA] pb-32">
      <div className="bg-white px-5 pt-12 pb-4 flex items-center sticky top-0 z-40 border-b border-gray-50 shadow-sm">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth={2.5}/></svg>
        </button>
        <h2 className="flex-1 text-center font-black text-gray-800 pr-8 uppercase tracking-widest text-[13px]">订单详情</h2>
      </div>

      <div className="bg-white px-6 py-8 border-b border-gray-50">
        <div className="flex items-center gap-4 mb-6">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl border border-gray-50 shadow-sm bg-gray-50/50`}>
            {statusInfo.icon}
          </div>
          <div>
            <h1 className={`text-lg font-black ${statusInfo.color}`}>{statusInfo.label}</h1>
            <p className="text-[11px] text-gray-400 mt-1 font-medium">{statusInfo.desc}</p>
          </div>
        </div>
        
        {order.status !== 'cancelled' && (
          <div className="flex justify-between relative px-2 mt-4">
            <div className="absolute top-3.5 left-6 right-6 h-0.5 bg-gray-50 -z-10"></div>
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className={`w-7 h-7 rounded-full border-2 border-white flex items-center justify-center shadow-sm transition-all duration-500 ${step.active ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-300'}`}>
                  {step.active ? (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"/></svg>
                  ) : (
                    <span className="text-[9px] font-bold">{i + 1}</span>
                  )}
                </div>
                <span className={`text-[9px] font-bold ${step.active ? 'text-emerald-600' : 'text-gray-300'}`}>{step.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 space-y-4">
        {order.nurse && order.status !== 'waiting_acceptance' && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">执行人员</h3>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl overflow-hidden border border-gray-100 shadow-inner">
                <img src={order.nurse.avatar} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[15px] font-black text-gray-800">{order.nurse.name}</span>
                  <span className="text-[9px] px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-md font-bold">三甲执业</span>
                </div>
                <p className="text-[11px] text-gray-400 mt-1">{order.nurse.hospital}</p>
              </div>
              <a href={`tel:18582227595`} className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 active:scale-90 transition-all border border-emerald-100/50">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeWidth={2}/></svg>
              </a>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">服务信息</h3>
          <div className="flex gap-4 mb-5 pb-5 border-b border-gray-50">
            <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm shrink-0">
              <img src={order.imageUrl} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h4 className="text-[14px] font-black text-gray-800">{order.serviceName}</h4>
              <p className="text-[11px] text-emerald-600 font-bold mt-1.5 flex items-center gap-1">
                <span className="text-xs">📅</span> {order.date}
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-gray-50 flex items-center justify-center text-[10px]">👤</span>
              <div>
                <p className="text-[11px] font-bold text-gray-700">被服务人</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{order.customerName}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-gray-50 flex items-center justify-center text-[10px]">📍</span>
              <div>
                <p className="text-[11px] font-bold text-gray-700">服务地址</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{order.address} {order.roomNumber || ''}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-gray-50 flex items-center justify-center text-[10px]">📑</span>
              <div>
                <p className="text-[11px] font-bold text-gray-700">下单时间</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{order.createTime}</p>
              </div>
            </div>
          </div>
        </div>

        {order.status === 'completed' && order.nursingRecord && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-emerald-50">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[13px] font-black text-gray-800 flex items-center gap-2">
                <span className="w-1 h-3.5 bg-emerald-500 rounded-full"></span>
                护理服务报告
              </h3>
              <span className="text-[9px] px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-full font-bold">专业评估</span>
            </div>
            
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { label: '收缩压/舒张压', val: order.nursingRecord.vitals.bp, unit: 'mmHg' },
                { label: '当前体温', val: order.nursingRecord.vitals.temp, unit: '℃' },
                { label: '脉搏心率', val: order.nursingRecord.vitals.pulse, unit: '次/分' }
              ].map((v, i) => (
                <div key={i} className="bg-gray-50/50 p-3 rounded-xl text-center border border-gray-100/30">
                  <p className="text-[8px] text-gray-400 font-bold uppercase tracking-tighter">{v.label}</p>
                  <p className="text-[12px] font-black text-gray-800 mt-1">{v.val}</p>
                  <p className="text-[7px] text-gray-300 font-medium">{v.unit}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="bg-emerald-50/20 p-4 rounded-xl text-[12px] text-gray-600 leading-relaxed italic border border-emerald-50/50">
                “{order.nursingRecord.content}”
              </div>
              {order.nursingRecord.photos.length > 0 && (
                <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                  {order.nursingRecord.photos.map((p, i) => (
                    <img key={i} src={p} className="w-16 h-16 rounded-xl object-cover border border-gray-100 shadow-sm" />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">费用详情</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-[12px] text-gray-500">
              <span>项目金额</span>
              <span>¥{order.price}</span>
            </div>
            {order.status === 'cancelled' ? (
               <div className="flex justify-between items-center text-[12px] text-rose-500 font-bold">
                 <span>订单已取消</span>
                 <span>¥0.00</span>
               </div>
            ) : (
              <div className="flex justify-between items-center pt-3 border-t border-gray-50">
                <span className="text-[13px] font-black text-gray-800">实付总计</span>
                <span className="text-lg font-black text-emerald-600">¥{order.paidAmount}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-5 pb-safe z-50 flex gap-4 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
        {['waiting_acceptance', 'waiting_service'].includes(order.status) && (
          <button 
            onClick={handleCancelOrder} 
            className="flex-1 py-4 border border-gray-100 text-[14px] font-bold text-gray-400 rounded-2xl active:bg-gray-50"
          >
            取消订单
          </button>
        )}
        <button 
          onClick={onBack} 
          className="flex-1 py-4 bg-emerald-500 text-white text-[14px] font-bold rounded-2xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
        >
          {order.status === 'completed' ? '返回并评价' : '确认返回'}
        </button>
      </div>
    </div>
  );
};

export default OrderDetailView;
