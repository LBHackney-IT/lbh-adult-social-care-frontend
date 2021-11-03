import { isServer } from '../api/Utils/FuncUtils';

export const BROKER_PORTAL_ROUTE = '/broker-portal';

export const CARE_PACKAGE_ROUTE = '/care-package';
export const getCarePackageReviewRoute = (id) => `${CARE_PACKAGE_ROUTE}/${id}/review`;
export const getCorePackageRoute = (id) => `${CARE_PACKAGE_ROUTE}/${id}/core-package`;
export const getBrokerPackageRoute = (id) => `${CARE_PACKAGE_ROUTE}/${id}/broker-package`;
export const getFundedNursingCareRoute = (id) => `${CARE_PACKAGE_ROUTE}/${id}/broker-fnc`;
export const getCareChargesRoute = (id) => `${CARE_PACKAGE_ROUTE}/${id}/broker-care-charges`;
export const getHistoryRoute = (id) => `${CARE_PACKAGE_ROUTE}/${id}/history`;
export const getCarePackageDetailsRoute = (id) => `${CARE_PACKAGE_ROUTE}/${id}/details`;
export const getCarePackageApprovalRoute = (id) => `${CARE_PACKAGE_ROUTE}/${id}/approval`;
export const getCarePackageCareChargeRoute = (id) => `${CARE_PACKAGE_ROUTE}/${id}/care-charge`;

export const SERVICE_USER_ROUTE = '/service-user';
export const SERVICE_USER_MASTER_SEARCH_ROUTE = `${SERVICE_USER_ROUTE}/master-search`;
export const SERVICE_USER_SEARCH_ROUTE = `${SERVICE_USER_ROUTE}/search`;
export const getPackageDetailRoute = (id) => `${SERVICE_USER_ROUTE}/${id}/package-details`;
export const getServiceUserPackagesRoute = (serviceUserId) => `${SERVICE_USER_ROUTE}/${serviceUserId}/packages`;
export const getServiceUserCareChargesRoute = (serviceUserId) => `${SERVICE_USER_ROUTE}/${serviceUserId}/care-charges-overview`;

export const BROKER_ASSISTANCE_ROUTE = '/broker-assistance';
export const getAssignPackageRoute = (id) => `${BROKER_ASSISTANCE_ROUTE}/${id}/assign-package`;

export const CARE_CHARGES_ROUTE = '/care-charges';

export const APPROVALS_ROUTE = '/approvals';

export const FINANCE_ROUTE = '/finance';

export const LOGOUT_ROUTE = '/logout';

export const NOT_FOUND_ROUTE = '/404';

export const saveToStoragePrevRoute = (route) => {
  if (isServer()) return;
  window.localStorage.setItem('prevRoute', route);
};

export const getStoragePrevRoute = () => {
  if (isServer()) return {};
  const route = window.localStorage.getItem('prevRoute');
  return route ? getPrevRouteInfo(route) : {};
};

const getBreadcrumbRoutes = (additionalInfo) => [
  { route: 'broker-assistance', text: 'Broker Assistance' },
  { route: 'broker-portal', text: 'Broker Portal' },
  { route: 'care-charges', text: 'Care Charges' },
  { route: 'care-charges-overview', text: 'Care charges package overview' },
  {
    route: 'care-charge',
    text: 'Financial assessment',
    preRoutes: [
      {
        href: getServiceUserPackagesRoute(additionalInfo),
        text: 'Full overview'
      }],
  },
  { route: 'approvals', text: 'Approvals' },
  { route: 'finance', text: 'Finance' },
  { route: 'approval', text: 'Approval package detail' },
  { route: 'core-package', text: 'Core package' },
  { route: 'broker-care-charges', text: 'Care charges' },
  { route: 'packages', text: 'Full overview' },
  { route: 'master-search', text: 'Service user master search' },
  { route: 'search', text: 'Service user search' },
  { route: 'broker-package', text: 'Broker package' },
  { route: 'broker-fnc', text: 'Funded nursing care' },
  { route: 'review', text: 'Review package details' },
  { route: 'details', text: 'Package detail' },
  { route: 'assign-package', text: 'Assign and attach a care plan' },
];

export const getMainRoute = (currentRoute, additionalInfo) => {
  const mainRouteInfo = getStoragePrevRoute();
  const { text, preRoutes } = getPrevRouteInfo(currentRoute, additionalInfo);
  const currentRouteInfo = currentRoute ? { text, preRoutes } : {};
  const currentPreRoutes = currentRouteInfo.preRoutes || [];

  return [
    { text: 'Home', href: '/' },
    { text: mainRouteInfo.text || 'Broker Assistance', href: mainRouteInfo.route || BROKER_ASSISTANCE_ROUTE },
    ...currentPreRoutes,
    currentRouteInfo,
  ].filter(item => item.text);
};
export const getPrevRouteInfo = (route, additionalInfo) => getBreadcrumbRoutes(additionalInfo).find((splitRoute) => route === splitRoute.route) || {};
