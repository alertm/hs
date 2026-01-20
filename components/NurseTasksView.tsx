
import React, { useState } from 'react';
import { Order } from '../types';
import NurseTaskCompletion from './NurseTaskCompletion';

const NurseTasksView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'waiting_acceptance' | 'waiting_service' | 'ongoing' | 'completed' | 'cancelled'>('ongoing');
  const [completingTask, setCompletingTask] = useState<Order | null>(null);

  const MOCK_TASKS: Record<string, Order[]> = {
    waiting_acceptance: [], // 这个状态通常在抢单池，这里展示待确认
    waiting_service: [
      {
        id: 'TASK_WS_001',
        serviceName: '伤口拆线服务',
        status: 'waiting_service',
        price: 120,
        paidAmount: 120,
        createTime: '2024-05-24 09:00',
        date: '明日 10:00',
        imageUrl: 'https://picsum.photos/seed/task_r1/100/100',
        address: '静安区江宁路158号',
        customerName: '赵大叔',
        distance: '3.5km'
      }
    ],
    ongoing: [
      {
        id: 'TASK_ONG_001',
        serviceName: '上门导尿护理',
        status: 'ongoing',
        price: 180,
        paidAmount: 180,
        createTime: '2024-05-24 12:00',
        date: '今日 15:00',
        imageUrl: 'https://picsum.photos/seed/task1/100/100',
        address: '杨浦区五角场万达广场C座 1202',
        customerName: '王老伯',
        distance: '0.8km'
      }
    ],
    completed: [
      {
        id: 'TASK_COM_001',
        serviceName: '护士上门打针',
        status: 'completed',
        price: 89,
        paidAmount: 89,
        createTime: '2024-05-23 09:00',
        date: '昨日 10:00',
        imageUrl: 'https://picsum.photos/seed/task_c1/100/100',
        address: '浦东新区陆家嘴街道102号',
        customerName: '张女士'
      }
    ],
    cancelled: []
  };

  const currentTasks = MOCK_TASKS[activeTab] || [];

  if (completingTask) {
    return <NurseTaskCompletion task={completingTask} onBack={() => setCompletingTask(null)} />;
  }

  return (
    <div className="min-h-screen pb-24 flex flex-col bg-[#F7F9FA]">
      <div className="bg-white px-5 pt-12 pb-4 sticky top-0 z-40">
        <h2 className="text-xl font-black text-gray-900">任务管理</h2>
      </div>

      <div className="bg-white px-2 sticky top-[88px] z-30 border-b border-gray-50 flex shrink-0 overflow-x-auto no-scrollbar">
        {[
          { label: '待抢单', value: 'waiting_acceptance' },
          { label: '待服务', value: 'waiting_service' },
          { label: '进行中', value: 'ongoing' },
          { label: '已完成', value: 'completed' },
          { label: '已取消', value: 'cancelled' }
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value as any)}
            className={`flex-1 min-w-[80px] py-4 text-[13px] font-bold transition-all relative ${
              activeTab === tab.value ? 'text-emerald-600' : 'text-gray-400'
            }`}
          >
            {tab.label}
            {activeTab === tab.value && (
              <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-emerald-500 rounded-full"></div>
            )}
          </button>
        ))}
      </div>

      <div className="px-4 mt-4 space-y-4 flex-grow">
        {currentTasks.length > 0 ? (
          currentTasks.map(task => (
            <div key={task.id} className="bg-white rounded-2xl shadow-sm border border-gray-50 p-5">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-xl">🩺</div>
                  <div>
                    <h3 className="text-[14px] font-black text-gray-800 line-clamp-1">{task.serviceName}</h3>
                    <p className="text-[11px] text-gray-400 mt-1">{task.date} · {task.customerName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-emerald-600 font-black text-lg">¥{(task.price * 0.7).toFixed(2)}</p>
                  <p className="text-[9px] text-gray-300 font-bold uppercase tracking-widest">护士结算额</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-3 mb-4 flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5 text-xs">📍</span>
                <p className="text-[11px] text-gray-600 leading-tight flex-1">{task.address}</p>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 py-3 bg-white border border-gray-100 rounded-xl text-[12px] font-bold text-gray-600 active:bg-gray-50 transition-colors">
                  任务详情
                </button>
                {activeTab === 'ongoing' && (
                  <button 
                    onClick={() => setCompletingTask(task)}
                    className="flex-1 py-3 bg-emerald-500 text-white rounded-xl text-[12px] font-bold shadow-lg shadow-emerald-500/10 active:scale-95 transition-all"
                  >
                    完成服务
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="py-24 flex flex-col items-center justify-center opacity-30">
            <span className="text-5xl mb-4">📄</span>
            <p className="text-[11px] font-black tracking-widest uppercase">暂无此类订单</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NurseTasksView;
