import { requestMethods } from '../../constants/variables';
import { axiosRequest } from '../Utils/ApiUtils';
import { BASE_URL } from '../BaseApi';

const PAYRUNS_URL = `${BASE_URL}/v1/payruns`;

const sendPayRunsRequest = (url = '', data, method = requestMethods.post) =>
  axiosRequest({ url: `${PAYRUNS_URL}${url ? `/${url}` : ''}`, data, method });

const sendInvoiceRequest = ({ payRunId, invoiceId, params }) =>
  sendPayRunsRequest(`${payRunId}/invoices/${invoiceId}/hold`, params);

export const createDraftPayRun = ({ type, paidUpToDate }) => sendPayRunsRequest('', { type, paidUpToDate });

export const holdInvoice = ({ reasonForHolding, invoiceId, actionRequiredFromId, payRunId }) =>
  sendInvoiceRequest({ invoiceId, payRunId, params: { reasonForHolding, actionRequiredFromId }})
