import useGetData from './useGetData'
import { getQueryParamsFromObject } from '../Utils/ApiUtils'

const BROKERED_PACKAGES_URL = '/brokered-packages';

const useBrokeredPackageApi = {
  new: (params) => useGetData(`${BROKERED_PACKAGES_URL}/new${getQueryParamsFromObject(params)}`),
  inProgress: (params) => useGetData(`${BROKERED_PACKAGES_URL}/in-progress${getQueryParamsFromObject(params)}`),
  done: (params) => useGetData(`${BROKERED_PACKAGES_URL}/done${getQueryParamsFromObject(params)}`),
  types: () => useGetData(`${BROKERED_PACKAGES_URL}/package-types`),
  socialWorkers: () => useGetData(`${BROKERED_PACKAGES_URL}/social-workers`),
  approvers: () => useGetData(`${BROKERED_PACKAGES_URL}/approvers`),
  stages: () => useGetData(`${BROKERED_PACKAGES_URL}/stages`),
}

export default useBrokeredPackageApi;