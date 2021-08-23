import useGetData from '../../useGetData'
import { getQueryParamsFromObject } from '../../../Utils/ApiUtils'

const PAY_RUN_URL = '/transactions/pay-runs';

const usePayRunSubTypes = () => useGetData(`${PAY_RUN_URL}/pay-run-sub-types`);

const usePayRunTypes = () => useGetData(`${PAY_RUN_URL}/pay-run-types`);

const useUniquePayRunStatuses = () => useGetData(`${PAY_RUN_URL}/unique-pay-run-statuses`);

const useUniquePayRunPackageTypes = (payRunId) => useGetData(`${PAY_RUN_URL}/${payRunId}/unique-package-types`);

const useUniquePayRunSuppliers = (payRunId) => useGetData(`${PAY_RUN_URL}/${payRunId}/unique-suppliers`);

const usePayRunSummaryInsights = (payRunId) => useGetData(`${PAY_RUN_URL}/${payRunId}/summary-insights`);

const useSinglePayRunDetails = (props) => {
  const { payRunId } = props;
  delete props.payRunId;
  return useGetData(`${PAY_RUN_URL}/${payRunId}/details${getQueryParamsFromObject(props, true)}`);
}

export {
  usePayRunTypes,
  useUniquePayRunPackageTypes,
  useUniquePayRunStatuses,
  useUniquePayRunSuppliers,
  usePayRunSummaryInsights,
  useSinglePayRunDetails,
  usePayRunSubTypes,
}