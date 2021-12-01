const invoiceStatuses = [
  { statusId: 7, statusName: 'Paid', displayName: 'Paid', background: 'green' },
  { statusId: 6, statusName: 'Released', displayName: 'Release', background: 'green' },
  { statusId: 4, statusName: 'Held', displayName: 'Hold', background: 'yellow' },
  { statusId: 5, statusName: 'Accepted', displayName: 'Accept', background: 'green' },
  { statusId: 2, statusName: 'Approved', displayName: 'Approve', background: 'green' },
  { statusId: 1, statusName: 'New', displayName: 'Draft', background: 'gray' },
  { statusId: 3, statusName: 'In Pay Run', displayName: 'In pay Run', background: 'blue' },
  { statusId: 8, statusName: 'Rejected', displayName: 'Reject', background: 'red' },
];

export const packageStatuses = [
  { statusId: 1, statusName: 'New', displayName: 'New', background: 'green' },
  { statusId: 2, statusName: 'InProgress', displayName: 'InProgress', background: 'yellow' },
  { statusId: 3, statusName: 'Waiting for approval', displayName: 'Waiting for approval', background: 'blue' },
  { statusId: 4, statusName: 'Approved', displayName: 'Approved', background: 'green' },
  { statusId: 5, statusName: 'Not Approved', displayName: 'Not Approved', background: 'red' },
  { statusId: 6, statusName: 'Ended', displayName: 'Ended', background: 'red' },
  { statusId: 7, statusName: 'Cancelled', displayName: 'Cancelled', background: 'gray' },
  { statusId: 8, statusName: 'Rejected', displayName: 'Rejected', background: 'red' },
];

export const getPackageStatusBy = ({ statusName, statusId }) =>
  packageStatuses.find((status) => status[statusName ? 'statusName' : 'statusId'] === (statusName || statusId));

export const getTagDisplayTextFromStatusId = (statusId) => {
  const invoiceInformation = invoiceStatuses.find((status) => status.statusId === statusId);
  return invoiceInformation?.statusName || 'Unknown';
};

export const getPackageStatusTextFromStatusId = (statusId) => {
  const packageInfo = getPackageStatusBy({ statusId });
  return packageInfo?.statusName || 'Unknown';
}

export const getTagColorFromStatusId = (statusId) => {
  const invoiceInformation = invoiceStatuses.find((status) => status.statusId === statusId);
  return invoiceInformation?.background || 'gray';
};

export const getPackageColorFromStatusId = (statusId) => {
  const packageInfo = getPackageStatusBy({ statusId });
  return packageInfo?.background || 'gray';
};
