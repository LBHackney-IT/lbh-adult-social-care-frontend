import { DATA_TYPES } from '../../../api/Utils/CommonOptions';
import { getEnGBFormattedDate } from '../../../api/Utils/FuncUtils';

export const PAYMENT_TABS = [
  { text: 'Pay Runs', value: 'pay-runs' },
  { text: 'Held Payments', value: 'held-payments' },
];

export const SORTS_TAB = {
  'pay-runs': [
    { name: 'id', text: 'ID', dataType: DATA_TYPES.STRING },
    { name: 'date', text: 'Date', dataType: DATA_TYPES.DATE },
    { name: 'type', text: 'Type', dataType: DATA_TYPES.STRING },
    { name: 'paid', text: 'Paid', dataType: DATA_TYPES.NUMBER },
    { name: 'held', text: 'Held', dataType: DATA_TYPES.NUMBER },
    { name: 'status', text: 'Status', dataType: DATA_TYPES.STRING },
  ],
  'held-payments': [
    { name: 'payRunDate', text: 'Pay run date', dataType: DATA_TYPES.DATE },
    { name: 'payRunId', text: 'Pay run ID', dataType: DATA_TYPES.STRING },
    { name: 'serviceUser', text: 'Service User', dataType: DATA_TYPES.STRING },
    { name: 'packageType', text: 'Package Type', dataType: DATA_TYPES.STRING },
    { name: 'supplier', text: 'Supplier', dataType: DATA_TYPES.STRING },
    { name: 'amount', text: 'Amount', dataType: DATA_TYPES.NUMBER },
    { name: 'status', text: 'Status', dataType: DATA_TYPES.STRING },
    { name: 'waitingFor', text: 'Waiting for', dataType: DATA_TYPES.STRING },
  ],
};

export const PAY_RUN_FIELDS = {
  id: 'payRunId',
  date: 'dateCreated',
  type: 'payRunTypeName',
  paid: 'totalAmountPaid',
  held: 'totalAmountHeld',
  status: 'payRunStatusName',
};

export const TABS_CLASSES = {
  'pay-runs': 'pay-runs__tab-class',
  'held-payments': 'pay-runs__held-payments-class',
};

export const PAY_RUN_ROWS_RULES = {
  payRunId: {
    getClassName: () => 'button-link',
  },
  payRunStatusName: {
    getClassName: (value) => `${value} table__row-item-status`,
  },
  dateCreated: {
    getValue: (value) => getEnGBFormattedDate(value),
  },
};
