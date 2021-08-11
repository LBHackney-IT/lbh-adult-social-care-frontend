import { uniqBy } from 'lodash';
import { getEnGBFormattedDate } from '../../../api/Utils/FuncUtils';

export const useHeldPaymentsFilterOptions = (data = []) => {
  const createUniqueOptions = (values) => uniqBy(values, 'value');
  const getAllInvoiceValues = (key) =>
    data.reduce((acc, { invoices }) => {
      invoices.forEach((invoice) => acc.push({ value: invoice[`${key}Id`], text: invoice[`${key}Name`] }));
      return acc;
    }, []);

  const dateRangeOptions = uniqBy(
    data.map(({ dateFrom, dateTo }) => ({
      value: `${dateFrom} - ${dateTo}`,
      text: `${getEnGBFormattedDate(dateFrom)} - ${getEnGBFormattedDate(dateTo)}`,
    })),
    'value'
  );
  const serviceUserOptions = createUniqueOptions(getAllInvoiceValues('serviceUser'));
  const supplierOptions = createUniqueOptions(getAllInvoiceValues('supplier'));

  return {
    dateRangeOptions,
    serviceUserOptions,
    supplierOptions,
  };
};
