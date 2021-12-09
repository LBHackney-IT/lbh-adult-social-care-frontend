import React from 'react';
import { isBefore, isToday } from 'date-fns';
import { getTagColorFromStatus } from '../../../../service';
import { Tag } from '../../../HackneyDS';

export const CarePackageStatus = ({ status, packageData }) => {
  const daysToday = packageData.filter((d) => isToday(new Date(d.startDate))).length;
  const daysBeforeToday = packageData.filter((d) => isBefore(new Date(d.startDate), new Date())).length;
  const getStatus = () => {
    switch (status) {
      case 'Approved':
        return daysToday > 0 || daysBeforeToday > 0 ? 'Active' : 'Future';
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
      case 'Active':
        return 'Active';
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
