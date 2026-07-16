import { useState, useEffect } from 'react'
import Header from '../components/layout/Header'
import Card from '../components/common/Card'
import StatsCard from '../components/dashboard/StatsCard'
import RevenueChart from '../components/dashboard/RevenueChart'
import RepairChart from '../components/dashboard/RepairChart'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import { IoDownloadOutline } from 'react-icons/io5'
import { getRepairs } from '../service/repairService'
import { getPayments } from '../service/paymentService'
import { getCustomers } from '../service/customerService'

export default function Reports() {
  const [repairs, setRepairs] = useState([])
  const [payments, setPayments] = useState([])
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [repairsRes, paymentsRes, customersRes] = await Promise.all([
          getRepairs({ pageNumber: 1, pageSize: 100 }),
          getPayments({ pageNumber: 1, pageSize: 100 }),
          getCustomers({ pageNumber: 1, pageSize: 100 }),
        ])
        setRepairs(repairsRes.data.items ?? [])
        setPayments(paymentsRes.data.items ?? [])
        setCustomers(customersRes.data.items ?? [])
      } catch (err) {
        console.error('Failed to fetch report data:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Stats xisaab backend data-da ka
  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0)
  const completedRepairs = repairs.filter(r => r.status === 'Completed').length
  const pendingRepairs = repairs.filter(r =>
    r.status === 'Received' || r.status === 'InProgress').length

  const stats = [
    {
      id: 1,
      label: 'Total Repairs',
      value: repairs.length,
      change: '+12%',
      trend: 'up',
      icon: 'wrench',
    },
    {
      id: 2,
      label: 'Completed',
      value: completedRepairs,
      change: '+8%',
      trend: 'up',
      icon: 'wrench',
    },
    {
      id: 3,
      label: 'Pending',
      value: pendingRepairs,
      change: '-3%',
      trend: 'down',
      icon: 'clock',
    },
    {
      id: 4,
      label: 'Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      change: '+15%',
      trend: 'up',
      icon: 'dollar',
    },
  ]

  // RepairChart data — status distribution
  const repairStatusData = [
    { name: 'Completed', value: repairs.filter(r => r.status === 'Completed').length },
    { name: 'InProgress', value: repairs.filter(r => r.status === 'InProgress').length },
    { name: 'Received', value: repairs.filter(r => r.status === 'Received').length },
    { name: 'Delivered', value: repairs.filter(r => r.status === 'Delivered').length },
    { name: 'Cancelled', value: repairs.filter(r => r.status === 'Cancelled').length },
  ]

  // RevenueChart data — payments by month
  const revenueChartData = Array.from({ length: 6 }, (_, i) => {
    const month = new Date()
    month.setMonth(month.getMonth() - (5 - i))
    const monthName = month.toLocaleString('default', { month: 'short' })
    const monthPayments = payments.filter(p => {
      const d = new Date(p.paymentDate)
      return d.getMonth() === month.getMonth() &&
             d.getFullYear() === month.getFullYear()
    })
    return {
      month: monthName,
      revenue: monthPayments.reduce((sum, p) => sum + p.amount, 0),
      expenses: 0,
    }
  })

  if (loading) {
    return (
      <div className="flex min-h-96 items-center justify-center">
        <p className="text-slate-500">Loading reports...</p>
      </div>
    )
  }

  return (
    <div>
      <Header
        title="Reports"
        subtitle="Analytics and business insights"
        breadcrumbs={['Home', 'Reports']}
        action={
          <div className="flex gap-2">
            <Button variant="outline" icon={IoDownloadOutline} disabled title="Coming soon">
              Export PDF
            </Button>
            <Button variant="outline" icon={IoDownloadOutline} disabled title="Coming soon">
              Export CSV
            </Button>
          </div>
        }
      />

      <Card className="mb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <Input label="From Date" type="date" defaultValue="2024-01-01" />
          <Input label="To Date" type="date" defaultValue="2024-12-31" />
          <Button className="sm:mb-0">Apply Filter</Button>
        </div>
      </Card>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.id} {...stat} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RevenueChart data={revenueChartData} />
        <RepairChart data={repairStatusData} />
      </div>
    </div>
  )
}


//this backend of java(spring boot)

// import { useState, useEffect } from 'react'
// import Header from '../components/layout/Header'
// import Card from '../components/common/Card'
// import StatsCard from '../components/dashboard/StatsCard'
// import RevenueChart from '../components/dashboard/RevenueChart'
// import RepairChart from '../components/dashboard/RepairChart'
// import Button from '../components/common/Button'
// import Input from '../components/common/Input'
// import { IoDownloadOutline } from 'react-icons/io5'
// import { getRepairs } from '../service/repairService'
// import { getPayments } from '../service/paymentService'
// import { getCustomers } from '../service/customerService'

// export default function Reports() {
//   const [repairs, setRepairs] = useState([])
//   const [payments, setPayments] = useState([])
//   const [customers, setCustomers] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [repairsRes, paymentsRes, customersRes] = await Promise.all([
//           getRepairs(),
//           getPayments(),
//           getCustomers(),
//         ])
//         setRepairs(repairsRes.data ?? [])
//         setPayments(paymentsRes.data ?? [])
//         setCustomers(customersRes.data ?? [])
//       } catch (err) {
//         console.error('Failed to fetch report data:', err)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchData()
//   }, [])

//   const totalRevenue = payments.reduce((sum, p) => sum + (p.amount ?? 0), 0)
//   const completedRepairs = repairs.filter(
//     (r) => r.status === 'Completed'
//   ).length
//   const pendingRepairs = repairs.filter(
//     (r) => r.status === 'Pending' || r.status === 'In Progress'
//   ).length

//   const stats = [
//     {
//       id: 1,
//       label: 'Total Repairs',
//       value: repairs.length,
//       change: '+12%',
//       trend: 'up',
//       icon: 'wrench',
//     },
//     {
//       id: 2,
//       label: 'Completed',
//       value: completedRepairs,
//       change: '+8%',
//       trend: 'up',
//       icon: 'wrench',
//     },
//     {
//       id: 3,
//       label: 'Pending',
//       value: pendingRepairs,
//       change: '-3%',
//       trend: 'down',
//       icon: 'clock',
//     },
//     {
//       id: 4,
//       label: 'Revenue',
//       value: `$${totalRevenue.toFixed(2)}`,
//       change: '+15%',
//       trend: 'up',
//       icon: 'dollar',
//     },
//   ]

//   const repairStatusData = [
//     {
//       name: 'Completed',
//       value: repairs.filter((r) => r.status === 'Completed').length,
//     },
//     {
//       name: 'In Progress',
//       value: repairs.filter((r) => r.status === 'In Progress').length,
//     },
//     {
//       name: 'Pending',
//       value: repairs.filter((r) => r.status === 'Pending').length,
//     },
//     {
//       name: 'Cancelled',
//       value: repairs.filter((r) => r.status === 'Cancelled').length,
//     },
//   ]

//   const revenueChartData = Array.from({ length: 6 }, (_, i) => {
//     const month = new Date()
//     month.setMonth(month.getMonth() - (5 - i))
//     const monthName = month.toLocaleString('default', { month: 'short' })
//     const monthPayments = payments.filter((p) => {
//       const d = new Date(p.paymentDate)
//       return (
//         d.getMonth() === month.getMonth() &&
//         d.getFullYear() === month.getFullYear()
//       )
//     })
//     return {
//       month: monthName,
//       revenue: monthPayments.reduce((sum, p) => sum + (p.amount ?? 0), 0),
//       expenses: 0,
//     }
//   })

//   if (loading) {
//     return (
//       <div className="flex min-h-96 items-center justify-center">
//         <p className="text-slate-500">Loading reports...</p>
//       </div>
//     )
//   }

//   return (
//     <div>
//       <Header
//         title="Reports"
//         subtitle="Analytics and business insights"
//         breadcrumbs={['Home', 'Reports']}
//         action={
//           <div className="flex gap-2">
//             <Button
//               variant="outline"
//               icon={IoDownloadOutline}
//               disabled
//               title="Coming soon"
//             >
//               Export PDF
//             </Button>
//             <Button
//               variant="outline"
//               icon={IoDownloadOutline}
//               disabled
//               title="Coming soon"
//             >
//               Export CSV
//             </Button>
//           </div>
//         }
//       />

//       <Card className="mb-6">
//         <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
//           <Input label="From Date" type="date" defaultValue="2024-01-01" />
//           <Input label="To Date" type="date" defaultValue="2024-12-31" />
//           <Button className="sm:mb-0">Apply Filter</Button>
//         </div>
//       </Card>

//       {/* Stats */}
//       <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
//         {stats.map((stat) => (
//           <StatsCard key={stat.id} {...stat} />
//         ))}
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
//         <RevenueChart data={revenueChartData} />
//         <RepairChart data={repairStatusData} />
//       </div>
//     </div>
//   )
// }