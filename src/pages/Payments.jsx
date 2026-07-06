// import { useState } from 'react'
// import { IoAdd } from 'react-icons/io5'
// import Header from '../components/layout/Header'
// import Card from '../components/common/Card'
// import SearchBar from '../components/common/SearchBar'
// import Select from '../components/common/Select'
// import Pagination from '../components/common/Pagination'
// import Modal from '../components/common/Modal'
// import Button from '../components/common/Button'
// import PaymentTable from '../components/payments/PaymentTable'
// import PaymentForm from '../components/payments/PaymentForm'
// import usePagination from '../hooks/usePagination'
// import useDebounce from '../hooks/useDebounce'
// import { payments as initialPayments } from '../data/mockData'

// export default function Payments() {
//   const [items, setItems] = useState(initialPayments)
//   const [search, setSearch] = useState('')
//   const [statusFilter, setStatusFilter] = useState('')
//   const [modalOpen, setModalOpen] = useState(false)
//   const [deleteModal, setDeleteModal] = useState(false)
//   const [editing, setEditing] = useState(null)
//   const [deleting, setDeleting] = useState(null)

//   const debouncedSearch = useDebounce(search)
//   const { data, currentPage, totalPages, goToPage, resetPage } = usePagination(items, {
//     pageSize: 5,
//     searchFields: ['id', 'customer', 'repairId'],
//     searchQuery: debouncedSearch,
//     filterFn: statusFilter ? (item) => item.status === statusFilter : null,
//   })

//   const handleSubmit = (formData) => {
//     const payload = { ...formData, amount: Number(formData.amount), date: formData.date ?? new Date().toISOString().split('T')[0] }
//     if (editing) {
//       setItems((prev) => prev.map((i) => (i.id === editing.id ? { ...i, ...payload } : i)))
//     } else {
//       setItems((prev) => [...prev, { ...payload, id: `P-${500 + prev.length + 1}` }])
//     }
//     setModalOpen(false)
//   }

//   return (
//     <div>
//       <Header
//         title="Payments"
//         subtitle="Manage payment records"
//         breadcrumbs={['Home', 'Payments']}
//         action={<Button icon={IoAdd} onClick={() => { setEditing(null); setModalOpen(true) }}>Add Payment</Button>}
//       />

//       <Card padding="none">
//         <div className="space-y-4 p-4 sm:p-6">
//           <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
//             <SearchBar value={search} onChange={(v) => { setSearch(v); resetPage() }} placeholder="Search payments..." className="flex-1" />
//             <Select
//               value={statusFilter}
//               onChange={(v) => { setStatusFilter(v); resetPage() }}
//               placeholder="All Statuses"
//               options={[
//                 { value: 'pending', label: 'Pending' },
//                 { value: 'paid', label: 'Paid' },
//                 { value: 'partial', label: 'Partial' },
//                 { value: 'refunded', label: 'Refunded' },
//               ]}
//               className="w-full sm:w-48"
//             />
//           </div>
//           <PaymentTable
//             data={data}
//             onEdit={(row) => { setEditing(row); setModalOpen(true) }}
//             onDelete={(row) => { setDeleting(row); setDeleteModal(true) }}
//           />
//           <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
//         </div>
//       </Card>

//       <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Payment' : 'Add Payment'} size="md">
//         <PaymentForm initialData={editing} onSubmit={handleSubmit} onCancel={() => setModalOpen(false)} />
//       </Modal>

//       <Modal
//         open={deleteModal}
//         onClose={() => setDeleteModal(false)}
//         title="Delete Payment"
//         footer={
//           <>
//             <Button variant="outline" onClick={() => setDeleteModal(false)}>Cancel</Button>
//             <Button variant="danger" onClick={() => { setItems((p) => p.filter((i) => i.id !== deleting?.id)); setDeleteModal(false) }}>Delete</Button>
//           </>
//         }
//       >
//         <p className="text-sm text-slate-600">Delete payment <strong>{deleting?.id}</strong>?</p>
//       </Modal>
//     </div>
//   )
// }

import { useState, useEffect } from 'react'
import { IoAdd } from 'react-icons/io5'
import Header from '../components/layout/Header'
import Card from '../components/common/Card'
import SearchBar from '../components/common/SearchBar'
import Select from '../components/common/Select'
import Pagination from '../components/common/Pagination'
import Modal from '../components/common/Modal'
import Button from '../components/common/Button'
import PaymentTable from '../components/payments/PaymentTable'
import PaymentForm from '../components/payments/PaymentForm'
import usePagination from '../hooks/usePagination'
import useDebounce from '../hooks/useDebounce'
import {
  getPayments,
  createPayment,
} from '../service/paymentService'

export default function Payments() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [methodFilter, setMethodFilter] = useState('')  // ← status → method
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  // Backend ka soo qaad
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await getPayments({ pageNumber: 1, pageSize: 100 })
        setItems(res.data.items ?? [])
      } catch (err) {
        console.error('Failed to fetch payments:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchPayments()
  }, [])

  const debouncedSearch = useDebounce(search)
  const { data, currentPage, totalPages, goToPage, resetPage } = usePagination(items, {
    pageSize: 10,
    searchFields: ['paymentId', 'repairId', 'paymentMethod', 'receivedByName'], // ← backend fields
    searchQuery: debouncedSearch,
    filterFn: methodFilter
      ? (item) => item.paymentMethod === methodFilter
      : null,
  })

  // Backend ku kaydso — CREATE kaliya (payments lama edit gareeyo)
  const handleSubmit = async (formData) => {
    try {
      const res = await createPayment({
        repairId: Number(formData.repairId),
        amount: Number(formData.amount),
        paymentMethod: formData.paymentMethod,
      })
      setItems((prev) => [...prev, res.data])
      setModalOpen(false)
    } catch (err) {
      const message = err.response?.data?.message ?? 'Failed to save payment'
      alert(message)
      console.error('Failed to save payment:', err)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-96 items-center justify-center">
        <p className="text-slate-500">Loading payments...</p>
      </div>
    )
  }

  return (
    <div>
      <Header
        title="Payments"
        subtitle="Manage payment records"
        breadcrumbs={['Home', 'Payments']}
        action={
          <Button
            icon={IoAdd}
            onClick={() => { setEditing(null); setModalOpen(true) }}
          >
            Add Payment
          </Button>
        }
      />

      <Card padding="none">
        <div className="space-y-4 p-4 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <SearchBar
              value={search}
              onChange={(v) => { setSearch(v); resetPage() }}
              placeholder="Search payments..."
              className="flex-1"
            />
            <Select
              value={methodFilter}
              onChange={(v) => { setMethodFilter(v); resetPage() }}
              placeholder="All Methods"
              options={[
                { value: 'Cash', label: 'Cash' },
                { value: 'Card', label: 'Card' },
                { value: 'MobileMoney', label: 'Mobile Money' },
                { value: 'BankTransfer', label: 'Bank Transfer' },
              ]}
              className="w-full sm:w-48"
            />
          </div>
          <PaymentTable
            data={data}
            onEdit={(row) => { setEditing(row); setModalOpen(true) }}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
          />
        </div>
      </Card>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add Payment"
        size="md"
      >
        <PaymentForm
          initialData={editing}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>
    </div>
  )
}