

import Card from '../common/Card'
import Table from '../common/Table'
import StatusBadge from '../common/StatusBadge'

const columns = [
  { key: 'repairId', label: 'ID' },           // ← 'id' → 'repairId'
  { key: 'customerName', label: 'Customer' },  // ← 'customer' → 'customerName'
  { key: 'modelName', label: 'Device' },       // ← 'device' → 'modelName'
  { key: 'status', label: 'Status' },          // ← unchanged
  { key: 'actualCost', label: 'Cost' },        // ← 'cost' → 'actualCost'
]

export default function RecentRepairs({ data }) {
  return (
    <Card title="Recent Repairs" subtitle="Latest repair orders">
      <Table
        columns={columns}
        data={data}
        renderCell={(row, key) => {
          if (key === 'status') return <StatusBadge status={row.status} />
          if (key === 'actualCost')                           // ← 'cost' → 'actualCost'
            return row.actualCost ? `$${row.actualCost}` : 'N/A'  // ← null check (nullable)
          return row[key]
        }}
      />
    </Card>
  )
}