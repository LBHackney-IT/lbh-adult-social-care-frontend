export const BROKER_PORTAL_ROUTE = '/broker-portal';
export const BROKER_PORTAL_SEARCH_ROUTE = '/broker-portal/search';

export const CARE_PACKAGE_ROUTE = '/care-package';
export const getAssignPackageRoute = (id) => `${CARE_PACKAGE_ROUTE}/${id}/assign-package`;
export const getCarePackageReviewRoute = (id) => `${CARE_PACKAGE_ROUTE}/${id}/review`;
export const getCorePackageRoute = (id) => `${CARE_PACKAGE_ROUTE}/${id}/core-package`;
export const getBrokerPackageRoute = (id) => `${CARE_PACKAGE_ROUTE}/${id}/broker-package`;
export const getFundedNursingCareRoute = (id) => `${CARE_PACKAGE_ROUTE}/${id}/broker-fnc`;
export const getCareChargesRoute = (id) => `${CARE_PACKAGE_ROUTE}/${id}/broker-care-charges`;

export const SERVICE_USER_ROUTE = '/service-user';
export const getServiceUserPackagesRoute = (id) => `${SERVICE_USER_ROUTE}/${id}/packages`;

export const LOGOUT_ROUTE = '/logout';
