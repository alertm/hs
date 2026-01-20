
import React, { useState, useEffect } from 'react';
import { OPEN_CITIES } from '../constants';
import { City } from '../types';

interface HeaderProps {
  currentCity: City;
  onCityChange: (city: City) => void;
  onSearch: (keyword: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentCity, onCityChange, onSearch }) => {
  const [isCityPickerOpen, setIsCityPickerOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showSearchTips, setShowSearchTips] = useState(false);

  const hotKeywords = ['打针', '换药', '康复', '采血', '张护士'];

  const handleCitySelect = (city: City) => {
    onCityChange(city);
    setIsCityPickerOpen(false);
  };

  return (
    <div className="bg-white px-4 pt-4 pb-3 sticky top-0 z-40 shadow-[0_2px_15px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-between mb-4">
        <div 
          onClick={() => setIsCityPickerOpen(true)}
          className="flex items-center group cursor-pointer active:opacity-60 transition-opacity"
        >
          <div className="bg-emerald-500 p-1 rounded-md mr-2 shadow-sm shadow-emerald-100">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-sm font-bold text-gray-800">{currentCity.name}</span>
          <svg className="w-3 h-3 ml-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        <div className="flex items-center bg-gray-50 px-2.5 py-1 rounded-full border border-gray-100">
          <div className="relative flex h-1.5 w-1.5 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </div>
          <span className="text-[10px] text-gray-500 font-bold tracking-wider">
            {currentCity.isOpen ? '已开通' : '筹备中'}
          </span>
        </div>
      </div>

      <div className="relative group">
        <input 
          type="text" 
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            onSearch(e.target.value);
            setShowSearchTips(e.target.value === '');
          }}
          onFocus={() => setShowSearchTips(searchValue === '')}
          onBlur={() => setTimeout(() => setShowSearchTips(false), 200)}
          placeholder="找护士、搜服务、问方案..." 
          className="w-full bg-gray-50 border border-transparent rounded-lg py-2.5 px-11 text-sm focus:ring-1 focus:ring-emerald-400/20 focus:bg-white focus:border-emerald-100 transition-all outline-none text-gray-700 placeholder:text-gray-300"
        />
        <svg className="w-5 h-5 absolute left-4 top-2.5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>

        {showSearchTips && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl p-4 border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-200">
            <p className="text-[10px] text-gray-400 font-bold mb-3 uppercase tracking-widest">热门搜索</p>
            <div className="flex flex-wrap gap-2">
              {hotKeywords.map(kw => (
                <button 
                  key={kw}
                  onClick={() => {
                    setSearchValue(kw);
                    onSearch(kw);
                  }}
                  className="px-3 py-1 bg-gray-50 text-[11px] text-gray-600 rounded-md border border-gray-100 transition-colors"
                >
                  {kw}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {isCityPickerOpen && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center sm:justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsCityPickerOpen(false)}></div>
          <div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-xl p-6 relative animate-in slide-in-from-bottom duration-300 shadow-2xl">
            <h3 className="text-base font-bold text-gray-900 mb-6 text-center">选择服务城市</h3>
            <div className="grid grid-cols-3 gap-3">
              {OPEN_CITIES.map(city => (
                <button
                  key={city.id}
                  onClick={() => handleCitySelect(city)}
                  className={`py-2.5 rounded-lg text-sm font-bold transition-all border ${
                    currentCity.id === city.id 
                      ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm' 
                      : 'bg-gray-50 text-gray-600 border-transparent active:bg-gray-100'
                  }`}
                >
                  {city.name}
                  {!city.isOpen && <span className="block text-[8px] opacity-60 font-normal">待开通</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
