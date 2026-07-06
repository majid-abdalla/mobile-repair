// export const defaultUser = {
//   id: 1,
//   name: 'John Doe',
//   email: 'john@example.com',
//   phone: '+1234567890',
//   role: 'admin',
//   avatar: 'https://via.placeholder.com/40',
// }

// export const repairs = [
//   {
//     id: 1,
//     deviceBrand: 'iPhone',
//     deviceModel: 'iPhone 13',
//     issue: 'Screen broken',
//     status: 'completed',
//     priority: 'high',
//     customer: 'John Smith',
//     date: '2024-01-15',
//     amount: 150,
//   },
//   {
//     id: 2,
//     deviceBrand: 'Samsung',
//     deviceModel: 'Galaxy S21',
//     issue: 'Battery not charging',
//     status: 'in-progress',
//     priority: 'medium',
//     customer: 'Jane Doe',
//     date: '2024-01-14',
//     amount: 80,
//   },
//   {
//     id: 3,
//     deviceBrand: 'Apple',
//     deviceModel: 'iPhone 14',
//     issue: 'Charging port damaged',
//     status: 'pending',
//     priority: 'high',
//     customer: 'Mike Johnson',
//     date: '2024-01-13',
//     amount: 120,
//   },
//   {
//     id: 4,
//     deviceBrand: 'Samsung',
//     deviceModel: 'Galaxy S23',
//     issue: 'Water damage',
//     status: 'completed',
//     priority: 'high',
//     customer: 'Sarah Williams',
//     date: '2024-01-12',
//     amount: 200,
//   },
//   {
//     id: 5,
//     deviceBrand: 'OnePlus',
//     deviceModel: 'OnePlus 11',
//     issue: 'Motherboard repair',
//     status: 'in-progress',
//     priority: 'critical',
//     customer: 'Robert Brown',
//     date: '2024-01-11',
//     amount: 280,
//   },
//   {
//     id: 6,
//     deviceBrand: 'Xiaomi',
//     deviceModel: 'Xiaomi 13',
//     issue: 'Camera lens scratch',
//     status: 'completed',
//     priority: 'low',
//     customer: 'Emily Davis',
//     date: '2024-01-10',
//     amount: 60,
//   },
//   {
//     id: 7,
//     deviceBrand: 'Google Pixel',
//     deviceModel: 'Pixel 8',
//     issue: 'Speaker not working',
//     status: 'completed',
//     priority: 'medium',
//     customer: 'David Miller',
//     date: '2024-01-09',
//     amount: 90,
//   },
//   {
//     id: 8,
//     deviceBrand: 'Huawei',
//     deviceModel: 'P50',
//     issue: 'Screen replacement',
//     status: 'pending',
//     priority: 'high',
//     customer: 'Lisa Anderson',
//     date: '2024-01-08',
//     amount: 140,
//   },
//   {
//     id: 9,
//     deviceBrand: 'iPhone',
//     deviceModel: 'iPhone 15',
//     issue: 'Battery replacement',
//     status: 'in-progress',
//     priority: 'medium',
//     customer: 'John Smith',
//     date: '2024-01-07',
//     amount: 110,
//   },
//   {
//     id: 10,
//     deviceBrand: 'Samsung',
//     deviceModel: 'Galaxy A53',
//     issue: 'Microphone issue',
//     status: 'completed',
//     priority: 'low',
//     customer: 'Jane Doe',
//     date: '2024-01-06',
//     amount: 50,
//   },
// ]

// export const customers = [
//   {
//     id: 1,
//     name: 'John Smith',
//     email: 'john.smith@email.com',
//     phone: '+1-555-0101',
//     repairs: 5,
//     totalSpent: 1250,
//   },
//   {
//     id: 2,
//     name: 'Jane Doe',
//     email: 'jane.doe@email.com',
//     phone: '+1-555-0102',
//     repairs: 3,
//     totalSpent: 680,
//   },
//   {
//     id: 3,
//     name: 'Mike Johnson',
//     email: 'mike.j@email.com',
//     phone: '+1-555-0103',
//     repairs: 8,
//     totalSpent: 2150,
//   },
//   {
//     id: 4,
//     name: 'Sarah Williams',
//     email: 'sarah.w@email.com',
//     phone: '+1-555-0104',
//     repairs: 2,
//     totalSpent: 450,
//   },
//   {
//     id: 5,
//     name: 'Robert Brown',
//     email: 'robert.b@email.com',
//     phone: '+1-555-0105',
//     repairs: 6,
//     totalSpent: 1580,
//   },
//   {
//     id: 6,
//     name: 'Emily Davis',
//     email: 'emily.d@email.com',
//     phone: '+1-555-0106',
//     repairs: 4,
//     totalSpent: 920,
//   },
//   {
//     id: 7,
//     name: 'David Miller',
//     email: 'david.m@email.com',
//     phone: '+1-555-0107',
//     repairs: 3,
//     totalSpent: 750,
//   },
//   {
//     id: 8,
//     name: 'Lisa Anderson',
//     email: 'lisa.a@email.com',
//     phone: '+1-555-0108',
//     repairs: 7,
//     totalSpent: 1890,
//   },
// ]

// export const payments = [
//   {
//     id: 1,
//     repairId: 1,
//     customerId: 1,
//     amount: 150,
//     status: 'completed',
//     method: 'card',
//     date: '2024-01-15',
//     description: 'iPhone 13 screen repair',
//   },
//   {
//     id: 2,
//     repairId: 2,
//     customerId: 2,
//     amount: 80,
//     status: 'pending',
//     method: 'cash',
//     date: '2024-01-14',
//     description: 'Galaxy S21 battery service',
//   },
//   {
//     id: 3,
//     repairId: 3,
//     customerId: 3,
//     amount: 120,
//     status: 'completed',
//     method: 'card',
//     date: '2024-01-13',
//     description: 'iPhone 14 charging port repair',
//   },
//   {
//     id: 4,
//     repairId: 4,
//     customerId: 4,
//     amount: 200,
//     status: 'completed',
//     method: 'transfer',
//     date: '2024-01-12',
//     description: 'Galaxy S23 water damage repair',
//   },
//   {
//     id: 5,
//     repairId: 5,
//     customerId: 5,
//     amount: 280,
//     status: 'processing',
//     method: 'card',
//     date: '2024-01-11',
//     description: 'OnePlus 11 motherboard repair',
//   },
//   {
//     id: 6,
//     repairId: 6,
//     customerId: 6,
//     amount: 60,
//     status: 'completed',
//     method: 'cash',
//     date: '2024-01-10',
//     description: 'Xiaomi 13 camera lens service',
//   },
//   {
//     id: 7,
//     repairId: 7,
//     customerId: 7,
//     amount: 90,
//     status: 'completed',
//     method: 'card',
//     date: '2024-01-09',
//     description: 'Pixel 8 speaker replacement',
//   },
//   {
//     id: 8,
//     repairId: 8,
//     customerId: 8,
//     amount: 140,
//     status: 'pending',
//     method: 'transfer',
//     date: '2024-01-08',
//     description: 'Huawei P50 screen replacement',
//   },
//   {
//     id: 9,
//     repairId: 9,
//     customerId: 1,
//     amount: 110,
//     status: 'completed',
//     method: 'card',
//     date: '2024-01-07',
//     description: 'iPhone 15 battery replacement',
//   },
//   {
//     id: 10,
//     repairId: 10,
//     customerId: 2,
//     amount: 50,
//     status: 'completed',
//     method: 'cash',
//     date: '2024-01-06',
//     description: 'Galaxy A53 microphone repair',
//   },
// ]

// export const notifications = [
//   {
//     id: 1,
//     type: 'repair_completed',
//     message: 'Repair #1 completed',
//     read: false,
//     timestamp: '2024-01-15',
//   },
//   {
//     id: 2,
//     type: 'payment_received',
//     message: 'Payment received for repair #1',
//     read: false,
//     timestamp: '2024-01-15',
//   },
// ]

// export const brands = [
//   { id: 1, name: 'Apple', logo: '🍎', models: 8 },
//   { id: 2, name: 'Samsung', logo: '📱', models: 12 },
//   { id: 3, name: 'Huawei', logo: '📱', models: 6 },
//   { id: 4, name: 'OnePlus', logo: '📱', models: 5 },
//   { id: 5, name: 'Xiaomi', logo: '📱', models: 9 },
//   { id: 6, name: 'Google Pixel', logo: '📱', models: 4 },
//   { id: 7, name: 'Nokia', logo: '📱', models: 3 },
//   { id: 8, name: 'LG', logo: '📱', models: 7 },
// ]

// export const models = [
//   { id: 1, name: 'iPhone 13', brandId: 1, releaseYear: 2021 },
//   { id: 2, name: 'iPhone 14', brandId: 1, releaseYear: 2022 },
//   { id: 3, name: 'iPhone 15', brandId: 1, releaseYear: 2023 },
//   { id: 4, name: 'Galaxy S21', brandId: 2, releaseYear: 2021 },
//   { id: 5, name: 'Galaxy S22', brandId: 2, releaseYear: 2022 },
//   { id: 6, name: 'Galaxy S23', brandId: 2, releaseYear: 2023 },
//   { id: 7, name: 'Galaxy A53', brandId: 2, releaseYear: 2022 },
//   { id: 8, name: 'P50', brandId: 3, releaseYear: 2021 },
//   { id: 9, name: 'P50 Pro', brandId: 3, releaseYear: 2021 },
//   { id: 10, name: 'OnePlus 11', brandId: 4, releaseYear: 2023 },
//   { id: 11, name: 'OnePlus 12', brandId: 4, releaseYear: 2024 },
//   { id: 12, name: 'Xiaomi 13', brandId: 5, releaseYear: 2023 },
//   { id: 13, name: 'Pixel 7', brandId: 6, releaseYear: 2022 },
//   { id: 14, name: 'Pixel 8', brandId: 6, releaseYear: 2023 },
// ]

// export const appointments = [
//   {
//     id: 1,
//     customer: 'John Smith',
//     date: '2024-01-20',
//     time: '10:00',
//     device: 'iPhone 13',
//     issue: 'Screen repair',
//   },
//   {
//     id: 2,
//     customer: 'Jane Doe',
//     date: '2024-01-20',
//     time: '14:00',
//     device: 'Galaxy S21',
//     issue: 'Battery replacement',
//   },
// ]

// export const spareParts = [
//   { id: 1, name: 'iPhone 13 Screen', price: 80, quantity: 10 },
//   { id: 2, name: 'iPhone 13 Battery', price: 40, quantity: 15 },
//   { id: 3, name: 'Galaxy S21 Screen', price: 75, quantity: 8 },
//   { id: 4, name: 'Galaxy S21 Battery', price: 35, quantity: 12 },
// ]

// export const recentActivity = [
//   { id: 1, type: 'repair', description: 'Repair #1 completed', time: '2 hours ago' },
//   { id: 2, type: 'payment', description: 'Payment received', time: '1 hour ago' },
//   { id: 3, type: 'customer', description: 'New customer added', time: '30 minutes ago' },
// ]

// export const dashboardStats = [
//   { label: 'Total Repairs', value: 156, change: '+12%', color: 'blue' },
//   { label: 'Completed', value: 142, change: '+8%', color: 'green' },
//   { label: 'Pending', value: 14, change: '-3%', color: 'yellow' },
//   { label: 'Revenue', value: '$12,450', change: '+15%', color: 'purple' },
// ]

// export const revenueChartData = [
//   { month: 'Jan', revenue: 2400, expenses: 1400 },
//   { month: 'Feb', revenue: 2210, expenses: 1200 },
//   { month: 'Mar', revenue: 2290, expenses: 1300 },
//   { month: 'Apr', revenue: 2000, expenses: 1000 },
//   { month: 'May', revenue: 2181, expenses: 1200 },
//   { month: 'Jun', revenue: 2500, expenses: 1500 },
// ]

// export const repairStatusData = [
//   { name: 'Completed', value: 142 },
//   { name: 'Pending', value: 14 },
//   { name: 'In Progress', value: 25 },
// ]


export const repairs = [
  {
    repairId: 1,                    // ← id → repairId
    customerName: 'Ahmed Mohamed',  // ← customer → customerName
    modelName: 'Galaxy A14',        // ← deviceModel → modelName
    issueDescription: 'Screen broken', // ← issue → issueDescription
    status: 'Completed',            // ← 'completed' → 'Completed'
    estimatedCost: 45.00,           // ← amount → estimatedCost
    actualCost: 45.00,
    receivedDate: '2024-01-15',
  },
  // ...
]

export const customers = [
  {
    customerId: 1,                  // ← id → customerId
    fullName: 'Ahmed Mohamed',      // ← name → fullName
    phone: '0615550101',
    email: 'ahmed@example.com',
    address: 'Hodan District',
    isActive: true,
  },
  // ...
]

export const payments = [
  {
    paymentId: 1,                   // ← id → paymentId
    repairId: 1,
    amount: 45.00,
    paymentMethod: 'Cash',          // ← method → paymentMethod, 'Cash' capital
    paymentDate: '2024-01-15',
    receivedByName: 'Front Desk Officer',
  },
  // ...
]