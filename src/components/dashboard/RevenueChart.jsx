import Card from '../common/Card'

export default function RevenueChart({ data }) {
  const max = Math.max(...data.map((d) => d.revenue))
  const chartHeight = 200
  const barWidth = 28
  const gap = 12
  const width = data.length * (barWidth + gap)

  return (
    <Card title="Revenue Overview" subtitle="Monthly revenue for the current year">
      <div className="overflow-x-auto">
        <svg width={width} height={chartHeight + 40} className="min-w-full">
          {data.map((d, i) => {
            const barHeight = (d.revenue / max) * chartHeight
            const x = i * (barWidth + gap)
            const y = chartHeight - barHeight
            return (
              <g key={d.month}>
                <defs>
                  <linearGradient id={`barGrad${i}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  rx={4}
                  fill={`url(#barGrad${i})`}
                  className="transition-all duration-300 hover:opacity-80"
                />
                <text x={x + barWidth / 2} y={chartHeight + 20} textAnchor="middle" className="fill-slate-500 text-[10px]">
                  {d.month}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
    </Card>
  )
}
