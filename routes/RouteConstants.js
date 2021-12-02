import { isServer } from '../api/Utils/FuncUtils';
import withSession from '../lib/session';
import { getLoggedInUser } from '../service/helpers';

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
export const getPaymentHistoryRoute = (id) => `${CARE_PACKAGE_ROUTE}/${id}/payment-history`;

export const SERVICE_USER_ROUTE = '/service-user';
export const SERVICE_USER_MASTER_SEARCH_ROUTE = `${SERVICE_USER_ROUTE}/master-search`;
export const SERVICE_USER_SEARCH_ROUTE = `${SERVICE_USER_ROUTE}/search`;
export const getPackageDetailRoute = (id) => `${SERVICE_USER_ROUTE}/${id}/package-details`;
export const getServiceUserPackagesRoute = (serviceUserId) => `${SERVICE_USER_ROUTE}/${serviceUserId}/packages`;
export const getServiceUserCareChargesRoute = (serviceUserId) => `${SERVICE_USER_ROUTE}/${serviceUserId}/care-charges`;

export const BROKER_REFERRAL_ROUTE = '/broker-referral';
export const getAssignPackageRoute = (id) => `${BROKER_REFERRAL_ROUTE}/${id}/assign-package`;

export const getSinglePayrunRoute = (payrunId) => `${FINANCE_ROUTE}/${payrunId}`;

export const getInvoiceRoute = (payRunId, invoiceId) => `${FINANCE_ROUTE}/${payRunId}/invoice/${invoiceId}`;

export const CARE_CHARGES_ROUTE = '/care-charges';

export const APPROVALS_ROUTE = '/approvals';

export const FINANCE_ROUTE = '/payruns';

export const APP_SERVICE_ROUTES = {
  logout: '/logout',
  notFoundPage: '/404',
  login: '/login',
};

export const useServerSideProps = (redirect = {}) => withSession(({ req }) => {
  const user = getLoggedInUser({ req });
  if (!user) return {
    redirect: {
      destination: APP_SERVICE_ROUTES.login,
      ...redirect,
    }
  };

  return { props: {} };
});

const carePackageRoutes = [
  { route: BROKER_REFERRAL_ROUTE, name: 'Broker Referral' },
  { route: BROKER_PORTAL_ROUTE, name: 'Broker Portal' },
  { route: CARE_CHARGES_ROUTE, name: 'Care Charges' },
  { route: APPROVALS_ROUTE, name: 'Approvals' },
  { route: FINANCE_ROUTE, name: 'Finance' },
];

export const saveToStoragePrevRoute = (route) => setStorageValue('prevRoute', route);

export const getStoragePrevRoute = () => {
  const route = getStorageValue('prevRoute');
  return route ? getPrevRouteInfo(route) : {};
};

export const setStorageValue = (key, value) => {
  if (isServer()) return;
  window.localStorage.setItem(key, value);
};

export const getStorageValue = (key) => {
  if (isServer()) return;
  // eslint-disable-next-line consistent-return
  return window.localStorage.getItem(key);
};

export const setPreviousPath = (previousPath) => setStorageValue('previousPath', previousPath);
export const getPreviousPath = () => getStorageValue('previousPath');

export const getCarePackageMainRoute = (additionalBreadcrumbs) => {
  const routeInfo = getStoragePrevRoute();

  return [
    { text: 'Home', href: '/' },
    { text: routeInfo.name || 'Broker Referral', href: routeInfo.route || BROKER_REFERRAL_ROUTE },
    ...additionalBreadcrumbs,
  ];
};
export const getPrevRouteInfo = (route) => carePackageRoutes.find((mainRoute) => route.includes(mainRoute.route)) || {};

export const APP_SERVICE_ROUTES_MAP = Object.values(APP_SERVICE_ROUTES);