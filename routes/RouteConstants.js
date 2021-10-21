export const BROKER_PORTAL_ROUTE = '/broker-portal';
export const getAssignPackageRoute = (id) => `${BROKER_PORTAL_ROUTE}/${id}/assign-package`;

export const CARE_PACKAGE_ROUTE = '/care-package';
export const getCarePackageReviewRoute = (id) => `${CARE_PACKAGE_ROUTE}/${id}/review`;
export const getCorePackageRoute = (id) => `${CARE_PACKAGE_ROUTE}/${id}/core-package`;
export const getBrokerPackageRoute = (id) => `${CARE_PACKAGE_ROUTE}/${id}/broker-package`;
export const getFundedNursingCareRoute = (id) => `${CARE_PACKAGE_ROUTE}/${id}/broker-fnc`;
export const getCareChargesRoute = (id) => `${CARE_PACKAGE_ROUTE}/${id}/broker-care-charges`;
export const getHistoryRoute = (id) => `${CARE_PACKAGE_ROUTE}/${id}/history`;

export const SERVICE_USER_ROUTE = '/service-user';
export const SERVICE_USER_MASTER_SEARCH_ROUTE = `${SERVICE_USER_ROUTE}/master-search`;
export const getServiceUserPackagesRoute = (id) => `${SERVICE_USER_ROUTE}/${id}/packages`;

export const NOT_FOUND_ROUTE = '/404';
export const BROKER_ASSISTANT_ROUTE = '/broker-assistant';

export const CARE_CHARGE_ROUTE = '/care-charge';

export const FINANCE_ROUTE = '/finance';

export const APPROVALS_ROUTE = '/approvals';

export const LOGOUT_ROUTE = '/logout';
