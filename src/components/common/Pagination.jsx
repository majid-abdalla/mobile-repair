import { IoChevronBack, IoChevronForward } from 'react-icons/io5'
import Button from './Button'

export default function Pagination({ currentPage, totalPages, onPageChange, className = '' }) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  const visiblePages = pages.filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1
  )

  return (
    <div className={`flex items-center justify-between gap-2 ${className}`}>
      <p className="text-sm text-slate-500">
        Page {currentPage} of {totalPages}
      </p>
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          icon={IoChevronBack}
        >
          Prev
        </Button>
        {visiblePages.map((page, idx) => {
          const prev = visiblePages[idx - 1]
          const showEllipsis = prev && page - prev > 1
          return (
            <span key={page} className="flex items-center gap-1">
              {showEllipsis && <span className="px-1 text-slate-400">...</span>}
              <button
                onClick={() => onPageChange(page)}
                className={`min-w-[36px] rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
                  currentPage === page
                    ? 'bg-primary-600 text-white'
                    : 'text-slate-600 hover:bg-surface-subtle'
                }`}
              >
                {page}
              </button>
            </span>
          )
        })}
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
          <IoChevronForward className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
