import useGetData from './useGetData'
import { getQueryParamsFromObject } from '../Utils/ApiUtils'

const APPROVED_PACKAGES_URL = '/approved-packages';

const useApprovedPackageApi = {
  new: (params) => useGetData(`${APPROVED_PACKAGES_URL}/new${getQueryParamsFromObject(params)}`),
  clarificationNeed: (params) => useGetData(`${APPROVED_PACKAGES_URL}/clarification-need${getQueryParamsFromObject(params)}`),
  awaitingBrokerage: (params) => useGetData(`${APPROVED_PACKAGES_URL}/awaiting-brokerage${getQueryParamsFromObject(params)}`),
  reviewCommercial: (params) => useGetData(`${APPROVED_PACKAGES_URL}/review-commercial${getQueryParamsFromObject(params)}`),
  completed: (params) => useGetData(`${APPROVED_PACKAGES_URL}/completed${getQueryParamsFromObject(params)}`),
  types: () => useGetData(`${APPROVED_PACKAGES_URL}/package-types`),
  socialWorkers: () => useGetData(`${APPROVED_PACKAGES_URL}/social-workers`),
  approvers: () => useGetData(`${APPROVED_PACKAGES_URL}/approvers`),
}

export default useApprovedPackageApi;