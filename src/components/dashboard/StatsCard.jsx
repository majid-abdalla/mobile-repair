import {
  IoConstructOutline,
  IoCashOutline,
  IoPeopleOutline,
  IoTimeOutline,
  IoTrendingUp,
  IoTrendingDown,
} from 'react-icons/io5'

const iconMap = {
  wrench: IoConstructOutline,
  dollar: IoCashOutline,
  users: IoPeopleOutline,
  clock: IoTimeOutline,
}

export default function StatsCard({ label, value, change, trend, icon }) {
  const Icon = iconMap[icon] ?? IoConstructOutline
  const isUp = trend === 'up'

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-card transition-all duration-200 hover:shadow-elevated">
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-50">
          <Icon className="h-5 w-5 text-primary-600" />
        </div>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
            isUp ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
          }`}
        >
          {isUp ? <IoTrendingUp className="h-3 w-3" /> : <IoTrendingDown className="h-3 w-3" />}
          {change}
        </span>
      </div>
      <p className="mt-4 text-2xl font-bold text-slate-900">{value}</p>
      <p className="mt-1 text-sm text-slate-500">{label}</p>
    </div>
  )
}
