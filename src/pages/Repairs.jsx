import { useState, useEffect, useMemo } from 'react'
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
  updateRepairCosts,
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

  useEffect(() => {
    fetchRepairs()
  }, [])

  const fetchRepairs = async () => {
    try {
      setLoading(true)
      const res = await getRepairs({ pageNumber: 1, pageSize: 100 })
      const data = res.data.items ?? []
      console.log('First repair status:', data[0]?.status) // ← check
      console.log('All statuses:', data.map(r => r.status)) // ← check all
      setItems(data)
    } catch (err) {
      console.error('Failed to fetch repairs:', err)
    } finally {
      setLoading(false)
    }
  }

  const debouncedSearch = useDebounce(search)

  const filteredItems = useMemo(() => {
    if (!statusFilter) return items
    console.log('Filtering by:', statusFilter) // ← check filter value
    console.log('Items before filter:', items.map(i => i.status)) // ← check
    return items.filter((item) => item.status === statusFilter)
  }, [items, statusFilter])

  const { data, currentPage, totalPages, goToPage, resetPage } = usePagination(filteredItems, {
    pageSize: 10,
    searchFields: ['repairId', 'customerName', 'modelName', 'issueDescription'],
    searchQuery: debouncedSearch,
  })

  const handleSearch = (val) => { setSearch(val); resetPage() }
  const handleFilter = (val) => { setStatusFilter(val); resetPage() }

  const handleSubmit = async (formData) => {
    try {
      if (editing) {
        if (formData.status && formData.status !== editing.status) {
          await updateRepairStatus(editing.repairId, { status: formData.status })
        }

        if (formData.estimatedCost || formData.actualCost) {
          await updateRepairCosts(editing.repairId, {
            estimatedCost: formData.estimatedCost
              ? Number(formData.estimatedCost)
              : null,
            actualCost: formData.actualCost
              ? Number(formData.actualCost)
              : null,
          })
        }

        setItems((prev) =>
          prev.map((i) =>
            i.repairId === editing.repairId
              ? {
                  ...i,
                  status: formData.status || i.status,
                  estimatedCost: formData.estimatedCost
                    ? Number(formData.estimatedCost)
                    : i.estimatedCost,
                  actualCost: formData.actualCost
                    ? Number(formData.actualCost)
                    : i.actualCost,
                }
              : i
          )
        )
      } else {
        const res = await createRepair({
          customerId: Number(formData.customerId),
          modelId: Number(formData.modelId),
          issueDescription: formData.issueDescription,
          estimatedCost: formData.estimatedCost
            ? Number(formData.estimatedCost)
            : null,
        })
        setItems((prev) => [...prev, res.data])
      }
      setModalOpen(false)
    } catch (err) {
      const message = err.response?.data?.message ?? 'Failed to save repair'
      alert(message)
      console.error('Failed to save repair:', err)
    }
  }

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
      const message = err.response?.data?.message ?? 'Cannot cancel this repair'
      alert(message)
      console.error('Failed to cancel repair:', err)
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

//this backend of java(spring boot)

// import { useState, useEffect } from 'react'
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
// import {
//   getRepairs,
//   createRepair,
//   updateRepairStatus,
//   cancelRepair,
// } from '../service/repairService'

// export default function Repairs() {
//   const [items, setItems] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [search, setSearch] = useState('')
//   const [statusFilter, setStatusFilter] = useState('')
//   const [modalOpen, setModalOpen] = useState(false)
//   const [deleteModal, setDeleteModal] = useState(false)
//   const [editing, setEditing] = useState(null)
//   const [deleting, setDeleting] = useState(null)

//   useEffect(() => {
//     fetchRepairs()
//   }, [])

//   const fetchRepairs = async () => {
//     try {
//       setLoading(true)
//       const res = await getRepairs()
//       setItems(res.data ?? [])
//     } catch (err) {
//       console.error('Failed to fetch repairs:', err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const debouncedSearch = useDebounce(search)
//   const { data, currentPage, totalPages, goToPage, resetPage } = usePagination(items, {
//     pageSize: 10,
//     searchFields: ['id', 'issueDescription', 'status'],
//     searchQuery: debouncedSearch,
//     filterFn: statusFilter
//       ? (item) => item.status === statusFilter
//       : null,
//   })

//   const handleSearch = (val) => { setSearch(val); resetPage() }
//   const handleFilter = (val) => { setStatusFilter(val); resetPage() }

//   const handleSubmit = async (formData) => {
//     try {
//       if (editing) {
//         await updateRepairStatus(editing.id, { status: formData.status })
//         setItems((prev) =>
//           prev.map((i) =>
//             i.id === editing.id ? { ...i, ...formData } : i
//           )
//         )
//       } else {
//         const res = await createRepair({
//           issueDescription: formData.issueDescription,
//           customer: { id: formData.customerId },
//           deviceModel: { id: formData.modelId },
//           totalCost: formData.estimatedCost
//             ? Number(formData.estimatedCost)
//             : 0,
//         })
//         setItems((prev) => [...prev, res.data])
//       }
//       setModalOpen(false)
//     } catch (err) {
//       console.error('Failed to save repair:', err)
//     }
//   }

//   const confirmDelete = async () => {
//     try {
//       await cancelRepair(deleting.id)
//       setItems((prev) =>
//         prev.map((i) =>
//           i.id === deleting.id
//             ? { ...i, status: 'Cancelled' }
//             : i
//         )
//       )
//       setDeleteModal(false)
//       setDeleting(null)
//     } catch (err) {
//       console.error('Failed to cancel repair:', err)
//     }
//   }

//   if (loading) {
//     return (
//       <div className="flex min-h-96 items-center justify-center">
//         <p className="text-slate-500">Loading repairs...</p>
//       </div>
//     )
//   }

//   return (
//     <div>
//       <Header
//         title="Repairs"
//         subtitle="Track and manage repair orders"
//         breadcrumbs={['Home', 'Repairs']}
//         action={
//           <Button
//             icon={IoAdd}
//             onClick={() => { setEditing(null); setModalOpen(true) }}
//           >
//             Add Repair
//           </Button>
//         }
//       />

//       <Card padding="none">
//         <div className="space-y-4 p-4 sm:p-6">
//           <RepairFilters
//             search={search}
//             onSearchChange={handleSearch}
//             statusFilter={statusFilter}
//             onStatusChange={handleFilter}
//           />
//           <RepairTable
//             data={data}
//             onEdit={(row) => { setEditing(row); setModalOpen(true) }}
//             onDelete={(row) => { setDeleting(row); setDeleteModal(true) }}
//           />
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={goToPage}
//           />
//         </div>
//       </Card>

//       <Modal
//         open={modalOpen}
//         onClose={() => setModalOpen(false)}
//         title={editing ? 'Edit Repair' : 'Add Repair'}
//         size="lg"
//       >
//         <RepairForm
//           initialData={editing}
//           onSubmit={handleSubmit}
//           onCancel={() => setModalOpen(false)}
//         />
//       </Modal>

//       <Modal
//         open={deleteModal}
//         onClose={() => setDeleteModal(false)}
//         title="Cancel Repair"
//         footer={
//           <>
//             <Button variant="outline" onClick={() => setDeleteModal(false)}>
//               Cancel
//             </Button>
//             <Button variant="danger" onClick={confirmDelete}>
//               Confirm Cancel
//             </Button>
//           </>
//         }
//       >
//         <p className="text-sm text-slate-600">
//           Cancel repair{' '}
//           <strong>#{deleting?.id}</strong> —{' '}
//           {deleting?.issueDescription}?
//         </p>
//       </Modal>
//     </div>
//   )
// }