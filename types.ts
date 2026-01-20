
export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  tags: string[];
  imageUrl: string;
  category: string;
  isHot?: boolean;
  rating?: number;
  duration?: string;
  audience?: string;
  contentList?: string[];
  contraindications?: string;
  notes?: string;
}

export interface Nurse {
  id: string;
  name: string;
  avatar: string;
  hospital: string;
  department: string;
  tags: string[];
  rating: number;
  orderCount: number;
  distance: string;
  intro?: string;
}

export interface NursingRecord {
  id: string;
  date: string;
  serviceName: string;
  nurseName: string;
  vitals: {
    bp: string;
    temp: string;
    pulse: string;
  };
  content: string;
  photos: string[];
}

export interface Order {
  id: string;
  serviceName: string;
  status: OrderStatus;
  price: number;
  paidAmount: number;
  date: string;
  imageUrl: string;
  address: string;
  roomNumber?: string;
  customerName: string;
  nurse?: Nurse;
  nursingRecord?: any;
  cancelReason?: string;
  refundAmount?: number;
  createTime: string;
  distance?: string;
  isEmergency?: boolean;
  patientCondition?: string;
}

export type OrderStatus = 'waiting_acceptance' | 'waiting_service' | 'ongoing' | 'completed' | 'cancelled';

export type ProviderType = 'nurse' | 'rehab' | 'doctor';

export interface NurseInfo {
  name: string;
  avatar?: string;
  hospital: string;
  department: string;
  years: number;
  experienceRange?: '1-3' | '3-5' | '5+';
  bio?: string;
  certStatus: CertStatus;
  certExpiryDate?: string; // ISO Date
  rejectReason?: string;
  isOnline: boolean;
  rating: number;
  todayEarnings: number;
  todayOrders: number;
  type?: ProviderType;
  serviceAreas?: string[];
  specialCerts?: string[];
  claimedServices?: string[];
  maxDistance: number;
  workSlots: 'all' | 'weekend' | 'custom';
  rejectionsToday: number;
  emergencyContact?: {
    name: string;
    phone: string;
  };
  safetySettings?: {
    isLocationSharing: boolean;
    isAutoRecording: boolean;
  };
}

export type CertStatus = 'none' | 'pending' | 'verified' | 'rejected';

// --- 收益管理 ---
export interface Transaction {
  id: string;
  orderId: string;
  serviceName: string;
  baseIncome: number;
  commission: number;
  subsidy: number;
  totalAmount: number;
  status: 'pending' | 'settled';
  date: string;
  subsidyReason?: string;
}

// --- 评价管理 ---
export interface NurseReview {
  id: string;
  userName: string;
  rating: number;
  content: string;
  images?: string[];
  date: string;
  reply?: string;
  appealStatus?: 'none' | 'pending' | 'resolved' | 'rejected';
}

// --- 培训中心 ---
export interface TrainingCourse {
  id: string;
  title: string;
  type: 'video' | 'article';
  duration: string;
  isCompleted: boolean;
  badge?: string;
  thumbnail: string;
}

export interface WithdrawalRecord {
  id: string;
  amount: number;
  bankCard: string;
  status: 'auditing' | 'passed' | 'rejected' | 'transferred';
  applyTime: string;
  finishTime?: string;
}

export interface EarningsStats {
  monthlyIncome: number;
  orderCount: number;
  positiveRate: number;
  avgOrderPrice: number;
  trend: { date: string; amount: number }[];
}

export interface AuthState {
  isLoggedIn: boolean;
  isPhoneVerified: boolean;
  phoneNumber?: string;
  nickname?: string;
  avatar?: string;
}

export enum TabType {
  HOME = 'home',
  ORDERS = 'orders',
  PROFILE = 'profile',
  WORKBENCH = 'workbench',
  EARNINGS = 'earnings'
}

export enum UserRole {
  USER = 'user',
  NURSE = 'nurse'
}

export interface MedicalReport {
  id: string;
  title: string;
  date: string;
  type: 'PDF' | 'JPG';
  url: string;
  size: string;
}

export interface City { id: string; name: string; isOpen: boolean; }
export interface Category { id: string; name: string; icon: string; color: string; }
export interface Patient { id: string; name: string; age: number; gender: '男' | '女'; allergies: string; medicalHistory: string; symptoms: string; }
export interface Address { id: string; address: string; roomNumber: string; name: string; phone: string; isDefault: boolean; }
export interface Coupon { id: string; name: string; amount: number; minSpend: number; expiryDate: string; status: 'unused' | 'used' | 'expired'; }
