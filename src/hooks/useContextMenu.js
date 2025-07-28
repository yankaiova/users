import { useEffect, useRef, useState } from "react";

export function useContextMenu() {
  const [isVisible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(null);
  const menuRef = useRef();

  const openMenu = (x, y, activeKey = null) => {
    setVisible(true);
    setPosition({ x, y });
    setActive(activeKey);
  };

  const closeMenu = () => {
    setVisible(false);
    setActive(null);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    }
    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible]);

  return {
    isVisible,
    position,
    active,
    menuRef,
    openMenu,
    closeMenu,
  };
}
