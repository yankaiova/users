import { useState } from "react";

export const usePagination = (initialPage = 1) => {
  const [page, setPage] = useState(initialPage);
  function goToPage(p) {
    setPage(p);
  }
  return { page, goToPage };
};
