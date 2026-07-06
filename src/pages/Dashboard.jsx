// // import {
// //   dashboardStats,
// //   revenueChartData,
// //   repairStatusData,
// //   repairs,
// //   payments,
// //   appointments,
// //   spareParts,
// //   recentActivity,
// // } from '../data/mockData'
// import StatsCard from '../components/dashboard/StatsCard'
// import RevenueChart from '../components/dashboard/RevenueChart'
// import RepairChart from '../components/dashboard/RepairChart'
// import RecentRepairs from '../components/dashboard/RecentRepairs'
// import ActivityCard from '../components/dashboard/ActivityCard'
// import Card from '../components/common/Card'
// import Table from '../components/common/Table'
// import StatusBadge from '../components/common/StatusBadge'
// import Header from '../components/layout/Header'
// import { IoWarningOutline, IoCalendarOutline } from 'react-icons/io5'

// const paymentColumns = [
//   { key: 'id', label: 'ID' },
//   { key: 'customer', label: 'Customer' },
//   { key: 'amount', label: 'Amount' },
//   { key: 'status', label: 'Status' },
//   { key: 'date', label: 'Date' },
// ]

// export default function Dashboard() {
//   return (
//     <div>
//       <Header title="Dashboard" subtitle="Welcome back! Here's what's happening today." />

//       <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
//         {dashboardStats.map((stat) => (
//           <StatsCard key={stat.id} {...stat} />
//         ))}
//       </div>

//       <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
//         <RevenueChart data={revenueChartData} />
//         <RepairChart data={repairStatusData} />
//       </div>

//       <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
//         <div className="lg:col-span-2">
//           <RecentRepairs data={repairs.slice(0, 5)} />
//         </div>
//         <ActivityCard data={recentActivity} />
//       </div>

//       <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
//         <Card title="Recent Payments" subtitle="Latest transactions" className="lg:col-span-2">
//           <Table
//             columns={paymentColumns}
//             data={payments.slice(0, 5)}
//             renderCell={(row, key) => {
//               if (key === 'status') return <StatusBadge status={row.status} />
//               if (key === 'amount') return `$${row.amount}`
//               return row[key]
//             }}
//           />
//         </Card>

//         <div className="space-y-6">
//           <Card title="Upcoming Appointments" subtitle="Scheduled visits">
//             <div className="space-y-3">
//               {appointments.map((appt) => (
//                 <div key={appt.id} className="flex items-start gap-3 rounded-lg border border-slate-100 p-3">
//                   <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-500/10">
//                     <IoCalendarOutline className="h-4 w-4 text-accent-600" />
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="truncate text-sm font-medium text-slate-900">{appt.customer}</p>
//                     <p className="text-xs text-slate-500">{appt.device}</p>
//                     <p className="mt-1 text-xs font-medium text-primary-600">
//                       {appt.date} at {appt.time}
//                     </p>
//                   </div>
//                   <span className="shrink-0 rounded-full bg-surface-subtle px-2 py-0.5 text-xs text-slate-600">
//                     {appt.type}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </Card>

//           <Card title="Low Stock Alert" subtitle="Spare parts running low">
//             <div className="space-y-3">
//               {spareParts.filter((p) => p.stock <= p.minStock).map((part) => (
//                 <div key={part.id} className="flex items-center gap-3 rounded-lg bg-amber-50 p-3">
//                   <IoWarningOutline className="h-5 w-5 shrink-0 text-amber-600" />
//                   <div className="flex-1 min-w-0">
//                     <p className="truncate text-sm font-medium text-slate-900">{part.name}</p>
//                     <p className="text-xs text-slate-500">{part.category}</p>
//                   </div>
//                   <span className="text-sm font-bold text-amber-700">{part.stock} left</span>
//                 </div>
//               ))}
//             </div>
//           </Card>
//         </div>
//       </div>
//     </div>
//   )
// }


// import { useState, useEffect } from 'react'
// import { getRepairs } from '../services/repairService'
// import { getCustomers } from '../services/customerService'
// import { getPayments } from '../services/paymentService'
// import StatsCard from '../components/dashboard/StatsCard'
// import RecentRepairs from '../components/dashboard/RecentRepairs'
// import Card from '../components/common/Card'
// import Table from '../components/common/Table'
// import StatusBadge from '../components/common/StatusBadge'
// import Header from '../components/layout/Header'
// import { IoConstructOutline, IoPeopleOutline, 
//          IoCardOutline, IoCheckmarkCircleOutline } from 'react-icons/io5'
import { useState, useEffect } from 'react'
import { getRepairs } from '../service/repairService'
import { getCustomers } from '../service/customerService'
import { getPayments } from '../service/paymentService'
import StatsCard from '../components/dashboard/StatsCard'
import RecentRepairs from '../components/dashboard/RecentRepairs'
import Card from '../components/common/Card'
import Table from '../components/common/Table'
import Header from '../components/layout/Header'
import { IoConstructOutline, IoPeopleOutline, 
         IoCheckmarkCircleOutline } from 'react-icons/io5'
const paymentColumns = [
  { key: 'paymentId', label: 'ID' },
  { key: 'repairId', label: 'Repair ID' },
  { key: 'amount', label: 'Amount' },
  { key: 'paymentMethod', label: 'Method' },
  { key: 'paymentDate', label: 'Date' },
]

export default function Dashboard() {
  const [repairs, setRepairs] = useState([])
  const [customers, setCustomers] = useState([])
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [repairsRes, customersRes, paymentsRes] = await Promise.all([
          getRepairs({ pageNumber: 1, pageSize: 100 }),
          getCustomers({ pageNumber: 1, pageSize: 100 }),
          getPayments({ pageNumber: 1, pageSize: 100 }),
        ])
        setRepairs(repairsRes.data.items ?? [])
        setCustomers(customersRes.data.items ?? [])
        setPayments(paymentsRes.data.items ?? [])
      } catch (err) {
        console.error('Dashboard fetch error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Stats xisaab
  const totalRepairs = repairs.length
  const completedRepairs = repairs.filter(r => r.status === 'Completed').length
  const activeRepairs = repairs.filter(r =>
    r.status === 'Received' || r.status === 'InProgress').length
  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0)

  const stats = [
    {
      id: 1,
      label: 'Total Repairs',
      value: totalRepairs,
      icon: IoConstructOutline,
      color: 'blue',
    },
    {
      id: 2,
      label: 'Completed',
      value: completedRepairs,
      icon: IoCheckmarkCircleOutline,
      color: 'green',
    },
    {
      id: 3,
      label: 'Active',
      value: activeRepairs,
      icon: IoConstructOutline,
      color: 'yellow',
    },
    {
      id: 4,
      label: 'Total Customers',
      value: customers.length,
      icon: IoPeopleOutline,
      color: 'purple',
    },
  ]

  if (loading) {
    return (
      <div className="flex min-h-96 items-center justify-center">
        <p className="text-slate-500">Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div>
      <Header
        title="Dashboard"
        subtitle="Welcome back! Here's what's happening today."
      />

      {/* Stats Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.id} {...stat} />
        ))}
      </div>

      {/* Recent Repairs + Payments */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentRepairs data={repairs.slice(0, 5)} />
        </div>

        <Card
          title="Recent Payments"
          subtitle="Latest transactions"
        >
          {payments.length === 0 ? (
            <p className="py-6 text-center text-sm text-slate-400">
              No payments yet
            </p>
          ) : (
            <Table
              columns={paymentColumns}
              data={payments.slice(0, 5)}
              renderCell={(row, key) => {
                if (key === 'amount') return `$${row.amount}`
                if (key === 'paymentDate')
                  return new Date(row.paymentDate).toLocaleDateString()
                return row[key]
              }}
            />
          )}
        </Card>
      </div>
    </div>
  )
}