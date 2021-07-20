import React from 'react';

const LegendItem = ({ className, children }) => (
  <div className="legend-item">
    <div className={`legend-colour ${className}`} />
    {children}
  </div>
);

export default LegendItem;
