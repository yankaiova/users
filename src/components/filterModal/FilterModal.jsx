import React, { useState, useEffect } from "react";
import { FIELDS } from "../../lib/contants/constants";

import styles from "./FilterModal.module.css";

export const FilterModal = ({ isOpen, onClose, onApply, initialFilter }) => {
  const [selectedField, setSelectedField] = useState(FIELDS[0].key);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (initialFilter) {
      setSelectedField(initialFilter.key);
      setInputValue(initialFilter.value);
    } else {
      setSelectedField(FIELDS[0].key);
      setInputValue("");
    }
  }, [initialFilter, isOpen]);

  const fieldMeta = FIELDS.find((f) => f.key === selectedField);

  function handleApply() {
    if (inputValue.trim() === "") {
      alert("Введите значение для фильтра");
      return;
    }
    onApply({ key: selectedField, value: inputValue.trim() });
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className={styles.modalFilter} onClick={onClose}>
      <div
        className={styles.contentModalFilter}
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Фильтр пользователей</h3>
        <div style={{ marginBottom: 10 }}>
          <label>
            Поле фильтрации:
            <select
              value={selectedField}
              onChange={(e) => {
                setSelectedField(e.target.value);
                setInputValue("");
              }}
              style={{ marginLeft: 10 }}
            >
              {FIELDS.map(({ key, label }) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div style={{ marginBottom: 20 }}>
          {fieldMeta.type === "select" ? (
            <select
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            >
              <option value="">Выберите...</option>
              {fieldMeta.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt === "male"
                    ? "Мужской"
                    : opt === "female"
                    ? "Женский"
                    : opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={fieldMeta.type}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={`Введите ${fieldMeta.label.toLowerCase()}`}
            />
          )}
        </div>
        <button onClick={handleApply}>Применить</button>{" "}
        <button onClick={onClose} style={{ marginLeft: 10 }}>
          Отмена
        </button>
      </div>
    </div>
  );
};
