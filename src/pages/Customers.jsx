// import { useState } from 'react'
// import { IoAdd } from 'react-icons/io5'
// import Header from '../components/layout/Header'
// import Card from '../components/common/Card'
// import SearchBar from '../components/common/SearchBar'
// import Select from '../components/common/Select'
// import Pagination from '../components/common/Pagination'
// import Modal from '../components/common/Modal'
// import Button from '../components/common/Button'
// import CustomerTable from '../components/customers/CustomerTable'
// import CustomerForm from '../components/customers/CustomerForm'
// import usePagination from '../hooks/usePagination'
// import useDebounce from '../hooks/useDebounce'
// import { customers as initialCustomers } from '../data/mockData'

// export default function Customers() {
//   const [items, setItems] = useState(initialCustomers)
//   const [search, setSearch] = useState('')
//   const [statusFilter, setStatusFilter] = useState('')
//   const [modalOpen, setModalOpen] = useState(false)
//   const [deleteModal, setDeleteModal] = useState(false)
//   const [editing, setEditing] = useState(null)
//   const [deleting, setDeleting] = useState(null)

//   const debouncedSearch = useDebounce(search)
//   const { data, currentPage, totalPages, goToPage, resetPage } = usePagination(items, {
//     pageSize: 5,
//     searchFields: ['name', 'email', 'phone'],
//     searchQuery: debouncedSearch,
//     filterFn: statusFilter ? (item) => item.status === statusFilter : null,
//   })

//   const handleSearch = (val) => { setSearch(val); resetPage() }
//   const handleFilter = (val) => { setStatusFilter(val); resetPage() }

//   const openAdd = () => { setEditing(null); setModalOpen(true) }
//   const openEdit = (row) => { setEditing(row); setModalOpen(true) }
//   const openDelete = (row) => { setDeleting(row); setDeleteModal(true) }

//   const handleSubmit = (formData) => {
//     if (editing) {
//       setItems((prev) => prev.map((i) => (i.id === editing.id ? { ...i, ...formData } : i)))
//     } else {
//       setItems((prev) => [...prev, { ...formData, id: Date.now(), repairs: 0, joined: new Date().toISOString().split('T')[0] }])
//     }
//     setModalOpen(false)
//   }

//   const confirmDelete = () => {
//     setItems((prev) => prev.filter((i) => i.id !== deleting.id))
//     setDeleteModal(false)
//     setDeleting(null)
//   }

//   return (
//     <div>
//       <Header
//         title="Customers"
//         subtitle="Manage your customer database"
//         breadcrumbs={['Home', 'Customers']}
//         action={<Button icon={IoAdd} onClick={openAdd}>Add Customer</Button>}
//       />

//       <Card padding="none">
//         <div className="space-y-4 p-4 sm:p-6">
//           <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
//             <SearchBar value={search} onChange={handleSearch} placeholder="Search customers..." className="flex-1" />
//             <Select
//               value={statusFilter}
//               onChange={handleFilter}
//               placeholder="All Statuses"
//               options={[
//                 { value: 'active', label: 'Active' },
//                 { value: 'inactive', label: 'Inactive' },
//               ]}
//               className="w-full sm:w-48"
//             />
//           </div>
//           <CustomerTable data={data} onEdit={openEdit} onDelete={openDelete} />
//           <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
//         </div>
//       </Card>

//       <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Customer' : 'Add Customer'} size="md">
//         <CustomerForm initialData={editing} onSubmit={handleSubmit} onCancel={() => setModalOpen(false)} />
//       </Modal>

//       <Modal
//         open={deleteModal}
//         onClose={() => setDeleteModal(false)}
//         title="Delete Customer"
//         footer={
//           <>
//             <Button variant="outline" onClick={() => setDeleteModal(false)}>Cancel</Button>
//             <Button variant="danger" onClick={confirmDelete}>Delete</Button>
//           </>
//         }
//       >
//         <p className="text-sm text-slate-600">
//           Are you sure you want to delete <strong>{deleting?.name}</strong>? This action cannot be undone.
//         </p>
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
import CustomerTable from '../components/customers/CustomerTable'
import CustomerForm from '../components/customers/CustomerForm'
import usePagination from '../hooks/usePagination'
import useDebounce from '../hooks/useDebounce'
import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deactivateCustomer,
} from '../service/customerService'

export default function Customers() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)

  // Backend ka soo qaad
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await getCustomers({ pageNumber: 1, pageSize: 100 })
        setItems(res.data.items ?? [])
      } catch (err) {
        console.error('Failed to fetch customers:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchCustomers()
  }, [])

  const debouncedSearch = useDebounce(search)
  const { data, currentPage, totalPages, goToPage, resetPage } = usePagination(items, {
    pageSize: 10,
    searchFields: ['fullName', 'email', 'phone'],  // ← 'name' → 'fullName'
    searchQuery: debouncedSearch,
    filterFn: statusFilter
      ? (item) => (statusFilter === 'active' ? item.isActive : !item.isActive)
      : null,
  })

  const handleSearch = (val) => { setSearch(val); resetPage() }
  const handleFilter = (val) => { setStatusFilter(val); resetPage() }
  const openAdd = () => { setEditing(null); setModalOpen(true) }
  const openEdit = (row) => { setEditing(row); setModalOpen(true) }
  const openDelete = (row) => { setDeleting(row); setDeleteModal(true) }

  // Backend ku kaydso
  const handleSubmit = async (formData) => {
    try {
      if (editing) {
        await updateCustomer(editing.customerId, formData)
        setItems((prev) =>
          prev.map((i) => (i.customerId === editing.customerId ? { ...i, ...formData } : i))
        )
      } else {
        const res = await createCustomer(formData)
        setItems((prev) => [...prev, res.data])
      }
      setModalOpen(false)
    } catch (err) {
      console.error('Failed to save customer:', err)
    }
  }

  // Soft delete
  const confirmDelete = async () => {
    try {
      await deactivateCustomer(deleting.customerId)
      setItems((prev) => prev.filter((i) => i.customerId !== deleting.customerId))
      setDeleteModal(false)
      setDeleting(null)
    } catch (err) {
      console.error('Failed to deactivate customer:', err)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-96 items-center justify-center">
        <p className="text-slate-500">Loading customers...</p>
      </div>
    )
  }

  return (
    <div>
      <Header
        title="Customers"
        subtitle="Manage your customer database"
        breadcrumbs={['Home', 'Customers']}
        action={<Button icon={IoAdd} onClick={openAdd}>Add Customer</Button>}
      />

      <Card padding="none">
        <div className="space-y-4 p-4 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <SearchBar
              value={search}
              onChange={handleSearch}
              placeholder="Search customers..."
              className="flex-1"
            />
            <Select
              value={statusFilter}
              onChange={handleFilter}
              placeholder="All Statuses"
              options={[
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
              ]}
              className="w-full sm:w-48"
            />
          </div>
          <CustomerTable data={data} onEdit={openEdit} onDelete={openDelete} />
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
        title={editing ? 'Edit Customer' : 'Add Customer'}
        size="md"
      >
        <CustomerForm
          initialData={editing}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>

      <Modal
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        title="Deactivate Customer"
        footer={
          <>
            <Button variant="outline" onClick={() => setDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Deactivate
            </Button>
          </>
        }
      >
        <p className="text-sm text-slate-600">
          Are you sure you want to deactivate{' '}
          <strong>{deleting?.fullName}</strong>?{/* ← name → fullName */}
        </p>
      </Modal>
    </div>
  )
}
