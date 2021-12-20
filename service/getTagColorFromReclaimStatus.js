const reclaimColors = {
  1: 'green',
  2: 'red',
  3: 'red',
  4: 'blue',
};

const reclaimText = {
  1: 'Active',
  2: 'Ended',
  3: 'Cancelled',
  4: 'Pending',
};

export const getTagColorFromReclaimStatus = (status) => reclaimColors[status];
export const geTagTextFromReclaimStatus = (status) => reclaimText[status];
