import styles from "./SortSelect.module.css";

export const SortSelect = ({ onSortSelect, menuRef, position }) => {
  return (
    <div
      ref={menuRef}
      className={styles.sortSelect}
      style={{ top: position.y + 5, left: position.x }}
    >
      <div className={styles.sortOption} onClick={() => onSortSelect("asc")}>
        Сортировать по возрастанию
      </div>
      <div className={styles.sortOption} onClick={() => onSortSelect("desc")}>
        Сортировать по убыванию
      </div>
      <div className={styles.sortOption} onClick={() => onSortSelect("none")}>
        Без сортировки
      </div>
    </div>
  );
};
