export const getButtonColourFromPackageStatus = (packageStatus) => {
  switch (packageStatus) {
    case 'In Progress':
      return 'secondary-h';
    case 'Not Approved':
      return 'secondary-f';
    case 'Waiting for Approval':
      return 'secondary-b';
    case 'Cancelled':
    case 'Ended':
    case 'New':
    case 'Approved':
    default:
      return '';
  }
};
