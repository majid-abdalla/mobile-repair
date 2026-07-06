// import Table from '../common/Table'
// import StatusBadge from '../common/StatusBadge'
// import Button from '../common/Button'
// import { IoPencil, IoTrashOutline } from 'react-icons/io5'

// const columns = [
//   { key: 'id', label: 'ID' },
//   { key: 'repairId', label: 'Repair' },
//   { key: 'customer', label: 'Customer' },
//   { key: 'amount', label: 'Amount' },
//   { key: 'method', label: 'Method' },
//   { key: 'status', label: 'Status' },
//   { key: 'actions', label: 'Actions' },
// ]

// export default function PaymentTable({ data, onEdit, onDelete }) {
//   return (
//     <Table
//       columns={columns}
//       data={data}
//       renderCell={(row, key) => {
//         if (key === 'status') return <StatusBadge status={row.status} />
//         if (key === 'amount') return `$${row.amount}`
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
import Button from '../common/Button'
import { IoEyeOutline } from 'react-icons/io5'

const columns = [
  { key: 'paymentId', label: 'ID' },              // ← 'id' → 'paymentId'
  { key: 'repairId', label: 'Repair' },            // ← unchanged
  { key: 'amount', label: 'Amount' },              // ← unchanged
  { key: 'paymentMethod', label: 'Method' },       // ← 'method' → 'paymentMethod'
  { key: 'paymentDate', label: 'Date' },           // ← 'status' → 'paymentDate'
  { key: 'receivedByName', label: 'Received By' }, // ← cusub
]

export default function PaymentTable({ data, onEdit }) {
  return (
    <Table
      columns={columns}
      data={data}
      renderCell={(row, key) => {
        if (key === 'amount')
          return `$${row.amount}`
        if (key === 'paymentDate')
          return new Date(row.paymentDate).toLocaleDateString()
        return row[key]
      }}
    />
  )
}