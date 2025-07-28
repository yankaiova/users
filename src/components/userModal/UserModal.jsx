import React from "react";
import styles from "./UserModal.module.css";

export const UserModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className={styles.modalDialog} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.button}
          onClick={onClose}
          aria-label="Закрыть"
        >
          &times;
        </button>

        <img
          src={user.image}
          alt="картинка пользователя"
          className={styles.imgUser}
        />

        <h2>
          {`${user.lastName} ${user.firstName} ${user.maidenName || ""}`.trim()}
        </h2>
        <p>
          <b>Возраст:</b> {user.age}
        </p>

        {user.address && (
          <>
            <p>
              <b>Адрес:</b>
            </p>
            <p>
              {user.address.address}, {user.address.city}, {user.address.state},{" "}
              {user.address.postalCode}, {user.address.country}
            </p>
          </>
        )}

        <p>
          <b>Рост:</b> {user.height} см
        </p>
        <p>
          <b>Вес:</b> {user.weight} кг
        </p>
        <p>
          <b>Телефон:</b> {user.phone}
        </p>
        <p>
          <b>Email:</b> {user.email}
        </p>
      </div>
    </div>
  );
};
