import moment from 'moment';
import { stringIsNullOrEmpty } from '../../Utils/FuncUtils';
import useGetData from '../useGetData'
import { getQueryParamsFromObject } from '../../Utils/ApiUtils';

const sixMonthsAgo = moment().subtract(6, 'months');
const sixMonthAfter = moment().add(6, 'months');

const usePayRunsSummaryList = (params, shouldFetch) => {
  const initialData = {
    pagingMetaData: {},
    data: [],
  };

  if(!shouldFetch) {
    return { data: initialData };
  }

  const {
    pageNumber = 1,
    pageSize = 10,
    id: payRunId,
    status: payRunStatusId,
    dateFrom = sixMonthsAgo.toJSON(),
    dateTo = sixMonthAfter.toJSON(),
    type,
  } = params;

  let payRunTypeId = '';
  let payRunSubTypeId = '';
  if (!stringIsNullOrEmpty(type)) {
    [payRunTypeId, payRunSubTypeId] = type.split(' - ');
  }

  const dataProps = useGetData(`/transactions/pay-runs/summary-list${getQueryParamsFromObject({
    pageNumber,
    pageSize,
    dateFrom: dateFrom?.getDate ? dateFrom.toJSON() : '',
    dateTo: dateTo?.getDate ? dateTo.toJSON() : '',
    payRunId,
    payRunTypeId,
    payRunSubTypeId,
    payRunStatusId,
  })}`);

  return { ...dataProps, data: dataProps.data?.data ? dataProps.data : initialData };
};

export default usePayRunsSummaryList;
