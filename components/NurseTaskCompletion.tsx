
import React, { useState, useRef, useEffect } from 'react';
import { Order } from '../types';

interface NurseTaskCompletionProps {
  task: Order;
  onBack: () => void;
}

type CompletionStep = 'VERIFY' | 'RECORD' | 'SIGN' | 'PREVIEW';

const NurseTaskCompletion: React.FC<NurseTaskCompletionProps> = ({ task, onBack }) => {
  const [step, setStep] = useState<CompletionStep>('VERIFY');
  const [verifyCode, setVerifyCode] = useState('');
  const [vitals, setVitals] = useState({ bp: '', temp: '', pulse: '' });
  const [images, setImages] = useState<string[]>([]);
  const [summary, setSummary] = useState('');
  const [signature, setSignature] = useState<string | null>(null);
  const [showException, setShowException] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- 电子签名逻辑 ---
  useEffect(() => {
    if (step === 'SIGN' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#1f2937';
        ctx.lineWidth = 3;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
      }
    }
  }, [step]);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    isDrawing.current = true;
    draw(e);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top;

    if (e.type === 'mousedown' || e.type === 'touchstart') {
      ctx.beginPath();
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  const clearSignature = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      setSignature(null);
    }
  };

  const saveSignature = () => {
    if (canvasRef.current) {
      setSignature(canvasRef.current.toDataURL());
      setStep('PREVIEW');
    }
  };

  // --- 核心业务逻辑 ---
  const handleVerify = () => {
    if (verifyCode.length === 6) { 
      setLoading(true);
      // 模拟请求后台同步发送“已上门”通知
      setTimeout(() => {
        setLoading(false);
        setStep('RECORD');
      }, 800);
    } else {
      alert('核销失败：请输入6位完整的核销码。若码无效，请联系客服核实。');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file: File) => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages].slice(0, 5));
    }
  };

  const handleReportException = () => {
    alert('异常已报备！平台客服将在10分钟内介入处理。请保持在现场并确保自身安全。');
    setShowException(false);
    onBack();
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('服务已最终确认完成！结算款项将在24小时内汇入您的钱包。');
      onBack();
    }, 1500);
  };

  const isVitalsComplete = vitals.bp && vitals.temp && vitals.pulse;

  return (
    <div className="min-h-screen bg-[#F7F9FA] pb-32">
      <div className="bg-white px-5 pt-12 pb-4 flex items-center sticky top-0 z-40 border-b border-gray-50">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth={2}/></svg>
        </button>
        <h2 className="flex-1 text-center font-black text-gray-800 pr-8">
          {step === 'VERIFY' ? '上门核销' : step === 'RECORD' ? '填写记录' : step === 'SIGN' ? '用户确认' : '提交核对'}
        </h2>
        <button 
          onClick={() => setShowException(true)}
          className="absolute right-4 text-[11px] font-bold text-rose-500 bg-rose-50 px-2 py-1 rounded-lg border border-rose-100"
        >
          异常报备
        </button>
      </div>

      <div className="p-4 space-y-4">
        {step === 'VERIFY' && (
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-50 text-center animate-in slide-in-from-bottom duration-300">
             <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">🔑</div>
             <h3 className="text-lg font-black text-gray-800">请输入核销码</h3>
             <p className="text-[11px] text-gray-400 mt-2 mb-8">请询问用户索取其订单页显示的 6 位动态核销码</p>
             <input 
               type="tel" maxLength={6}
               value={verifyCode} onChange={e => setVerifyCode(e.target.value)}
               placeholder="0 0 0 0 0 0"
               className="w-full text-center text-3xl font-black tracking-[1em] py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-emerald-500 transition-all outline-none"
             />
             <button 
               onClick={handleVerify}
               disabled={verifyCode.length < 6 || loading}
               className="w-full mt-8 py-4 bg-emerald-500 text-white rounded-2xl font-bold shadow-lg shadow-emerald-500/20 disabled:bg-gray-200"
             >
               {loading ? '校验中...' : '确认核销'}
             </button>
          </div>
        )}

        {step === 'RECORD' && (
          <div className="space-y-4 animate-in slide-in-from-right duration-300">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
              <h3 className="text-[13px] font-black text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-1 h-3 bg-emerald-500 rounded-full"></span> 必填生命体征 (录音开启中 🎙️)
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] text-gray-400 font-bold mb-1 block">血压 (mmHg)</label>
                  <input value={vitals.bp} onChange={e => setVitals({...vitals, bp: e.target.value})} placeholder="120/80" className="w-full p-3 bg-gray-50 rounded-xl text-[12px] font-bold border-0" />
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 font-bold mb-1 block">体温 (℃)</label>
                  <input value={vitals.temp} onChange={e => setVitals({...vitals, temp: e.target.value})} placeholder="36.5" className="w-full p-3 bg-gray-50 rounded-xl text-[12px] font-bold border-0" />
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 font-bold mb-1 block">脉搏 (次/分)</label>
                  <input value={vitals.pulse} onChange={e => setVitals({...vitals, pulse: e.target.value})} placeholder="72" className="w-full p-3 bg-gray-50 rounded-xl text-[12px] font-bold border-0" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
               <h3 className="text-[13px] font-black text-gray-800 mb-4">护理小结 (必填)</h3>
               <textarea 
                 value={summary} onChange={e => setSummary(e.target.value)}
                 placeholder="按模板填写：药品名称、剂量、穿刺情况、备注..."
                 className="w-full h-32 bg-gray-50 rounded-xl p-4 text-[13px] text-gray-700 outline-none border-0 resize-none"
               />
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
              <div className="flex justify-between items-center mb-4">
                 <h3 className="text-[13px] font-black text-gray-800">现场照片 (最多5张)</h3>
                 <span className="text-[10px] text-gray-400">{images.length}/5</span>
              </div>
              <div className="flex flex-wrap gap-2">
                 {images.map((img, i) => (
                   <div key={i} className="w-16 h-16 rounded-xl overflow-hidden relative border border-gray-100">
                     <img src={img} className="w-full h-full object-cover" />
                     <button onClick={() => setImages(images.filter((_, idx) => idx !== i))} className="absolute top-0 right-0 bg-black/40 text-white w-4 h-4 text-[10px] flex items-center justify-center rounded-bl-lg">×</button>
                   </div>
                 ))}
                 {images.length < 5 && (
                   <button onClick={() => fileInputRef.current?.click()} className="w-16 h-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-100 flex items-center justify-center text-gray-300">+</button>
                 )}
              </div>
              <input type="file" ref={fileInputRef} hidden accept="image/*" multiple onChange={handleImageUpload} />
            </div>

            <button 
              disabled={!isVitalsComplete || !summary}
              onClick={() => setStep('SIGN')}
              className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-bold shadow-lg disabled:bg-gray-200"
            >
              下一步：用户电子签名
            </button>
          </div>
        )}

        {step === 'SIGN' && (
          <div className="animate-in zoom-in duration-300">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-black text-gray-800">请用户确认签名</h3>
                  <p className="text-[11px] text-gray-400 mt-1">确认服务已完成且无异议</p>
                </div>
                <button onClick={clearSignature} className="text-[11px] font-bold text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg active:bg-gray-100">清除重签</button>
              </div>
              
              <div className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 h-64 relative touch-none overflow-hidden">
                 <canvas 
                   ref={canvasRef}
                   width={340} height={256}
                   onMouseDown={startDrawing}
                   onMouseMove={draw}
                   onMouseUp={stopDrawing}
                   onMouseLeave={stopDrawing}
                   onTouchStart={startDrawing}
                   onTouchMove={draw}
                   onTouchEnd={stopDrawing}
                   className="w-full h-full cursor-crosshair"
                 />
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl">
                 <p className="text-[10px] text-blue-600 leading-relaxed font-medium">签名后记录将同步至平台存证及用户端。服务流程已完成，感谢您的辛勤付出。</p>
              </div>
            </div>

            <button 
              onClick={saveSignature}
              className="w-full mt-6 py-4 bg-emerald-500 text-white rounded-2xl font-bold shadow-lg active:scale-95 transition-all"
            >
              完成并预览核对
            </button>
          </div>
        )}

        {step === 'PREVIEW' && (
          <div className="space-y-4 animate-in slide-in-from-bottom duration-300">
             <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-50">
                <h3 className="text-base font-black text-gray-800 mb-6">最后核对确认</h3>
                <div className="space-y-6">
                  <div className="flex justify-between">
                    <span className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">服务对象</span>
                    <span className="text-[13px] font-black text-gray-800">{task.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">体征记录</span>
                    <span className="text-[11px] font-bold text-emerald-600">BP:{vitals.bp} | T:{vitals.temp}℃</span>
                  </div>
                  <div className="pt-4 border-t border-gray-50">
                    <span className="text-[11px] text-gray-400 font-bold uppercase tracking-widest block mb-2">用户签名</span>
                    <div className="bg-gray-50 rounded-xl p-2 h-24 flex items-center justify-center border border-gray-100">
                      {signature && <img src={signature} className="h-full object-contain" />}
                    </div>
                  </div>
                </div>
             </div>

             <button 
               onClick={handleSubmit}
               disabled={loading}
               className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2"
             >
               {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : '提交并结束服务'}
             </button>
          </div>
        )}
      </div>

      {showException && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowException(false)}></div>
          <div className="bg-white w-full rounded-3xl p-6 relative animate-in zoom-in-95">
             <h3 className="text-lg font-black text-rose-600 mb-2">发起异常报备</h3>
             <div className="space-y-3 mt-6">
               {['患者突发不适/过敏', '药品规格不符', '不配合/纠纷'].map(e => (
                 <button key={e} onClick={handleReportException} className="w-full py-3 text-left px-4 bg-gray-50 rounded-xl text-[12px] font-bold text-gray-700 active:bg-rose-50 transition-colors">
                   {e}
                 </button>
               ))}
             </div>
             <button onClick={() => setShowException(false)} className="w-full mt-6 py-3 text-center text-gray-300 font-bold text-[12px]">取消</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NurseTaskCompletion;
