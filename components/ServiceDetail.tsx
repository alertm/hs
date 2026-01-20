
import React, { useState } from 'react';
import { Service, Nurse } from '../types';
import { MOCK_NURSES } from '../constants';

interface ServiceDetailProps {
  service: Service;
  onBack: () => void;
  onBook: (nurse: Nurse | null) => void;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ service, onBack, onBook }) => {
  const [sortType, setSortType] = useState<'rating' | 'distance' | 'orders'>('rating');
  const [selectedNurseDetail, setSelectedNurseDetail] = useState<Nurse | null>(null);

  const sortedNurses = [...MOCK_NURSES].sort((a, b) => {
    if (sortType === 'rating') return b.rating - a.rating;
    if (sortType === 'distance') return parseFloat(a.distance) - parseFloat(b.distance);
    return b.orderCount - a.orderCount;
  });

  return (
    <div className="min-h-screen bg-[#F7F9FA] pb-32">
      {/* Header Image & Back Button */}
      <div className="relative h-64 w-full">
        <img src={service.imageUrl} alt={service.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent h-20"></div>
        <button 
          onClick={onBack}
          className="absolute top-10 left-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth={2.5}/></svg>
        </button>
      </div>

      <div className="px-4 -mt-6 relative z-10 space-y-4">
        {/* 服务核心信息 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-xl font-black text-gray-900 leading-tight">{service.name}</h1>
            <div className="text-emerald-600 font-black text-right">
              <span className="text-sm">¥</span>
              <span className="text-2xl ml-0.5">{service.price}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-y-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-gray-400">服务时长:</span>
              <span className="text-[11px] font-bold text-gray-700">{service.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-gray-400">适用人群:</span>
              <span className="text-[11px] font-bold text-gray-700">{service.audience}</span>
            </div>
          </div>

          <div className="p-3 bg-red-50 border border-red-100 rounded-xl">
             <p className="text-[11px] font-bold text-red-500 leading-relaxed">
               ⚠️ 注意事项：{service.notes}
             </p>
          </div>
        </div>

        {/* 服务内容清单 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
          <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-3 bg-emerald-500 rounded-full"></span>
            服务内容清单
          </h3>
          <ul className="space-y-2">
            {service.contentList?.map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-[12px] text-gray-600">
                <span className="w-1.5 h-1.5 bg-emerald-200 rounded-full"></span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-gray-50">
            <p className="text-[11px] text-gray-400 font-bold">禁忌人群：<span className="font-normal">{service.contraindications}</span></p>
          </div>
        </div>

        {/* 匹配护士列表 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-gray-800">匹配上门护士</h3>
            <div className="flex gap-4 text-[11px] font-bold text-gray-400">
              <button onClick={() => setSortType('rating')} className={sortType === 'rating' ? 'text-emerald-600' : ''}>评分</button>
              <button onClick={() => setSortType('distance')} className={sortType === 'distance' ? 'text-emerald-600' : ''}>距离</button>
              <button onClick={() => setSortType('orders')} className={sortType === 'orders' ? 'text-emerald-600' : ''}>接单率</button>
            </div>
          </div>

          <div className="space-y-6">
            {sortedNurses.map(nurse => (
              <div key={nurse.id} className="flex gap-4 group">
                <div onClick={() => setSelectedNurseDetail(nurse)} className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-gray-100 shadow-sm cursor-pointer active:opacity-60">
                  <img src={nurse.avatar} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="flex-1">
                   <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-[13px] font-black text-gray-800">{nurse.name}</h4>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="text-[10px] text-emerald-600 font-bold">⭐ {nurse.rating}</span>
                          <span className="text-[10px] text-gray-300">|</span>
                          <span className="text-[10px] text-gray-400">已接 {nurse.orderCount} 单</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-gray-400 font-bold">{nurse.distance}</span>
                   </div>
                   <div className="flex gap-1.5 mt-2">
                      {nurse.tags.map(tag => (
                        <span key={tag} className="text-[9px] px-1.5 py-0.5 bg-gray-50 text-gray-500 rounded font-bold">{tag}</span>
                      ))}
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 固定底部栏 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-5 pb-safe z-30 flex items-center justify-between shadow-2xl">
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-400">预估总额</span>
          <div className="flex items-baseline text-emerald-600">
            <span className="text-xs font-bold">¥</span>
            <span className="text-2xl font-black ml-0.5">{service.price}</span>
          </div>
        </div>
        <button 
          onClick={() => onBook(null)}
          className="bg-emerald-500 text-white px-12 py-3.5 rounded-xl font-bold shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
        >
          立即预约
        </button>
      </div>

      {/* 护士详情弹窗 */}
      {selectedNurseDetail && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedNurseDetail(null)}></div>
          <div className="bg-white w-full max-w-sm rounded-[32px] overflow-hidden relative animate-in zoom-in-95 duration-200 shadow-2xl">
            <div className="h-24 bg-gradient-to-br from-emerald-500 to-teal-600"></div>
            <div className="px-6 pb-8 -mt-10">
              <div className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-white shadow-lg mx-auto mb-4">
                <img src={selectedNurseDetail.avatar} className="w-full h-full object-cover" alt="" />
              </div>
              <h3 className="text-lg font-black text-gray-800 text-center">{selectedNurseDetail.name}</h3>
              <p className="text-[11px] text-emerald-600 font-bold text-center mt-1 uppercase tracking-widest">{selectedNurseDetail.hospital}</p>
              
              <div className="mt-6 space-y-4">
                 <div className="bg-gray-50 rounded-2xl p-4">
                    <p className="text-[10px] text-gray-400 mb-1 font-bold">个人简介</p>
                    <p className="text-[12px] text-gray-600 leading-relaxed italic">“{selectedNurseDetail.intro || '该护士暂未填写详细介绍，但其服务评价极佳，是社区值得信赖的医护伙伴。'}”</p>
                 </div>
                 <div className="flex justify-around py-2 border-y border-gray-50">
                    <div className="text-center">
                      <p className="text-lg font-black text-emerald-600">{selectedNurseDetail.rating}</p>
                      <p className="text-[9px] text-gray-400 font-bold uppercase">综合评分</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-black text-gray-800">{selectedNurseDetail.orderCount}</p>
                      <p className="text-[9px] text-gray-400 font-bold uppercase">累计单数</p>
                    </div>
                 </div>
              </div>
              <button 
                onClick={() => {
                  onBook(selectedNurseDetail);
                  setSelectedNurseDetail(null);
                }}
                className="w-full mt-6 py-4 bg-emerald-500 text-white rounded-2xl font-bold shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
              >
                选她服务
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetail;
