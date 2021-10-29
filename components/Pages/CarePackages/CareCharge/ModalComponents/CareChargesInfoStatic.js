import React from 'react';

const CareChargesInfoStatic = ({ data = [], children }) => (
  <div className="care-charges-modal__info care-charges-modal__values">
    {data.map(({ label, value }) => (
      <div key={label} className="care-charges-modal__content">
        <p>{label}</p>
        <p>{value}</p>
      </div>
    ))}
    
    {children}
  </div>
);

export default CareChargesInfoStatic;
