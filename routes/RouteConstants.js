const LOGIN_ROUTE = '/login';
const LOGOUT_ROUTE = '/logout';
const BROKERAGE_HUB_ROUTE = '/brokerage-hub';
const LOGIN_CALL_BACK_ROUTE = '/login-callback';
const CARE_PACKAGE_ROUTE = '/care-package';
const ACTIVE_PACKAGES_ROUTE = '/active-packages';
const SOCIAL_WORKER_ROUTE = '/social-worker';
const APPROVER_HUB_ROUTE = '/approver-hub';
const PROPOSED_PACKAGES_ROUTE = '/proposed-packages';
const HOME_CARE_ROUTE = `${CARE_PACKAGE_ROUTE}/home-care`;
const BROKERAGE_ROUTE = `${CARE_PACKAGE_ROUTE}/brokerage`;
const BROKER_PACKAGE_ROUTE = `${BROKERAGE_ROUTE}/broker-package`;
const CORE_PACKAGE_DETAILS_ROUTE = `${BROKERAGE_ROUTE}/core-package-details`;
const HOME_CARE_APPROVE_PACKAGE_ROUTE = `${HOME_CARE_ROUTE}/approve-package`;
const HOME_CARE_APPROVE_BROKERED_ROUTE = `${HOME_CARE_ROUTE}/approve-brokered`;
const NURSING_CARE_ROUTE = `${CARE_PACKAGE_ROUTE}/nursing-care`;
const NURSING_CARE_APPROVE_PACKAGE_ROUTE = `${NURSING_CARE_ROUTE}/approve-package`;
const NURSING_CARE_APPROVE_BROKERED_ROUTE = `${NURSING_CARE_ROUTE}/approve-brokered`;
const NURSING_CARE_BROKERING_ROUTE = `${NURSING_CARE_ROUTE}/brokering`;
const RESIDENTIAL_CARE_ROUTE = `${CARE_PACKAGE_ROUTE}/residential-care`;
const RESIDENTIAL_CARE_APPROVE_PACKAGE_ROUTE = `${RESIDENTIAL_CARE_ROUTE}/approve-package`;
const RESIDENTIAL_CARE_APPROVE_BROKERED_ROUTE = `${RESIDENTIAL_CARE_ROUTE}/approve-brokered`;
const RESIDENTIAL_CARE_BROKERING_ROUTE = `${RESIDENTIAL_CARE_ROUTE}/brokering`;
const DAY_CARE_ROUTE = `${CARE_PACKAGE_ROUTE}/day-care`;
const DAY_CARE_APPROVE_PACKAGE_ROUTER = `${DAY_CARE_ROUTE}/approve-package/:dayCarePackageId`;
const DAY_CARE_BROKERING_PACKAGE_ROUTER = `${DAY_CARE_ROUTE}/brokering/:dayCarePackageId`;
const DAY_CARE_APPROVE_BROKERED_ROUTER = `${DAY_CARE_ROUTE}/approve-brokered/:dayCarePackageId`;
const CLIENT_HISTORY_ROUTER = '/client-history';

const PAYMENTS_ROUTE = '/payments';
const PAYMENTS_PAY_RUNS_ROUTE = `${PAYMENTS_ROUTE}/pay-runs`;
const PAYMENTS_BILLS_ROUTE = `${PAYMENTS_ROUTE}/bills`;
const PAYMENTS_ADD_BILL_ROUTE = `${PAYMENTS_ROUTE}/bills/add-bill`;
const PAYMENTS_BILL_ROUTE = `${PAYMENTS_ROUTE}/bills/bill/:id`;
const PAYMENTS_CARE_CHARGES_ROUTE = `${PAYMENTS_ROUTE}/care-charges`;
const PAYMENTS_RECLAIMS_ROUTE = `${PAYMENTS_ROUTE}/supplier-returns`;
const PAYMENTS_RECLAIM_ROUTE = `${PAYMENTS_ROUTE}/supplier-returns/:id`;
const PAYMENTS_SUPPLIER_RETURNS_ROUTE = `${PAYMENTS_ROUTE}/supplier-returns`;
const PAYMENTS_WEEK_OF_SUPPLIER_ROUTE = `${PAYMENTS_ROUTE}/supplier-returns/week-of-supplier/:id`;
const PAYMENTS_REPORTING_ROUTE = `${PAYMENTS_ROUTE}/reporting`;

const SUPPLIER_DASHBOARD_ROUTE = '/supplier-dashboard/supplier-returns';
const SUPPLIER_RETURNS_DASHBOARD_ROUTE = `${SUPPLIER_DASHBOARD_ROUTE}/supplier-returns/:id`;

export {
  LOGIN_ROUTE,
  LOGOUT_ROUTE,
  LOGIN_CALL_BACK_ROUTE,
  HOME_CARE_ROUTE,
  HOME_CARE_APPROVE_PACKAGE_ROUTE,
  HOME_CARE_APPROVE_BROKERED_ROUTE,
  DAY_CARE_ROUTE,
  DAY_CARE_BROKERING_PACKAGE_ROUTER,
  DAY_CARE_APPROVE_PACKAGE_ROUTER,
  DAY_CARE_APPROVE_BROKERED_ROUTER,
  NURSING_CARE_ROUTE,
  NURSING_CARE_APPROVE_PACKAGE_ROUTE,
  NURSING_CARE_APPROVE_BROKERED_ROUTE,
  NURSING_CARE_BROKERING_ROUTE,
  RESIDENTIAL_CARE_ROUTE,
  RESIDENTIAL_CARE_APPROVE_PACKAGE_ROUTE,
  RESIDENTIAL_CARE_APPROVE_BROKERED_ROUTE,
  RESIDENTIAL_CARE_BROKERING_ROUTE,
  CLIENT_HISTORY_ROUTER,
  CARE_PACKAGE_ROUTE,
  PROPOSED_PACKAGES_ROUTE,
  PAYMENTS_ROUTE,
  PAYMENTS_BILLS_ROUTE,
  PAYMENTS_CARE_CHARGES_ROUTE,
  PAYMENTS_PAY_RUNS_ROUTE,
  PAYMENTS_RECLAIMS_ROUTE,
  PAYMENTS_REPORTING_ROUTE,
  PAYMENTS_SUPPLIER_RETURNS_ROUTE,
  PAYMENTS_BILL_ROUTE,
  SUPPLIER_DASHBOARD_ROUTE,
  SUPPLIER_RETURNS_DASHBOARD_ROUTE,
  PAYMENTS_RECLAIM_ROUTE,
  PAYMENTS_WEEK_OF_SUPPLIER_ROUTE,
  PAYMENTS_ADD_BILL_ROUTE,
  ACTIVE_PACKAGES_ROUTE,
  SOCIAL_WORKER_ROUTE,
  APPROVER_HUB_ROUTE,
  BROKERAGE_HUB_ROUTE,
  BROKER_PACKAGE_ROUTE,
  BROKERAGE_ROUTE,
  CORE_PACKAGE_DETAILS_ROUTE,
};
