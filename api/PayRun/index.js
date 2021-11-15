import { requestMethods } from '../../constants/variables';
import { axiosRequest } from '../Utils/ApiUtils';
import { BASE_URL } from '../BaseApi';

const PAYRUNS_URL = `${BASE_URL}/v1/payruns`;

const sendPayRunsRequest = ({ url = '', data, method = requestMethods.post }) =>
  axiosRequest({ url: `${PAYRUNS_URL}${url ? `/${url}` : ''}`, data, method });

export const createDraftPayRun = ({ type, paidUpToDate }) => sendPayRunsRequest({ data: { type, paidUpToDate } });

const sendInvoiceRequest = ({ payRunId, invoiceId, params }) =>
  sendPayRunsRequest({ url: `${payRunId}/invoices/${invoiceId}/hold`, data: params });

export const holdInvoice = ({ reasonForHolding, invoiceId, actionRequiredFromId, payRunId }) =>
  sendInvoiceRequest({ invoiceId, payRunId, params: { reasonForHolding, actionRequiredFromId } });

export const approvePayRun = ({ payRunId, method = requestMethods.post }) =>
  axiosRequest({ url: `${PAYRUNS_URL}/${payRunId}/approve`, method });
