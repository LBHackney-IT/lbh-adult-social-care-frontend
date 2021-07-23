import React from 'react';

const PackageHeader = ({ title = 'Proposed Packages' }) => {
  return (
    <div className="package-header">
      <p className="title">{title}</p>
    </div>
  );
};
export default PackageHeader;
