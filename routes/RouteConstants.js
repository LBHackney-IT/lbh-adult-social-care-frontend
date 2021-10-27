import { isServer } from 'api';

export const BROKER_PORTAL_ROUTE = '/broker-portal';

export const CARE_PACKAGE_ROUTE = '/care-package';
export const getCarePackageReviewRoute = (id) => `${CARE_PACKAGE_ROUTE}/${id}/review`;
export const getCorePackageRoute = (id) => `${CARE_PACKAGE_ROUTE}/${id}/core-package`;
export const getBrokerPackageRoute = (id) => `${CARE_PACKAGE_ROUTE}/${id}/broker-package`;
export const getFundedNursingCareRoute = (id) => `${CARE_PACKAGE_ROUTE}/${id}/broker-fnc`;
export const getCareChargesRoute = (id) => `${CARE_PACKAGE_ROUTE}/${id}/broker-care-charges`;
export const getHistoryRoute = (id) => `${CARE_PACKAGE_ROUTE}/${id}/history`;
export const getCarePackageDetailsRoute = (id) =>  `${CARE_PACKAGE_ROUTE}/${id}/details`;

export const SERVICE_USER_ROUTE = '/service-user';
export const SERVICE_USER_MASTER_SEARCH_ROUTE = `${SERVICE_USER_ROUTE}/master-search`;
export const SERVICE_USER_SEARCH_ROUTE = `${SERVICE_USER_ROUTE}/search`;
export const getPackageDetailRoute = (id) => `${SERVICE_USER_ROUTE}/${id}/package-details`;
export const getServiceUserPackagesRoute = (serviceUserId) => `${SERVICE_USER_ROUTE}/${serviceUserId}/packages`;

export const BROKER_ASSISTANCE_ROUTE = '/broker-assistance';
export const getAssignPackageRoute = (id) => `${BROKER_ASSISTANCE_ROUTE}/${id}/assign-package`;

export const CARE_CHARGE_ROUTE = '/care-charges';

export const APPROVALS_ROUTE = '/approvals';

export const FINANCE_ROUTE = '/finance';

export const LOGOUT_ROUTE = '/logout';

const carePackageRoutes = [
  { route: BROKER_ASSISTANCE_ROUTE, name: 'Broker Assistance' },
  { route: BROKER_PORTAL_ROUTE, name: 'Broker Portal' },
  { route: CARE_CHARGE_ROUTE, name: 'Care Charges' },
  { route: APPROVALS_ROUTE, name: 'Approvals' },
  { route: FINANCE_ROUTE, name: 'Finance' },
];

export const saveToStoragePrevRoute = (route) => {
  if(isServer()) return;
  window.localStorage.setItem('prevRoute', route);
};

export const getStoragePrevRoute = () => {
  if(isServer()) return {};
  const route = window.localStorage.getItem('prevRoute');
  return route ? getPrevRouteInfo(route) : {};
};

export const getCarePackageMainRoute = () => {
  const routeInfo = getStoragePrevRoute();

  return [
    { text: 'Home', href: '/' },
    { text: routeInfo.name || 'Broker Assistance', href: routeInfo.route || BROKER_ASSISTANCE_ROUTE },
    { text: 'Full overview' },
  ];
};
export const getPrevRouteInfo = (route) => carePackageRoutes.find(mainRoute => route.includes(mainRoute.route)) || {};
