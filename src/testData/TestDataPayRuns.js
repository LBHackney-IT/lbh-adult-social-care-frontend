const payRunsTableDate = [
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

const payRunTableDate = [
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
  payRunsTableDate,
  payRunTableDate,
};
