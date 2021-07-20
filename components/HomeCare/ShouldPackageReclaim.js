import React from 'react';
import RadioButton from '../RadioButton';

const reclaimedRadioOptions = [
  { text: 'Yes', value: true },
  { text: 'Not sure', value: false },
];

const ShouldPackageReclaim = ({ isReclaimed, setIsReclaimed, className = '' }) => (
  <div
    className={`column should-package-reclaim is-justify-content-space-between is-flex is-flex-wrap-wrap ${className}`}
  >
    <p>Should the cost of this package be reclaimed in part or full from another body, e.g. NHS, CCG, another LA ?</p>
    <RadioButton
      options={reclaimedRadioOptions}
      inline={false}
      selectedValue={isReclaimed}
      onChange={(value) => setIsReclaimed(value)}
    />
  </div>
);

export default ShouldPackageReclaim;
