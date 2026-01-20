
import { Service, Category, Order, City, Nurse, Patient, Address, Coupon, NursingRecord, MedicalReport } from './types';

export const OPEN_CITIES: City[] = [
  { id: 'sh', name: '上海市', isOpen: true },
  { id: 'bj', name: '北京市', isOpen: true },
  { id: 'others', name: '其他城市', isOpen: false },
];

export const MOCK_NURSES: Nurse[] = [
  {
    id: 'n1',
    name: '张雅护师',
    avatar: 'https://picsum.photos/seed/n1/100/100',
    hospital: '上海交通大学附属仁济医院',
    department: '急诊科',
    tags: ['5年经验', '操作娴熟', '态度极好'],
    rating: 4.9,
    orderCount: 1240,
    distance: '1.2km',
    intro: '拥有多年急救室护理经验，擅长各类静脉穿刺及导尿护理。'
  },
  {
    id: 'n2',
    name: '李明主管护师',
    avatar: 'https://picsum.photos/seed/n2/100/100',
    hospital: '上海华山医院',
    department: '普外科',
    tags: ['10年工龄', '专家级', '持证上岗'],
    rating: 5.0,
    orderCount: 890,
    distance: '2.5km'
  }
];

export const MOCK_HEALTH_RECORDS: NursingRecord[] = [
  {
    id: 'rec3',
    date: '2024-05-24',
    serviceName: '上门导尿护理',
    nurseName: '张雅',
    vitals: { bp: '130/85', temp: '36.6', pulse: '78' },
    content: '患者情绪稳定，导尿管留置顺畅，观察无感染迹象。',
    photos: ['https://picsum.photos/seed/h3/200/200']
  }
];

export const MOCK_REPORTS: MedicalReport[] = [
  { id: 'rep1', title: '2024年入职体检报告', date: '2024-03-12', type: 'PDF', url: '#', size: '2.4MB' },
  { id: 'rep2', title: '腹部B超影像检查', date: '2024-04-05', type: 'JPG', url: '#', size: '1.8MB' }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD20240520',
    serviceName: '【单次】护士上门打针',
    status: 'completed',
    price: 89,
    paidAmount: 89,
    date: '2024-05-20 10:00',
    imageUrl: 'https://picsum.photos/seed/injection/300/200',
    address: '上海市浦东新区张江路1号',
    roomNumber: '102室',
    customerName: '王大爷',
    createTime: '2024-05-19 18:00',
    nurse: MOCK_NURSES[0],
    nursingRecord: {
      vitals: { bp: '120/80', temp: '36.5', pulse: '72' },
      content: '注射过程顺利，局部无红肿，观察15分钟无不良反应，建议多饮水休息。',
      photos: ['https://picsum.photos/seed/med1/200/200', 'https://picsum.photos/seed/med2/200/200']
    }
  },
  {
    id: 'ORD20240524',
    serviceName: '伤口换药护理',
    status: 'ongoing',
    price: 150,
    paidAmount: 150,
    date: '今日 15:30',
    imageUrl: 'https://picsum.photos/seed/wound/300/200',
    address: '上海市徐汇区斜土路88号',
    roomNumber: '502室',
    customerName: '李先生',
    createTime: '2024-05-24 09:00',
    nurse: MOCK_NURSES[1]
  },
  {
    id: 'ORD20240525',
    serviceName: 'PICC导管维护',
    status: 'waiting_service',
    price: 260,
    paidAmount: 260,
    date: '明日 10:00',
    imageUrl: 'https://picsum.photos/seed/picc/300/200',
    address: '上海市黄浦区淮海中路1号',
    roomNumber: '1203室',
    customerName: '赵奶奶',
    createTime: '2024-05-24 14:00',
    nurse: MOCK_NURSES[0]
  },
  {
    id: 'ORD20240526',
    serviceName: '外科拆线服务',
    status: 'waiting_acceptance',
    price: 120,
    paidAmount: 120,
    date: '2024-05-26 14:00',
    imageUrl: 'https://picsum.photos/seed/stitch/300/200',
    address: '上海市静安区南京西路100号',
    roomNumber: '201室',
    customerName: '陈女士',
    createTime: '2024-05-24 16:00'
  },
  {
    id: 'ORD20240521',
    serviceName: '【单次】护士上门打针',
    status: 'cancelled',
    price: 89,
    paidAmount: 0,
    date: '2024-05-21 09:00',
    imageUrl: 'https://picsum.photos/seed/inj2/300/200',
    address: '上海市闵行区虹梅路10号',
    customerName: '刘先生',
    createTime: '2024-05-20 20:00',
    cancelReason: '用户主动取消'
  }
];

export const MOCK_PATIENTS: Patient[] = [
  { id: 'p1', name: '王大爷', age: 72, gender: '男', allergies: '青霉素过敏', medicalHistory: '高血压、糖尿病史', symptoms: '术后康复中' },
  { id: 'p2', name: '李先生', age: 45, gender: '男', allergies: '无', medicalHistory: '骨折术后', symptoms: '换药' },
];

export const MOCK_ADDRESSES: Address[] = [
  { id: 'a1', address: '上海市浦东新区张江路1号', roomNumber: '102室', name: '王先生', phone: '138****9999', isDefault: true },
];

export const MOCK_COUPONS: Coupon[] = [
  { id: 'c1', name: '新用户立减券', amount: 20, minSpend: 100, expiryDate: '2024-12-31', status: 'unused' },
  { id: 'c2', name: '全场通用红包', amount: 10, minSpend: 50, expiryDate: '2024-06-30', status: 'unused' },
];

export const SERVICES: Service[] = [
  {
    id: 's1',
    name: '【单次】护士上门打针',
    description: '专业护士上门进行肌肉注射/皮下注射。',
    price: 89,
    originalPrice: 120,
    tags: ['自营', '执业护士'],
    imageUrl: 'https://picsum.photos/seed/injection/300/200',
    category: '打针',
    isHot: true,
    rating: 4.9,
    duration: '30min',
    audience: '术后康复、慢性病需定期注射人群',
    contentList: ['核对处方及药品', '生命体征评估', '标准化注射操作', '按压止血及观察15分钟'],
    contraindications: '意识不清、有过敏性休克史、无医生处方者',
    notes: '打针服务需用户自备药品及处方照，护士不携带任何处方药物上门。'
  }
];

export const CATEGORIES: Category[] = [
  { id: '1', name: '打针', icon: '💉', color: 'bg-emerald-100' },
  { id: '2', name: '静脉采血', icon: '🩸', color: 'bg-red-100' },
  { id: '3', name: '伤口换药', icon: '🩹', color: 'bg-blue-100' },
  { id: '4', name: '导尿护理', icon: '🩺', color: 'bg-purple-100' },
  { id: '5', name: '外科拆线', icon: '✂️', color: 'bg-amber-100' },
  { id: '6', name: '压疮护理', icon: '🧴', color: 'bg-orange-100' },
  { id: '7', name: '母婴护理', icon: '🍼', color: 'bg-pink-100' },
  { id: '8', name: '居家康复', icon: '🧘', color: 'bg-teal-100' },
  { id: '9', name: '更多服务', icon: '➕', color: 'bg-gray-100' },
];

export const SERVICE_TABS = ['推荐', '打针', '换药', '采血', '康复'];
