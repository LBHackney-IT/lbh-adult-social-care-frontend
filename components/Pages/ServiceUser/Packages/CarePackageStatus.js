import React from 'react';
import { isBefore } from 'date-fns';
import { getTagColorFromStatus } from '../../../../service';
import { Tag } from '../../../HackneyDS';

export const CarePackageStatus = ({ status, packageData }) => {
  const getStatus = () => {
    switch (status) {
      case 'Approved':
        return packageData?.includes((d) => isBefore(d.startDate, new Date())) ? 'Active' : 'Future';
      case 'Ended':
        return 'End';
      case 'Cancelled':
        return 'Cancelled';
      case 'New':
        return 'New';
      case 'In Progress':
        return 'In Progress';
      case 'Not Approved':
        return 'Not Approved';
      case 'Pending':
        return 'Pending';
      default:
        return 'Waiting for Approval';
    }
  };

  const activeStatus = getStatus(status, packageData);
  const color = getTagColorFromStatus(status);
  return (
    <Tag color={color} outline noBackground>
      {activeStatus}
    </Tag>
  );
};
