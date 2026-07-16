import Table from '../common/Table'
import StatusBadge from '../common/StatusBadge'
import Button from '../common/Button'
import { IoPencil, IoTrashOutline } from 'react-icons/io5'

const columns = [
  { key: 'repairId', label: 'ID' },                  // ← 'id' → 'repairId'
  { key: 'customerName', label: 'Customer' },         // ← 'customer' → 'customerName'
  { key: 'modelName', label: 'Device' },              // ← 'device' → 'modelName'
  { key: 'issueDescription', label: 'Issue' },        // ← 'issue' → 'issueDescription'
  { key: 'status', label: 'Status' },                 // ← unchanged
  { key: 'actualCost', label: 'Cost' },               // ← 'cost' → 'actualCost'
  { key: 'actions', label: 'Actions' },               // ← unchanged
]

export default function RepairTable({ data, onEdit, onDelete }) {
  return (
    <Table
      columns={columns}
      data={data}
      renderCell={(row, key) => {
        if (key === 'status') return <StatusBadge status={row.status} />
        if (key === 'actualCost')
          return row.actualCost ? `$${row.actualCost}` : 'N/A'  // ← nullable check
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

///this backend of java(spring boot)

// import Table from '../common/Table'
// import StatusBadge from '../common/StatusBadge'
// import Button from '../common/Button'
// import { IoPencil, IoTrashOutline } from 'react-icons/io5'

// const columns = [
//   { key: 'id', label: 'ID' },
//   { key: 'customer', label: 'Customer' },
//   { key: 'deviceModel', label: 'Device' },
//   { key: 'issueDescription', label: 'Issue' },
//   { key: 'status', label: 'Status' },
//   { key: 'totalCost', label: 'Cost' },
//   { key: 'actions', label: 'Actions' },
// ]

// export default function RepairTable({ data, onEdit, onDelete }) {
//   return (
//     <Table
//       columns={columns}
//       data={data}
//       renderCell={(row, key) => {
//         if (key === 'customer')
//           return row.customer?.fullName ?? 'N/A'
//         if (key === 'deviceModel')
//           return row.deviceModel?.modelName ?? 'N/A'
//         if (key === 'status')
//           return <StatusBadge status={row.status} />
//         if (key === 'totalCost')
//           return row.totalCost ? `$${row.totalCost}` : 'N/A'
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