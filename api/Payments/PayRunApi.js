import axios from 'axios';
import moment from 'moment';
import { BASE_URL } from '../BaseApi';

import { handleError, handleResponse } from '../Utils/ApiUtils';

const PAY_RUN_URL = `${BASE_URL}/v1/transactions/pay-runs`;

const sixMonthsAgo = moment().subtract(6, 'months');

const getPayRunSummaryList = (
  pageNumber = 1,
  pageSize = 10,
  dateFrom = new Date(sixMonthsAgo).toJSON(),
  dateTo = new Date().toJSON(),
  payRunId = '',
  payRunTypeId = '',
  payRunSubTypeId = '',
  payRunStatusId = ''
) => {
  const query = `${PAY_RUN_URL}/summary-list?pageNumber=${pageNumber}&pageSize=${pageSize}&payRunId=${payRunId}&payRunTypeId=${payRunTypeId}&payRunSubTypeId=${payRunSubTypeId}&payRunStatusId=${payRunStatusId}&dateFrom=${dateFrom}&dateTo=${dateTo}`;
  return axios.get(query).then(handleResponse).catch(handleError);
};

export { getPayRunSummaryList };
