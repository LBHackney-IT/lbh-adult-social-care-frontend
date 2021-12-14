export const getButtonTextFromPackageStatus = (packageStatus) => {
  switch (packageStatus) {
    case 'New':
      return 'Create package';
    case 'In progress':
      return 'Continue';
    default:
      return 'View package';
  }
};
