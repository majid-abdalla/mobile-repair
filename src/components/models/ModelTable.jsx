
import Table from '../common/Table'
import StatusBadge from '../common/StatusBadge'
import Button from '../common/Button'
import { IoPencil, IoTrashOutline } from 'react-icons/io5'

const columns = [
  { key: 'modelName', label: 'Model' },              // ← 'name' → 'modelName'
  { key: 'brandName', label: 'Brand' },              // ← 'brand' → 'brandName'
  { key: 'isActive', label: 'Status' },              // ← 'year' + 'status' → 'isActive'
  { key: 'actions', label: 'Actions' },              // ← unchanged
]

export default function ModelTable({ data, onEdit, onDelete }) {
  return (
    <Table
      columns={columns}
      data={data}
      renderCell={(row, key) => {
        if (key === 'isActive')
          return <StatusBadge status={row.isActive ? 'active' : 'inactive'} />  // ← bool → string
        if (key === 'actions') {
          return (
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" onClick={() => onEdit(row)}>
                <IoPencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onDelete(row)}>
                <IoTrashOutline className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          )
        }
        return row[key]
      }}
    />
  )
}
