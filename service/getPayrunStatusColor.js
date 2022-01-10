export const getPayrunStatusBackgroundColor = (status) => {
  switch (status) {
    case 'Waiting for Approval':
      return 'rgba(255, 191, 71, 0.1)';
    case 'Ready for review':
      return 'rgba(255, 191, 71, 0.1)';
    case 'Draft':
      return '#E1EAF2';
    case 'Paid':
      return '#DEE0E2';
    case 'Archived':
      return '#DEE0E2';
    case 'Paid with hold':
      return 'rgba(190, 58, 52, 0.1)';
    default:
      return 'rgba(0, 102, 79, 0.1)';
  }
};

export const getPayrunStatusColor = (status) => {
  switch (status) {
    case 'Draft':
      return '#025EA6';
    case 'Paid with hold':
      return '#BE3A34';
    default:
      return '#525A5B';
  }
};
