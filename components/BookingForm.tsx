
import React, { useState, useRef, useEffect } from 'react';
import { Service, Nurse, Patient, Address, Coupon } from '../types';
import { MOCK_PATIENTS, MOCK_ADDRESSES, MOCK_COUPONS } from '../constants';

interface BookingFormProps {
  service: Service;
  nurse: Nurse | null;
  onBack: () => void;
  onSuccess: (orderId: string) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ service, nurse, onBack, onSuccess }) => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(MOCK_PATIENTS[0]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(MOCK_ADDRESSES[0]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [activeDate, setActiveDate] = useState<number>(0);
  const [isAgreementAccepted, setIsAgreementAccepted] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [proofImages, setProofImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showPaymentModal && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [showPaymentModal, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      label: i === 0 ? '今日' : i === 1 ? '明日' : `${d.getMonth() + 1}/${d.getDate()}`,
      full: d.toISOString().split('T')[0]
    };
  });

  const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
  const fullBookedSlots = ['11:00', '15:00'];

  const currentPrice = service.price - (selectedCoupon?.amount || 0);

  const handleStartPayment = () => {
    if (!selectedPatient) return alert('请选择或添加被服务人');
    if (!selectedAddress) return alert('请设置服务地址');
    if (!selectedTime) return alert('请选择预约时间');
    if (proofImages.length === 0) return alert('请上传就医证明');
    if (!isAgreementAccepted) return alert('请阅读并勾选预约协议');
    setShowPaymentModal(true);
  };

  const confirmPayment = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess(`ORD${Date.now().toString().slice(-8)}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F7F9FA] pb-32">
      <div className="bg-white px-5 pt-12 pb-4 flex items-center sticky top-0 z-40 border-b border-gray-50">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth={2.5}/></svg>
        </button>
        <h2 className="flex-1 text-center font-bold text-gray-800 pr-8 uppercase tracking-widest text-[14px]">确认预约</h2>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-50 overflow-hidden">
          <div className="p-5 flex items-center justify-between active:bg-gray-50 cursor-pointer">
            <div className="flex gap-4">
              <div className="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 shrink-0">📍</div>
              <div>
                 {selectedAddress ? (
                   <>
                    <p className="text-[13px] font-black text-gray-800">{selectedAddress.address}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{selectedAddress.name} {selectedAddress.phone}</p>
                   </>
                 ) : (
                   <p className="text-[13px] font-bold text-gray-400">请添加服务地址</p>
                 )}
              </div>
            </div>
            <svg className="w-4 h-4 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth={2.5}/></svg>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-50">
          <h3 className="text-[12px] font-bold text-gray-800 mb-4">被服务人信息</h3>
          <div className="flex gap-3 overflow-x-auto no-scrollbar">
             {MOCK_PATIENTS.map(p => (
               <div 
                key={p.id}
                onClick={() => setSelectedPatient(p)}
                className={`min-w-[100px] p-3 rounded-lg border transition-all cursor-pointer ${
                  selectedPatient?.id === p.id ? 'bg-emerald-50 border-emerald-500' : 'bg-gray-50 border-transparent'
                }`}
               >
                 <p className="text-[11px] font-bold text-gray-800">{p.name}</p>
                 <p className="text-[9px] text-gray-400 mt-0.5">{p.gender} {p.age}岁</p>
               </div>
             ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-50">
           <h3 className="text-[12px] font-bold text-gray-800 mb-4">预约上门时间</h3>
          <div className="flex gap-4 mb-4 overflow-x-auto no-scrollbar pb-1">
            {dates.map((d, i) => (
              <div 
                key={i} 
                onClick={() => setActiveDate(i)}
                className={`shrink-0 flex flex-col items-center gap-1 cursor-pointer ${activeDate === i ? 'text-emerald-600' : 'text-gray-400'}`}
              >
                <span className="text-[10px] font-bold">{d.label}</span>
                <div className={`w-1 h-1 rounded-full ${activeDate === i ? 'bg-emerald-500' : 'bg-transparent'}`}></div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {timeSlots.map(slot => (
              <button
                key={slot}
                disabled={fullBookedSlots.includes(slot)}
                onClick={() => setSelectedTime(`${dates[activeDate].label} ${slot}`)}
                className={`py-2 rounded-md text-[10px] font-bold border transition-all ${
                  selectedTime.includes(slot) && selectedTime.includes(dates[activeDate].label)
                    ? 'bg-emerald-500 text-white border-emerald-500' 
                    : 'bg-white text-gray-600 border-gray-100'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-50">
           <h3 className="text-[12px] font-bold text-gray-800 mb-1">证明上传</h3>
           <p className="text-[9px] text-gray-400 mb-4 font-bold">请上传医院开具的处方、医嘱截图</p>
           <div className="flex gap-3">
             {proofImages.map((img, i) => (
               <div key={i} className="w-14 h-14 rounded-lg overflow-hidden border border-gray-100 relative">
                 <img src={img} className="w-full h-full object-cover" />
                 <button onClick={() => setProofImages(proofImages.filter((_, idx) => idx !== i))} className="absolute top-0 right-0 bg-black/40 text-white w-4 h-4 text-[10px] flex items-center justify-center rounded-bl-md">×</button>
               </div>
             ))}
             {proofImages.length < 3 && (
               <div onClick={() => fileInputRef.current?.click()} className="w-14 h-14 rounded-lg border-2 border-dashed border-gray-100 bg-gray-50 flex items-center justify-center text-gray-300">
                 <span className="text-lg">+</span>
                 <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={(e) => {
                   if (e.target.files?.[0]) setProofImages([...proofImages, URL.createObjectURL(e.target.files[0])]);
                 }} />
               </div>
             )}
           </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-50 flex justify-between items-center">
          <span className="text-[12px] font-black text-gray-800">实付金额</span>
          <span className="text-lg font-black text-emerald-600">¥{currentPrice}</span>
        </div>

        <div className="flex items-start gap-2 pt-2 px-1">
          <input type="checkbox" checked={isAgreementAccepted} onChange={e => setIsAgreementAccepted(e.target.checked)} className="mt-1 w-3.5 h-3.5 accent-emerald-500" />
          <p className="text-[10px] text-gray-400">我已阅读并同意 <span className="text-emerald-600 font-bold">《用户预约服务协议》</span></p>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-5 pb-safe z-50 flex items-center justify-between shadow-2xl">
        <div className="flex flex-col">
          <span className="text-[9px] text-gray-400 font-bold">总计</span>
          <span className="text-lg font-black text-emerald-600">¥{currentPrice}</span>
        </div>
        <button 
          onClick={handleStartPayment}
          className={`px-10 py-3.5 rounded-lg font-black transition-all ${
            isAgreementAccepted ? 'bg-emerald-500 text-white shadow-sm' : 'bg-gray-100 text-gray-300'
          }`}
        >
          立即支付
        </button>
      </div>

      {showPaymentModal && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center sm:justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => !isSubmitting && setShowPaymentModal(false)}></div>
          <div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-xl overflow-hidden relative animate-in slide-in-from-bottom duration-300 shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <button onClick={() => !isSubmitting && setShowPaymentModal(false)} className="text-gray-400 p-1">×</button>
                <span className="font-bold text-gray-800 text-sm">确认付款</span>
                <div className="w-4"></div>
              </div>
              <div className="text-center mb-8">
                <p className="text-[11px] text-gray-400 mb-1">支付剩余时间 {formatTime(timeLeft)}</p>
                <p className="text-3xl font-black">¥{currentPrice.toFixed(2)}</p>
              </div>
              <button onClick={confirmPayment} disabled={isSubmitting || timeLeft <= 0} className="w-full py-4 bg-[#07C160] text-white rounded-xl font-bold text-base flex items-center justify-center gap-3">
                {isSubmitting ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "确认支付"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
