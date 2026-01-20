
import React, { useState } from 'react';
import html2canvas from 'html2canvas';

const DesignConsole: React.FC = () => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (isExporting) return;
    
    const rootElement = document.getElementById('app-container');
    if (!rootElement) return;

    setIsExporting(true);

    // 获取当前容器的精确尺寸
    const width = rootElement.offsetWidth;
    const height = rootElement.scrollHeight;

    try {
      const canvas = await html2canvas(rootElement, {
        useCORS: true,
        allowTaint: false,
        scale: 3, // 提高采样率至3倍，使文字边缘更锐利
        backgroundColor: '#F7F9FA',
        width: width,
        height: height,
        windowWidth: width,
        windowHeight: height,
        x: 0,
        y: 0,
        scrollX: 0,
        scrollY: 0,
        // 关键：在克隆的 DOM 上进行样式修补
        onclone: (clonedDoc) => {
          const clonedRoot = clonedDoc.getElementById('app-container');
          if (clonedRoot) {
            // 确保克隆的容器宽度固定，防止 flexbox 引起的文字重排
            clonedRoot.style.width = `${width}px`;
            clonedRoot.style.position = 'relative';
            
            // 注入样式优化文字渲染
            const style = clonedDoc.createElement('style');
            style.innerHTML = `
              * { 
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                text-rendering: optimizeLegibility !important;
              }
              /* 修复 html2canvas 对 Tailwind tracking 类的解析偏差 */
              .tracking-wider { letter-spacing: 0.05em !important; }
              .tracking-widest { letter-spacing: 0.1em !important; }
              .tracking-tight { letter-spacing: -0.025em !important; }
              .tracking-tighter { letter-spacing: -0.05em !important; }
            `;
            clonedDoc.head.appendChild(style);
          }
        },
        ignoreElements: (element) => {
          return element.id === 'design-console-btn' || element.id === 'smart-advisor-btn';
        }
      });

      const imgData = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      const timestamp = new Date().getTime();
      link.download = `护士站_设计稿_HD_${timestamp}.png`;
      link.href = imgData;
      link.click();
    } catch (error) {
      console.error('导出失败:', error);
      alert('导出失败，请重试');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div 
      id="design-console-btn"
      className="fixed right-0 top-1/2 -translate-y-1/2 z-[100] flex flex-col items-center"
    >
      <button
        onClick={handleExport}
        disabled={isExporting}
        className={`
          flex flex-col items-center justify-center w-11 py-5 
          bg-emerald-600/90 backdrop-blur-md text-white rounded-l-2xl 
          shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-y border-l border-white/20
          transition-all active:scale-95
          ${isExporting ? 'opacity-50 cursor-wait' : 'opacity-100'}
        `}
      >
        <div className="mb-2 text-[14px]">{isExporting ? '⌛' : '📸'}</div>
        <span 
          className="[writing-mode:vertical-lr] text-[10px] tracking-widest font-bold uppercase"
        >
          {isExporting ? '生成中...' : '导出设计稿'}
        </span>
        {!isExporting && (
          <div className="mt-2 w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
        )}
      </button>
    </div>
  );
};

export default DesignConsole;
