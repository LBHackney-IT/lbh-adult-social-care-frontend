import useGetData from '../useGetData';

const SERVICE_USERS_URL = '/clients';

const useGetServiceUserApi = {
  single: (serviceUserId) => useGetData(serviceUserId !== undefined ? `${SERVICE_USERS_URL}/${serviceUserId}` : null),
  list: () => useGetData(`${SERVICE_USERS_URL}`),
};

export default useGetServiceUserApi;
