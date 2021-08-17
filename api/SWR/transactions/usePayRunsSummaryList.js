import moment from 'moment';
import { stringIsNullOrEmpty } from '../../Utils/FuncUtils';
import useErrorNotification from '../useErrorNotification';
import useGetData from '../useGetData'
import { getQueryParamsFromObject } from '../../Utils/ApiUtils';

const sixMonthsAgo = moment().subtract(6, 'months');
const sixMonthAfter = moment().add(6, 'months');

const usePayRunsSummaryList = ({ params = {} }) => {
  const {
    pageNumber = 1,
    pageSize = 10,
    id: payRunId,
    status: payRunStatusId,
    dateStart: dateFrom = sixMonthsAgo.toJSON(),
    dateEnd: dateTo = sixMonthAfter.toJSON(),
    type,
  } = params;

  let payRunTypeId = '';
  let payRunSubTypeId = '';
  if (!stringIsNullOrEmpty(type)) {
    [payRunTypeId, payRunSubTypeId] = type.split(' - ');
  }
  const initialData = {
    pagingMetaData: {},
    data: [],
  };

  const dataProps = useGetData(`/transactions/pay-runs/summary-list${getQueryParamsFromObject({
    pageNumber,
    pageSize,
    dateFrom,
    dateTo,
    payRunId,
    payRunTypeId,
    payRunSubTypeId,
    payRunStatusId,
  }, true)}`);

  useErrorNotification(dataProps.error, `Can not get summary list: ${dataProps.error?.message}`);
  return { ...dataProps, data: dataProps.data?.data ? dataProps.data : initialData };
};

export default usePayRunsSummaryList;
