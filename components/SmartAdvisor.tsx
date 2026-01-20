
import React, { useState } from 'react';
import { askHealthAssistant } from '../services/gemini';

const SmartAdvisor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);

  const handleAsk = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setAnswer(null);
    const res = await askHealthAssistant(query);
    setAnswer(res || "咨询结果暂不可用");
    setLoading(false);
  };

  return (
    <>
      <button 
        id="smart-advisor-btn"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 w-11 h-11 bg-emerald-600 text-white rounded-lg shadow-lg flex items-center justify-center z-40 active:scale-90 transition-transform"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center sm:justify-center animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-xl p-6 relative animate-in slide-in-from-bottom duration-300">
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 p-2 text-gray-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth={2}/></svg>
            </button>
            <h3 className="text-base font-bold mb-4 text-emerald-800 flex items-center gap-2">
              <span className="p-1 bg-emerald-100 rounded-md">🤖</span>
              智能咨询助手
            </h3>
            
            <textarea 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="告诉助手您的身体不适或护理需求..."
              className="w-full bg-gray-50 border border-gray-100 rounded-lg p-3 text-sm h-24 mb-4 outline-none resize-none"
            />
            
            <button 
              onClick={handleAsk}
              disabled={loading || !query}
              className="w-full bg-emerald-600 text-white py-3.5 rounded-lg font-bold disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? "分析中..." : "开始咨询"}
            </button>

            {answer && (
              <div className="mt-4 p-4 bg-emerald-50 rounded-lg border border-emerald-100 animate-in zoom-in-95 duration-200">
                <p className="text-sm text-emerald-900 leading-relaxed">{answer}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SmartAdvisor;
