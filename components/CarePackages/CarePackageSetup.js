import React from 'react';
import { Button } from '../Button';

const CarePackageSetup = ({ children, className = '', onBuildClick = () => {} }) => (
  <div className={className}>
    {children}
    <div className="mt-4">
      <Button onClick={onBuildClick}>Build package</Button>
    </div>
  </div>
);

export default CarePackageSetup;
