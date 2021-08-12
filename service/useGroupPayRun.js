import { groupBy, last, omit, pick } from 'lodash'

const useGroupedData = (data) => {
  // move all invoices to one level and generate key as combination of fields
  let result = data.reduce((rowAcc, payRun) => {
    const row = {
      payRunDate: payRun.payRunDate,
      payRunId: payRun.payRunId,
    };

    payRun.invoices.forEach((invoice) => {
      const invoiceFields = ['serviceUserName', 'packageTypeName', 'supplierName', 'totalAmount', 'invoiceStatusId'];

      const rowResult = {
        ...row,
        ...pick(invoice, invoiceFields),
        waitingFor: last(invoice.disputedInvoiceChat).actionRequiredFromName,
        invoiceInfo: pick(invoice, ['invoiceItems', 'invoiceId', 'invoiceNumber']),
      };

      const keyFields = ['payRunId', 'payRunDate', ...invoiceFields];
      rowResult.key = keyFields.reduce((keyAcc, field) => {
        keyAcc += rowResult[field];
        return keyAcc;
      }, '');

      rowAcc.push(rowResult);
    });

    return rowAcc;
  }, []);

  // group all invoices by generated key
  result = groupBy(result, 'key');

  // format structure from grouped object to an array
  result = Object.values(result).map((invoices) => ({
    ...omit(invoices[0], 'invoiceInfo'),
    invoices: invoices.map((invoice) => ({ ...invoice.invoiceInfo })),
  }));

  return result;
};
export default useGroupedData;