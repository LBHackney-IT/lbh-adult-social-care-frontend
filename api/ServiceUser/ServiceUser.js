import { useGetData } from 'api';

const SERVICE_USER_URL = '/service-user';

const useServiceUserApi = {
  getServiceUserCarePackages: (serviceUserId) =>
    useGetData(serviceUserId !== undefined ? `${SERVICE_USER_URL}/${serviceUserId}/care-packages` : null),
};

export default useServiceUserApi;
