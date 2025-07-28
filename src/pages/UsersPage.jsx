import { useState } from "react";
import { useFilter } from "../hooks/useFilter";
import { FilterModal } from "../components/filterMOdal/FilterMOdal";
import { TableUser } from "../components/tableUser/TableUser";

export const UsersPage = () => {
  const [page, setPage] = useState(1);
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
            setPage(1);
          }}
        >
          Сбросить фильтр
        </button>
      )}
      <FilterModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onApply={(f) => {
          if (
            confirm(
              "Вы уверены, что хотите применить фильтры? Сортировка будет сброшена"
            )
          ) {
            setPage(1);
            applyFilter(f);
          }
        }}
        initialFilter={filter}
      />
      <TableUser
        page={page}
        setPage={setPage}
        filter={filter}
        clearFilter={clearFilter}
      />
    </>
  );
};
