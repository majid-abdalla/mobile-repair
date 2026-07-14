
// import { useState, useEffect } from 'react'
// import { getRepairs } from '../service/repairService'
// import { getCustomers } from '../service/customerService'
// import { getPayments } from '../service/paymentService'
// import StatsCard from '../components/dashboard/StatsCard'
// import RecentRepairs from '../components/dashboard/RecentRepairs'
// import Card from '../components/common/Card'
// import Table from '../components/common/Table'
// import Header from '../components/layout/Header'
// import { IoConstructOutline, IoPeopleOutline, 
//          IoCheckmarkCircleOutline } from 'react-icons/io5'
// const paymentColumns = [
//   { key: 'paymentId', label: 'ID' },
//   { key: 'repairId', label: 'Repair ID' },
//   { key: 'amount', label: 'Amount' },
//   { key: 'paymentMethod', label: 'Method' },
//   { key: 'paymentDate', label: 'Date' },
// ]

// export default function Dashboard() {
//   const [repairs, setRepairs] = useState([])
//   const [customers, setCustomers] = useState([])
//   const [payments, setPayments] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [repairsRes, customersRes, paymentsRes] = await Promise.all([
//           getRepairs({ pageNumber: 1, pageSize: 100 }),
//           getCustomers({ pageNumber: 1, pageSize: 100 }),
//           getPayments({ pageNumber: 1, pageSize: 100 }),
//         ])
//         setRepairs(repairsRes.data.items ?? [])
//         setCustomers(customersRes.data.items ?? [])
//         setPayments(paymentsRes.data.items ?? [])
//       } catch (err) {
//         console.error('Dashboard fetch error:', err)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchData()
//   }, [])

//   // Stats xisaab
//   const totalRepairs = repairs.length
//   const completedRepairs = repairs.filter(r => r.status === 'Completed').length
//   const activeRepairs = repairs.filter(r =>
//     r.status === 'Received' || r.status === 'InProgress').length
//   const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0)

//   const stats = [
//     {
//       id: 1,
//       label: 'Total Repairs',
//       value: totalRepairs,
//       icon: IoConstructOutline,
//       color: 'blue',
//     },
//     {
//       id: 2,
//       label: 'Completed',
//       value: completedRepairs,
//       icon: IoCheckmarkCircleOutline,
//       color: 'green',
//     },
//     {
//       id: 3,
//       label: 'Active',
//       value: activeRepairs,
//       icon: IoConstructOutline,
//       color: 'yellow',
//     },
//     {
//       id: 4,
//       label: 'Total Customers',
//       value: customers.length,
//       icon: IoPeopleOutline,
//       color: 'purple',
//     },
//   ]

//   if (loading) {
//     return (
//       <div className="flex min-h-96 items-center justify-center">
//         <p className="text-slate-500">Loading dashboard...</p>
//       </div>
//     )
//   }

//   return (
//     <div>
//       <Header
//         title="Dashboard"
//         subtitle="Welcome back! Here's what's happening today."
//       />

//       {/* Stats Cards */}
//       <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
//         {stats.map((stat) => (
//           <StatsCard key={stat.id} {...stat} />
//         ))}
//       </div>

//       {/* Recent Repairs + Payments */}
//       <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
//         <div className="lg:col-span-2">
//           <RecentRepairs data={repairs.slice(0, 5)} />
//         </div>

//         <Card
//           title="Recent Payments"
//           subtitle="Latest transactions"
//         >
//           {payments.length === 0 ? (
//             <p className="py-6 text-center text-sm text-slate-400">
//               No payments yet
//             </p>
//           ) : (
//             <Table
//               columns={paymentColumns}
//               data={payments.slice(0, 5)}
//               renderCell={(row, key) => {
//                 if (key === 'amount') return `$${row.amount}`
//                 if (key === 'paymentDate')
//                   return new Date(row.paymentDate).toLocaleDateString()
//                 return row[key]
//               }}
//             />
//           )}
//         </Card>
//       </div>
//     </div>
//   )
// }

//this backend of java(spring boot)

import { useState, useEffect } from 'react'
import { getRepairs } from '../service/repairService'
import { getCustomers } from '../service/customerService'
import { getPayments } from '../service/paymentService'
import StatsCard from '../components/dashboard/StatsCard'
import RecentRepairs from '../components/dashboard/RecentRepairs'
import Card from '../components/common/Card'
import Table from '../components/common/Table'
import Header from '../components/layout/Header'
import {
  IoConstructOutline,
  IoPeopleOutline,
  IoCheckmarkCircleOutline,
  IoCashOutline,
} from 'react-icons/io5'

const paymentColumns = [
  { key: 'id', label: 'ID' },
  { key: 'amount', label: 'Amount' },
  { key: 'paymentMethod', label: 'Method' },
  { key: 'paymentStatus', label: 'Status' },
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
          getRepairs(),
          getCustomers(),
          getPayments(),
        ])
        setRepairs(repairsRes.data ?? [])
        setCustomers(customersRes.data ?? [])
        setPayments(paymentsRes.data ?? [])
      } catch (err) {
        console.error('Dashboard fetch error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const totalRepairs = repairs.length
  const completedRepairs = repairs.filter(
    (r) => r.status === 'Completed'
  ).length
  const activeRepairs = repairs.filter(
    (r) => r.status === 'Pending' || r.status === 'In Progress'
  ).length
  const totalCustomers = customers.length
  const totalRevenue = payments.reduce(
    (sum, p) => sum + (p.amount ?? 0), 0
  )

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
      value: totalCustomers,
      icon: IoPeopleOutline,
      color: 'purple',
    },
    {
      id: 5,
      label: 'Total Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      icon: IoCashOutline,
      color: 'green',
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
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
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