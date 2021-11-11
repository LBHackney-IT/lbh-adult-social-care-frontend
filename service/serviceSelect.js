export const getStatusSelectBackground = (payRunStatus) => {
  switch (parseInt(payRunStatus, 10)) {
    case 2:
      return 'rgba(255, 191, 71, 0.1)';
    case 3:
      return 'rgba(2, 94, 166, 0.1)';
    case 4:
      return 'rgba(190, 58, 52, 0.1)';
    case 5:
      return 'rgba(0, 102, 79, 0.1)';
    case 1:
    default:
      return 'rgb(222, 224, 226)';
  }
};

export const getStatusSelectTextColor = (payRunStatus) => {
  switch (parseInt(payRunStatus, 10)) {
    case 2:
      return '#525A5B';
    case 3:
      return '#025EA6';
    case 4:
      return '#BE3A34';
    case 5:
      return '#00664F';
    case 1:
    default:
      return 'rgb(82, 90, 91)';
  }
};
