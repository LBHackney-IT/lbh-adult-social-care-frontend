import useGetData from '../../useGetData'

const PAY_RUN_URL = '/transactions/pay-runs';

const usePayRunSubTypes = () => useGetData(`${PAY_RUN_URL}/pay-run-sub-types`);

const usePayRunTypes = () => useGetData(`${PAY_RUN_URL}/pay-run-types`);

const useUniquePayRunStatuses = () => useGetData(`${PAY_RUN_URL}/unique-pay-run-statuses`);

const useUniquePayRunPackageTypes = (payRunId) => useGetData(`${PAY_RUN_URL}/${payRunId}/unique-package-types`);

const useUniquePayRunSuppliers = (payRunId) => useGetData(`${PAY_RUN_URL}/${payRunId}/unique-suppliers`);

const usePayRunSummaryInsights = (payRunId) => useGetData(`${PAY_RUN_URL}/${payRunId}/summary-insights`);

const useSinglePayRunDetails = ({
  payRunId,
  pageNumber = 1,
  pageSize = 10,
  dateFrom = '',
  dateTo = '',
  supplierId = '',
  packageTypeId = '',
  invoiceStatusId = '',
  serviceUserId = '',
}) => useGetData(`${PAY_RUN_URL}/${payRunId}/details?pageNumber=${pageNumber}&pageSize=${pageSize}&supplierId=${supplierId}&packageTypeId=${packageTypeId}&invoiceStatusId=${invoiceStatusId}&serviceUserId=${serviceUserId}&dateFrom=${dateFrom}&dateTo=${dateTo}`);

export {
  usePayRunTypes,
  useUniquePayRunPackageTypes,
  useUniquePayRunStatuses,
  useUniquePayRunSuppliers,
  usePayRunSummaryInsights,
  useSinglePayRunDetails,
  usePayRunSubTypes,
}