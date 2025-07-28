import { useState, useRef } from "react";

export const useResizableColumns = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const resizing = useRef(null);

  const startResize = (e, key) => {
    resizing.current = {
      startX: e.clientX,
      key,
      startWidth: columnWidths[key] || 150,
    };

    const onMouseMove = (moveEvent) => {
      const dx = moveEvent.clientX - resizing.current.startX;
      const newWidth = Math.max(resizing.current.startWidth + dx, 50);
      setColumnWidths((prev) => ({
        ...prev,
        [resizing.current.key]: newWidth,
      }));
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      resizing.current = null;
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return { columnWidths, startResize };
};
