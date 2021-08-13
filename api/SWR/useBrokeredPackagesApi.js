import useGetData from './useGetData'
import { getQueryParamsFromObject } from '../Utils/ApiUtils'

const BROKERED_PACKAGES_URL = '/brokered-packages';

const useBrokeredPackagesNew = (params) => useGetData(`${BROKERED_PACKAGES_URL}/new${getQueryParamsFromObject(params)}`);
const useBrokeredPackagesInProgress = (params) => useGetData(`${BROKERED_PACKAGES_URL}/in-progress${getQueryParamsFromObject(params)}`);
const useBrokeredPackagesDone = (params) => useGetData(`${BROKERED_PACKAGES_URL}/done${getQueryParamsFromObject(params)}`);
const useBrokeredPackagesTypes = () => useGetData(`${BROKERED_PACKAGES_URL}/package-types`);
const useBrokeredPackagesSocialWorkers = () => useGetData(`${BROKERED_PACKAGES_URL}/social-workers`);
const useBrokeredPackagesApprovers = () => useGetData(`${BROKERED_PACKAGES_URL}/approvers`);
const useBrokeredPackagesStages = () => useGetData(`${BROKERED_PACKAGES_URL}/stages`);

export {
  useBrokeredPackagesNew,
  useBrokeredPackagesDone,
  useBrokeredPackagesInProgress,
  useBrokeredPackagesStages,
  useBrokeredPackagesTypes,
  useBrokeredPackagesSocialWorkers,
  useBrokeredPackagesApprovers,
};