// import { useState } from 'react'
// import { IoAdd } from 'react-icons/io5'
// import Header from '../components/layout/Header'
// import Card from '../components/common/Card'
// import SearchBar from '../components/common/SearchBar'
// import Pagination from '../components/common/Pagination'
// import Modal from '../components/common/Modal'
// import Button from '../components/common/Button'
// import BrandGrid from '../components/brands/BrandGrid'
// import BrandForm from '../components/brands/BrandForm'
// import usePagination from '../hooks/usePagination'
// import useDebounce from '../hooks/useDebounce'
// import { brands as initialBrands } from '../data/mockData'

// export default function DeviceBrands() {
//   const [items, setItems] = useState(initialBrands)
//   const [search, setSearch] = useState('')
//   const [modalOpen, setModalOpen] = useState(false)
//   const [deleteModal, setDeleteModal] = useState(false)
//   const [editing, setEditing] = useState(null)
//   const [deleting, setDeleting] = useState(null)

//   const debouncedSearch = useDebounce(search)
//   const { data, currentPage, totalPages, goToPage, resetPage } = usePagination(items, {
//     pageSize: 6,
//     searchFields: ['name'],
//     searchQuery: debouncedSearch,
//   })

//   const handleSubmit = (formData) => {
//     if (editing) {
//       setItems((prev) => prev.map((i) => (i.id === editing.id ? { ...i, ...formData } : i)))
//     } else {
//       setItems((prev) => [...prev, { ...formData, id: Date.now(), models: 0 }])
//     }
//     setModalOpen(false)
//   }

//   return (
//     <div>
//       <Header
//         title="Device Brands"
//         subtitle="Manage supported device brands"
//         breadcrumbs={['Home', 'Device Brands']}
//         action={<Button icon={IoAdd} onClick={() => { setEditing(null); setModalOpen(true) }}>Add Brand</Button>}
//       />

//       <Card padding="none">
//         <div className="space-y-4 p-4 sm:p-6">
//           <SearchBar value={search} onChange={(v) => { setSearch(v); resetPage() }} placeholder="Search brands..." className="max-w-md" />
//           <BrandGrid
//             data={data}
//             onEdit={(row) => { setEditing(row); setModalOpen(true) }}
//             onDelete={(row) => { setDeleting(row); setDeleteModal(true) }}
//           />
//           <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
//         </div>
//       </Card>

//       <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Brand' : 'Add Brand'}>
//         <BrandForm initialData={editing} onSubmit={handleSubmit} onCancel={() => setModalOpen(false)} />
//       </Modal>

//       <Modal
//         open={deleteModal}
//         onClose={() => setDeleteModal(false)}
//         title="Delete Brand"
//         footer={
//           <>
//             <Button variant="outline" onClick={() => setDeleteModal(false)}>Cancel</Button>
//             <Button variant="danger" onClick={() => { setItems((p) => p.filter((i) => i.id !== deleting?.id)); setDeleteModal(false) }}>Delete</Button>
//           </>
//         }
//       >
//         <p className="text-sm text-slate-600">Delete brand <strong>{deleting?.name}</strong>?</p>
//       </Modal>
//     </div>
//   )
// }

import { useState, useEffect } from 'react'  // ← useEffect ku dar
import { IoAdd } from 'react-icons/io5'
import Header from '../components/layout/Header'
import Card from '../components/common/Card'
import SearchBar from '../components/common/SearchBar'
import Pagination from '../components/common/Pagination'
import Modal from '../components/common/Modal'
import Button from '../components/common/Button'
import BrandGrid from '../components/brands/BrandGrid'
import BrandForm from '../components/brands/BrandForm'
import usePagination from '../hooks/usePagination'
import useDebounce from '../hooks/useDebounce'
import {
  getBrands,
  createBrand,
  updateBrand,
  deactivateBrand,
} from '../service/deviceService'  // ← mockData import ka beddel

export default function DeviceBrands() {
  const [items, setItems] = useState([])  // ← initialBrands ka beddel []
  const [loading, setLoading] = useState(true)  // ← cusub
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)

  // ← CUSUB: Backend ka soo qaad
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await getBrands()
        setItems(res.data)
      } catch (err) {
        console.error('Failed to fetch brands:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchBrands()
  }, [])

  const debouncedSearch = useDebounce(search)
  const { data, currentPage, totalPages, goToPage, resetPage } = usePagination(items, {
    pageSize: 6,
    searchFields: ['brandName'],  // ← 'name' → 'brandName'
    searchQuery: debouncedSearch,
  })

  // ← CUSUB: Backend ku kaydso
  const handleSubmit = async (formData) => {
    try {
      if (editing) {
        await updateBrand(editing.brandId, { brandName: formData.brandName })
        setItems((prev) =>
          prev.map((i) => (i.brandId === editing.brandId ? { ...i, ...formData } : i))
        )
      } else {
        const res = await createBrand({ brandName: formData.brandName })
        setItems((prev) => [...prev, res.data])
      }
      setModalOpen(false)
    } catch (err) {
      console.error('Failed to save brand:', err)
    }
  }

  // ← CUSUB: Soft delete (deactivate)
  const handleDelete = async () => {
    try {
      await deactivateBrand(deleting.brandId)
      setItems((prev) => prev.filter((i) => i.brandId !== deleting.brandId))
      setDeleteModal(false)
    } catch (err) {
      console.error('Failed to deactivate brand:', err)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-96 items-center justify-center">
        <p className="text-slate-500">Loading brands...</p>
      </div>
    )
  }

  return (
    <div>
      <Header
        title="Device Brands"
        subtitle="Manage supported device brands"
        breadcrumbs={['Home', 'Device Brands']}
        action={
          <Button icon={IoAdd} onClick={() => { setEditing(null); setModalOpen(true) }}>
            Add Brand
          </Button>
        }
      />

      <Card padding="none">
        <div className="space-y-4 p-4 sm:p-6">
          <SearchBar
            value={search}
            onChange={(v) => { setSearch(v); resetPage() }}
            placeholder="Search brands..."
            className="max-w-md"
          />
          <BrandGrid
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
        title={editing ? 'Edit Brand' : 'Add Brand'}
      >
        <BrandForm
          initialData={editing}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>

      <Modal
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        title="Deactivate Brand"
        footer={
          <>
            <Button variant="outline" onClick={() => setDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>  {/* ← handleDelete */}
              Deactivate
            </Button>
          </>
        }
      >
        <p className="text-sm text-slate-600">
          Deactivate brand <strong>{deleting?.brandName}</strong>?  {/* ← brandName */}
        </p>
      </Modal>
    </div>
  )
}