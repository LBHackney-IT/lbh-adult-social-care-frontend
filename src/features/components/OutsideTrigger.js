import React, { useRef, useEffect } from "react";

function useOutisdeTrigger(ref, onClick) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClick(event);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClick]);
}

const OutisdeTrigger = ({ children, onClick, className = "" }) => {
  const wrapperRef = useRef(null);
  useOutisdeTrigger(wrapperRef, onClick);

  return (
    <span className={className} ref={wrapperRef}>
      {children}
    </span>
  );
};

export default OutisdeTrigger;
