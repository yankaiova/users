import { useState } from "react";

export function useFilter(initialFilter = null) {
  const [filter, setFilter] = useState(initialFilter);

  function applyFilter(newFilter) {
    setFilter(newFilter);
  }

  function clearFilter() {
    setFilter(null);
  }

  return { filter, applyFilter, clearFilter };
}
