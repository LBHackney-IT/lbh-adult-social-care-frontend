import useGetData from './useGetData';
import { DEFAULT_PAGE_SIZE } from '../../constants/variables'
import optionsMapper from '../Mappers/optionsMapper'

const SUBMITTED_PACKAGES_URL = '/submitted-package-requests';

const useSocialWorkerApi = {
  submittedPackageRequests: ({
    pageNumber = 1,
    pageSize = DEFAULT_PAGE_SIZE,
    clientName = '',
    statusId = '',
  }) => useGetData(`${SUBMITTED_PACKAGES_URL}?pageNumber=${pageNumber}&pageSize=${pageSize}&clientName=${clientName}&statusId=${statusId}`),
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