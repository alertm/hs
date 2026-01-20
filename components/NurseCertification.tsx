
import React, { useState, useRef } from 'react';
import { ProviderType } from '../types';

interface NurseCertificationProps {
  onBack: () => void;
}

const DISTRICTS = ['浦东新区', '黄浦区', '静安区', '徐汇区', '长宁区', '普陀区', '虹口区', '杨浦区', '闵行区', '宝山区'];

const NurseCertification: React.FC<NurseCertificationProps> = ({ onBack }) => {
  const [step, setStep] = useState(0); // 0: 角色, 1: 基础信息, 2: 资质上传, 3: 实人核验, 4: 完成
  const [role, setRole] = useState<ProviderType>('nurse');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '上海市',
    areas: [] as string[],
    address: '',
  });

  const [certs, setCerts] = useState({
    nurseCert: null as string | null,
    practiceCert: null as string | null,
    specialCerts: [] as string[],
  });

  const [isVerifyingFace, setIsVerifyingFace] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [activeCertType, setActiveCertType] = useState<'nurse' | 'practice' | 'special'>('nurse');

  const handleAreaToggle = (area: string) => {
    if (formData.areas.includes(area)) {
      setFormData({ ...formData, areas: formData.areas.filter(a => a !== area) });
    } else if (formData.areas.length < 2) {
      setFormData({ ...formData, areas: [...formData.areas, area] });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (activeCertType === 'nurse') setCerts({ ...certs, nurseCert: url });
      else if (activeCertType === 'practice') setCerts({ ...certs, practiceCert: url });
      else setCerts({ ...certs, specialCerts: [...certs.specialCerts, url] });
    }
  };

  const startFaceVerify = () => {
    setIsVerifyingFace(true);
    setTimeout(() => {
      setIsVerifyingFace(false);
      setStep(4);
    }, 2500);
  };

  const renderStep0 = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-black text-gray-800">请选择入驻角色</h2>
        <p className="text-sm text-gray-400 mt-2">基于您的执业资质选择对应的进驻类型</p>
      </div>
      <div className="space-y-4">
        {[
          { id: 'nurse', label: '执业护士', icon: '👩‍⚕️', desc: '提供打针、采血、换药等基础护理' },
          { id: 'rehab', label: '康复师', icon: '🧘', desc: '提供中医推拿、术后康复评估指导' },
          { id: 'doctor', label: '执业医生', icon: '👨‍⚕️', desc: '提供上门会诊、健康管理咨询' },
        ].map(item => (
          <div 
            key={item.id}
            onClick={() => { setRole(item.id as ProviderType); setStep(1); }}
            className="bg-white p-5 rounded-2xl border-2 border-transparent hover:border-emerald-500 shadow-sm flex items-center gap-5 active:scale-95 transition-all cursor-pointer"
          >
            <span className="text-4xl">{item.icon}</span>
            <div className="flex-1">
              <h4 className="font-black text-gray-800">{item.label}</h4>
              <p className="text-xs text-gray-400 mt-1">{item.desc}</p>
            </div>
            <span className="text-emerald-500 font-bold">→</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6 animate-in slide-in-from-right">
      <div className="bg-white p-6 rounded-2xl shadow-sm space-y-5">
        <h3 className="text-sm font-black text-gray-800 flex items-center gap-2">
          <span className="w-1 h-3 bg-emerald-500 rounded-full"></span> 基础信息填写
        </h3>
        <input 
          type="text" placeholder="真实姓名" 
          value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
          className="w-full p-4 bg-gray-50 rounded-xl text-sm border-0 focus:ring-1 focus:ring-emerald-500"
        />
        <input 
          type="tel" placeholder="联系手机号" 
          value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
          className="w-full p-4 bg-gray-50 rounded-xl text-sm border-0 focus:ring-1 focus:ring-emerald-500"
        />
        <div>
          <label className="text-xs font-bold text-gray-400 mb-2 block uppercase">服务区域 (最多选2个区)</label>
          <div className="flex flex-wrap gap-2">
            {DISTRICTS.map(d => (
              <button 
                key={d} onClick={() => handleAreaToggle(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${formData.areas.includes(d) ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white text-gray-400 border-gray-100'}`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
        <textarea 
          placeholder="详细联系地址" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})}
          className="w-full h-24 p-4 bg-gray-50 rounded-xl text-sm border-0 focus:ring-1 focus:ring-emerald-500 resize-none"
        />
      </div>
      <button onClick={() => setStep(2)} className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-bold shadow-lg shadow-emerald-500/20">下一步：资质上传</button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 animate-in slide-in-from-right">
      <div className="bg-white p-6 rounded-2xl shadow-sm space-y-6">
        <h3 className="text-sm font-black text-gray-800 flex items-center gap-2">
          <span className="w-1 h-3 bg-emerald-500 rounded-full"></span> 执业资质上传
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div onClick={() => { setActiveCertType('nurse'); fileRef.current?.click(); }} className="aspect-[4/3] bg-gray-50 rounded-xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center relative overflow-hidden">
            {certs.nurseCert ? <img src={certs.nurseCert} className="w-full h-full object-cover" /> : <><span className="text-2xl mb-1">🪪</span><span className="text-[10px] text-gray-400 font-bold">资格证照片</span></>}
            {certs.nurseCert && <div className="absolute top-0 right-0 bg-black/40 text-white p-1 text-[9px]">重传</div>}
          </div>
          <div onClick={() => { setActiveCertType('practice'); fileRef.current?.click(); }} className="aspect-[4/3] bg-gray-50 rounded-xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center relative overflow-hidden">
            {certs.practiceCert ? <img src={certs.practiceCert} className="w-full h-full object-cover" /> : <><span className="text-2xl mb-1">📜</span><span className="text-[10px] text-gray-400 font-bold">执业证照片</span></>}
            {certs.practiceCert && <div className="absolute top-0 right-0 bg-black/40 text-white p-1 text-[9px]">重传</div>}
          </div>
        </div>
        <div>
          <label className="text-xs font-bold text-gray-800 mb-3 block">专项培训证书 (PICC/伤口/造口等)</label>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {certs.specialCerts.map((url, i) => (
              <img key={i} src={url} className="w-20 h-20 rounded-lg object-cover border border-gray-100" />
            ))}
            <div onClick={() => { setActiveCertType('special'); fileRef.current?.click(); }} className="w-20 h-20 shrink-0 bg-gray-50 rounded-lg border-2 border-dashed border-gray-100 flex items-center justify-center text-gray-300 text-xl">+</div>
          </div>
        </div>
      </div>
      <input type="file" ref={fileRef} hidden onChange={handleFileUpload} />
      <button 
        disabled={!certs.nurseCert || !certs.practiceCert}
        onClick={() => setStep(3)} 
        className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-bold shadow-lg shadow-emerald-500/20 disabled:bg-gray-200"
      >
        下一步：实人核验
      </button>
    </div>
  );

  const renderStep3 = () => (
    <div className="flex flex-col items-center justify-center py-20 animate-in zoom-in">
       {!isVerifyingFace ? (
         <>
           <div className="w-40 h-40 bg-emerald-50 rounded-full flex items-center justify-center mb-8 relative">
              <span className="text-6xl">🎭</span>
              <div className="absolute inset-0 border-4 border-emerald-500/20 rounded-full animate-ping"></div>
           </div>
           <h2 className="text-xl font-black text-gray-800">实人身份核验</h2>
           <p className="text-sm text-gray-400 mt-2 text-center px-10 leading-relaxed">请保持光线充足，正对摄像头，完成人脸识别核验。</p>
           <button onClick={startFaceVerify} className="mt-12 w-full bg-emerald-500 text-white py-4 rounded-2xl font-bold">开始核验</button>
         </>
       ) : (
         <div className="flex flex-col items-center">
            <div className="w-64 h-64 border-4 border-emerald-500 rounded-full relative overflow-hidden flex items-center justify-center bg-gray-100">
               <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500 shadow-[0_0_15px_#10B981] animate-bounce-slow"></div>
               <span className="text-4xl grayscale">👤</span>
            </div>
            <p className="mt-10 font-black text-emerald-600 animate-pulse">正在核验身份...</p>
         </div>
       )}
    </div>
  );

  const renderStep4 = () => (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-in slide-in-from-bottom">
       <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-4xl mb-6 shadow-inner">📬</div>
       <h2 className="text-2xl font-black text-gray-800">认证申请已提交</h2>
       <p className="text-sm text-gray-400 mt-4 px-10 leading-relaxed">平台将在 1-3 个工作日内完成审核。审核结果将实时推送至您的消息通知。</p>
       <div className="mt-10 p-5 bg-blue-50 border border-blue-100 rounded-2xl text-left w-full">
         <h4 className="text-[12px] font-black text-blue-800 mb-2 flex items-center gap-1">🏛️ 线下复核告知</h4>
         <p className="text-[11px] text-blue-600/80 leading-relaxed">
           重点城市可能通过 <span className="font-bold underline">18582227595</span> 进行线下复核。
         </p>
       </div>
       <button onClick={onBack} className="mt-12 w-full bg-emerald-500 text-white py-4 rounded-2xl font-bold shadow-lg">完成并返回</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F7F9FA] flex flex-col">
      <div className="bg-white px-5 pt-12 pb-4 flex items-center border-b border-gray-50 sticky top-0 z-50 shadow-sm">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth={2.5}/></svg>
        </button>
        <h2 className="flex-1 text-center font-black text-gray-800 pr-8">资质认证</h2>
      </div>
      <div className="px-6 py-6 flex-1">
        {step > 0 && step < 4 && (
          <div className="flex gap-1 mb-8">
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-1.5 flex-1 rounded-full ${step >= i ? 'bg-emerald-500' : 'bg-gray-200'}`} />
            ))}
          </div>
        )}
        {step === 0 && renderStep0()}
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
      </div>
      <style>{`
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(256px); } }
        .animate-bounce-slow { animation: bounce-slow 3s infinite ease-in-out; }
      `}</style>
    </div>
  );
};

export default NurseCertification;
