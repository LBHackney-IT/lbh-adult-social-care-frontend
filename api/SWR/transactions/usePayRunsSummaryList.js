import useSWR from 'swr';
import moment from 'moment';
import { stringIsNullOrEmpty } from '../../Utils/FuncUtils';
import fetcher from '../fetcher';
import useErrorNotification from '../useErrorNotification';

const sixMonthsAgo = moment().subtract(6, 'months');
const today = new Date();

const customFetcher = (
  url,
  pageNumber,
  pageSize,
  dateFrom,
  dateTo,
  payRunId,
  payRunTypeId,
  payRunSubTypeId,
  payRunStatusId
) =>
  fetcher(url, {
    params: {
      pageNumber,
      pageSize,
      dateFrom,
      dateTo,
      payRunId,
      payRunTypeId,
      payRunSubTypeId,
      payRunStatusId,
    },
  });

const usePayRunsSummaryList = ({ params = {}, shouldFetch }) => {
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
    shouldFetch
      ? [
          '/transactions/pay-runs/summary-list',
          pageNumber,
          pageSize,
          dateFrom,
          dateTo,
          payRunId,
          payRunTypeId,
          payRunSubTypeId,
          payRunStatusId,
        ]
      : null,
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
