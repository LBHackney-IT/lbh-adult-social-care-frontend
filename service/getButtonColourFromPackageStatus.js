export const getButtonColourFromPackageStatus = (packageStatus) => {
  switch (packageStatus) {
    case 'In Progress':
      return 'secondary-yellow';
    case 'Not Approved':
      return 'secondary-red';
    case 'Waiting for Approval':
      return 'secondary-blue';
    case 'Cancelled':
    case 'Ended':
    case 'New':
    case 'Approved':
    default:
      return '';
  }
};
