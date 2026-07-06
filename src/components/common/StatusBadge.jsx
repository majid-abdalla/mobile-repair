const statusStyles = {
  active: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  inactive: 'bg-slate-100 text-slate-600 ring-slate-500/20',
  pending: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  'in-progress': 'bg-blue-50 text-blue-700 ring-blue-600/20',
  completed: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  cancelled: 'bg-red-50 text-red-700 ring-red-600/20',
  paid: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  partial: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  refunded: 'bg-purple-50 text-purple-700 ring-purple-600/20',
}

const statusLabels = {
  'in-progress': 'In Progress',
}

export default function StatusBadge({ status }) {
  const normalized = status?.toLowerCase?.() ?? 'pending'
  const style = statusStyles[normalized] ?? statusStyles.pending
  const label = statusLabels[normalized] ?? status?.charAt(0).toUpperCase() + status?.slice(1)

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${style}`}
    >
      {label}
    </span>
  )
}
