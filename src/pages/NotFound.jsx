import { Link } from 'react-router-dom'
import Button from '../components/common/Button'
import { IoHomeOutline } from 'react-icons/io5'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface-muted px-4 text-center">
      <div className="mb-8">
        <svg viewBox="0 0 200 120" className="mx-auto h-32 w-48" fill="none">
          <text x="50%" y="60%" textAnchor="middle" className="fill-primary-600 text-6xl font-bold" fontSize="64">404</text>
          <circle cx="40" cy="90" r="8" fill="#8b5cf6" opacity="0.3"/>
          <circle cx="160" cy="30" r="12" fill="#3b82f6" opacity="0.3"/>
          <rect x="70" y="80" width="60" height="4" rx="2" fill="#cbd5e1"/>
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-slate-900">Page Not Found</h1>
      <p className="mt-2 max-w-md text-slate-500">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/dashboard" className="mt-8">
        <Button icon={IoHomeOutline}>Back to Dashboard</Button>
      </Link>
    </div>
  )
}
