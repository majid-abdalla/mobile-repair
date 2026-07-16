import { useState, useMemo } from 'react'

export default function usePagination(items, options = {}) {
  const {
    pageSize = 10,
    searchFields = [],
    searchQuery = '',
    filterFn = null,
  } = typeof options === 'number' ? { pageSize: options } : options

  const [currentPage, setCurrentPage] = useState(1)

  const filteredItems = useMemo(() => {
    let result = items

    if (searchQuery && searchFields.length > 0) {
      result = result.filter((item) =>
        searchFields.some((field) =>
          String(item[field]).toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    }

    if (typeof filterFn === 'function') {
      result = result.filter(filterFn)
    }

    return result
  }, [items, searchQuery, searchFields, filterFn]) // ← filterFn wali jiraa

  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(filteredItems.length / pageSize)
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    const currentItems = filteredItems.slice(startIndex, endIndex)

    return {
      currentPage,
      totalPages,
      currentItems,
      data: currentItems,
      startIndex: startIndex + 1,
      endIndex: Math.min(endIndex, filteredItems.length),
      total: filteredItems.length,
    }
  }, [filteredItems, pageSize, currentPage])

  const goToPage = (page) => {
    const pageNum = Math.max(1, Math.min(page, paginationData.totalPages))
    setCurrentPage(pageNum)
  }

  const nextPage = () => goToPage(currentPage + 1)
  const prevPage = () => goToPage(currentPage - 1)
  const resetPage = () => setCurrentPage(1)

  return {
    ...paginationData,
    goToPage,
    nextPage,
    prevPage,
    setCurrentPage,
    resetPage,
  }
}