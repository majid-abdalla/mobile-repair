import Card from '../common/Card'

export default function RepairChart({ data }) {
  const total = data.reduce((sum, d) => sum + d.count, 0)
  let cumulative = 0

  const segments = data.map((d) => {
    const start = (cumulative / total) * 360
    cumulative += d.count
    const end = (cumulative / total) * 360
    return { ...d, start, end, percent: Math.round((d.count / total) * 100) }
  })

  const polarToCartesian = (cx, cy, r, angle) => {
    const rad = ((angle - 90) * Math.PI) / 180
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
  }

  const describeArc = (cx, cy, r, startAngle, endAngle) => {
    const start = polarToCartesian(cx, cy, r, endAngle)
    const end = polarToCartesian(cx, cy, r, startAngle)
    const largeArc = endAngle - startAngle <= 180 ? 0 : 1
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`
  }

  return (
    <Card title="Repair Status" subtitle="Breakdown by current status">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-around">
        <svg width="160" height="160" viewBox="0 0 160 160">
          {segments.map((seg) => (
            <path
              key={seg.status}
              d={describeArc(80, 80, 60, seg.start, seg.end - 0.5)}
              fill="none"
              stroke={seg.color}
              strokeWidth="24"
              strokeLinecap="round"
            />
          ))}
          <text x="80" y="76" textAnchor="middle" className="fill-slate-900 text-2xl font-bold">
            {total}
          </text>
          <text x="80" y="94" textAnchor="middle" className="fill-slate-500 text-xs">
            Total
          </text>
        </svg>
        <div className="space-y-3">
          {segments.map((seg) => (
            <div key={seg.status} className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: seg.color }} />
              <span className="text-sm text-slate-700">{seg.status}</span>
              <span className="text-sm font-semibold text-slate-900">{seg.count}</span>
              <span className="text-xs text-slate-400">({seg.percent}%)</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
