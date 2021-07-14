const brokerageTestData = {
  homeCare: {
    id: 3141232,
    startDate: new Date(),
    endDate: new Date(),
    suppliers: ['Index 1', 'Index 2'],
    primaryCarrier: {hr: '', hrswk: 3, total: '$XX'},
    '30mCall': {hr: '$20', hrswk: 3, total: '$43'},
    '45mCall': {hr: '$20', hrswk: 3, total: '$43'},
    '60m+Call': {hr: '$20', hrswk: 3, total: '$43'},
    secondaryCarer: {hr: '$XX', hrswk: 3, total: '$48'},
    domesticCare: {hr: '$XX', hrswk: 3, total: '$48'},
    escortServices: {hr: '$XX', hrswk: 3, total: '$48'},
    sleepingNight: {hr: 'XX', hrswk: 3, total: '$300'},
    wakingNight: {hr: 'XX', hrswk: 3, total: '$300'},
    totalCost: '$XXXX',
  },
  nurseCare: {
    client: 'James Stephens',
    hackneyid: '786288',
    age: new Date(1972, 9, 12),
    postcode: 'E9 6EY',
    sourcingCare: 'hackney',
    starts: new Date(),
    ends: new Date(new Date().setDate(new Date().getDate() + 3)), // current day + 3 days
    approvalHistory: [
      {date: new Date(2021, 3, 12), stage: 'Package Builder', action: 'Submitted for approval'},
      {date: new Date(2021, 3, 12), stage: 'Approver of package', action: 'Accepted'},
      {date: new Date(2021, 3, 12), stage: 'Approver of package', action: 'Queried'},
      {date: new Date(2021, 3, 12), stage: 'Approver of package', action: 'Rejected'},
      {date: new Date(2021, 3, 12), stage: 'Broker', action: 'Assigned'},
      {date: new Date(2021, 3, 12), stage: 'Broker', action: 'Submitted for approval'},
      {date: new Date(2021, 3, 12), stage: 'Broker', action: 'Re-submitted for approval'},
      {date: new Date(2021, 3, 12), stage: 'Approver', action: 'Approved'},
      {date: new Date(2021, 3, 12), stage: 'Approver', action: 'PO Send by system'},
    ],
  }
};

export {
  brokerageTestData,
};
