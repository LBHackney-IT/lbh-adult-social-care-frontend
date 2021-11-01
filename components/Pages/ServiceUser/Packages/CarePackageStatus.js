import React from 'react';
import { isAfter } from 'date-fns';
import { getTagColorFromStatus } from '../../../../service';
import { Tag } from '../../../HackneyDS';

export const CarePackageStatus = ({ status, packageData }) => {
  const getApprovedStatus = (endDate) => {
    if (endDate !== null && isAfter(new Date(), endDate)) {
      return 'Future';
    }
    return 'Active';
  };

  const getStatus = () => {
    switch (status) {
      case 'Approved':
        return packageData.filter((d) => d.status === 'Approved').map((d) => getApprovedStatus(d.endDate));
      case 'Ended':
        return 'End';
      case 'Cancelled':
        return 'Cancelled';
      case 'New':
        return 'New';
      case 'In Progress':
        return 'In Progress';
      case 'Pending':
        return 'Pending';
      default:
        return 'Waiting for Approval';
    }
  };

  const activeStatus = getStatus(status, packageData);
  const color = activeStatus === 'Active' ? '#00664F' : getTagColorFromStatus(status);

  return (
    <Tag color={color} outline noBackground>
      {activeStatus}
    </Tag>
  );
};
