import useGetData from './useGetData';
import { DEFAULT_PAGE_SIZE } from '../../constants/variables'
import optionsMapper from '../Mappers/optionsMapper'
import { getQueryParamsFromObject } from '../Utils/ApiUtils'

const SUBMITTED_PACKAGES_URL = '/submitted-package-requests';

const useSocialWorkerApi = {
  submittedPackageRequests: ({
    pageNumber = 1,
    pageSize = DEFAULT_PAGE_SIZE,
    clientName = '',
    statusId = '',
  }) => {
    const params = {pageNumber, pageSize, clientName, statusId}
    return useGetData(`${SUBMITTED_PACKAGES_URL}${getQueryParamsFromObject(params)}`)
  },
  submittedPackagesStatus: () => {
    const propsData = useGetData(`${SUBMITTED_PACKAGES_URL}/status`);
    const { data: submittedPackagesStatus } = propsData;
    return {
      ...propsData,
      data: optionsMapper({ text: 'statusName', value: 'id' }, submittedPackagesStatus),
    }
  },
};

export default useSocialWorkerApi;