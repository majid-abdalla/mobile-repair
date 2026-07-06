// import Table from '../common/Table'
// import StatusBadge from '../common/StatusBadge'
// import Button from '../common/Button'
// import { IoPencil, IoTrashOutline } from 'react-icons/io5'

// const columns = [
//   { key: 'name', label: 'Name' },
//   { key: 'email', label: 'Email' },
//   { key: 'phone', label: 'Phone' },
//   { key: 'repairs', label: 'Repairs' },
//   { key: 'status', label: 'Status' },
//   { key: 'actions', label: 'Actions' },
// ]

// export default function CustomerTable({ data, onEdit, onDelete }) {
//   return (
//     <Table
//       columns={columns}
//       data={data}
//       renderCell={(row, key) => {
//         if (key === 'status') return <StatusBadge status={row.status} />
//         if (key === 'actions') {
//           return (
//             <div className="flex items-center gap-1">
//               <Button variant="ghost" size="sm" onClick={() => onEdit(row)}>
//                 <IoPencil className="h-4 w-4" />
//               </Button>
//               <Button variant="ghost" size="sm" onClick={() => onDelete(row)}>
//                 <IoTrashOutline className="h-4 w-4 text-red-500" />
//               </Button>
//             </div>
//           )
//         }
//         return row[key]
//       }}
//     />
//   )
// }

import Table from '../common/Table'
import StatusBadge from '../common/StatusBadge'
import Button from '../common/Button'
import { IoPencil, IoTrashOutline } from 'react-icons/io5'

const columns = [
  { key: 'fullName', label: 'Name' },        // ← 'name' → 'fullName'
  { key: 'email', label: 'Email' },           // ← unchanged
  { key: 'phone', label: 'Phone' },           // ← unchanged
  { key: 'isActive', label: 'Status' },       // ← 'status' → 'isActive'
  { key: 'actions', label: 'Actions' },       // ← unchanged
]

export default function CustomerTable({ data, onEdit, onDelete }) {
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
