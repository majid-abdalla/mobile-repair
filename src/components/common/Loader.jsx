export default function Loader({ fullPage = false, size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'h-5 w-5',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  }

  const spinner = (
    <div
      className={`animate-spin rounded-full border-2 border-primary-200 border-t-primary-600 ${sizeClasses[size]} ${className}`}
    />
  )

  if (fullPage) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        {spinner}
      </div>
    )
  }

  return spinner
}
