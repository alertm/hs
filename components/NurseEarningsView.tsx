
import React, { useState } from 'react';
import { Transaction, WithdrawalRecord, EarningsStats } from '../types';

interface NurseEarningsViewProps {
  onBack: () => void;
}

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'TRX001',
    orderId: 'ORD12345',
    serviceName: '上门导尿护理',
    baseIncome: 180,
    commission: 54,
    subsidy: 15,
    totalAmount: 141,
    status: 'settled',
    date: '2024-05-24',
    subsidyReason: '紧急订单补贴'
  },
  {
    id: 'TRX002',
    orderId: 'ORD12346',
    serviceName: '护士上门打针',
    baseIncome: 89,
    commission: 26.7,
    subsidy: 20,
    totalAmount: 82.3,
    status: 'pending',
    date: '2024-05-24',
    subsidyReason: '新护士首单补贴'
  }
];

const MOCK_STATS: EarningsStats = {
  monthlyIncome: 4580.5,
  orderCount: 42,
  positiveRate: 0.99,
  avgOrderPrice: 109.05,
  trend: [
    { date: '05-18', amount: 120 },
    { date: '05-19', amount: 350 },
    { date: '05-20', amount: 180 },
    { date: '05-21', amount: 420 },
    { date: '05-22', amount: 200 },
    { date: '05-23', amount: 310 },
    { date: '05-24', amount: 220 },
  ]
};

const NurseEarningsView: React.FC<NurseEarningsViewProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'detail' | 'withdraw' | 'stats'>('detail');
  const [filter, setFilter] = useState<'day' | 'week' | 'month'>('day');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [bankCard, setBankCard] = useState('招商银行 (尾号 8888)');
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount < 100) {
      alert('最低提现金额为 100 元');
      return;
    }
    setIsWithdrawing(true);
    setTimeout(() => {
      setIsWithdrawing(false);
      setWithdrawAmount('');
      alert('提现申请已提交！平台将在 3 个工作日内审核完毕，资金将于下周三前到账。');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F7F9FA] pb-20">
      <div className="bg-white px-5 pt-12 pb-4 flex items-center sticky top-0 z-40 border-b border-gray-50">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth={2}/></svg>
        </button>
        <h2 className="flex-1 text-center font-black text-gray-800 pr-8">收益管理</h2>
      </div>

      <div className="flex bg-white px-2 sticky top-[88px] z-30 border-b border-gray-50 overflow-x-auto no-scrollbar">
        {[
          { label: '收入明细', value: 'detail' },
          { label: '提现管理', value: 'withdraw' },
          { label: '账单统计', value: 'stats' }
        ].map(t => (
          <button 
            key={t.value} onClick={() => setActiveTab(t.value as any)}
            className={`flex-1 py-4 text-[13px] font-bold transition-all relative ${activeTab === t.value ? 'text-emerald-600' : 'text-gray-400'}`}
          >
            {t.label}
            {activeTab === t.value && <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-emerald-500 rounded-full" />}
          </button>
        ))}
      </div>

      <div className="p-4 space-y-4">
        {activeTab === 'detail' && (
          <>
            <div className="flex gap-2 mb-2">
              {['日', '周', '月'].map(f => (
                <button 
                  key={f} onClick={() => setFilter(f === '日' ? 'day' : f === '周' ? 'week' : 'month')}
                  className={`px-4 py-1.5 rounded-full text-[11px] font-bold border transition-all ${filter === (f === '日' ? 'day' : f === '周' ? 'week' : 'month') ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white text-gray-400 border-gray-100'}`}
                >
                  {f}筛选
                </button>
              ))}
            </div>
            <div className="space-y-4">
              {MOCK_TRANSACTIONS.map(trx => (
                <div key={trx.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-[14px] font-black text-gray-800">{trx.serviceName}</h4>
                      <p className="text-[10px] text-gray-300 mt-1">{trx.date} · 单号:{trx.orderId}</p>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${trx.status === 'settled' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'}`}>
                      {trx.status === 'settled' ? '已结算' : '待结算'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-y-2 py-3 border-y border-gray-50 text-[11px]">
                    <div className="flex justify-between pr-4 border-r border-gray-50">
                      <span className="text-gray-400">服务收入</span>
                      <span className="text-gray-700 font-bold">¥{trx.baseIncome}</span>
                    </div>
                    <div className="flex justify-between pl-4">
                      <span className="text-gray-400">平台佣金</span>
                      <span className="text-rose-500 font-bold">-¥{trx.commission}</span>
                    </div>
                    {trx.subsidy > 0 && (
                      <div className="col-span-2 flex justify-between pt-1">
                        <span className="text-emerald-600 font-bold italic">{trx.subsidyReason}</span>
                        <span className="text-emerald-600 font-bold">+¥{trx.subsidy}</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-[12px] font-black text-gray-800">实得金额</span>
                    <span className="text-lg font-black text-emerald-600">¥{trx.totalAmount}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'withdraw' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
              <h3 className="text-sm font-black text-gray-800 mb-6">我的提现</h3>
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <p className="text-[10px] text-gray-400 font-bold mb-2">到账银行卡 (需实名一致)</p>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] font-black text-gray-700">{bankCard}</span>
                  <button className="text-emerald-600 text-[11px] font-bold">修改</button>
                </div>
              </div>
              <div className="mb-6">
                <p className="text-[10px] text-gray-400 font-bold mb-3">提现金额 (最低 ¥100)</p>
                <div className="flex items-baseline gap-2 border-b-2 border-emerald-500 pb-2">
                  <span className="text-2xl font-black">¥</span>
                  <input 
                    type="number" value={withdrawAmount} onChange={e => setWithdrawAmount(e.target.value)}
                    placeholder="请输入金额"
                    className="w-full text-3xl font-black outline-none bg-transparent"
                  />
                </div>
                <div className="flex justify-between mt-3 text-[10px] text-gray-400 font-bold">
                   <span>可提现余额: ¥1,245.00</span>
                   <button onClick={() => setWithdrawAmount('1245')} className="text-emerald-600">全部提现</button>
                </div>
              </div>
              <button 
                onClick={handleWithdraw}
                disabled={isWithdrawing}
                className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-bold shadow-lg shadow-emerald-500/20 active:scale-95 transition-all disabled:opacity-50"
              >
                {isWithdrawing ? '处理中...' : '申请提现 (周提 T+3 到账)'}
              </button>
            </div>
            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
               <h4 className="text-[12px] font-black text-blue-800 mb-2">提现规则说明</h4>
               <ul className="text-[10px] text-blue-600/80 space-y-1 list-disc pl-4">
                 <li>提现方式：每周提现一次，每周三统一对上周申请进行结算到账。</li>
                 <li>审核时长：提现申请提交后 3 个工作日内完成审核。</li>
                 <li>手续费：暂不收取手续费。</li>
               </ul>
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-black text-gray-800">5月数据概览</h3>
                <button className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded">历史账单</button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                   <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">月度总收入</p>
                   <p className="text-xl font-black text-gray-800 mt-1">¥{MOCK_STATS.monthlyIncome}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                   <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">累计接单</p>
                   <p className="text-xl font-black text-gray-800 mt-1">{MOCK_STATS.orderCount} 单</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                   <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">服务好评率</p>
                   <p className="text-xl font-black text-emerald-500 mt-1">{MOCK_STATS.positiveRate * 100}%</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                   <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">平均客单价</p>
                   <p className="text-xl font-black text-gray-800 mt-1">¥{MOCK_STATS.avgOrderPrice}</p>
                </div>
              </div>

              <div className="mt-8">
                 <p className="text-[11px] text-gray-400 font-bold mb-4">近7日收入趋势</p>
                 <div className="h-32 flex items-end justify-between gap-2 px-2">
                    {MOCK_STATS.trend.map((item, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <div 
                          className="w-full bg-emerald-500/80 rounded-t-md transition-all hover:bg-emerald-500" 
                          style={{ height: `${(item.amount / 500) * 100}%` }}
                        ></div>
                        <span className="text-[8px] text-gray-300 font-bold">{item.date}</span>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
               <h3 className="text-[13px] font-black text-gray-800 mb-4">补贴规则说明</h3>
               <div className="space-y-3">
                 <div className="flex justify-between p-3 bg-emerald-50/30 rounded-lg">
                   <div>
                     <p className="text-[12px] font-bold text-gray-700">新护士首单补贴</p>
                     <p className="text-[10px] text-gray-400">完成平台首单服务奖励</p>
                   </div>
                   <span className="text-emerald-600 font-black">¥20</span>
                 </div>
                 <div className="flex justify-between p-3 bg-rose-50/30 rounded-lg">
                   <div>
                     <p className="text-[12px] font-bold text-gray-700">紧急订单补贴</p>
                     <p className="text-[10px] text-gray-400">一小时内上门订单奖励</p>
                   </div>
                   <span className="text-rose-500 font-black">¥15</span>
                 </div>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NurseEarningsView;
