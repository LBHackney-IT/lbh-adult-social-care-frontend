import axios from 'axios';
import moment from 'moment';
import { BASE_URL } from '../BaseApi';

import { axiosRequest, handleError, handleResponse } from '../Utils/ApiUtils';
import { requestMethods } from '../../constants/variables';

const PAY_RUN_URL = `${BASE_URL}/v1/transactions/pay-runs`;
const INVOICES_URL = `${BASE_URL}/v1/transactions/invoices`;
const DEPARTMENTS_URL = `${BASE_URL}/v1/transactions/departments`;

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
  // return axios.get(query).then(handleResponse).catch(handleError);

  const mockData = JSON.parse(`{
    "pagingMetaData": {
      "currentPage": 1,
      "totalPages": 1,
      "pageSize": 10,
      "totalCount": 1,
      "hasPrevious": false,
      "hasNext": false
    },
    "data": [
      {
        "payRunId": "51599da4-5e32-4e1a-8cd1-cfdd2bf9a706",
        "payRunNumber": 0,
        "payRunTypeId": 1,
        "payRunTypeName": "Residential Recurring",
        "payRunSubTypeId": null,
        "payRunSubTypeName": null,
        "payRunStatusId": 1,
        "payRunStatusName": "Draft",
        "totalAmountPaid": 0.0,
        "totalAmountHeld": 0.0,
        "dateFrom": "2021-07-08T10:06:44.172416+01:00",
        "dateTo": "2021-08-05T10:06:44.17359+01:00",
        "dateCreated": "2021-08-05T10:06:44.285992+01:00"
      },
      {
        "payRunId": "51599da4-5e32-4e1a-8cd1-cfdd2bf9a707",
        "payRunNumber": 0,
        "payRunTypeId": 1,
        "payRunTypeName": "Residential Recurring",
        "payRunSubTypeId": null,
        "payRunSubTypeName": null,
        "payRunStatusId": 2,
        "payRunStatusName": "Draft",
        "totalAmountPaid": 0.0,
        "totalAmountHeld": 0.0,
        "dateFrom": "2021-07-08T10:06:44.172416+01:00",
        "dateTo": "2021-08-05T10:06:44.17359+01:00",
        "dateCreated": "2021-08-05T10:06:44.285992+01:00"
      },
      {
        "payRunId": "51599da4-5e32-4e1a-8cd1-cfdd2bf9a708",
        "payRunNumber": 0,
        "payRunTypeId": 3,
        "payRunTypeName": "Residential Recurring",
        "payRunSubTypeId": null,
        "payRunSubTypeName": null,
        "payRunStatusId": 1,
        "payRunStatusName": "Draft",
        "totalAmountPaid": 0.0,
        "totalAmountHeld": 0.0,
        "dateFrom": "2021-07-08T10:06:44.172416+01:00",
        "dateTo": "2021-08-05T10:06:44.17359+01:00",
        "dateCreated": "2021-08-05T10:06:44.285992+01:00"
      },
      {
        "payRunId": "51599da4-5e32-4e1a-8cd1-cfdd2bf9a709",
        "payRunNumber": 0,
        "payRunTypeId": 1,
        "payRunTypeName": "Residential Recurring",
        "payRunSubTypeId": null,
        "payRunSubTypeName": null,
        "payRunStatusId": 4,
        "payRunStatusName": "Draft",
        "totalAmountPaid": 0.0,
        "totalAmountHeld": 0.0,
        "dateFrom": "2021-07-08T10:06:44.172416+01:00",
        "dateTo": "2021-08-05T10:06:44.17359+01:00",
        "dateCreated": "2021-08-05T10:06:44.285992+01:00"
      }
    ]
  }`)
  
  const mock = new Promise((resolve) => resolve({data: mockData, status: 200}))
  return mock.then(handleResponse)

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

const getSinglePayRunDetails = (
  payRunId,
  pageNumber = 1,
  pageSize = 10,
  dateFrom = new Date(sixMonthsAgo).toJSON(),
  dateTo = new Date().toJSON(),
  supplierId = '',
  packageTypeId = '',
  invoiceItemPaymentStatusId = '',
  searchTerm = ''
) => {
  const query = `${PAY_RUN_URL}/${payRunId}/details?pageNumber=${pageNumber}&pageSize=${pageSize}&supplierId=${supplierId}&packageTypeId=${packageTypeId}&invoiceItemPaymentStatusId=${invoiceItemPaymentStatusId}&searchTerm=${searchTerm}&dateFrom=${dateFrom}&dateTo=${dateTo}`;
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
  const query = `${PAY_RUN_URL}/release-held-invoice`;
  const options = {
    url: query,
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
  const query = `${PAY_RUN_URL}/${payRunId}/pay-run-items/${payRunItemId}/hold-payment`;
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

const getHeldInvoicePayments = () => {
  const query = `${INVOICES_URL}/held-invoice-payments`;
  // return axios.get(query).then(handleResponse).catch(handleError);
  const mockData = JSON.parse(`
    {
      "payRunId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "payRunDate": "2021-08-05T13:09:08.291Z",
      "invoices": [
        {
          "invoiceId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "invoiceNumber": "string",
          "supplierId": 0,
          "packageTypeId": 0,
          "serviceUserId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "dateInvoiced": "2021-08-05T13:09:08.291Z",
          "totalAmount": 0,
          "supplierVATPercent": 0,
          "invoiceStatusId": 0,
          "creatorId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "updaterId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "invoiceItems": [
            {
              "invoiceItemId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              "invoiceId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              "invoiceItemPaymentStatusId": 0,
              "itemName": "string",
              "pricePerUnit": 0,
              "quantity": 0,
              "subTotal": 0,
              "vatAmount": 0,
              "totalPrice": 0,
              "supplierReturnItemId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              "creatorId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              "updaterId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
            }
          ],
          "disputedInvoiceChat": [
            {
              "disputedInvoiceChatId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              "disputedInvoiceId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              "messageRead": true,
              "message": "string",
              "messageFromId": 0,
              "actionRequiredFromId": 0
            }
          ]
        }
      ]
    }
  `)
  const mock = new Promise((resolve) => resolve({data: mockData, status: 200}))
  console.log(`mock`, mock)
  return mock.then(handleResponse)
};

const getAllInvoiceStatuses = () => {
  const query = `${INVOICES_URL}/invoice-status-list`;
  return axios.get(query).then(handleResponse).catch(handleError);
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
  const url = `${PAY_RUN_URL}/${payRunId}/invoices/accept-invoice`;
  return axiosRequest({ url, data: invoices, method: requestMethods.put });
};

const getPaymentDepartments = () => {
  const query = `${DEPARTMENTS_URL}/payment-departments`;
  return axios.get(query).then(handleResponse).catch(handleError);
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
  getHeldInvoicePayments,
  getAllInvoiceStatuses,
  getInvoicePaymentStatuses,
  acceptInvoice,
  acceptInvoices,
  sendMessage,
  getPaymentDepartments,
  getDateOfLastPayRun,
};
