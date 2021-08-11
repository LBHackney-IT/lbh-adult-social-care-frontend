import useGetData from '../useGetData';

export const useInvoiceStatusList = () =>
  useGetData('/transactions/invoices/invoice-status-list', 'Can not get all invoice statuses');

export const usePaymentDepartments = () =>
  useGetData('/transactions/departments/payment-departments', 'Fail get Departments');

export const usePayRunSubTypes = () => useGetData('/transactions/pay-runs/pay-run-sub-types');

export const usePayRunTypes = () => useGetData('/transactions/pay-runs/pay-run-types');

export const useUniquePayRunStatuses = () => useGetData('/transactions/pay-runs/unique-pay-run-statuses');
