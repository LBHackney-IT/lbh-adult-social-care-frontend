import useGetData from '../useGetData';

const SERVICE_USERS_URL = '/clients';

const useGetServiceUserApi = {
  list: () => useGetData(`${SERVICE_USERS_URL}`),
};

export default useGetServiceUserApi;
