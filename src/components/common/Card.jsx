export default function Card({
  title,
  subtitle,
  action,
  children,
  padding = 'md',
  className = '',
}) {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  return (
    <div className={`rounded-xl border border-slate-100 bg-white shadow-card ${className}`}>
      {(title || action) && (
        <div className={`flex items-start justify-between gap-4 border-b border-slate-100 ${paddingClasses[padding]} pb-4`}>
          <div>
            {title && <h3 className="text-base font-semibold text-slate-900">{title}</h3>}
            {subtitle && <p className="mt-0.5 text-sm text-slate-500">{subtitle}</p>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <div className={paddingClasses[padding]}>{children}</div>
    </div>
  )
}
