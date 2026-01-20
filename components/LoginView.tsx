
import React, { useState, useEffect } from 'react';
import { AuthState } from '../types';

interface LoginViewProps {
  onLoginSuccess: (auth: AuthState) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
  const [step, setStep] = useState<'wechat' | 'phone'>('wechat');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timer: number;
    if (countdown > 0) {
      timer = window.setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleWechatLogin = () => {
    setLoading(true);
    // 模拟微信授权
    setTimeout(() => {
      setLoading(false);
      setStep('phone');
    }, 800);
  };

  const handleGetCode = () => {
    if (!/^1[3-9]\d{9}$/.test(phone)) return alert('请输入正确的手机号');
    setCountdown(60);
    // 提示用户当前处于演示模式
    console.log('演示模式：验证码已发送');
  };

  const handleVerifyPhone = () => {
    if (!phone) return alert('请输入手机号');
    
    setLoading(true);
    // 模拟登录过程，当前阶段不做验证码校验
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess({
        isLoggedIn: true,
        isPhoneVerified: true,
        phoneNumber: phone,
        nickname: '微信用户',
        avatar: 'https://picsum.photos/seed/user-avatar/160/160'
      });
    }, 800);
  };

  if (step === 'wechat') {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center px-8 pt-24">
        <div className="w-20 h-20 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200 mb-6">
          <span className="text-white text-3xl font-black">站</span>
        </div>
        <h1 className="text-2xl font-black text-gray-800 mb-2">护士站</h1>
        <p className="text-sm text-gray-400 mb-20 text-center px-4">专业、便捷、放心的居家医疗护理服务平台</p>

        <button
          onClick={handleWechatLogin}
          disabled={loading}
          className="w-full bg-[#07C160] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 active:scale-[0.98] transition-all disabled:opacity-50"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.502 12.002c0 .324-.263.587-.587.587H6.208a.587.587 0 110-1.174h1.707c.324 0 .587.263.587.587zm5.996 0c0 .324-.263.587-.587.587h-1.707a.587.587 0 110-1.174h1.707c.324 0 .587.263.587.587zm8.303-1.424C22.801 5.341 17.962 1 12 1S1.199 5.341.199 10.578c0 3.125 1.707 5.918 4.394 7.742-.146.537-.537 1.953-.635 2.344-.146.488.146.488.342.342.195-.146 2.636-1.709 3.662-2.393.195.049.39.049.586.098 5.469-.049 9.814-3.516 11.23-8.133zm-11.23 6.641c-.439 0-.879-.049-1.318-.098L6.452 19.346c.098-.342.342-1.367.439-1.709-2.344-1.514-3.809-3.955-3.809-6.592 0-4.395 4.053-7.959 8.917-7.959s8.917 3.564 8.917 7.959c0 4.395-4.053 7.959-8.917 7.959z" />
              </svg>
              <span>微信一键登录</span>
            </>
          )}
        </button>
        <p className="mt-6 text-[11px] text-gray-400">登录即代表您同意《服务协议》与《隐私政策》</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-8 pt-16">
      <h2 className="text-2xl font-black text-gray-800 mb-2">绑定手机号</h2>
      <p className="text-sm text-gray-400 mb-10">为了保障服务安全，请验证您的手机号码</p>

      <div className="space-y-4">
        <div className="bg-gray-50 rounded-xl p-4 flex items-center border border-transparent focus-within:border-emerald-500/20 transition-all">
          <span className="text-gray-400 font-bold mr-3">+86</span>
          <input
            type="tel"
            placeholder="请输入手机号"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
            className="flex-1 bg-transparent outline-none text-[15px] font-bold text-gray-800"
          />
        </div>

        <div className="flex gap-3">
          <div className="flex-1 bg-gray-50 rounded-xl p-4 border border-transparent focus-within:border-emerald-500/20 transition-all">
            <input
              type="number"
              placeholder="验证码 (演示阶段可不填)"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full bg-transparent outline-none text-[15px] font-bold text-gray-800"
            />
          </div>
          <button
            onClick={handleGetCode}
            disabled={countdown > 0}
            className={`px-4 rounded-xl text-[12px] font-bold transition-all ${
              countdown > 0 ? 'text-gray-400 bg-gray-50' : 'text-emerald-600 bg-emerald-50 active:bg-emerald-100'
            }`}
          >
            {countdown > 0 ? `${countdown}s后重发` : '获取验证码'}
          </button>
        </div>

        <button
          onClick={handleVerifyPhone}
          disabled={loading || !phone}
          className="w-full bg-emerald-500 text-white py-4 rounded-xl font-bold mt-10 shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all disabled:opacity-50"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
          ) : (
            '立即绑定并登录'
          )}
        </button>
        
        <p className="mt-4 text-[10px] text-gray-300 text-center italic">
          注：演示期间已关闭强制验证码校验，输入手机号即可进入。
        </p>
      </div>
    </div>
  );
};

export default LoginView;
