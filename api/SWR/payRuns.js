import axios from 'axios';
import { useFetchWithParams } from './useFetchWithParams';
import useGetData from './useGetData';
import { getUrlOrNull } from '../Utils/FuncUtils';
import { BASE_URL } from '../BaseApi';
import { requestMethods } from '../../constants/variables';
import { handleError, handleResponse } from '../Utils/ApiUtils';

const PAY_RUNS_URL = '/payruns';
const getPayRunUrl = (payRunId, additionalString = '') =>
  getUrlOrNull(`${PAY_RUNS_URL}${payRunId && `/${payRunId}`}${additionalString}`);

export const usePayrunView = ({ params }) =>
  useFetchWithParams({
    params,
    url: `${PAY_RUNS_URL}`,
    errorText: 'Cannot get payrun list',
  });

export const useHeldPaymentsView = ({ params }) =>
  useFetchWithParams({
    params,
    url: `${PAY_RUNS_URL}/held-invoices`,
    errorText: 'Cannot get held payments list',
  });

export const useInvoiceListView = ({ payRunId, params }) =>
  useFetchWithParams({
    params,
    shouldFetch: !!payRunId,
    url: `${PAY_RUNS_URL}/${payRunId}`,
    errorText: 'Cannot get invoice list',
  });

export const usePayRunInvoice = (payRunId, invoiceId) => useGetData(getPayRunUrl(payRunId, `/invoices/${invoiceId}`));

export const getSinglePayrun = ({ payRunId }) => useGetData(getPayRunUrl(payRunId));

export const getPayrunInsight = ({ payRunId }) => useGetData(getUrlOrNull(`${PAY_RUNS_URL}/${payRunId}/insights`));

export const useLatestPayRunToDate = (payRunTypeId) =>
  useGetData(getPayRunUrl(payRunTypeId, '/previous-pay-run-end-date'), 'Cannot get latest pay run to date', null);

export const useReleasedInvoiceNumber = () =>
  useGetData(`${PAY_RUNS_URL}/released-invoice-count`, 'Cannot get released invoice count', null);

export const getPayrunCedarFile = (payRunId) => axios({
  url: `${BASE_URL}/v1${PAY_RUNS_URL}/${payRunId}/download`,
  method: requestMethods.get,
  responseType: 'blob',
})
  .then(handleResponse)
  .catch(handleError);
