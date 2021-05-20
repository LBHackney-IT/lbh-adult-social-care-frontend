const LOGIN = "/login";
const CARE_PACKAGE = "/care-package";
const PROPOSED_PACKAGES = "/proposed-packages";
const HOME_CARE = `${CARE_PACKAGE}/home-care`;
const HOME_CARE_APPROVE_PACKAGE = `${HOME_CARE}/approve-package`;
const HOME_CARE_APPROVE_BROKERED = `${HOME_CARE}/approve-brokered`;
const NURSING_CARE = `${CARE_PACKAGE}/nursing-care`;
const NURSING_CARE_APPROVE_PACKAGE = `${NURSING_CARE}/approve-package`;
const NURSING_CARE_APPROVE_BROKERED = `${NURSING_CARE}/approve-brokered`;
const RESIDENTIAL_CARE = `${CARE_PACKAGE}/residential-care`;
const RESIDENTIAL_CARE_APPROVE_PACKAGE = `${RESIDENTIAL_CARE}/approve-package`;
const RESIDENTIAL_CARE_APPROVE_BROKERED = `${RESIDENTIAL_CARE}/approve-brokered`;
const DAY_CARE = `${CARE_PACKAGE}/day-care`;
const DAY_CARE_APPROVE_PACKAGE = `${DAY_CARE}/approve-package`;
const DAY_CARE_APPROVE_BROKERED = `${DAY_CARE}/approve-brokered`;
const CLIENT_HISTORY = "/client-history";

const PAYMENTS_ROUTE = '/payments';
const PAYMENTS_PAY_RUNS_ROUTE = `${PAYMENTS_ROUTE}/pay-runs`;
const PAYMENTS_PAY_RUN_ROUTE = `${PAYMENTS_ROUTE}/pay-runs/:id`;
const PAYMENTS_BILLS_ROUTE = `${PAYMENTS_ROUTE}/bills`;
const PAYMENTS_BILL_ROUTE = `${PAYMENTS_ROUTE}/bills/:id`;
const PAYMENTS_CARE_CHARGES_ROUTE = `${PAYMENTS_ROUTE}/care-charges`;
const PAYMENTS_RECLAIMS_ROUTE = `${PAYMENTS_ROUTE}/supplier-returns`;
const PAYMENTS_RECLAIM_ROUTE = `${PAYMENTS_ROUTE}/supplier-returns/:id`;
const PAYMENTS_SUPPLIER_RETURNS_ROUTE = `${PAYMENTS_ROUTE}/supplier-returns`;
const PAYMENTS_WEEK_OF_SUPPLIER_ROUTE = `${PAYMENTS_ROUTE}/supplier-returns/:id/week-of-supplier/:id`;
const PAYMENTS_REPORTING_ROUTE = `${PAYMENTS_ROUTE}/reporting`;

const SUPPLIER_DASHBOARD_ROUTE = '/supplier-dashboard/supplier-returns';
const SUPPLIER_RETURNS_DASHBOARD_ROUTE = `${SUPPLIER_DASHBOARD_ROUTE}/supplier-returns/:id`;

export {
  LOGIN,
  HOME_CARE,
  HOME_CARE_APPROVE_PACKAGE,
  HOME_CARE_APPROVE_BROKERED,
  DAY_CARE,
  DAY_CARE_APPROVE_PACKAGE,
  DAY_CARE_APPROVE_BROKERED,
  NURSING_CARE,
  NURSING_CARE_APPROVE_PACKAGE,
  NURSING_CARE_APPROVE_BROKERED,
  RESIDENTIAL_CARE,
  RESIDENTIAL_CARE_APPROVE_PACKAGE,
  RESIDENTIAL_CARE_APPROVE_BROKERED,
  CLIENT_HISTORY,
  CARE_PACKAGE,
  PROPOSED_PACKAGES,
  PAYMENTS_ROUTE,
  PAYMENTS_BILLS_ROUTE,
  PAYMENTS_CARE_CHARGES_ROUTE,
  PAYMENTS_PAY_RUNS_ROUTE,
  PAYMENTS_RECLAIMS_ROUTE,
  PAYMENTS_REPORTING_ROUTE,
  PAYMENTS_SUPPLIER_RETURNS_ROUTE,
  PAYMENTS_PAY_RUN_ROUTE,
  PAYMENTS_BILL_ROUTE,
  SUPPLIER_DASHBOARD_ROUTE,
  SUPPLIER_RETURNS_DASHBOARD_ROUTE,
  PAYMENTS_RECLAIM_ROUTE,
  PAYMENTS_WEEK_OF_SUPPLIER_ROUTE,
};
