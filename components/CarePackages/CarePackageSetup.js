import React from 'react';
import { Button } from '../Button';

const CarePackageSetup = ({ children, onBuildClick = () => {} }) => (
  <div>
    {children}
    <div className="mt-4">
      <Button onClick={onBuildClick}>Build package</Button>
    </div>
  </div>
);

export default CarePackageSetup;
