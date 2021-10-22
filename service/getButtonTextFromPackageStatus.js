export const getButtonTextFromPackageStatus = (packageStatus) => {
  switch (packageStatus) {
    case 'New':
      return 'Create package';
    case 'In progress':
      return 'Continue';
    case 'Waiting for Approval':
      return 'View package';
    case 'Approved':
      return 'View package';
    case 'Not Approved':
      return 'Edit package';
    case 'Ended':
      return 'View package';
    case 'Cancelled':
      return 'View package';
    default:
      return 'Continue';
  }
};
