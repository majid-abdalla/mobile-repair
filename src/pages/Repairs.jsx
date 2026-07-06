// import { useState } from 'react'
// import { IoAdd } from 'react-icons/io5'
// import Header from '../components/layout/Header'
// import Card from '../components/common/Card'
// import Pagination from '../components/common/Pagination'
// import Modal from '../components/common/Modal'
// import Button from '../components/common/Button'
// import RepairTable from '../components/repairs/RepairTable'
// import RepairForm from '../components/repairs/RepairForm'
// import RepairFilters from '../components/repairs/RepairFilters'
// import usePagination from '../hooks/usePagination'
// import useDebounce from '../hooks/useDebounce'
// import { repairs as initialRepairs } from '../data/mockData'

// export default function Repairs() {
//   const [items, setItems] = useState(initialRepairs)
//   const [search, setSearch] = useState('')
//   const [statusFilter, setStatusFilter] = useState('')
//   const [modalOpen, setModalOpen] = useState(false)
//   const [deleteModal, setDeleteModal] = useState(false)
//   const [editing, setEditing] = useState(null)
//   const [deleting, setDeleting] = useState(null)

//   const debouncedSearch = useDebounce(search)
//   const { data, currentPage, totalPages, goToPage, resetPage } = usePagination(items, {
//     pageSize: 5,
//     searchFields: ['id', 'customer', 'device', 'issue'],
//     searchQuery: debouncedSearch,
//     filterFn: statusFilter ? (item) => item.status === statusFilter : null,
//   })

//   const handleSearch = (val) => { setSearch(val); resetPage() }
//   const handleFilter = (val) => { setStatusFilter(val); resetPage() }

//   const handleSubmit = (formData) => {
//     const payload = { ...formData, cost: Number(formData.cost) }
//     if (editing) {
//       setItems((prev) => prev.map((i) => (i.id === editing.id ? { ...i, ...payload } : i)))
//     } else {
//       setItems((prev) => [...prev, { ...payload, id: `R-${1000 + prev.length + 1}`, date: new Date().toISOString().split('T')[0] }])
//     }
//     setModalOpen(false)
//   }

//   const confirmDelete = () => {
//     setItems((prev) => prev.filter((i) => i.id !== deleting.id))
//     setDeleteModal(false)
//   }

//   return (
//     <div>
//       <Header
//         title="Repairs"
//         subtitle="Track and manage repair orders"
//         breadcrumbs={['Home', 'Repairs']}
//         action={<Button icon={IoAdd} onClick={() => { setEditing(null); setModalOpen(true) }}>Add Repair</Button>}
//       />

//       <Card padding="none">
//         <div className="space-y-4 p-4 sm:p-6">
//           <RepairFilters search={search} onSearchChange={handleSearch} statusFilter={statusFilter} onStatusChange={handleFilter} />
//           <RepairTable
//             data={data}
//             onEdit={(row) => { setEditing(row); setModalOpen(true) }}
//             onDelete={(row) => { setDeleting(row); setDeleteModal(true) }}
//           />
//           <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
//         </div>
//       </Card>

//       <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Repair' : 'Add Repair'} size="lg">
//         <RepairForm initialData={editing} onSubmit={handleSubmit} onCancel={() => setModalOpen(false)} />
//       </Modal>

//       <Modal
//         open={deleteModal}
//         onClose={() => setDeleteModal(false)}
//         title="Delete Repair"
//         footer={
//           <>
//             <Button variant="outline" onClick={() => setDeleteModal(false)}>Cancel</Button>
//             <Button variant="danger" onClick={confirmDelete}>Delete</Button>
//           </>
//         }
//       >
//         <p className="text-sm text-slate-600">Delete repair <strong>{deleting?.id}</strong>?</p>
//       </Modal>
//     </div>
//   )
// }


import { useState, useEffect } from 'react'
import { IoAdd } from 'react-icons/io5'
import Header from '../components/layout/Header'
import Card from '../components/common/Card'
import Pagination from '../components/common/Pagination'
import Modal from '../components/common/Modal'
import Button from '../components/common/Button'
import RepairTable from '../components/repairs/RepairTable'
import RepairForm from '../components/repairs/RepairForm'
import RepairFilters from '../components/repairs/RepairFilters'
import usePagination from '../hooks/usePagination'
import useDebounce from '../hooks/useDebounce'
import {
  getRepairs,
  createRepair,
  updateRepairStatus,
  cancelRepair,
} from '../service/repairService'

export default function Repairs() {
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
    fetchRepairs()
  }, [])

  const fetchRepairs = async () => {
    try {
      setLoading(true)
      const res = await getRepairs({ pageNumber: 1, pageSize: 100 })
      setItems(res.data.items ?? [])
    } catch (err) {
      console.error('Failed to fetch repairs:', err)
    } finally {
      setLoading(false)
    }
  }

  const debouncedSearch = useDebounce(search)
  const { data, currentPage, totalPages, goToPage, resetPage } = usePagination(items, {
    pageSize: 10,
    searchFields: ['repairId', 'customerName', 'modelName', 'issueDescription'], // ← backend fields
    searchQuery: debouncedSearch,
    filterFn: statusFilter
      ? (item) => item.status === statusFilter
      : null,
  })

  const handleSearch = (val) => { setSearch(val); resetPage() }
  const handleFilter = (val) => { setStatusFilter(val); resetPage() }

  // Backend ku kaydso
  const handleSubmit = async (formData) => {
    try {
      if (editing) {
        // Repair update — status ama issueDescription
        await updateRepairStatus(editing.repairId, { status: formData.status })
        setItems((prev) =>
          prev.map((i) =>
            i.repairId === editing.repairId ? { ...i, ...formData } : i
          )
        )
      } else {
        // Repair cusub
        const res = await createRepair({
          customerId: formData.customerId,
          modelId: formData.modelId,
          issueDescription: formData.issueDescription,
          estimatedCost: formData.estimatedCost
            ? Number(formData.estimatedCost)
            : null,
        })
        setItems((prev) => [...prev, res.data])
      }
      setModalOpen(false)
    } catch (err) {
      console.error('Failed to save repair:', err)
    }
  }

  // Soft delete — status "Cancelled"
  const confirmDelete = async () => {
    try {
      await cancelRepair(deleting.repairId)
      setItems((prev) =>
        prev.map((i) =>
          i.repairId === deleting.repairId
            ? { ...i, status: 'Cancelled' }
            : i
        )
      )
      setDeleteModal(false)
      setDeleting(null)
    } catch (err) {
      console.error('Failed to cancel repair:', err)
      alert(err.response?.data?.message ?? 'Cannot cancel this repair')
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-96 items-center justify-center">
        <p className="text-slate-500">Loading repairs...</p>
      </div>
    )
  }

  return (
    <div>
      <Header
        title="Repairs"
        subtitle="Track and manage repair orders"
        breadcrumbs={['Home', 'Repairs']}
        action={
          <Button
            icon={IoAdd}
            onClick={() => { setEditing(null); setModalOpen(true) }}
          >
            Add Repair
          </Button>
        }
      />

      <Card padding="none">
        <div className="space-y-4 p-4 sm:p-6">
          <RepairFilters
            search={search}
            onSearchChange={handleSearch}
            statusFilter={statusFilter}
            onStatusChange={handleFilter}
          />
          <RepairTable
            data={data}
            onEdit={(row) => { setEditing(row); setModalOpen(true) }}
            onDelete={(row) => { setDeleting(row); setDeleteModal(true) }}
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
        title={editing ? 'Edit Repair' : 'Add Repair'}
        size="lg"
      >
        <RepairForm
          initialData={editing}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>

      <Modal
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        title="Cancel Repair"
        footer={
          <>
            <Button variant="outline" onClick={() => setDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Confirm Cancel
            </Button>
          </>
        }
      >
        <p className="text-sm text-slate-600">
          Cancel repair{' '}
          <strong>#{deleting?.repairId}</strong> —{' '}
          {deleting?.issueDescription}?
          {(deleting?.status === 'Completed' ||
            deleting?.status === 'Delivered') && (
            <span className="mt-2 block rounded-lg bg-amber-50 px-3 py-2 text-amber-700">
              ⚠️ Warning: {deleting?.status} repairs cannot be cancelled.
            </span>
          )}
        </p>
      </Modal>
    </div>
  )
}