
import React, { useState } from 'react';
import { AuthState, UserRole, TabType, NursingRecord, MedicalReport, Coupon, Nurse } from '../types';
import { MOCK_HEALTH_RECORDS, MOCK_REPORTS, MOCK_COUPONS, MOCK_NURSES, MOCK_PATIENTS } from '../constants';

// --- 二级子页面组件 ---

// 1. 我的健康
const MyHealthView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'records' | 'reports' | 'info'>('records');

  return (
    <div className="fixed inset-0 bg-[#F7F9FA] z-[60] flex flex-col animate-in slide-in-from-right duration-300">
      <div className="bg-white px-5 pt-12 pb-4 flex items-center border-b border-gray-50 shrink-0">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth={2.5}/></svg>
        </button>
        <h2 className="flex-1 text-center font-black text-gray-800 pr-8">我的健康</h2>
      </div>

      <div className="flex bg-white border-b border-gray-50 shrink-0">
        {(['records', 'reports', 'info'] as const).map(t => (
          <button 
            key={t}
            onClick={() => setActiveTab(t)}
            className={`flex-1 py-4 text-[13px] font-bold transition-all relative ${activeTab === t ? 'text-emerald-600' : 'text-gray-400'}`}
          >
            {t === 'records' ? '护理记录' : t === 'reports' ? '体检报告' : '基本信息'}
            {activeTab === t && <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-emerald-500 rounded-full" />}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {activeTab === 'records' && (
          <div className="space-y-4">
            {MOCK_HEALTH_RECORDS.map((rec) => (
              <div key={rec.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-50 relative">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[11px] font-bold text-emerald-600">{rec.date}</span>
                  <span className="text-[10px] text-gray-300 italic">护士: {rec.nurseName}</span>
                </div>
                <h4 className="text-[14px] font-black text-gray-800">{rec.serviceName}</h4>
                <div className="flex gap-4 my-2 py-2 border-y border-gray-50 text-[11px] text-gray-500">
                  <span>血压: {rec.vitals.bp}</span>
                  <span>体温: {rec.vitals.temp}℃</span>
                  <span>脉搏: {rec.vitals.pulse}</span>
                </div>
                <p className="text-[12px] text-gray-600 leading-relaxed italic">“{rec.content}”</p>
                {rec.photos.length > 0 && (
                  <div className="mt-3 flex gap-2">
                    {rec.photos.map((p, idx) => (
                      <img key={idx} src={p} className="w-16 h-16 rounded-lg object-cover border border-gray-100" />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {MOCK_REPORTS.map(rep => (
                <div key={rep.id} className="bg-white p-3 rounded-xl border border-gray-50 shadow-sm flex flex-col items-center">
                  <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-xl mb-2">
                    {rep.type === 'PDF' ? '📄' : '🖼️'}
                  </div>
                  <p className="text-[12px] font-bold text-gray-800 text-center line-clamp-1">{rep.title}</p>
                  <p className="text-[10px] text-gray-400 mt-1">{rep.date} · {rep.size}</p>
                </div>
              ))}
              <div className="bg-emerald-50 border-2 border-dashed border-emerald-100 rounded-xl flex flex-col items-center justify-center p-4 cursor-pointer active:scale-95 transition-transform">
                <span className="text-2xl text-emerald-500">+</span>
                <span className="text-[10px] text-emerald-600 font-bold mt-1">上传报告</span>
              </div>
            </div>
            <p className="text-[10px] text-gray-400 text-center mt-4">
              支持 PDF/JPG 格式上传，最大 50MB
            </p>
          </div>
        )}

        {activeTab === 'info' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-50 divide-y divide-gray-50">
            {MOCK_PATIENTS.map(p => (
              <div key={p.id} className="p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">姓名</span>
                  <span className="text-sm font-bold text-gray-800">{p.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">年龄 / 性别</span>
                  <span className="text-sm font-bold text-gray-800">{p.age}岁 · {p.gender}</span>
                </div>
                <div className="pt-2 border-t border-gray-50">
                  <p className="text-[11px] text-gray-400 font-bold mb-1 uppercase">过敏史</p>
                  <p className="text-sm text-gray-700">{p.allergies || '无'}</p>
                </div>
                <div className="pt-2 border-t border-gray-50">
                  <p className="text-[11px] text-gray-400 font-bold mb-1 uppercase">既往病史</p>
                  <p className="text-sm text-gray-700">{p.medicalHistory || '无'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// 2. 收藏护士
const FavoritesView: React.FC<{ onBack: () => void, onGoHome: () => void }> = ({ onBack, onGoHome }) => {
  return (
    <div className="fixed inset-0 bg-[#F7F9FA] z-[60] flex flex-col animate-in slide-in-from-right duration-300">
      <div className="bg-white px-5 pt-12 pb-4 flex items-center border-b border-gray-50 shrink-0">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth={2.5}/></svg>
        </button>
        <h2 className="flex-1 text-center font-black text-gray-800 pr-8">收藏护士</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
        {MOCK_NURSES.map(nurse => (
          <div key={nurse.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-50 flex gap-4 relative group">
            <img src={nurse.avatar} className="w-14 h-14 rounded-xl object-cover shrink-0 border border-gray-100" />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <h4 className="text-[14px] font-black text-gray-800">{nurse.name}</h4>
                <span className="text-rose-500 text-sm active:scale-125 transition-transform cursor-pointer">❤️</span>
              </div>
              <p className="text-[10px] text-gray-400 mt-1 truncate">{nurse.hospital}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] font-bold text-emerald-600">⭐ {nurse.rating}</span>
                <span className="text-[9px] px-1.5 py-0.5 bg-gray-50 text-gray-400 rounded font-medium">{nurse.tags[0]}</span>
              </div>
            </div>
            <div className="shrink-0 flex items-center">
              <button 
                onClick={onGoHome}
                className="bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-[11px] font-bold shadow-sm shadow-emerald-200 active:scale-95 transition-all"
              >
                快速预约
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 3. 优惠券
const CouponsView: React.FC<{ onBack: () => void, onGoHome: () => void }> = ({ onBack, onGoHome }) => {
  const [tab, setTab] = useState<'unused' | 'used' | 'expired'>('unused');
  const filtered = MOCK_COUPONS.filter(c => c.status === tab);

  return (
    <div className="fixed inset-0 bg-[#F7F9FA] z-[60] flex flex-col animate-in slide-in-from-right duration-300">
      <div className="bg-white px-5 pt-12 pb-4 flex items-center border-b border-gray-50 shrink-0">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth={2.5}/></svg>
        </button>
        <h2 className="flex-1 text-center font-black text-gray-800 pr-8">优惠券 / 红包</h2>
      </div>

      <div className="flex bg-white border-b border-gray-50 shrink-0">
        {(['unused', 'used', 'expired'] as const).map(t => (
          <button 
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-4 text-[13px] font-bold transition-all relative ${tab === t ? 'text-emerald-600' : 'text-gray-400'}`}
          >
            {t === 'unused' ? '未使用' : t === 'used' ? '已使用' : '已过期'}
            {tab === t && <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-emerald-500 rounded-full" />}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {filtered.map(coupon => (
          <div key={coupon.id} className={`bg-white rounded-xl shadow-sm border border-gray-50 flex overflow-hidden relative ${tab !== 'unused' ? 'opacity-50' : ''}`}>
            <div className={`w-24 flex flex-col items-center justify-center text-white ${tab === 'unused' ? 'bg-emerald-500' : 'bg-gray-400'}`}>
              <div className="flex items-baseline">
                <span className="text-xs font-bold">¥</span>
                <span className="text-2xl font-black ml-0.5">{coupon.amount}</span>
              </div>
              <span className="text-[9px] mt-1 font-bold">满{coupon.minSpend}可用</span>
            </div>
            <div className="flex-1 p-4 relative">
              <h4 className="text-[14px] font-black text-gray-800">{coupon.name}</h4>
              <p className="text-[10px] text-gray-400 mt-1">有效期至: {coupon.expiryDate}</p>
              {tab === 'unused' && (
                <button 
                  onClick={onGoHome}
                  className="absolute right-4 bottom-4 text-[11px] font-bold text-emerald-600 border border-emerald-100 rounded-lg px-3 py-1 active:bg-emerald-50"
                >
                  去使用 >
                </button>
              )}
            </div>
            {tab === 'used' && <div className="absolute top-2 right-2 border border-gray-300 text-gray-300 rounded-full w-12 h-12 flex items-center justify-center text-[10px] font-black rotate-12">已使用</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

// 4. 客服中心
const ServiceCenterView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [mode, setMode] = useState<'smart' | 'human' | 'feedback'>('smart');

  return (
    <div className="fixed inset-0 bg-[#F7F9FA] z-[60] flex flex-col animate-in slide-in-from-right duration-300">
      <div className="bg-white px-5 pt-12 pb-4 flex items-center border-b border-gray-50 shrink-0">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth={2.5}/></svg>
        </button>
        <h2 className="flex-1 text-center font-black text-gray-800 pr-8">客服中心</h2>
      </div>

      <div className="p-4 flex gap-2 shrink-0">
        {(['smart', 'human', 'feedback'] as const).map(m => (
          <button 
            key={m}
            onClick={() => setMode(m)}
            className={`flex-1 py-2.5 rounded-lg text-[12px] font-bold transition-all border ${mode === m ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm' : 'bg-white text-gray-500 border-gray-100'}`}
          >
            {m === 'smart' ? '智能客服' : m === 'human' ? '人工客服' : '投诉反馈'}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-10 no-scrollbar">
        {mode === 'smart' && (
          <div className="bg-white rounded-xl p-5 shadow-sm space-y-4">
            <h4 className="text-[14px] font-black text-gray-800 mb-2">常见问题 (FAQ)</h4>
            {['下单流程是怎样的？', '护士迟到了怎么办？', '如何申请退款？', '收费标准在哪里看？'].map((q, i) => (
              <div key={i} className="text-[13px] text-emerald-600 p-3 bg-emerald-50 rounded-lg flex justify-between items-center active:bg-emerald-100 cursor-pointer">
                <span>{q}</span><span className="text-emerald-300 font-black">></span>
              </div>
            ))}
            <div className="mt-8 pt-8 border-t border-gray-50 text-center">
              <p className="text-[12px] text-gray-400">无法解答您的问题？</p>
              <button onClick={() => setMode('human')} className="mt-3 text-sm font-bold text-emerald-600 underline">转人工客服</button>
            </div>
          </div>
        )}

        {mode === 'human' && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-4xl mb-6">🎧</div>
            <h4 className="text-lg font-black text-gray-800">人工在线咨询</h4>
            <p className="text-sm text-gray-400 mt-2">工作时段：09:00 - 17:00</p>
            <p className="text-[12px] text-emerald-600 font-bold mt-1">当前排队中，预计等待 1 分钟</p>
            <button className="mt-10 bg-emerald-500 text-white px-12 py-4 rounded-xl font-bold shadow-lg shadow-emerald-100 active:scale-95 transition-all">
              开始咨询 (图文)
            </button>
          </div>
        )}

        {mode === 'feedback' && (
          <div className="bg-white rounded-xl p-5 shadow-sm space-y-5">
             <div>
               <label className="text-[12px] font-black text-gray-800 mb-2 block uppercase tracking-wider">投诉详情</label>
               <textarea placeholder="请详细描述您遇到的问题..." className="w-full h-32 bg-gray-50 border border-transparent rounded-lg p-3 text-[13px] outline-none focus:border-emerald-100 transition-all resize-none" />
             </div>
             <div>
               <label className="text-[12px] font-black text-gray-800 mb-2 block uppercase tracking-wider">上传证据 (照片)</label>
               <div className="w-20 h-20 bg-gray-50 border-2 border-dashed border-gray-100 rounded-xl flex items-center justify-center text-gray-300 text-2xl active:bg-gray-100 cursor-pointer">+</div>
               <p className="text-[10px] text-gray-400 mt-2 italic">提交后客服将在 24 小时内回复您的处理结果。</p>
             </div>
             <button onClick={() => alert('提交成功')} className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-emerald-100 active:scale-95 transition-all">
               确认提交
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

// 5. 设置
const SettingsView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [orderNotif, setOrderNotif] = useState(true);
  const [activityNotif, setActivityNotif] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  if (showAbout) return (
    <div className="fixed inset-0 bg-[#F7F9FA] z-[70] flex flex-col animate-in zoom-in-95 duration-200">
       <div className="bg-white px-5 pt-12 pb-4 flex items-center border-b border-gray-50">
        <button onClick={() => setShowAbout(false)} className="p-2 -ml-2 text-gray-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth={2.5}/></svg>
        </button>
        <h2 className="flex-1 text-center font-black text-gray-800 pr-8">关于我们</h2>
      </div>
      <div className="p-6 space-y-8">
        <div className="text-center py-4">
           <div className="w-20 h-20 bg-emerald-500 rounded-2xl flex items-center justify-center text-white text-3xl font-black mx-auto mb-4 shadow-lg shadow-emerald-100">站</div>
           <h3 className="text-lg font-black text-gray-800">护士站 V1.2.0</h3>
           <p className="text-[11px] text-gray-400 mt-1">专业医疗护理服务平台</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-50 space-y-5 text-[13px] text-gray-600 leading-relaxed">
           <p><strong>平台备案：</strong> 沪ICP备20241024号</p>
           <p><strong>医疗责任险：</strong> 已由平安保险全程承保，单次上门最高赔付100万元。</p>
           <p><strong>联系方式：</strong> <a href="tel:18582227595" className="text-emerald-600 font-bold">18582227595</a></p>
           <div className="pt-4 border-t border-gray-50 text-[11px] text-gray-400">
             专注居家护理5年，所有护士均持三甲医院资格证件上岗，保障医疗安全。
           </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-[#F7F9FA] z-[60] flex flex-col animate-in slide-in-from-right duration-300">
      <div className="bg-white px-5 pt-12 pb-4 flex items-center border-b border-gray-50 shrink-0">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth={2.5}/></svg>
        </button>
        <h2 className="flex-1 text-center font-black text-gray-800 pr-8">系统设置</h2>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-50 overflow-hidden divide-y divide-gray-50">
          <div className="p-4 flex justify-between items-center active:bg-gray-50 cursor-pointer">
            <span className="text-sm font-bold text-gray-800">密码修改</span>
            <span className="text-gray-300 text-lg">></span>
          </div>
          <div className="p-4 flex justify-between items-center">
            <span className="text-sm font-bold text-gray-800">订单通知</span>
            <div 
              onClick={() => setOrderNotif(!orderNotif)}
              className={`w-11 h-6 rounded-full relative transition-colors duration-300 ${orderNotif ? 'bg-emerald-500' : 'bg-gray-200'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300 ${orderNotif ? 'left-6' : 'left-1'}`} />
            </div>
          </div>
          <div className="p-4 flex justify-between items-center">
            <span className="text-sm font-bold text-gray-800">活动通知</span>
            <div 
              onClick={() => setActivityNotif(!activityNotif)}
              className={`w-11 h-6 rounded-full relative transition-colors duration-300 ${activityNotif ? 'bg-emerald-500' : 'bg-gray-200'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300 ${activityNotif ? 'left-6' : 'left-1'}`} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-50 overflow-hidden divide-y divide-gray-50">
          <div className="p-4 flex justify-between items-center active:bg-gray-50 cursor-pointer">
            <span className="text-sm font-bold text-gray-800">隐私设置</span>
            <span className="text-gray-300 text-lg">></span>
          </div>
          <div 
            onClick={() => setShowAbout(true)}
            className="p-4 flex justify-between items-center active:bg-gray-50 cursor-pointer"
          >
            <span className="text-sm font-bold text-gray-800">关于我们</span>
            <span className="text-gray-300 text-lg">></span>
          </div>
        </div>

        <button className="w-full bg-white text-rose-500 py-4 rounded-xl font-bold shadow-sm border border-rose-50 mt-10 active:bg-rose-50 transition-colors">
          退出登录
        </button>
      </div>
    </div>
  );
};

// --- 主视图 ---

interface UserProfileViewProps {
  authState: AuthState;
  onSwitchRole: (role: UserRole) => void;
  onOpenCert: () => void;
  onTabChange?: (tab: TabType) => void;
}

const UserProfileView: React.FC<UserProfileViewProps> = ({ authState, onSwitchRole, onOpenCert, onTabChange }) => {
  const [subView, setSubView] = useState<null | 'health' | 'favorites' | 'coupons' | 'cs' | 'settings'>(null);

  const handleGoHome = () => {
    setSubView(null);
    onTabChange?.(TabType.HOME);
  };

  return (
    <div className="min-h-screen pb-24 bg-[#F7F9FA]">
      <div className="bg-white px-6 pt-16 pb-10 rounded-b-2xl shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl overflow-hidden border border-emerald-50 shadow-sm">
            <img src={authState.avatar || 'https://picsum.photos/seed/user-avatar/160/160'} alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-xl font-black text-gray-800">{authState.nickname || '微信用户'}</h2>
            <p className="text-[11px] text-gray-400 mt-0.5">{authState.phoneNumber}</p>
          </div>
        </div>
      </div>

      <div className="px-5 mt-4 space-y-3">
        <div className="bg-white rounded-xl shadow-sm border border-gray-50 overflow-hidden">
          {[
            { id: 'health', icon: '🩺', label: '我的健康', extra: '护理 / 体检' },
            { id: 'favorites', icon: '❤️', label: '收藏护士', extra: '已存2位' },
            { id: 'coupons', icon: '🧧', label: '优惠券 / 红包', extra: '2张可用' },
            { id: 'cs', icon: '🎧', label: '客服中心', extra: '智能 / 投诉' },
            { id: 'settings', icon: '⚙️', label: '设置', extra: '通知 / 关于' }
          ].map((item) => (
            <div 
              key={item.id} 
              onClick={() => setSubView(item.id as any)}
              className="p-4 flex justify-between items-center active:bg-gray-50 border-b border-gray-50/50 last:border-0 cursor-pointer"
            >
               <div className="flex items-center gap-3">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-[13px] font-bold text-gray-800">{item.label}</span>
               </div>
               <div className="flex items-center gap-1">
                 <span className="text-[10px] text-gray-400">{item.extra}</span>
                 <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth={2.5}/></svg>
               </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-50 overflow-hidden">
          <div onClick={onOpenCert} className="p-4 flex justify-between items-center active:bg-gray-50 cursor-pointer">
            <div className="flex items-center gap-3">
              <span className="text-lg">🏥</span>
              <span className="text-[13px] font-bold text-gray-800">护士入驻</span>
            </div>
            <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-lg font-bold">申请认证</span>
          </div>
        </div>

        <button 
          onClick={() => onSwitchRole(UserRole.NURSE)}
          className="w-full py-4 bg-emerald-500 text-white rounded-xl text-[14px] font-bold shadow-lg shadow-emerald-500/10 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <span>切换到护士工作台</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth={2.5}/></svg>
        </button>
      </div>

      {/* 子页面按需渲染 */}
      {subView === 'health' && <MyHealthView onBack={() => setSubView(null)} />}
      {subView === 'favorites' && <FavoritesView onBack={() => setSubView(null)} onGoHome={handleGoHome} />}
      {subView === 'coupons' && <CouponsView onBack={() => setSubView(null)} onGoHome={handleGoHome} />}
      {subView === 'cs' && <ServiceCenterView onBack={() => setSubView(null)} />}
      {subView === 'settings' && <SettingsView onBack={() => setSubView(null)} />}
    </div>
  );
};

export default UserProfileView;
