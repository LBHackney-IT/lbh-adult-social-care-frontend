import axios from 'axios';
import moment from 'moment';
import { BASE_URL } from '../BaseApi';

import { axiosRequest, handleError, handleResponse } from '../Utils/ApiUtils';
import { requestMethods } from '../../constants/variables';

const PAY_RUN_URL = `${BASE_URL}/v1/transactions/pay-runs`;
const INVOICES_URL = `${BASE_URL}/v1/transactions/invoices`;

const sixMonthsAgo = moment().subtract(6, 'months');

export const PAY_RUN_TYPES = {
  RESIDENTIAL_RECURRING: 'ResidentialRecurring',
  DIRECT_PAYMENTS: 'DirectPayments',
  HOME_CARE: 'HomeCare',
  RESIDENTIAL_RELEASE_HOLDS: 'ResidentialReleaseHolds',
  DIRECT_PAYMENTS_RELEASE_HOLDS: 'DirectPaymentsReleaseHolds',
};

const getPayRunSummaryList = ({
  pageNumber = 1,
  pageSize = 10,
  dateFrom = new Date(sixMonthsAgo).toJSON(),
  dateTo = new Date().toJSON(),
  payRunId = '',
  payRunTypeId = '',
  payRunSubTypeId = '',
  payRunStatusId = '',
}) => {
  const query = `${PAY_RUN_URL}/summary-list?PageNumber=${pageNumber}&PageSize=${pageSize}&PayRunId=${payRunId}&PayRunTypeId=${payRunTypeId}&PayRunSubTypeId=${payRunSubTypeId}&PayRunStatusId=${payRunStatusId}&DateFrom=${dateFrom}&DateTo=${dateTo}`;
  return axios.get(query).then(handleResponse).catch(handleError);
};

const createNewPayRun = (payRunType, dateTo) => {
  const options = {
    url: `${PAY_RUN_URL}/${payRunType}`,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: {
      dateTo: new Date(dateTo).toJSON(),
    },
  };
  return axios(options).then(handleResponse).catch(handleError);
};

const getDateOfLastPayRun = (payRunType) => {
  const query = `${PAY_RUN_URL}/date-of-last-pay-run/${payRunType}`;
  return axios.get(query).then(handleResponse).catch(handleError);
};

const getUniqueSuppliersInPayRun = (payRunId, pageNumber = 1, pageSize = 10, searchTerm = '') => {
  const query = `${PAY_RUN_URL}/${payRunId}/unique-suppliers?pageNumber=${pageNumber}&pageSize=${pageSize}&searchTerm=${searchTerm}`;
  return axios.get(query).then(handleResponse).catch(handleError);
};

const getReleasedHoldsCountByType = (fromDate = new Date(sixMonthsAgo).toJSON(), toDate = new Date().toJSON()) => {
  const query = `${PAY_RUN_URL}/released-holds-count?fromDate=${fromDate}&toDate=${toDate}`;
  return axios.get(query).then(handleResponse).catch(handleError);
};

const getUniquePackageTypesInPayRun = (payRunId) => {
  const query = `${PAY_RUN_URL}/${payRunId}/unique-package-types`;
  return axios.get(query).then(handleResponse).catch(handleError);
};

const getUniquePaymentStatusesInPayRun = (payRunId) => {
  const query = `${PAY_RUN_URL}/${payRunId}/unique-payment-statuses`;
  return axios.get(query).then(handleResponse).catch(handleError);
};

const getReleasedHoldsList = (fromDate = new Date(sixMonthsAgo).toJSON(), toDate = new Date().toJSON()) => {
  const query = `${PAY_RUN_URL}/released-holds?fromDate=${fromDate}&toDate=${toDate}`;
  return axios.get(query).then(handleResponse).catch(handleError);
};

const getSinglePayRunDetails = ({
  payRunId,
  pageNumber = 1,
  pageSize = 10,
  dateFrom = '',
  dateTo = '',
  supplierId = '',
  packageTypeId = '',
  invoiceStatusId = '',
  searchTerm = '',
}) => {
  const query = `${PAY_RUN_URL}/${payRunId}/details?pageNumber=${pageNumber}&pageSize=${pageSize}&supplierId=${supplierId}&packageTypeId=${packageTypeId}&invoiceStatusId=${invoiceStatusId}&searchTerm=${searchTerm}&dateFrom=${dateFrom}&dateTo=${dateTo}`;
  return axios.get(query).then(handleResponse).catch(handleError);
};

const getSinglePayRunInsights = (payRunId) => {
  const url = `${PAY_RUN_URL}/${payRunId}/summary-insights`;
  return axiosRequest({ url });
};

const submitPayRunForApproval = (payRunId) => {
  const url = `${PAY_RUN_URL}/${payRunId}/status/submit-for-approval`;
  return axiosRequest({ url });
};

const kickPayRunBackToDraft = (payRunId) => {
  const query = `${PAY_RUN_URL}/${payRunId}/status/kick-back-to-draft`;
  return axios.get(query).then(handleResponse).catch(handleError);
};

const sendMessage = ({ payRunId, packageId, message }) => {
  const url = `${PAY_RUN_URL}/${payRunId}/create-held-chat`;
  return axiosRequest({ url, method: requestMethods.post, data: { message, packageId, payRunId } });
};

const approvePayRunForPayment = (payRunId) => {
  const url = `${PAY_RUN_URL}/${payRunId}/status/approve-pay-run`;
  return axiosRequest({ url });
};

const releaseSingleHeldInvoice = (payRunId, invoiceId) => {
  const options = {
    url: `${PAY_RUN_URL}/release-held-invoice`,
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: {
      payRunId,
      invoiceId,
    },
  };
  return axios(options).then(handleResponse).catch(handleError);
};

/* Invoice list looks like [
  {
    "payRunId": "c88378e3-6deb-4429-9364-3598cb6224f0",
    "invoiceId": "505ce36c-18ce-4fe2-9010-706b6f9c8051"
  }
] */
const releaseHeldInvoices = (invoiceList = []) => {
  const url = `${PAY_RUN_URL}/release-held-invoice-list`;
  return axiosRequest({ url, data: invoiceList, method: requestMethods.put });
};

const deleteDraftPayRun = (payRunId) => {
  const url = `${PAY_RUN_URL}/${payRunId}`;
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: {},
  };
  return axios.delete(url, config).then(handleResponse).catch(handleError);
};

/* holdReason = {
  "actionRequiredFromId": 1,
  "reasonForHolding": "Inaccurate amount"
} */
const holdInvoicePayment = (payRunId, payRunItemId, holdReason = {}) => {
  const query = `${PAY_RUN_URL}/${payRunId}/invoices/${payRunItemId}/hold-payment`;
  const options = {
    url: query,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: holdReason,
  };
  return axios(options).then(handleResponse).catch(handleError);
};

const rejectInvoicePayment = (payRunId, payRunItemId, holdReason = {}) => {
  const url = `${PAY_RUN_URL}/${payRunId}/invoices/${payRunItemId}/status/reject-invoice`;
  return axiosRequest({ url, data: holdReason, method: requestMethods.put });
};

const getInvoicePaymentStatuses = () => {
  const query = `${INVOICES_URL}/invoice-payment-statuses`;
  return axios.get(query).then(handleResponse).catch(handleError);
};

const acceptInvoice = (payRunId, invoiceId) => {
  const query = `${PAY_RUN_URL}/${payRunId}/invoices/${invoiceId}/accept-invoice`;
  const options = {
    url: query,
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: {},
  };
  return axios(options).then(handleResponse).catch(handleError);
};

const acceptInvoices = (payRunId, invoices) => {
  const url = `${PAY_RUN_URL}/${payRunId}/invoices/accept-invoices`;
  return axiosRequest({ url, data: invoices, method: requestMethods.put });
};

export {
  getPayRunSummaryList,
  createNewPayRun,
  getUniqueSuppliersInPayRun,
  getReleasedHoldsCountByType,
  getUniquePackageTypesInPayRun,
  getUniquePaymentStatusesInPayRun,
  getReleasedHoldsList,
  getSinglePayRunDetails,
  getSinglePayRunInsights,
  submitPayRunForApproval,
  kickPayRunBackToDraft,
  approvePayRunForPayment,
  releaseSingleHeldInvoice,
  releaseHeldInvoices,
  deleteDraftPayRun,
  holdInvoicePayment,
  getInvoicePaymentStatuses,
  acceptInvoice,
  acceptInvoices,
  sendMessage,
  getDateOfLastPayRun,
  rejectInvoicePayment,
};
