import Card from '../common/Card'

export default function ActivityCard({ data }) {
  return (
    <Card title="Recent Activity" subtitle="Latest system events">
      <div className="space-y-4">
        {data.map((item, i) => (
          <div key={item.id} className="flex gap-3">
            <div className="relative flex flex-col items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-50 text-xs font-semibold text-primary-600">
                {i + 1}
              </div>
              {i < data.length - 1 && (
                <div className="absolute top-8 h-full w-px bg-slate-100" />
              )}
            </div>
            <div className="flex-1 pb-4">
              <p className="text-sm font-medium text-slate-900">{item.action}</p>
              <p className="text-sm text-slate-500">{item.detail}</p>
              <p className="mt-1 text-xs text-slate-400">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
