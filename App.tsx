
import React, { useState, useEffect, useMemo } from 'react';
import { TabType, Service, OrderStatus, Order, UserRole, NurseInfo, Category, AuthState, City, Nurse } from './types';
import Header from './components/Header';
import Banner from './components/Banner';
import CategoryGrid from './components/CategoryGrid';
import ServiceTabs from './components/ServiceTabs';
import BottomNav from './components/BottomNav';
import ServiceDetail from './components/ServiceDetail';
import BookingForm from './components/BookingForm';
import NurseWorkbench from './components/NurseWorkbench';
import NurseCertification from './components/NurseCertification';
import NurseTasksView from './components/NurseTasksView';
import NurseProfileView from './components/NurseProfileView';
import CategoryListView from './components/CategoryListView';
import LoginView from './components/LoginView';
import SmartAdvisor from './components/SmartAdvisor';
import EmergencyEntrance from './components/EmergencyEntrance';
import EmergencyBooking from './components/EmergencyBooking';
import BookingSuccess from './components/BookingSuccess';
import OrderDetailView from './components/OrderDetailView';
import UserProfileView from './components/UserProfileView';
import { MOCK_ORDERS, SERVICES, OPEN_CITIES } from './constants';

const HomeView: React.FC<{ 
  currentCity: City,
  onCityChange: (city: City) => void,
  onSelectService: (service: Service) => void,
  onSelectCategory: (category: Category) => void,
  onGoEmergency: () => void
}> = ({ currentCity, onCityChange, onSelectService, onSelectCategory, onGoEmergency }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  
  return (
    <div className="pb-24">
      <Header 
        currentCity={currentCity} 
        onCityChange={onCityChange} 
        onSearch={setSearchKeyword} 
      />
      
      {!currentCity.isOpen && (
        <div className="px-5 mt-4">
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-center gap-3">
            <span className="text-xl">🚧</span>
            <div>
              <p className="text-amber-800 text-[13px] font-bold">{currentCity.name} 暂未覆盖</p>
              <p className="text-amber-600 text-[11px] mt-0.5">我们正在快马加鞭筹备中，敬请期待！</p>
            </div>
          </div>
        </div>
      )}

      {currentCity.isOpen && (
        <>
          <Banner />
          <EmergencyEntrance onClick={onGoEmergency} />
          <CategoryGrid onSelectCategory={onSelectCategory} />
          
          <div className="px-5 mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="w-1 h-4 bg-emerald-500 rounded-full"></div>
                <h2 className="text-base font-bold text-gray-800">全部服务</h2>
            </div>
          </div>
          <ServiceTabs onSelectService={onSelectService} />
        </>
      )}
      
      <SmartAdvisor />
    </div>
  );
};

const UserOrdersView: React.FC<{ onSelectOrder: (order: Order) => void }> = ({ onSelectOrder }) => {
  const [activeStatusTab, setActiveStatusTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const statusTabs = [
    { label: '全部', value: 'all' },
    { label: '待接单', value: 'waiting_acceptance' },
    { label: '待服务', value: 'waiting_service' },
    { label: '服务中', value: 'ongoing' },
    { label: '已完成', value: 'completed' },
    { label: '已取消', value: 'cancelled' },
  ];

  const filteredOrders = useMemo(() => {
    return MOCK_ORDERS.filter(order => {
      const matchesStatus = activeStatusTab === 'all' || order.status === activeStatusTab;
      const matchesSearch = order.id.includes(searchQuery) || order.serviceName.includes(searchQuery);
      return matchesStatus && matchesSearch;
    });
  }, [activeStatusTab, searchQuery]);

  const getStatusStyle = (status: OrderStatus) => {
    switch (status) {
      case 'waiting_acceptance': return 'text-orange-500 bg-orange-50';
      case 'waiting_service': return 'text-emerald-500 bg-emerald-50';
      case 'ongoing': return 'text-blue-500 bg-blue-50';
      case 'completed': return 'text-gray-500 bg-gray-50';
      case 'cancelled': return 'text-gray-300 bg-gray-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  const getStatusLabel = (status: OrderStatus) => {
    const tab = statusTabs.find(t => t.value === status);
    return tab?.label || '未知状态';
  };

  return (
    <div className="min-h-screen pb-24 bg-[#F7F9FA]">
      <div className="bg-white px-5 pt-12 pb-4 sticky top-0 z-40 border-b border-gray-50">
        <h2 className="text-xl font-black text-gray-900">我的订单</h2>
        <div className="mt-4 relative">
          <input 
            type="text"
            placeholder="搜订单号、服务名称..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 border border-transparent rounded-lg py-2.5 px-10 text-[13px] outline-none focus:bg-white focus:border-emerald-100 transition-all"
          />
          <svg className="w-4 h-4 absolute left-3.5 top-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth={2.5}/></svg>
        </div>
      </div>
      
      <div className="bg-white sticky top-[138px] z-30 border-b border-gray-50 flex overflow-x-auto no-scrollbar px-2">
        {statusTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveStatusTab(tab.value)}
            className={`flex-none px-5 py-4 text-[13px] font-bold relative transition-colors ${
              activeStatusTab === tab.value ? 'text-emerald-600' : 'text-gray-400'
            }`}
          >
            {tab.label}
            {activeStatusTab === tab.value && (
              <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-emerald-500 rounded-full animate-in zoom-in-50 duration-200"></div>
            )}
          </button>
        ))}
      </div>

      <div className="p-4 space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map(order => (
            <div 
              key={order.id} 
              onClick={() => onSelectOrder(order)}
              className="bg-white rounded-xl shadow-sm border border-gray-50 p-5 relative overflow-hidden active:scale-[0.99] transition-transform cursor-pointer"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] text-gray-300 font-bold tracking-wider">NO.{order.id}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${getStatusStyle(order.status)}`}>
                  {getStatusLabel(order.status)}
                </span>
              </div>
              <div className="flex gap-4 mb-4">
                <img src={order.imageUrl} className="w-16 h-16 rounded-lg object-cover shrink-0 shadow-sm" alt="" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-[14px] font-black text-gray-800 line-clamp-1">{order.serviceName}</h3>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="text-[10px] text-gray-400">🕒 {order.date}</span>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1 line-clamp-1">📍 {order.address}</p>
                </div>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-gray-50">
                <div className="flex items-baseline">
                  <span className="text-[10px] text-gray-400 mr-1">实付</span>
                  <span className="text-[10px] text-emerald-600 font-bold">¥</span>
                  <span className="text-base font-black text-emerald-600 ml-0.5">{order.paidAmount}</span>
                </div>
                <span className="text-[11px] font-bold text-gray-300 flex items-center gap-1">
                  详情 <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth={2.5}/></svg>
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="py-24 flex flex-col items-center justify-center text-gray-300">
            <span className="text-5xl mb-4">📄</span>
            <p className="text-[12px] font-bold">暂无相关订单</p>
          </div>
        )}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [authState, setAuthState] = useState<AuthState>({ isLoggedIn: false, isPhoneVerified: false });
  const [role, setRole] = useState<UserRole>(UserRole.USER);
  const [activeTab, setActiveTab] = useState<TabType>(TabType.HOME);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedNurse, setSelectedNurse] = useState<Nurse | null>(null);
  const [browsingCategory, setBrowsingCategory] = useState<Category | null>(null);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccessId, setBookingSuccessId] = useState<string | null>(null);
  const [selectedOrderDetail, setSelectedOrderDetail] = useState<Order | null>(null);
  const [isEmergency, setIsEmergency] = useState(false);
  const [isCertifying, setIsCertifying] = useState(false);
  const [currentCity, setCurrentCity] = useState<City>(OPEN_CITIES[0]);

  const [nurseInfo, setNurseInfo] = useState<NurseInfo>({
    name: '林美护',
    hospital: '上海交通大学附属仁济医院',
    department: '急诊科',
    years: 5,
    certStatus: 'verified', // 初始改为 verified 确保接单开关可点击
    isOnline: false,
    rating: 4.9,
    todayEarnings: 0,
    todayOrders: 0,
    maxDistance: 15, // 初始服务范围
    rejectionsToday: 0
  });

  useEffect(() => {
    const savedAuth = localStorage.getItem('nurse_station_auth');
    if (savedAuth) {
      try {
        setAuthState(JSON.parse(savedAuth));
      } catch (e) {
        console.error("Auth restore error", e);
      }
    }
  }, []);

  const handleLoginSuccess = (auth: AuthState) => {
    setAuthState(auth);
    localStorage.setItem('nurse_station_auth', JSON.stringify(auth));
  };

  const handleSelectService = (service: Service) => {
    setSelectedService(service);
    setSelectedNurse(null);
    setBrowsingCategory(null);
    setIsEmergency(false);
    setSelectedOrderDetail(null);
  };

  const handleStartBooking = (nurse: Nurse | null) => {
    setSelectedNurse(nurse);
    setIsBooking(true);
  };

  const renderContent = () => {
    if (!authState.isLoggedIn || !authState.isPhoneVerified) {
      return <LoginView onLoginSuccess={handleLoginSuccess} />;
    }

    if (selectedOrderDetail) {
      return <OrderDetailView order={selectedOrderDetail} onBack={() => setSelectedOrderDetail(null)} />;
    }

    if (bookingSuccessId) {
      return (
        <BookingSuccess 
          orderId={bookingSuccessId} 
          onGoHome={() => { setBookingSuccessId(null); setSelectedService(null); setIsBooking(false); setActiveTab(TabType.HOME); }}
          onGoOrders={() => { setBookingSuccessId(null); setSelectedService(null); setIsBooking(false); setActiveTab(TabType.ORDERS); }}
        />
      );
    }

    if (isEmergency) return <EmergencyBooking onBack={() => setIsEmergency(false)} />;
    
    if (isBooking && selectedService) {
      return (
        <BookingForm 
          service={selectedService} 
          nurse={selectedNurse} 
          onBack={() => setIsBooking(false)} 
          onSuccess={(id) => setBookingSuccessId(id)}
        />
      );
    }

    if (isCertifying) return <NurseCertification onBack={() => setIsCertifying(false)} />;
    
    if (selectedService) {
      return (
        <ServiceDetail 
          service={selectedService} 
          onBack={() => setSelectedService(null)} 
          onBook={handleStartBooking} 
        />
      );
    }
    
    if (browsingCategory) {
      return (
        <CategoryListView 
          category={browsingCategory} 
          onBack={() => setBrowsingCategory(null)} 
          onSelectService={handleSelectService}
        />
      );
    }

    if (role === UserRole.USER) {
      switch (activeTab) {
        case TabType.HOME: 
          return (
            <HomeView 
              currentCity={currentCity}
              onCityChange={setCurrentCity}
              onSelectService={handleSelectService} 
              onSelectCategory={setBrowsingCategory} 
              onGoEmergency={() => setIsEmergency(true)}
            />
          );
        case TabType.ORDERS: return <UserOrdersView onSelectOrder={setSelectedOrderDetail} />;
        case TabType.PROFILE: return <UserProfileView authState={authState} onSwitchRole={setRole} onOpenCert={() => setIsCertifying(true)} onTabChange={setActiveTab} />;
        default: return <HomeView currentCity={currentCity} onCityChange={setCurrentCity} onSelectService={handleSelectService} onSelectCategory={setBrowsingCategory} onGoEmergency={() => setIsEmergency(true)} />;
      }
    } else {
      switch (activeTab) {
        case TabType.WORKBENCH: return <NurseWorkbench nurseInfo={nurseInfo} setNurseInfo={setNurseInfo} />;
        case TabType.ORDERS: return <NurseTasksView />;
        case TabType.PROFILE: return <NurseProfileView nurseInfo={nurseInfo} onSwitchRole={() => { setRole(UserRole.USER); setActiveTab(TabType.HOME); }} onUpdateInfo={setNurseInfo} />;
        default: return <NurseWorkbench nurseInfo={nurseInfo} setNurseInfo={setNurseInfo} />;
      }
    }
  };

  return (
    <div id="app-container" className="max-w-md mx-auto min-h-screen bg-[#F7F9FA] relative overflow-x-hidden">
      {renderContent()}
      {authState.isLoggedIn && authState.isPhoneVerified && !selectedService && !browsingCategory && !isBooking && !isEmergency && !isCertifying && !bookingSuccessId && !selectedOrderDetail && (
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} role={role} />
      )}
    </div>
  );
};

export default App;
