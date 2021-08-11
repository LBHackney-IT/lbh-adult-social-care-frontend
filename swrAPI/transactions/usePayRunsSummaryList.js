import useSWR from 'swr';
import moment from 'moment';
import { stringIsNullOrEmpty } from '../../api/Utils/FuncUtils';
import fetcher from '../fetcher';
import useErrorNotification from '../useErrorNotification';

const sixMonthsAgo = moment().subtract(6, 'months');
const today = new Date();

const customFetcher = (
  url,
  PageNumber,
  PageSize,
  DateFrom,
  DateTo,
  PayRunId,
  PayRunTypeId,
  PayRunSubTypeId,
  PayRunStatusId
) =>
  fetcher(url, {
    params: {
      PageNumber,
      PageSize,
      DateFrom,
      DateTo,
      PayRunId,
      PayRunTypeId,
      PayRunSubTypeId,
      PayRunStatusId,
    },
  });

const usePayRunsSummaryList = (params = {}) => {
  const {
    pageNumber = 1,
    pageSize = 10,
    dateFrom = sixMonthsAgo.toJSON(),
    dateTo = today.toJSON(),
    id: payRunId,
    status: payRunStatusId,
    type,
  } = params;

  let payRunTypeId = '';
  let payRunSubTypeId = '';
  if (!stringIsNullOrEmpty(type)) {
    [payRunTypeId, payRunSubTypeId] = type.split(' - ');
  }

  const { data, mutate, error } = useSWR(
    [
      '/transactions/pay-runs/summary-list',
      pageNumber,
      pageSize,
      dateFrom,
      dateTo,
      payRunId,
      payRunTypeId,
      payRunSubTypeId,
      payRunStatusId,
    ],
    customFetcher,
    {
      initialData: {
        pagingMetaData: {},
        data: [],
      },
    }
  );

  useErrorNotification(error, `Can not get summary list: ${error?.message}`);

  return { data, mutate };
};

export default usePayRunsSummaryList;
