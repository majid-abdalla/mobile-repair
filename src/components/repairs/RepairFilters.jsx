import SearchBar from '../common/SearchBar'
import Select from '../common/Select'

export default function RepairFilters({ search, onSearchChange, statusFilter, onStatusChange }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <SearchBar
        value={search}
        onChange={onSearchChange}
        placeholder="Search repairs..."
        className="flex-1"
      />
      <Select
        value={statusFilter}
        onChange={onStatusChange}
        placeholder="All Statuses"
        options={[
          { value: 'pending', label: 'Pending' },
          { value: 'in-progress', label: 'In Progress' },
          { value: 'completed', label: 'Completed' },
          { value: 'cancelled', label: 'Cancelled' },
        ]}
        className="w-full sm:w-48"
      />
    </div>
  )
}
