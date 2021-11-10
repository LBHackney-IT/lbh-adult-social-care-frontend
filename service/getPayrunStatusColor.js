export const getPayrunStatusBackgroundColor = (status) => {
  switch (status) {
    case 'Waiting for Approval':
      return '#E1EAF2';
    case 'In progress':
      return 'rgba(255, 191, 71, 0.1)';
    case 'Draft':
      return 'lightgray';
    default:
      return 'rgba(0, 102, 79, 0.1)';
  }
};

export const getPayrunStatusColor = (status) => {
  switch (status) {
    case 'Waiting for Approval':
      return '#025EA6';
    case 'In progress':
      return 'black'
    case 'Draft':
      return 'black';
    default:
      return '#00664F';
  }
};