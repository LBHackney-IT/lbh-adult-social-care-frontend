export const packageStatuses = [
  { statusId: 1, statusName: 'New', displayName: 'New', background: 'green' },
  { statusId: 2, statusName: 'InProgress', displayName: 'InProgress', background: 'yellow' },
  { statusId: 3, statusName: 'Waiting for approval', displayName: 'Waiting for approval', background: 'blue' },
  { statusId: 4, statusName: 'Approved', displayName: 'Approved', background: 'gray' },
  { statusId: 5, statusName: 'Not Approved', displayName: 'Not Approved', background: 'red' },
  { statusId: 6, statusName: 'Ended', displayName: 'Ended', background: 'red' },
  { statusId: 7, statusName: 'Cancelled', displayName: 'Cancelled', background: 'red' },
  { statusId: 8, statusName: 'Rejected', displayName: 'Rejected', background: 'red' },
];

export const getPackageStatusBy = ({ statusName, statusId }) =>
  packageStatuses.find((status) => status[statusName ? 'statusName' : 'statusId'] === (statusName || statusId));

export const getPackageStatusTextFromStatusId = (statusId) => {
  const packageInfo = getPackageStatusBy({ statusId });
  return packageInfo?.statusName || 'Unknown';
}

export const getPackageColorFromStatusId = (statusId) => {
  const packageInfo = getPackageStatusBy({ statusId });
  return packageInfo?.background || 'gray';
};
