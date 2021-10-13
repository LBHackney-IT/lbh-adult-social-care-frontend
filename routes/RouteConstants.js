export const LOGOUT_ROUTE = '/logout';
export const BROKER_PORTAL_ROUTE = '/broker-portal';

export const CARE_PACKAGE_ROUTE = '/care-package';
export const getCarePackageReviewRoute = (id) => `${CARE_PACKAGE_ROUTE}/${id}/review`;
export const getCorePackageRoute = (id) => `${CARE_PACKAGE_ROUTE}/${id}/core-package`;
export const getBrokerPackageRoute = (id) => `${CARE_PACKAGE_ROUTE}/${id}/broker-package`;
export const getFundedNursingCareRoute = (id) => `${CARE_PACKAGE_ROUTE}/${id}/broker-fnc`;
export const getCareChargesRoute = (id) => `${CARE_PACKAGE_ROUTE}/${id}/broker-care-charges`;

export const BROKERAGE_ROUTE = `${CARE_PACKAGE_ROUTE}/brokerage`;
export const BROKER_PACKAGE_ROUTE = `${BROKERAGE_ROUTE}/broker-package`;
export const PAYMENTS_ROUTE = '/payments';
export const PAYMENTS_PAY_RUNS_ROUTE = `${PAYMENTS_ROUTE}/pay-runs`;
export const PAYMENTS_BILLS_ROUTE = `${PAYMENTS_ROUTE}/bills`;

