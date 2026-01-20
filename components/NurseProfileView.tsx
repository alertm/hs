
import React, { useState } from 'react';
import { NurseInfo, NurseReview, TrainingCourse } from '../types';
import NurseEarningsView from './NurseEarningsView';

interface NurseProfileViewProps {
  nurseInfo: NurseInfo;
  onSwitchRole: () => void;
  onUpdateInfo: (info: NurseInfo) => void;
}

// --- 1. 个人资料编辑组件 ---
const ProfileEditView: React.FC<{ info: NurseInfo, onBack: () => void, onSave: (data: any) => void }> = ({ info, onBack, onSave }) => {
  const [formData, setFormData] = useState({
    bio: info.bio || '',
    expRange: info.experienceRange || '3-5',
    avatar: info.avatar || 'https://picsum.photos/seed/nurse-avatar/160/160'
  });

  return (
    <div className="fixed inset-0 bg-[#F7F9FA] z-[60] flex flex-col animate-in slide-in-from-right duration-300">
      <div className="bg-white px-5 pt-12 pb-4 flex items-center border-b border-gray-50 shrink-0">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth={2.5}/></svg>
        </button>
        <h2 className="flex-1 text-center font-black text-gray-800 pr-8">编辑个人资料</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        <div className="flex flex-col items-center py-6 bg-white rounded-2xl border border-gray-50 shadow-sm">
          <div className="relative group active:scale-95 transition-transform">
            <img src={formData.avatar} className="w-20 h-20 rounded-2xl object-cover border-4 border-gray-50 shadow-md" />
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
              <span className="text-white text-[10px]">📷</span>
            </div>
          </div>
          <p className="text-[11px] text-gray-400 mt-2 font-bold uppercase tracking-widest">点击更换头像</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-50 space-y-5 shadow-sm">
          <div>
            <label className="text-[11px] text-gray-400 font-black mb-3 block uppercase tracking-widest">服务经验选择</label>
            <div className="grid grid-cols-3 gap-2">
              {['1-3 年', '3-5 年', '5 年以上'].map(val => (
                <button 
                  key={val}
                  onClick={() => setFormData({...formData, expRange: val.includes('1-3') ? '1-3' : val.includes('3-5') ? '3-5' : '5+'} as any)}
                  className={`py-2.5 rounded-xl text-[11px] font-bold border transition-all ${formData.expRange === (val.includes('1-3') ? '1-3' : val.includes('3-5') ? '3-5' : '5+') ? 'bg-emerald-500 text-white border-emerald-500 shadow-md' : 'bg-gray-50 text-gray-400 border-transparent'}`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-[11px] text-gray-400 font-black uppercase tracking-widest">个人简介</label>
              <span className={`text-[10px] font-bold ${formData.bio.length >= 200 ? 'text-rose-500' : 'text-gray-300'}`}>{formData.bio.length}/200</span>
            </div>
            <textarea 
              value={formData.bio}
              onChange={e => setFormData({...formData, bio: e.target.value.slice(0, 200)})}
              placeholder="介绍您的专业背景、擅长领域，简介最多输入 200 字..."
              className="w-full h-32 bg-gray-50 rounded-xl p-4 text-[13px] text-gray-700 border-0 focus:ring-1 focus:ring-emerald-100 resize-none outline-none leading-relaxed"
            />
          </div>
        </div>
      </div>
      <div className="p-5 bg-white border-t border-gray-50 pb-safe">
        <button onClick={() => onSave(formData)} className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-black shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all">保存并更新资料</button>
      </div>
    </div>
  );
};

// --- 2. 评价管理组件 ---
const ReviewListView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [reviews, setReviews] = useState<NurseReview[]>([
    { id: '1', userName: '王女士', rating: 5, content: '张护士非常专业，准时到家，手法很轻，换药过程一点都不疼，强烈推荐！', images: ['https://picsum.photos/seed/rv1/200/200'], date: '2024-05-20' },
    { id: '2', userName: '匿名用户', rating: 2, content: '稍微有点晚到，希望能更守时一些。', date: '2024-05-18', appealStatus: 'none' }
  ]);
  const [replyId, setReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleReply = (id: string) => {
    setReviews(reviews.map(r => r.id === id ? {...r, reply: replyText} : r));
    setReplyId(null);
    setReplyText('');
    alert('回复成功！评价仅支持回复 1 次。');
  };

  return (
    <div className="fixed inset-0 bg-[#F7F9FA] z-[60] flex flex-col animate-in slide-in-from-right duration-300">
      <div className="bg-white px-5 pt-12 pb-4 flex items-center border-b border-gray-50 shrink-0">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth={2.5}/></svg>
        </button>
        <h2 className="flex-1 text-center font-black text-gray-800 pr-8">评价管理</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {reviews.map(r => (
          <div key={r.id} className="bg-white rounded-2xl p-5 border border-gray-50 shadow-sm space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-[14px] font-black text-gray-800">{r.userName}</span>
                <div className="flex text-emerald-500 text-[10px] mt-1">
                  {Array.from({length: 5}).map((_, i) => <span key={i}>{i < r.rating ? '★' : '☆'}</span>)}
                </div>
              </div>
              <span className="text-[10px] text-gray-300 font-bold">{r.date}</span>
            </div>
            <p className="text-[12px] text-gray-600 leading-relaxed">{r.content}</p>
            {r.images && r.images.length > 0 && (
              <div className="flex gap-2 py-1">
                {r.images.map((img, i) => <img key={i} src={img} className="w-16 h-16 rounded-lg object-cover border border-gray-100" />)}
              </div>
            )}
            {r.reply && (
              <div className="p-3 bg-gray-50 rounded-xl text-[11px] text-gray-500 border border-gray-100">
                <span className="font-bold text-emerald-600">我的回复：</span>{r.reply}
              </div>
            )}
            <div className="flex justify-end gap-3 pt-2">
              {r.rating <= 3 && r.appealStatus === 'none' && (
                <button onClick={() => alert('申诉已提交，请填写理由并上传证据。平台将在 3 个工作日内回复结果。')} className="text-[11px] font-black text-rose-500 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-100">申请申诉</button>
              )}
              {!r.reply && replyId !== r.id && (
                <button onClick={() => setReplyId(r.id)} className="text-[11px] font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">回复评价</button>
              )}
            </div>
            {replyId === r.id && (
              <div className="pt-3 border-t border-gray-50 space-y-3">
                <textarea 
                  value={replyText} onChange={e => setReplyText(e.target.value)}
                  placeholder="请输入您的回复，仅限一次机会..."
                  className="w-full h-20 bg-gray-50 rounded-xl p-3 text-[11px] outline-none border-0 focus:ring-1 focus:ring-emerald-100"
                />
                <div className="flex justify-end gap-2">
                  <button onClick={() => setReplyId(null)} className="text-[11px] font-bold text-gray-400">取消</button>
                  <button onClick={() => handleReply(r.id)} className="bg-emerald-500 text-white px-4 py-1.5 rounded-lg text-[11px] font-bold shadow-md shadow-emerald-100">确认提交</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- 3. 培训中心组件 ---
const TrainingCenterView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const courses: TrainingCourse[] = [
    { id: '1', title: '居家护理合规培训与安全准则', type: 'video', duration: '15:00', isCompleted: true, thumbnail: 'https://picsum.photos/seed/tr1/400/240' },
    { id: '2', title: '静脉穿刺技术提升与标准化考核', type: 'video', duration: '20:00', isCompleted: false, badge: '打针专项', thumbnail: 'https://picsum.photos/seed/tr2/400/240' },
    { id: '3', title: '术后伤口换药技能详解', type: 'article', duration: '8min', isCompleted: false, thumbnail: 'https://picsum.photos/seed/tr3/400/240' }
  ];

  return (
    <div className="fixed inset-0 bg-[#F7F9FA] z-[60] flex flex-col animate-in slide-in-from-right duration-300">
      <div className="bg-white px-5 pt-12 pb-4 flex items-center border-b border-gray-50 shrink-0">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth={2.5}/></svg>
        </button>
        <h2 className="flex-1 text-center font-black text-gray-800 pr-8">服务培训中心</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-4">
          <span className="text-3xl">🏅</span>
          <div>
            <p className="text-[13px] font-black text-emerald-800">技能标签加成</p>
            <p className="text-[10px] text-emerald-600/70 mt-0.5">完成培训并测试满100分即可获得专属标签</p>
          </div>
        </div>
        {courses.map(c => (
          <div key={c.id} className="bg-white rounded-2xl overflow-hidden border border-gray-50 shadow-sm flex flex-col active:scale-[0.98] transition-all">
            <div className="h-32 relative">
              <img src={c.thumbnail} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center text-white text-2xl">{c.type === 'video' ? '▶️' : '📄'}</div>
              {c.badge && <span className="absolute top-2 right-2 bg-amber-500 text-white text-[9px] px-2 py-0.5 rounded-full font-black shadow-sm">完成获勋章: {c.badge}</span>}
            </div>
            <div className="p-4 flex justify-between items-center">
              <div>
                <h4 className="text-[13px] font-black text-gray-800 line-clamp-1">{c.title}</h4>
                <p className="text-[10px] text-gray-400 mt-1 font-bold">{c.duration} · {c.type === 'video' ? '视频课程' : '图文教材'}</p>
              </div>
              <button className={`text-[10px] font-black px-4 py-2 rounded-xl transition-all ${c.isCompleted ? 'bg-gray-50 text-gray-300' : 'bg-emerald-500 text-white shadow-md shadow-emerald-100'}`}>
                {c.isCompleted ? '已完成' : '去学习'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- 4. 安全防护组件 ---
const SafetyProtectionView: React.FC<{ info: NurseInfo, onBack: () => void }> = ({ info, onBack }) => {
  const [contact, setContact] = useState(info.emergencyContact || { name: '', phone: '' });
  const [settings, setSettings] = useState(info.safetySettings || { isLocationSharing: false, isAutoRecording: false });

  return (
    <div className="fixed inset-0 bg-[#F7F9FA] z-[60] flex flex-col animate-in slide-in-from-right duration-300">
      <div className="bg-white px-5 pt-12 pb-4 flex items-center border-b border-gray-50 shrink-0">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth={2.5}/></svg>
        </button>
        <h2 className="flex-1 text-center font-black text-gray-800 pr-8">安全防护</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        <div className="bg-white rounded-2xl p-5 border border-gray-50 shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-[14px] font-black text-gray-800">实时定位共享</p>
              <p className="text-[10px] text-gray-400 mt-1 font-bold">服务期间同步位置，默认关闭</p>
            </div>
            <button 
              onClick={() => setSettings({...settings, isLocationSharing: !settings.isLocationSharing})}
              className={`w-11 h-6 rounded-full relative transition-all duration-300 ${settings.isLocationSharing ? 'bg-emerald-500 shadow-inner' : 'bg-gray-200 shadow-inner'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${settings.isLocationSharing ? 'left-6' : 'left-1'}`} />
            </button>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-[14px] font-black text-gray-800">服务实时录音</p>
              <p className="text-[10px] text-gray-400 mt-1 font-bold">服务中全程录音，保障执业安全</p>
            </div>
            <button 
              onClick={() => setSettings({...settings, isAutoRecording: !settings.isAutoRecording})}
              className={`w-11 h-6 rounded-full relative transition-all duration-300 ${settings.isAutoRecording ? 'bg-emerald-500 shadow-inner' : 'bg-gray-200 shadow-inner'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${settings.isAutoRecording ? 'left-6' : 'left-1'}`} />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-50 shadow-sm">
          <h3 className="text-[12px] font-black text-gray-800 mb-4 uppercase tracking-widest">紧急联系人设置</h3>
          <div className="space-y-4">
            <input 
              value={contact.name} onChange={e => setContact({...contact, name: e.target.value})}
              placeholder="联系人姓名" className="w-full p-4 bg-gray-50 rounded-xl text-[12px] border-0 font-bold" 
            />
            <input 
              value={contact.phone} onChange={e => setContact({...contact, phone: e.target.value})}
              placeholder="联系人手机号" className="w-full p-4 bg-gray-50 rounded-xl text-[12px] border-0 font-bold" 
            />
          </div>
        </div>

        <div className="p-8 bg-rose-50 rounded-[40px] border-2 border-dashed border-rose-100 flex flex-col items-center justify-center text-center shadow-inner">
           <div 
             onClick={() => alert('紧急求助已触发！正在同步实时定位和现场录音给平台及紧急联系人...')}
             className="w-24 h-24 bg-rose-500 rounded-full flex items-center justify-center text-white text-3xl shadow-xl shadow-rose-200 active:scale-90 transition-transform cursor-pointer border-4 border-white"
           >
             🆘
           </div>
           <p className="mt-4 text-[16px] font-black text-rose-600 uppercase tracking-widest">紧急求助</p>
           <p className="text-[10px] text-rose-400 mt-1 px-6 font-bold leading-relaxed">遇到危险点击同步位置、录音及订单信息给平台和家人</p>
        </div>
      </div>
    </div>
  );
};

// --- 5. 业务管理组件 (还原详情内容) ---
const BusinessManagementView: React.FC<{ info: NurseInfo, onBack: () => void }> = ({ info, onBack }) => (
  <div className="fixed inset-0 bg-[#F7F9FA] z-[60] flex flex-col animate-in slide-in-from-right duration-300">
    <div className="bg-white px-5 pt-12 pb-4 flex items-center border-b border-gray-50 shrink-0">
      <button onClick={onBack} className="p-2 -ml-2 text-gray-400">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth={2.5}/></svg>
      </button>
      <h2 className="flex-1 text-center font-black text-gray-800 pr-8">业务管理</h2>
    </div>
    <div className="p-5 space-y-4 overflow-y-auto no-scrollbar pb-safe">
       <div className="bg-white p-6 rounded-2xl border border-gray-50 shadow-sm">
          <h3 className="text-[12px] font-black text-gray-800 mb-5 uppercase tracking-widest">执业资质与证件</h3>
          <div className="grid grid-cols-2 gap-4">
             <div className="aspect-square bg-gray-50 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-gray-100 active:bg-gray-100 transition-colors cursor-pointer">
               <span className="text-2xl mb-1">🪪</span>
               <span className="text-[10px] text-gray-400 font-bold">更新资格证</span>
             </div>
             <div className="aspect-square bg-gray-50 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-gray-100 active:bg-gray-100 transition-colors cursor-pointer">
               <span className="text-2xl mb-1">📜</span>
               <span className="text-[10px] text-gray-400 font-bold">更新执业证</span>
             </div>
          </div>
          <p className="text-[10px] text-emerald-600 mt-4 font-bold text-center">当前状态：已认证 ✓</p>
       </div>
       <div className="bg-white p-6 rounded-2xl border border-gray-50 shadow-sm">
          <h3 className="text-[12px] font-black text-gray-800 mb-5 uppercase tracking-widest">已开通服务</h3>
          <div className="space-y-3">
             {['上门打针', '伤口换药', '静脉采血', 'PICC导管维护'].map(s => (
               <div key={s} className="flex justify-between items-center p-3.5 bg-gray-50 rounded-xl">
                 <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                   <span className="text-[12px] font-bold text-gray-700">{s}</span>
                 </div>
                 <span className="text-[10px] text-emerald-600 font-black">服务中</span>
               </div>
             ))}
          </div>
          <button className="w-full mt-4 py-3 border border-emerald-100 text-emerald-600 text-[11px] font-black rounded-xl active:bg-emerald-50 transition-colors">申请开通更多服务</button>
       </div>
    </div>
  </div>
);

// --- 6. 接单设置组件 (还原内容并增加保存逻辑) ---
const OrderSettingsView: React.FC<{ info: NurseInfo, onBack: () => void, onSave: (distance: number) => void }> = ({ info, onBack, onSave }) => {
  const [distance, setDistance] = useState(info.maxDistance || 10);
  const [selectedSlot, setSelectedSlot] = useState(info.workSlots || 'all');

  return (
    <div className="fixed inset-0 bg-[#F7F9FA] z-[60] flex flex-col animate-in slide-in-from-right duration-300">
      <div className="bg-white px-5 pt-12 pb-4 flex items-center border-b border-gray-50 shrink-0">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth={2.5}/></svg>
        </button>
        <h2 className="flex-1 text-center font-black text-gray-800 pr-8">接单设置</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-50 shadow-sm">
           <div className="flex justify-between items-center mb-6">
             <h4 className="text-[14px] font-black text-gray-800">服务辐射半径</h4>
             <span className="text-emerald-600 font-black text-lg">{distance}km</span>
           </div>
           <input 
              type="range" min="1" max="50" step="1"
              value={distance} 
              onChange={e => setDistance(parseInt(e.target.value))} 
              className="w-full accent-emerald-500 h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer" 
           />
           <div className="flex justify-between mt-2 text-[10px] text-gray-300 font-bold uppercase tracking-widest">
             <span>1km</span>
             <span>50km</span>
           </div>
           <p className="mt-4 text-[10px] text-gray-400 leading-relaxed font-bold">辐射半径指系统向您推送订单的最大直线距离。距离越远订单越多，但路程也越长。</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-50 shadow-sm">
          <h4 className="text-[14px] font-black text-gray-800 mb-4">常用接单时段</h4>
          <div className="grid grid-cols-1 gap-3">
             <div 
               onClick={() => setSelectedSlot('all')}
               className={`p-4 rounded-xl text-[12px] font-black flex justify-between items-center cursor-pointer transition-all border ${selectedSlot === 'all' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-sm' : 'bg-gray-50 text-gray-400 border-transparent'}`}
             >
               <span>全天候接单 (00:00 - 23:59)</span>
               {selectedSlot === 'all' && <span>✓</span>}
             </div>
             <div 
               onClick={() => setSelectedSlot('weekend')}
               className={`p-4 rounded-xl text-[12px] font-black flex justify-between items-center cursor-pointer transition-all border ${selectedSlot === 'weekend' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-sm' : 'bg-gray-50 text-gray-400 border-transparent'}`}
             >
               <span>仅周末接单 (周六 & 周日)</span>
               {selectedSlot === 'weekend' && <span>✓</span>}
             </div>
             <div className="p-4 bg-gray-50 text-gray-400 rounded-xl text-[12px] font-bold border border-transparent">
               <span>自定义时段 (暂未开放)</span>
             </div>
          </div>
        </div>
      </div>
      <div className="p-5 bg-white border-t border-gray-50">
        <button 
          onClick={() => onSave(distance)}
          className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-black shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all"
        >
          保存接单配置
        </button>
      </div>
    </div>
  );
};

// --- 主视图 ---
const NurseProfileView: React.FC<NurseProfileViewProps> = ({ nurseInfo, onSwitchRole, onUpdateInfo }) => {
  const [subView, setSubView] = useState<null | 'earnings' | 'edit' | 'review' | 'training' | 'safety' | 'business' | 'settings'>(null);
  const expiryDays = 25; // 模拟剩余天数

  const handleEditSave = (data: any) => {
    onUpdateInfo({ ...nurseInfo, bio: data.bio, experienceRange: data.expRange });
    setSubView(null);
    alert('资料更新成功！您的专业形象已刷新。');
  };

  const handleSettingsSave = (distance: number) => {
    onUpdateInfo({ ...nurseInfo, maxDistance: distance });
    setSubView(null);
    alert('接单设置已更新！工作台将同步显示最新接收范围。');
  };

  if (subView === 'earnings') return <NurseEarningsView onBack={() => setSubView(null)} />;
  if (subView === 'edit') return <ProfileEditView info={nurseInfo} onBack={() => setSubView(null)} onSave={handleEditSave} />;
  if (subView === 'review') return <ReviewListView onBack={() => setSubView(null)} />;
  if (subView === 'training') return <TrainingCenterView onBack={() => setSubView(null)} />;
  if (subView === 'safety') return <SafetyProtectionView info={nurseInfo} onBack={() => setSubView(null)} />;
  if (subView === 'business') return <BusinessManagementView info={nurseInfo} onBack={() => setSubView(null)} />;
  if (subView === 'settings') return <OrderSettingsView info={nurseInfo} onBack={() => setSubView(null)} onSave={handleSettingsSave} />;

  return (
    <div className="min-h-screen pb-28 bg-[#F7F9FA]">
      <div className="bg-white px-6 pt-16 pb-12 rounded-b-[40px] shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 opacity-40"></div>
        <div className="flex items-center gap-5 relative z-10">
          <div className="relative group" onClick={() => setSubView('edit')}>
            <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-xl border-4 border-white transition-transform active:scale-95">
              <img src={nurseInfo.avatar || 'https://picsum.photos/seed/nurse-avatar/160/160'} alt="Nurse" className="w-full h-full object-cover" />
            </div>
            {nurseInfo.certStatus === 'verified' && (
              <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-emerald-500 rounded-xl border-2 border-white flex items-center justify-center shadow-lg">
                <span className="text-[10px] text-white">✓</span>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-gray-800 truncate">{nurseInfo.name}</h2>
              <span className="text-[9px] px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-md font-black uppercase shrink-0">三甲背景</span>
            </div>
            <p className="text-[11px] text-gray-400 mt-1 font-bold truncate">{nurseInfo.hospital}</p>
            <div className="mt-2 flex gap-2">
               <span className="text-[9px] px-2 py-0.5 bg-gray-50 text-gray-400 rounded-md font-black uppercase">{nurseInfo.years}年+经验</span>
               <span className="text-[9px] px-2 py-0.5 bg-amber-50 text-amber-600 rounded-md font-black">打针专项🏅</span>
            </div>
          </div>
          <button onClick={() => setSubView('edit')} className="p-2 text-gray-300 hover:text-emerald-500 transition-colors">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" strokeWidth={2}/></svg>
          </button>
        </div>
      </div>

      <div className="px-5 -mt-6 relative z-10 flex gap-4">
        <div onClick={() => setSubView('earnings')} className="flex-1 bg-white rounded-2xl p-4 shadow-xl border border-gray-50 text-center active:scale-95 transition-all cursor-pointer">
          <p className="text-[9px] text-gray-400 font-bold mb-1 uppercase tracking-widest">累计收益</p>
          <p className="text-xl font-black text-gray-800">¥12,450</p>
          <p className="text-[8px] text-emerald-600 font-black mt-1 uppercase tracking-tighter">账单详情 ></p>
        </div>
        <div onClick={() => setSubView('review')} className="flex-1 bg-white rounded-2xl p-4 shadow-xl border border-gray-50 text-center active:scale-95 transition-all cursor-pointer">
          <p className="text-[9px] text-gray-400 font-bold mb-1 uppercase tracking-widest">服务评分</p>
          <p className="text-xl font-black text-emerald-500">4.92</p>
          <p className="text-[8px] text-gray-400 font-black mt-1 uppercase tracking-tighter">查看评价 ></p>
        </div>
      </div>

      {expiryDays <= 30 && (
        <div onClick={() => setSubView('business')} className="mx-5 mt-6 p-4 bg-orange-50 border border-orange-100 rounded-2xl flex items-center justify-between animate-pulse cursor-pointer shadow-sm shadow-orange-100">
           <div className="flex items-center gap-3">
             <span className="text-xl">⚠️</span>
             <div>
               <p className="text-orange-700 text-[13px] font-black">资质即将过期 (剩{expiryDays}天)</p>
               <p className="text-orange-600 text-[10px] font-bold">请及时更新资质，以免接单受限</p>
             </div>
           </div>
           <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth={3}/></svg>
        </div>
      )}

      <div className="px-5 mt-6 space-y-3">
        <div className="bg-white rounded-[32px] p-2 shadow-sm border border-gray-50">
          {[
            { id: 'training', icon: '🎓', label: '服务培训中心', extra: '合规培训 / 技能提升' },
            { id: 'safety', icon: '🛡️', label: '安全防护中心', extra: '录音 / 一键求助' },
            { id: 'business', icon: '🏥', label: '业务管理', extra: '证件更新 / 服务开通' },
            { id: 'settings', icon: '⚙️', label: '接单设置', extra: '辐射距离 / 常用时段' },
            { id: 'cs', icon: '🎧', label: '专属客服', extra: '护士端优先响应通道' },
          ].map((item, i) => (
            <div 
              key={item.id} 
              onClick={() => setSubView(item.id as any)} 
              className={`p-4 flex justify-between items-center active:bg-gray-50 cursor-pointer transition-colors ${i !== 4 ? 'border-b border-gray-50/50' : ''}`}
            >
               <div className="flex items-center gap-3">
                  <span className="text-xl w-10 h-10 flex items-center justify-center bg-gray-50 rounded-xl group-active:scale-90 transition-transform">{item.icon}</span>
                  <div>
                    <span className="text-[14px] font-black text-gray-800 block">{item.label}</span>
                    <span className="text-[10px] text-gray-300 font-bold uppercase tracking-tight">{item.extra}</span>
                  </div>
               </div>
               <svg className="w-4 h-4 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth={3.5}/></svg>
            </div>
          ))}
        </div>
        <button 
          onClick={onSwitchRole} 
          className="w-full py-5 bg-white border border-rose-100 rounded-[30px] text-[14px] font-black text-rose-500 shadow-sm transition-all active:scale-95 active:bg-rose-50 flex items-center justify-center gap-2"
        >
          <span className="text-lg">🔁</span>
          切换至用户端
        </button>
      </div>
    </div>
  );
};

export default NurseProfileView;
