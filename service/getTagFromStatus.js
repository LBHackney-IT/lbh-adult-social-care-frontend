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

export const getTagDisplayTextFromStatusId = (statusId) => {
  const invoiceInformation = invoiceStatuses.find((status) => status.statusId === statusId);
  return invoiceInformation?.statusName || 'Unknown';
};

export const getTagColorFromStatusId = (statusId) => {
  const invoiceInformation = invoiceStatuses.find((status) => status.statusId === statusId);
  return invoiceInformation?.background || 'gray';
};
