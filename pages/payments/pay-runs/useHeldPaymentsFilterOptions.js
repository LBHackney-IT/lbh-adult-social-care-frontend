import { uniqBy } from 'lodash';
import { useMemo } from 'react';
import { usePaymentDepartments } from '../../../swrAPI';
import { getEnGBFormattedDate } from '../../../api/Utils/FuncUtils';
import usePackageGetAll from '../../../swrAPI/package/usePackageGetAll';

export const useHeldPaymentsFilterOptions = (data = []) => {
  const createUniqueOptions = (values) => uniqBy(values, 'value');
  const getAllInvoiceValues = (key) =>
    data.reduce((acc, { invoices }) => {
      invoices.forEach((invoice) => acc.push({ value: invoice[`${key}Id`], text: invoice[`${key}Name`] }));
      return acc;
    }, []);

  const { data: packageTypes } = usePackageGetAll();
  const { data: paymentDepartments } = usePaymentDepartments();

  const dateRangeOptions = uniqBy(
    data.map(({ dateFrom, dateTo }) => ({
      value: `${dateFrom} - ${dateTo}`,
      text: `${getEnGBFormattedDate(dateFrom)} - ${getEnGBFormattedDate(dateTo)}`,
    })),
    'value'
  );
  const serviceUserOptions = createUniqueOptions(getAllInvoiceValues('serviceUser'));
  const supplierOptions = createUniqueOptions(getAllInvoiceValues('supplier'));

  const waitingOnOptions = useMemo(
    () => paymentDepartments.map((el) => ({ value: el.departmentId, text: el.departmentName })),
    [paymentDepartments]
  );

  const packageTypeOptions = useMemo(
    () => packageTypes.map((type) => ({ value: type.id, text: type.packageType })),
    [packageTypes]
  );

  return {
    dateRangeOptions,
    serviceUserOptions,
    supplierOptions,
    waitingOnOptions,
    packageTypeOptions,
  };
};
