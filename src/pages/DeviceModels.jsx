
import { useState, useEffect } from 'react'
import { IoAdd } from 'react-icons/io5'
import Header from '../components/layout/Header'
import Card from '../components/common/Card'
import SearchBar from '../components/common/SearchBar'
import Select from '../components/common/Select'
import Pagination from '../components/common/Pagination'
import Modal from '../components/common/Modal'
import Button from '../components/common/Button'
import ModelTable from '../components/models/ModelTable'
import ModelForm from '../components/models/ModelForm'
import usePagination from '../hooks/usePagination'
import useDebounce from '../hooks/useDebounce'
import {
  getModels,
  createModel,
  updateModel,
  deactivateModel,
  getBrands,
} from '../service/deviceService'

export default function DeviceModels() {
  const [items, setItems] = useState([])
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [brandFilter, setBrandFilter] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)

  // Backend ka soo qaad — models + brands labadaba
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [modelsRes, brandsRes] = await Promise.all([
          getModels({}),
          getBrands(),
        ])
        setItems(modelsRes.data ?? [])
        setBrands(brandsRes.data ?? [])
      } catch (err) {
        console.error('Failed to fetch data:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const debouncedSearch = useDebounce(search)
  const { data, currentPage, totalPages, goToPage, resetPage } = usePagination(items, {
    pageSize: 10,
    searchFields: ['modelName', 'brandName'],   // ← 'name', 'brand' → backend fields
    searchQuery: debouncedSearch,
    filterFn: brandFilter
      ? (item) => item.brandId === Number(brandFilter)  // ← brandId isticmaal
      : null,
  })

  // Backend ku kaydso
  const handleSubmit = async (formData) => {
    try {
      if (editing) {
        await updateModel(editing.modelId, {
          brandId: Number(formData.brandId),
          modelName: formData.modelName,
        })
        setItems((prev) =>
          prev.map((i) =>
            i.modelId === editing.modelId
              ? {
                  ...i,
                  brandId: Number(formData.brandId),
                  modelName: formData.modelName,
                  brandName: brands.find(b => b.brandId === Number(formData.brandId))?.brandName,
                }
              : i
          )
        )
      } else {
        const res = await createModel({
          brandId: Number(formData.brandId),
          modelName: formData.modelName,
        })
        setItems((prev) => [...prev, res.data])
      }
      setModalOpen(false)
    } catch (err) {
      const message = err.response?.data?.message ?? 'Failed to save model'
      alert(message)
      console.error('Failed to save model:', err)
    }
  }

  // Soft delete
  const confirmDelete = async () => {
    try {
      await deactivateModel(deleting.modelId)
      setItems((prev) => prev.filter((i) => i.modelId !== deleting.modelId))
      setDeleteModal(false)
      setDeleting(null)
    } catch (err) {
      console.error('Failed to deactivate model:', err)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-96 items-center justify-center">
        <p className="text-slate-500">Loading models...</p>
      </div>
    )
  }

  return (
    <div>
      <Header
        title="Device Models"
        subtitle="Manage device models by brand"
        breadcrumbs={['Home', 'Device Models']}
        action={
          <Button
            icon={IoAdd}
            onClick={() => { setEditing(null); setModalOpen(true) }}
          >
            Add Model
          </Button>
        }
      />

      <Card padding="none">
        <div className="space-y-4 p-4 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <SearchBar
              value={search}
              onChange={(v) => { setSearch(v); resetPage() }}
              placeholder="Search models..."
              className="flex-1"
            />
            <Select
              value={brandFilter}
              onChange={(v) => { setBrandFilter(v); resetPage() }}
              placeholder="All Brands"
              options={brands.map((b) => ({
                value: String(b.brandId),   // ← b.name → b.brandId
                label: b.brandName,         // ← b.name → b.brandName
              }))}
              className="w-full sm:w-48"
            />
          </div>
          <ModelTable
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
        title={editing ? 'Edit Model' : 'Add Model'}
      >
        <ModelForm
          brands={brands}
          initialData={editing}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>

      <Modal
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        title="Deactivate Model"
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
          Deactivate model{' '}
          <strong>{deleting?.modelName}</strong>?{/* ← name → modelName */}
        </p>
      </Modal>
    </div>
  )
}