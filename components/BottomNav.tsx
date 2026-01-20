
import React from 'react';
import { TabType, UserRole } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  role: UserRole;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange, role }) => {
  const isUser = role === UserRole.USER;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-2 flex justify-between items-center z-30 pb-safe shadow-[0_-5px_20px_rgba(0,0,0,0.03)]">
      {isUser ? (
        <>
          <button 
            onClick={() => onTabChange(TabType.HOME)}
            className={`flex flex-col items-center py-1 flex-1 transition-all duration-300 ${activeTab === TabType.HOME ? 'text-emerald-600' : 'text-gray-300'}`}
          >
            <div className={`p-1.5 rounded-xl mb-0.5 ${activeTab === TabType.HOME ? 'bg-emerald-50/50' : ''}`}>
              <svg className="w-5 h-5" fill={activeTab === TabType.HOME ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <span className="text-[10px] font-black tracking-wider">首页</span>
          </button>

          <button 
            onClick={() => onTabChange(TabType.ORDERS)}
            className={`flex flex-col items-center py-1 flex-1 transition-all duration-300 ${activeTab === TabType.ORDERS ? 'text-emerald-600' : 'text-gray-300'}`}
          >
            <div className={`p-1.5 rounded-xl mb-0.5 ${activeTab === TabType.ORDERS ? 'bg-emerald-50/50' : ''}`}>
              <svg className="w-5 h-5" fill={activeTab === TabType.ORDERS ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <span className="text-[10px] font-black tracking-wider">订单</span>
          </button>

          <button 
            onClick={() => onTabChange(TabType.PROFILE)}
            className={`flex flex-col items-center py-1 flex-1 transition-all duration-300 ${activeTab === TabType.PROFILE ? 'text-emerald-600' : 'text-gray-300'}`}
          >
            <div className={`p-1.5 rounded-xl mb-0.5 ${activeTab === TabType.PROFILE ? 'bg-emerald-50/50' : ''}`}>
              <svg className="w-5 h-5" fill={activeTab === TabType.PROFILE ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span className="text-[10px] font-black tracking-wider">我的</span>
          </button>
        </>
      ) : (
        <>
          <button 
            onClick={() => onTabChange(TabType.WORKBENCH)}
            className={`flex flex-col items-center py-1 flex-1 transition-all duration-300 ${activeTab === TabType.WORKBENCH ? 'text-emerald-600' : 'text-gray-300'}`}
          >
            <div className={`p-1.5 rounded-xl mb-0.5 ${activeTab === TabType.WORKBENCH ? 'bg-emerald-50/50' : ''}`}>
              <svg className="w-5 h-5" fill={activeTab === TabType.WORKBENCH ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-[10px] font-black tracking-wider">工作台</span>
          </button>

          <button 
            onClick={() => onTabChange(TabType.ORDERS)}
            className={`flex flex-col items-center py-1 flex-1 transition-all duration-300 ${activeTab === TabType.ORDERS ? 'text-emerald-600' : 'text-gray-300'}`}
          >
            <div className={`p-1.5 rounded-xl mb-0.5 ${activeTab === TabType.ORDERS ? 'bg-emerald-50/50' : ''}`}>
              <svg className="w-5 h-5" fill={activeTab === TabType.ORDERS ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <span className="text-[10px] font-black tracking-wider">任务</span>
          </button>

          <button 
            onClick={() => onTabChange(TabType.PROFILE)}
            className={`flex flex-col items-center py-1 flex-1 transition-all duration-300 ${activeTab === TabType.PROFILE ? 'text-emerald-600' : 'text-gray-300'}`}
          >
            <div className={`p-1.5 rounded-xl mb-0.5 ${activeTab === TabType.PROFILE ? 'bg-emerald-50/50' : ''}`}>
              <svg className="w-5 h-5" fill={activeTab === TabType.PROFILE ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span className="text-[10px] font-black tracking-wider">我的</span>
          </button>
        </>
      )}
    </div>
  );
};

export default BottomNav;
