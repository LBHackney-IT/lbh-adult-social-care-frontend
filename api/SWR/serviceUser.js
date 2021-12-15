import useGetData from './useGetData';
import { useFetchWithParams } from './useFetchWithParams';

export const useServiceUser = (hackneyId) =>
  useGetData(hackneyId ? `/service-user/${hackneyId}` : null, 'Can not get service user');

export const useServiceUserSearch = ({ params, shouldFetch }) =>
  useFetchWithParams({
    params,
    shouldFetch,
    url: '/service-user/search',
    errorText: 'Can not get service user'
  })

export const useServiceUserNewSearch = ({ params, shouldFetch }) =>
  useFetchWithParams({
    params,
    shouldFetch,
    url: '/service-user/new-search',
    errorText: 'Can not get service user'
  })

export const useServiceUserMasterSearch = ({ params, shouldFetch }) =>
  useFetchWithParams({
    params,
    shouldFetch,
    url: '/service-user/master-search',
    errorText: 'Can not get service user'
  })
