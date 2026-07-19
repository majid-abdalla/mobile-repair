import StatusBadge from '../common/StatusBadge'
import Button from '../common/Button'
import { IoPencil, IoTrashOutline } from 'react-icons/io5'

export default function BrandGrid({ data, onEdit, onDelete }) {
  if (!data.length) {
    return <p className="py-8 text-center text-sm text-slate-500">No brands found</p>
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((brand) => (
        <div
          key={brand.brandId}                    // ← 'id' → 'brandId'
          className="rounded-xl border border-slate-100 bg-white p-5 shadow-card transition-all duration-200 hover:shadow-elevated"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-subtle text-2xl">
                📱                               {/* ← brand.logo ma jirto backend-ka */}
              </span>
              <div>
                <h3 className="font-semibold text-slate-900">
                  {brand.brandName}              {/* ← 'name' → 'brandName' */}
                </h3>
                <p className="text-sm text-slate-500">
                  {brand.isActive ? 'Active' : 'Inactive'}  {/* ← 'models' → isActive */}
                </p>
              </div>
            </div>
            <StatusBadge status={brand.isActive ? 'active' : 'inactive'} />  {/* ← bool → string */}
          </div>
          <div className="mt-4 flex justify-end gap-1">
            <Button variant="ghost" size="sm" onClick={() => onEdit(brand)}>
              <IoPencil className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onDelete(brand)}>
              <IoTrashOutline className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}