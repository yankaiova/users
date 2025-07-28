import { useEffect, useState } from "react";
import { fetchUsers } from "../../api";
import { useResizableColumns } from "../../hooks/useResizebleColumns";
import { useContextMenu } from "../../hooks/useContextMenu";
import { useSort } from "../../hooks/useSort";
import {
  buildFilterParams,
  buildParamUrl,
  buildUrlWithFilters,
} from "../../lib/utils/buildParamsUrl";
import { FIELDS } from "../../lib/contants/constants";
import { SortSelect } from "../sortSelect/SortSelect";
import { Pagination } from "../pagination/Pagination";
import { UserModal } from "../userModal/UserModal";
import { getValue } from "../../lib/utils/getValueByKey";

import styles from "./TableUser.module.css";

export const TableUser = ({ filter, clearFilter, page, setPage }) => {
  const { sortField, sortOrder, setSort, resetSort, getSortParams } = useSort();
  const { columnWidths, startResize } = useResizableColumns();
  const {
    isVisible,
    position,
    active: activeSortField,
    menuRef,
    openMenu,
    closeMenu,
  } = useContextMenu();

  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);

  const limit = 10;
  const skip = (page - 1) * limit;

  const onSortSelect = (order) => {
    clearFilter();
    if (order === "none") {
      resetSort();
    } else {
      setSort(activeSortField, order);
    }
    setPage(1);
    closeMenu();
  };

  useEffect(() => {
    const filterParams = buildFilterParams(filter);

    if (filterParams.length === 0) {
      const { sortBy, order } = getSortParams();
      const params = { limit, skip, sortBy, order };
      const url = buildParamUrl(params);
      fetchUsers(url).then(({ users, total }) => {
        setUsers(users);
        setTotal(total);
      });
      return;
    }

    const { key, value } = filterParams[0];
    const url = buildUrlWithFilters(key, value, limit, skip);
    fetchUsers(url).then(({ users, total }) => {
      setUsers(users);
      setTotal(total);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, limit, skip, sortField, sortOrder]);

  const totalPages = Math.ceil(total / limit);

  if (users.length === 0) return <div>Нет данных</div>;

  return (
    <>
      <table className={styles.table}>
        <thead className={styles.head}>
          <tr>
            {FIELDS.map(({ key, label }) => (
              <th
                key={key}
                className={styles.headTable}
                style={{
                  width: columnWidths[key]
                    ? `${Math.max(columnWidths[key], 50)}px`
                    : "auto",
                }}
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  openMenu(rect.left, rect.bottom, key);
                }}
              >
                {label}{" "}
                {!filter &&
                  sortField === key &&
                  (sortOrder === "asc"
                    ? " 🔼"
                    : sortOrder === "desc"
                    ? " 🔽"
                    : null)}
                <div
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    startResize(e, key);
                  }}
                  className={styles.resize}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedUser(user)}
            >
              {FIELDS.map(({ key }) => (
                <td
                  key={key}
                  className={styles.tableCell}
                  style={{
                    width: columnWidths[key]
                      ? `${Math.max(columnWidths[key], 50)}px`
                      : "auto",
                  }}
                >
                  {getValue(user, key)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination page={page} totalPages={totalPages} goToPage={setPage} />

      {isVisible && (
        <SortSelect
          onSortSelect={onSortSelect}
          menuRef={menuRef}
          position={position}
        />
      )}

      <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
    </>
  );
};
