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
        onChange={(e) => onStatusChange(e.target.value)}  // ← e.target.value
        placeholder="All Statuses"
        options={[
          { value: 'Received', label: 'Received' },
          { value: 'InProgress', label: 'In Progress' },
          { value: 'Completed', label: 'Completed' },
          { value: 'Delivered', label: 'Delivered' },
          { value: 'Cancelled', label: 'Cancelled' },
        ]}
        className="w-full sm:w-48"
      />
    </div>
  )
}