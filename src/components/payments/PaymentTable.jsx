import Table from '../common/Table'
import Button from '../common/Button'
import { IoEyeOutline } from 'react-icons/io5'

const columns = [
  { key: 'paymentId', label: 'ID' },              
  { key: 'repairId', label: 'Repair' },            
  { key: 'amount', label: 'Amount' },              
  { key: 'paymentMethod', label: 'Method' },       
  { key: 'paymentDate', label: 'Date' },           
  { key: 'receivedByName', label: 'Received By' }, 
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