const supplierDashboardTableData = [
  {id: 'xxxxxx-01', weekCommencing: new Date(), value: '£82,001', totalPackages: 1532, returned: 982, inDispute: 22, accepted: 960, paid: '£64,123', status: 'disputes-active'},
  {id: 'xxxxxx-02', weekCommencing: new Date(), value: '£82,001', totalPackages: 1532, returned: 982, inDispute: 22, accepted: 960, paid: '£64,123', status: 'disputes-active'},
  {id: 'xxxxxx-03', weekCommencing: new Date(), value: '£82,001', totalPackages: 1532, returned: 982, inDispute: 22, accepted: 960, paid: '£64,123', status: 'disputes-active'},
  {id: 'xxxxxx-04', weekCommencing: new Date(), value: '£82,001', totalPackages: 1532, returned: 982, inDispute: 22, accepted: 960, paid: '£64,123', status: 'disputes-active'},
  {id: 'xxxxxx-05', weekCommencing: new Date(), value: '£82,001', totalPackages: 1532, returned: 982, inDispute: 22, accepted: 960, paid: '£64,123', status: 'disputes-active'},
  {id: 'xxxxxx-06', weekCommencing: new Date(), value: '£82,001', totalPackages: 1532, returned: 982, inDispute: 22, accepted: 960, paid: '£64,123', status: 'disputes-active'},
  {id: 'xxxxxx-07', weekCommencing: new Date(), value: '£82,001', totalPackages: 1532, returned: 982, inDispute: 22, accepted: 960, paid: '£64,123', status: 'complete'},
  {id: 'xxxxxx-08', weekCommencing: new Date(), value: '£82,001', totalPackages: 1532, returned: 982, inDispute: 22, accepted: 960, paid: '£64,123', status: 'complete'},
  {id: 'xxxxxx-09', weekCommencing: new Date(), value: '£82,001', totalPackages: 1532, returned: 982, inDispute: 22, accepted: 960, paid: '£64,123', status: 'complete'},
  {id: 'xxxxxx-10', weekCommencing: new Date(), value: '£82,001', totalPackages: 1532, returned: 982, inDispute: 22, accepted: 960, paid: '£64,123', status: 'complete'},
];

const supplierReturnsDashboardTableData = [
  {
    id: 'xxxxxx-01',
    serviceUser: 'Mr B Jones',
    packageId: 'xx/xx/xx',
    packageType: 'Home Care',
    weeklyValue: '£932',
    status: 'submitted',
    services: [
      {
        serviceName: 'Primary Carer (30m)',
        packageHrs: 16,
        hrsDelivered: 16,
        packageVisits: 3,
        actualVisits: 3,
        comments: '',
        status: 'not-submitted',
        id: 'INV XXXXXXX-01',
      },
      {
        serviceName: 'Primary Carer (45m)',
        packageHrs: 16,
        hrsDelivered: 16,
        packageVisits: 3,
        actualVisits: 3,
        comments: '',
        status: 'not-submitted',
        id: 'INV XXXXXXX-02',
      },
      {
        serviceName: 'Secondary Carer',
        packageHrs: 4,
        hrsDelivered: 8,
        packageVisits: 3,
        actualVisits: 3,
        comments: '',
        status: 'not-submitted',
        id: 'INV XXXXXXX-03',
      },
      {
        serviceName: 'Escort',
        packageHrs: 16,
        hrsDelivered: 16,
        packageVisits: 3,
        actualVisits: 0,
        comments: 'Mrs Jones didnt want to go to shop...',
        status: 'not-submitted',
        id: 'INV XXXXXXX-04',
      },
      {
        serviceName: 'Sleeping Nights',
        packageHrs: 56,
        hrsDelivered: 59,
        packageVisits: 3,
        actualVisits: 0,
        comments: '',
        status: 'disputed',
        id: 'INV XXXXXXX-05',
      },
    ]
  },
  {
    id: 'xxxxxx-02',
    serviceUser: 'Mr B Jones',
    packageId: 'xx/xx/xx',
    packageType: 'Home Care',
    weeklyValue: '£152',
    status: 'not-started',
    services: [
      {
        serviceName: 'Primary Carer (30m)',
        packageHrs: 16,
        hrsDelivered: 16,
        packageVisits: 3,
        actualVisits: 3,
        comments: '',
        status: 'not-submitted',
        id: 'INV XXXXXXX-01',
      },
      {
        serviceName: 'Primary Carer (45m)',
        packageHrs: 16,
        hrsDelivered: 16,
        packageVisits: 3,
        actualVisits: 3,
        comments: '',
        status: 'not-submitted',
        id: 'INV XXXXXXX-02',
      },
      {
        serviceName: 'Secondary Carer',
        packageHrs: 4,
        hrsDelivered: 8,
        packageVisits: 3,
        actualVisits: 3,
        comments: '',
        status: 'not-submitted',
        id: 'INV XXXXXXX-03',
      },
      {
        serviceName: 'Escort',
        packageHrs: 16,
        hrsDelivered: 16,
        packageVisits: 3,
        actualVisits: 0,
        comments: 'Mrs Jones didnt want to go to shop...',
        status: 'not-submitted',
        id: 'INV XXXXXXX-04',
      },
      {
        serviceName: 'Sleeping Nights',
        packageHrs: 56,
        hrsDelivered: 59,
        packageVisits: 3,
        actualVisits: 0,
        comments: '',
        status: 'disputed',
        id: 'INV XXXXXXX-05',
      },
    ]
  },
  {
    id: 'xxxxxx-03',
    serviceUser: 'Mr B Jones',
    packageId: 'xx/xx/xx',
    packageType: 'Home Care',
    weeklyValue: '£152',
    status: 'accepted',
    services: [
      {
        serviceName: 'Primary Carer (30m)',
        packageHrs: 16,
        hrsDelivered: 16,
        packageVisits: 3,
        actualVisits: 3,
        comments: '',
        status: 'not-submitted',
        id: 'INV XXXXXXX-01',
      },
      {
        serviceName: 'Primary Carer (45m)',
        packageHrs: 16,
        hrsDelivered: 16,
        packageVisits: 3,
        actualVisits: 3,
        comments: '',
        status: 'not-submitted',
        id: 'INV XXXXXXX-02',
      },
      {
        serviceName: 'Secondary Carer',
        packageHrs: 4,
        hrsDelivered: 8,
        packageVisits: 3,
        actualVisits: 3,
        comments: '',
        status: 'not-submitted',
        id: 'INV XXXXXXX-03',
      },
      {
        serviceName: 'Escort',
        packageHrs: 16,
        hrsDelivered: 16,
        packageVisits: 3,
        actualVisits: 0,
        comments: 'Mrs Jones didnt want to go to shop...',
        status: 'not-submitted',
        id: 'INV XXXXXXX-04',
      },
      {
        serviceName: 'Sleeping Nights',
        packageHrs: 56,
        hrsDelivered: 59,
        packageVisits: 3,
        actualVisits: 0,
        comments: '',
        status: 'disputed',
        id: 'INV XXXXXXX-05',
      },
    ]
  },
  {
    id: 'xxxxxx-04',
    serviceUser: 'Mr B Jones',
    packageId: 'xx/xx/xx',
    packageType: 'Home Care',
    weeklyValue: '£152',
    status: 'in-dispute',
    services: [
      {
        serviceName: 'Primary Carer (30m)',
        packageHrs: 16,
        hrsDelivered: 16,
        packageVisits: 3,
        actualVisits: 3,
        comments: '',
        status: 'not-submitted',
        id: 'INV XXXXXXX-01',
      },
      {
        serviceName: 'Primary Carer (45m)',
        packageHrs: 16,
        hrsDelivered: 16,
        packageVisits: 3,
        actualVisits: 3,
        comments: '',
        status: 'not-submitted',
        id: 'INV XXXXXXX-02',
      },
      {
        serviceName: 'Secondary Carer',
        packageHrs: 4,
        hrsDelivered: 8,
        packageVisits: 3,
        actualVisits: 3,
        comments: '',
        status: 'not-submitted',
        id: 'INV XXXXXXX-03',
      },
      {
        serviceName: 'Escort',
        packageHrs: 16,
        hrsDelivered: 16,
        packageVisits: 3,
        actualVisits: 0,
        comments: 'Mrs Jones didnt want to go to shop...',
        status: 'not-submitted',
        id: 'INV XXXXXXX-04',
      },
      {
        serviceName: 'Sleeping Nights',
        packageHrs: 56,
        hrsDelivered: 59,
        packageVisits: 3,
        actualVisits: 0,
        comments: '',
        status: 'disputed',
        id: 'INV XXXXXXX-05',
      },
    ]
  },
];

const payRunsTableData = [
  {id: 'xxxxxx-01', date: new Date(), type: 'Residential recurring', cadence: '4-weekly', paid: '£23,872.80', held: '£4,320.90', status: 'draft'},
  {id: 'xxxxxx-02', date: new Date(), type: 'Bills, 4-weekly', cadence: '4-weekly', paid: '£YY,YYYY', held: '£AA,AAA', status: 'awaiting-approval'},
  {id: 'xxxxxx-03', date: new Date(), type: 'Bills, 4-weekly', cadence: 'ad-hoc', paid: '£YY,YYYY', held: '£AA,AAA', status: 'paid'},
  {id: 'xxxxxx-04', date: new Date(), type: 'Direct payments', cadence: 'Held releases', paid: '£YY,YYYY', held: '£AA,AAA', status: 'paid'},
  {id: 'xxxxxx-05', date: new Date(), type: 'Residential recurring', cadence: '4-weekly', paid: '£YY,YYYY', held: '£AA,AAA', status: 'paid-with-holds'},
  {id: 'xxxxxx-06', date: new Date(), type: 'Bills, 4-weekly', cadence: '4-weekly', paid: '£YY,YYYY', held: '£AA,AAA', status: 'awaiting-approval'},
  {id: 'xxxxxx-07', date: new Date(), type: 'Direct payments', cadence: 'Held releases', paid: '£YY,YYYY', held: '£AA,AAA', status: 'paid'},
  {id: 'xxxxxx-08', date: new Date(), type: 'Bills, 4-weekly', cadence: 'ad-hoc', paid: '£YY,YYYY', held: '£AA,AAA', status: 'paid'},
  {id: 'xxxxxx-09', date: new Date(), type: 'Direct payments', cadence: 'Held releases', paid: '£YY,YYYY', held: '£AA,AAA', status: 'paid'},
  {id: 'xxxxxx-10', date: new Date(), type: 'Direct payments', cadence: 'Held releases', paid: '£YY,YYYY', held: '£AA,AAA', status: 'paid'},
];

const billsTableData = [
  {id: 'CH-123', ref: 'CH-123', againstPackage: 'xxx-xxx-xxx', from: 'Care Homes Ltd', date: new Date(), dualDate: new Date(), amount: '£23,872.80', paid: '£4,320.90', status: 'outstanding'},
  {id: 'CH-124', ref: 'CH-124', againstPackage: 'xxx-xxx-xxx', from: 'Care Homes Ltd', date: new Date(), dualDate: new Date(), amount: '£YY,YYYY', paid: '£AA,AAA', status: 'paid'},
  {id: 'CH-125', ref: 'CH-125', againstPackage: 'xxx-xxx-xxx', from: 'Care Homes Ltd', date: new Date(), dualDate: new Date(), amount: '£YY,YYYY', paid: '£AA,AAA', status: 'overdue'},
  {id: 'CH-126', ref: 'CH-126', againstPackage: 'xxx-xxx-xxx', from: 'Care Homes Ltd', date: new Date(), dualDate: new Date(), amount: '£YY,YYYY', paid: '£AA,AAA', status: 'paid'},
  {id: 'CH-127', ref: 'CH-127', againstPackage: 'xxx-xxx-xxx', from: 'Care Homes Ltd', date: new Date(), dualDate: new Date(), amount: '£YY,YYYY', paid: '£AA,AAA', status: 'outstanding'},
  {id: 'CH-128', ref: 'CH-128', againstPackage: 'xxx-xxx-xxx', from: 'Care Homes Ltd', date: new Date(), dualDate: new Date(), amount: '£YY,YYYY', paid: '£AA,AAA', status: 'paid'},
  {id: 'CH-129', ref: 'CH-129', againstPackage: 'xxx-xxx-xxx', from: 'Care Homes Ltd', date: new Date(), dualDate: new Date(), amount: '£YY,YYYY', paid: '£AA,AAA', status: 'overdue'},
  {id: 'CH-131', ref: 'CH-131', againstPackage: 'xxx-xxx-xxx', from: 'Care Homes Ltd', date: new Date(), dualDate: new Date(), amount: '£YY,YYYY', paid: '£AA,AAA', status: 'outstanding'},
  {id: 'CH-132', ref: 'CH-132', againstPackage: 'xxx-xxx-xxx', from: 'Care Homes Ltd', date: new Date(), dualDate: new Date(), amount: '£YY,YYYY', paid: '£AA,AAA', status: 'paid'},
  {id: 'CH-133', ref: 'CH-133', againstPackage: 'xxx-xxx-xxx', from: 'Care Homes Ltd', date: new Date(), dualDate: new Date(), amount: '£YY,YYYY', paid: '£AA,AAA', status: 'overdue'},
  {id: 'CH-134', ref: 'CH-133', againstPackage: 'xxx-xxx-xxx', from: 'Care Homes Ltd', date: new Date(), dualDate: new Date(), amount: '£YY,YYYY', paid: '£AA,AAA', status: 'paid'},
];

const billsPayRunsTableData = [
  {id: 'BPR-1', brpDd: 'BPR-1', date: new Date(),  invoicesPaid: 'YY', paid: '£23,872.80', held: '£4,320.90'},
  {id: 'BPR-2', brpDd: 'BPR-2', date: new Date(),  invoicesPaid: 'YY', paid: '£YY,YYYY', held: '£AA,AAA'},
  {id: 'BPR-3', brpDd: 'BPR-3', date: new Date(),  invoicesPaid: 'YY', paid: '£YY,YYYY', held: '£AA,AAA'},
  {id: 'BPR-4', brpDd: 'BPR-4', date: new Date(),  invoicesPaid: 'YY', paid: '£YY,YYYY', held: '£AA,AAA'},
  {id: 'BPR-6', brpDd: 'BPR-6', date: new Date(),  invoicesPaid: 'YY', paid: '£YY,YYYY', held: '£AA,AAA'},
  {id: 'BPR-7', brpDd: 'BPR-7', date: new Date(),  invoicesPaid: 'YY', paid: '£YY,YYYY', held: '£AA,AAA'},
  {id: 'BPR-8', brpDd: 'BPR-8', date: new Date(),  invoicesPaid: 'YY', paid: '£YY,YYYY', held: '£AA,AAA' },
  {id: 'BPR-9', brpDd: 'BPR-9', date: new Date(),  invoicesPaid: 'YY', paid: '£YY,YYYY', held: '£AA,AAA'},
  {id: 'BPR-10', brpDd: 'BPR-10', date: new Date(),  invoicesPaid: 'YY', paid: '£YY,YYYY', held: '£AA,AAA'},
  {id: 'BPR-11', brpDd: 'BPR-11', date: new Date(), invoicesPaid: 'YY', paid: '£YY,YYYY', held: '£AA,AAA'},
];

const testDataHelpMessages = [
  {id: 1, userId: 1000, text: 'There was no allownce for this please resubmit the agreed time', fullName: 'Jhuru Lastname'},
  {id: 2, userId: 1, text: 'There was no allownce for this please resubmit the agreed time'},
  {id: 3, userId: 1000, text: 'There was no allownce for this please resubmit the agreed time', fullName: 'Jhuru Lastname'},
  {id: 4, userId: 1, text: 'There was no allownce for this please resubmit the agreed time'},
  {id: 5, userId: 1, text: 'There was no allownce for this please resubmit the agreed time', fullName: 'Jhuru Lastname'},
  {id: 6, userId: 1000, text: 'There was no allownce for this please resubmit the agreed time', fullName: 'Jhuru Lastname'},
  {id: 7, userId: 1000, text: 'There was no allownce for this please resubmit the agreed time', fullName: 'Jhuru Lastname'},
  {id: 8, userId: 1, text: 'T'},
  {id: 9, userId: 1, text: 'There was no allownce for this please resubmit the agreed time'},
  {id: 10, userId: 1, text: 'There was no allownce for this please resubmit the agreed time There was no allownce for this please resubmit the agreed time'},
  {id: 11, userId: 1000, text: 'There was no allownce for this please resubmit the agreed time', fullName: 'Jhuru Lastname'},
  {id: 12, userId: 1000, text: 'There was no allownce for this please resubmit the agreed time', fullName: 'Jhuru Lastname'},
  {id: 13, userId: 1000, text: 'There was no allownce for this please resubmit the agreed time', fullName: 'Jhuru Lastname'},
];

const payRunsHeldPaymentsTableData = [
  {
    id: 'xxxxxx-01',
    payRunDate: new Date(2021,5, 23),
    payRunId: 'XX-XXXXXX',
    serviceUser: 'Mr Shah',
    packageType: 'Residential Care',
    supplier: 'ABC Homes Ltd',
    amount: '£4,320.90',
    status: 'held',
    waitingFor: 'Brokerage',
    cares: [
      {
        userName: 'Mr Shah',
        supplier: 'ABC Homes LTD',
        id: 'INV XXXXXXX-01',
        items: [
          {id: 'xxxxxx-01', dateFrom: new Date(), dateTo: new Date(2021, 7, 12), cost: '£430', qty: '2', serviceUser: '£860'},
          {id: 'xxxxxx-02', dateFrom: new Date(), dateTo: new Date(2021, 7, 12), cost: '£50', qty: '2', serviceUser: '£100'},
        ]
      },
      {
        userName: 'Mr Shah',
        supplier: 'ABC Homes LTD',
        id: 'INV XXXXXXX-02',
        items: [
          {id: 'xxxxxx-01', dateFrom: new Date(), dateTo: new Date(2021, 7, 12), cost: '£430', qty: '2', serviceUser: '£860'},
          {id: 'xxxxxx-02', dateFrom: new Date(), dateTo: new Date(2021, 7, 12), cost: '£50', qty: '2', serviceUser: '£100'},
        ]
      },
    ]
  },
  {
    id: 'xxxxxx-02',
    payRunDate: new Date(2021,5, 23),
    payRunId: 'XX-XXXXXX',
    serviceUser: 'Mr Shah',
    packageType: 'Residential Care',
    supplier: 'ABC Homes Ltd',
    amount: '£4,320.90',
    status: 'held',
    waitingFor: 'Brokerage',
    cares: [
      {
        userName: 'Mr Shah',
        supplier: 'ABC Homes LTD',
        id: 'INV XXXXXXX-01',
        items: [
          {id: 'xxxxxx-01', dateFrom: new Date(), dateTo: new Date(2021, 7, 12), cost: '£430', qty: '2', serviceUser: '£860'},
          {id: 'xxxxxx-02', dateFrom: new Date(), dateTo: new Date(2021, 7, 12), cost: '£50', qty: '2', serviceUser: '£100'},
        ]
      },
      {
        userName: 'Mr Shah',
        supplier: 'ABC Homes LTD',
        id: 'INV XXXXXXX-02',
        items: [
          {id: 'xxxxxx-01', dateFrom: new Date(), dateTo: new Date(2021, 7, 12), cost: '£430', qty: '2', serviceUser: '£860'},
          {id: 'xxxxxx-02', dateFrom: new Date(), dateTo: new Date(2021, 7, 12), cost: '£50', qty: '2', serviceUser: '£100'},
        ]
      },
    ],
  },
  {
    id: 'xxxxxx-03',
    payRunDate: new Date(2021,5, 23),
    payRunId: 'XX-XXXXXX',
    serviceUser: 'Mr Shah',
    packageType: 'Residential Care',
    supplier: 'ABC Homes Ltd',
    amount: '£4,320.90',
    status: 'held',
    waitingFor: 'Brokerage',
    cares: [
      {
        userName: 'Mr Shah',
        supplier: 'ABC Homes LTD',
        id: 'INV XXXXXXX-01',
        items: [
          {id: 'xxxxxx-01', dateFrom: new Date(), dateTo: new Date(2021, 7, 12), cost: '£430', qty: '2', serviceUser: '£860'},
          {id: 'xxxxxx-02', dateFrom: new Date(), dateTo: new Date(2021, 7, 12), cost: '£50', qty: '2', serviceUser: '£100'},
        ]
      },
      {
        userName: 'Mr Shah',
        supplier: 'ABC Homes LTD',
        id: 'INV XXXXXXX-02',
        items: [
          {id: 'xxxxxx-01', dateFrom: new Date(), dateTo: new Date(2021, 7, 12), cost: '£430', qty: '2', serviceUser: '£860'},
          {id: 'xxxxxx-02', dateFrom: new Date(), dateTo: new Date(2021, 7, 12), cost: '£50', qty: '2', serviceUser: '£100'},
        ]
      },
    ],
  },
  {
    id: 'xxxxxx-04',
    payRunDate: new Date(2021,5, 23),
    payRunId: 'XX-XXXXXX',
    serviceUser: 'Mr Shah',
    packageType: 'Residential Care',
    supplier: 'ABC Homes Ltd',
    amount: '£4,320.90',
    status: 'released',
    waitingFor: 'Brokerage',
    cares: [
      {
        userName: 'Mr Shah',
        supplier: 'ABC Homes LTD',
        id: 'INV XXXXXXX-01',
        items: [
          {id: 'xxxxxx-01', dateFrom: new Date(), dateTo: new Date(2021, 7, 12), cost: '£430', qty: '2', serviceUser: '£860'},
          {id: 'xxxxxx-02', dateFrom: new Date(), dateTo: new Date(2021, 7, 12), cost: '£50', qty: '2', serviceUser: '£100'},
        ]
      },
      {
        userName: 'Mr Shah',
        supplier: 'ABC Homes LTD',
        id: 'INV XXXXXXX-02',
        items: [
          {id: 'xxxxxx-01', dateFrom: new Date(), dateTo: new Date(2021, 7, 12), cost: '£430', qty: '2', serviceUser: '£860'},
          {id: 'xxxxxx-02', dateFrom: new Date(), dateTo: new Date(2021, 7, 12), cost: '£50', qty: '2', serviceUser: '£100'},
        ]
      },
    ]
  },
];


const payRunTableData = [
  {
    id: 'xxxxxx-01',
    serviceUser: 'Mr B Jones',
    invId: 'xx/xx/xx',
    packageType: 'Residential Care',
    supplier: 'ABC Homes Ltd',
    paid: '£4,320.90',
    status: 'accepted',
    cares: [
      {
        userName: 'Mr B Jones',
        supplier: 'ABC Homes LTD',
        id: 'INV XXXXXXX-01',
        items: [
          {id: 'xxxxxx-01', dateFrom: new Date(), dateTo: new Date(2021, 7, 12), cost: '£430', qty: '2', serviceUser: '£860'},
          {id: 'xxxxxx-02', dateFrom: new Date(), dateTo: new Date(2021, 7, 12), cost: '£50', qty: '2', serviceUser: '£100'},
        ]
      },
      {
        userName: 'Mr B Jones',
        supplier: 'ABC Homes LTD',
        id: 'INV XXXXXXX-02',
        items: [
          {id: 'xxxxxx-01', dateFrom: new Date(), dateTo: new Date(2021, 7, 12), cost: '£430', qty: '2', serviceUser: '£860'},
          {id: 'xxxxxx-02', dateFrom: new Date(), dateTo: new Date(2021, 7, 12), cost: '£50', qty: '2', serviceUser: '£100'},
        ]
      },
    ]
  },
  {
    id: 'xxxxxx-02',
    serviceUser: 'Mr B Jones',
    invId: 'xx/xx/xx',
    packageType: 'Residential Care',
    supplier: 'ABC Homes Ltd',
    paid: '£4,320.90',
    status: 'held',
    cares: [
      {
        userName: 'Mr B Jones',
        supplier: 'ABC Homes LTD',
        id: 'INV XXXXXXX-01',
        items: [
          {id: 'xxxxxx-01', dateFrom: new Date(), dateTo: new Date(2021, 7, 12), cost: '£430', qty: '2', serviceUser: '£860'},
          {id: 'xxxxxx-02', dateFrom: new Date(), dateTo: new Date(2021, 7, 12), cost: '£50', qty: '2', serviceUser: '£100'},
        ]
      },
      {
        userName: 'Mr B Jones',
        supplier: 'ABC Homes LTD',
        id: 'INV XXXXXXX-02',
        items: [
          {id: 'xxxxxx-01', dateFrom: new Date(), dateTo: new Date(2021, 7, 12), cost: '£430', qty: '2', serviceUser: '£860'},
          {id: 'xxxxxx-02', dateFrom: new Date(), dateTo: new Date(2021, 7, 12), cost: '£50', qty: '2', serviceUser: '£100'},
        ]
      },
    ],
  },
  {
    id: 'xxxxxx-03',
    serviceUser: 'Mr Shah',
    invId: 'xx/xx/xx',
    packageType: 'Residential Care',
    supplier: 'ABC Homes Ltd',
    paid: '£4,320.90',
    status: 'rejected',
    cares: [
      {
        userName: 'Mr Shah',
        supplier: 'ABC Homes LTD',
        id: 'INV XXXXXXX-01',
        items: [
          {id: 'xxxxxx-01', dateFrom: new Date(), dateTo: new Date(2021, 7, 12), cost: '£430', qty: '2', serviceUser: '£860'},
          {id: 'xxxxxx-02', dateFrom: new Date(), dateTo: new Date(2021, 7, 12), cost: '£50', qty: '2', serviceUser: '£100'},
        ]
      },
      {
        userName: 'Mr Shah',
        supplier: 'ABC Homes LTD',
        id: 'INV XXXXXXX-02',
        items: [
          {id: 'xxxxxx-01', dateFrom: new Date(), dateTo: new Date(2021, 7, 12), cost: '£430', qty: '2', serviceUser: '£860'},
          {id: 'xxxxxx-02', dateFrom: new Date(), dateTo: new Date(2021, 7, 12), cost: '£50', qty: '2', serviceUser: '£100'},
        ]
      },
    ],
  },
  {
    id: 'xxxxxx-06',
    serviceUser: 'Mr B Jones',
    invId: 'xx/xx/xx',
    packageType: 'Residential Care',
    supplier: 'ABC Homes Ltd',
    paid: '£4,320.90',
    status: 'in-dispute',
    cares: [
      {
        userName: 'Mr B Jones',
        supplier: 'ABC Homes LTD',
        id: 'INV XXXXXXX-01',
        items: [
          {id: 'xxxxxx-01', dateFrom: new Date(), dateTo: new Date(2021, 7, 12), cost: '£430', qty: '2', serviceUser: '£860'},
          {id: 'xxxxxx-02', dateFrom: new Date(), dateTo: new Date(2021, 7, 12), cost: '£50', qty: '2', serviceUser: '£100'},
        ]
      },
      {
        userName: 'Mr B Jones',
        supplier: 'ABC Homes LTD',
        id: 'INV XXXXXXX-02',
        items: [
          {id: 'xxxxxx-01', dateFrom: new Date(), dateTo: new Date(2021, 7, 12), cost: '£430', qty: '2', serviceUser: '£860'},
          {id: 'xxxxxx-02', dateFrom: new Date(), dateTo: new Date(2021, 7, 12), cost: '£50', qty: '2', serviceUser: '£100'},
        ]
      },
    ]
  },
];

export {
  payRunsTableData,
  payRunTableData,
  payRunsHeldPaymentsTableData,
  testDataHelpMessages,
  billsTableData,
  billsPayRunsTableData,
  supplierReturnsDashboardTableData,
  supplierDashboardTableData
};
