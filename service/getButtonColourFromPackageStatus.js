export const getButtonColourFromPackageStatus = (packageStatus) => {
  switch (packageStatus) {
    case 'In Progress':
      return 'yellow';
    case 'Not Approved':
      return 'red';
    case 'Waiting for Approval':
      return 'blue';
    case 'Cancelled':
    case 'Ended':
    case 'New':
    case 'Approved':
    default:
      return '';
  }
};
