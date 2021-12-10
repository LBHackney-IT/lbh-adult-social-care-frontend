import React from 'react';
import { getTagColorFromStatus } from '../../../../service';
import { Tag } from '../../../HackneyDS';

export const CarePackageStatus = ({ status }) => {
  const color = getTagColorFromStatus(status);
  return (
    <Tag color={color} outline noBackground>
      {status}
    </Tag>
  );
};
