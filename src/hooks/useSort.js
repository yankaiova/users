import { useState } from "react";

export function useSort(initialField = null, initialOrder = null) {
  const [sortField, setSortField] = useState(initialField);
  const [sortOrder, setSortOrder] = useState(initialOrder);

  function setSort(field, order) {
    setSortField(field);
    setSortOrder(order);
  }

  function toggleSort(field) {
    if (field !== sortField) {
      setSortField(field);
      setSortOrder("asc");
    } else {
      if (sortOrder === "asc") {
        setSortOrder("desc");
      } else if (sortOrder === "desc") {
        setSortField(null);
        setSortOrder(null);
      } else {
        setSortOrder("asc");
      }
    }
  }

  function resetSort() {
    setSortField(null);
    setSortOrder(null);
  }

  function getSortParams() {
    return {
      sortBy: sortField || undefined,
      order: sortOrder || undefined,
    };
  }

  return {
    sortField,
    sortOrder,
    setSort,
    toggleSort,
    resetSort,
    getSortParams,
  };
}
