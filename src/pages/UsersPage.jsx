import { useState } from "react";
import { useFilter } from "../hooks/useFilter";
import { usePagination } from "../hooks/usePagination";
import { FilterModal } from "../components/filterMOdal/FilterMOdal";
import { TableUser } from "../components/tableUser/TableUser";

export const UsersPage = () => {
  const { goToPage } = usePagination();
  const [isOpen, setIsOpen] = useState(false);
  const { filter, applyFilter, clearFilter } = useFilter(null);
  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        {filter ? "Изменить фильтр" : "Добавить фильтр"}
      </button>{" "}
      {filter && (
        <button
          onClick={() => {
            clearFilter();
            goToPage(1);
          }}
        >
          Сбросить фильтр
        </button>
      )}
      <FilterModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onApply={(f) => {
          applyFilter(f);
          goToPage(1);
        }}
        initialFilter={filter}
      />
      <TableUser filter={filter} clearFilter={clearFilter} />
    </>
  );
};
