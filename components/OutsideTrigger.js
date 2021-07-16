import React, { useRef, useEffect } from 'react';

function useOutsideTrigger(ref, onClick) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClick(event);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onClick]);
}

const OutsideTrigger = ({ children, onClick, className = '' }) => {
  const wrapperRef = useRef(null);
  useOutsideTrigger(wrapperRef, onClick);

  return (
    <span className={className} ref={wrapperRef}>
      {children}
    </span>
  );
};

export default OutsideTrigger;
