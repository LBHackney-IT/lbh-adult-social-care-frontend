export const getPayrunStatusBackground = (status) => {
  switch (status) {
    case 'Paid':
      return 'rgba(0, 102, 79, 0.1)';
    case 'Paid with holds':
      return '#E1EAF2';
    case 'Awaiting Approval':
      return 'rgba(255, 191, 71, 0.1)';
    default:
      return '#E1EAF2';
  }
};
