import { BASE_URL } from '../BaseApi';
import { axiosRequest, getQueryParamsFromObject } from '../Utils/ApiUtils';

const APPROVED_PACKAGES_URL = `${BASE_URL}/v1/approved-packages`;

const getApprovedPackagesNew = (props) => {
  const params = getQueryParamsFromObject(props);
  return axiosRequest({
    url: `${APPROVED_PACKAGES_URL}/new${params}`,
  });
};

const getApprovedPackagesClarificationNeed = (props) => {
  const params = getQueryParamsFromObject(props);

  return axiosRequest({
    url: `${APPROVED_PACKAGES_URL}/clarification-need${params}`,
  });
};

const getApprovedPackagesAwaitingBrokerage = (props) => {
  const params = getQueryParamsFromObject(props);
  return axiosRequest({
    url: `${APPROVED_PACKAGES_URL}/awaiting-brokerage${params}`,
  });
};

const getApprovedPackagesReviewCommercial = (props) => {
  const params = getQueryParamsFromObject(props);
  return axiosRequest({
    url: `${APPROVED_PACKAGES_URL}/review-commercial${params}`,
  });
};

const getApprovedPackagesCompleted = (props) => {
  const params = getQueryParamsFromObject(props);
  return axiosRequest({
    url: `${APPROVED_PACKAGES_URL}/completed${params}`,
  });
};

const getApprovedPackagesPackageTypes = () =>
  axiosRequest({
    url: `${APPROVED_PACKAGES_URL}/package-types`,
  });

const getApprovedPackagesSocialWorkers = () =>
  axiosRequest({
    url: `${APPROVED_PACKAGES_URL}/social-workers`,
  });

const getApprovedPackagesApprovers = () =>
  axiosRequest({
    url: `${APPROVED_PACKAGES_URL}/approvers`,
  });

export {
  // tabs
  getApprovedPackagesNew,
  getApprovedPackagesClarificationNeed,
  getApprovedPackagesAwaitingBrokerage,
  getApprovedPackagesReviewCommercial,
  getApprovedPackagesCompleted,
  getApprovedPackagesPackageTypes,
  getApprovedPackagesSocialWorkers,
  getApprovedPackagesApprovers,
};
