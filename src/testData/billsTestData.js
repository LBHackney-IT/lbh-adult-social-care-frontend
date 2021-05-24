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

const addBillPackageInfoTestData = {
  from: 'From',
  supplierName: 'SUPPLIER NAME',
  invoices: [
    {
      id: 1,
      item: 'Day Care',
      description: 'Name - ID: ID',
      qty: 12,
      unitPrices: 80,
      costCentre: 'Day Care',
      taxRate: '20%',
      amountExVAT: 960,
    },
    {
      id: 2,
      item: 'Day Care ANP',
      description: 'Nursing care',
      qty: 20,
      unitPrices: 15,
      costCentre: 'Day Care',
      taxRate: 'No VAT',
      amountExVAT: 300,
    },
  ],
  subtotal: 'EX VAT TOTAL',
  VAT: 'TOTAL OF VAT',
  grandTotal: 'GRAND TOTAL',
  attachedFiles: [
    {id: 1, name: 'INV-3516.pdf'},
    {id: 2, name: 'INV-3516.pdf'},
    {id: 3, name: 'INV-3516.pdf'},
    {id: 4, name: 'INV-3516.pdf'},
    {id: 5, name: 'INV-3516.pdf'},
    {id: 6, name: 'INV-3516.pdf'},
    {id: 7, name: 'INV-3516.pdf'},
    {id: 8, name: 'INV-3516.pdf'},
    {id: 9, name: 'INV-3516.pdf'},
    {id: 10, name: 'INV-3516.pdf'},
    {id: 11, name: 'INV-3516.pdf'},
    {id: 12, name: 'INV-3516.pdf'},
    {id: 13, name: 'INV-3516.pdf'},
  ],
};

export {
  billsPayRunsTableData,
  billsTableData,
  addBillPackageInfoTestData,
}
