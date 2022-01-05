const BROKERAGE = 'brokerage';
const BROKERAGE_ASSIGN_PACKAGES = 'brokerage_mosaicid_assign-packages';
const CARE_PACKAGE_APPROVAL = 'care-package_guid_approval';
const CARE_PACKAGE_BROKER_CARE_CHARGES = 'care-package_guid_broker-care-charges';
const CARE_PACKAGE_BROKER_FNC = 'care-package_guid_broker-fnc';
const CARE_PACKAGE_BROKER_PACKAGE = 'care-package_guid_broker-package';
const CARE_PACKAGE_CARE_CHARGE = 'care-package_guid_care-charge';
const CARE_PACKAGE_CORE_PACKAGE = 'care-package_guid_core-package';
const CARE_PACKAGE_DETAILS = 'care-package_guid_details';
const CARE_PACKAGE_HISTORY = 'care-package_guid_history';
const CARE_PACKAGE_PAYMENT_HISTORY = 'care-package_guid_payment-history';
const CARE_PACKAGE_REVIEW = 'care-package_guid_review';
const PAYRUNS = 'payruns';
const PAYRUNS_GUID = 'payruns_guid';
const PAYRUNS_GUID_INVOICE_ID = 'payruns_guid_invoice_id';
const SERVICE_USER_SEARCH = 'service-user_search';
const SERVICE_USER_GUID_CARE_CHARGES = 'service-user_guid_care-charges';
const SERVICE_USER_GUID_PACKAGES = 'service-user_guid_packages';
const APPROVALS = 'approvals';
const CARE_CHARGES = 'care-charges';
const INDEX = 'index';

export const accessRoutes = {
  BROKERAGE,
  BROKERAGE_ASSIGN_PACKAGES,
  CARE_PACKAGE_APPROVAL,
  CARE_PACKAGE_BROKER_CARE_CHARGES,
  CARE_PACKAGE_BROKER_FNC,
  CARE_PACKAGE_BROKER_PACKAGE,
  CARE_PACKAGE_CARE_CHARGE,
  CARE_PACKAGE_CORE_PACKAGE,
  CARE_PACKAGE_DETAILS,
  CARE_PACKAGE_HISTORY,
  CARE_PACKAGE_PAYMENT_HISTORY,
  CARE_PACKAGE_REVIEW,
  PAYRUNS,
  PAYRUNS_GUID,
  PAYRUNS_GUID_INVOICE_ID,
  SERVICE_USER_SEARCH,
  SERVICE_USER_GUID_CARE_CHARGES,
  SERVICE_USER_GUID_PACKAGES,
  APPROVALS,
  CARE_CHARGES,
  INDEX,
};

const ROLE_BROKERAGE = 'Brokerage';
const ROLE_BROKERAGE_APPROVER = 'Brokerage Approver';
const ROLE_CARE_CHARGE_MANAGER = 'Care Charge Manager';
const ROLE_FINANCE_APPROVER = 'Finance Approver';
const ROLE_FINANCE = 'Finance';

export const userRoles = {
  ROLE_BROKERAGE,
  ROLE_BROKERAGE_APPROVER,
  ROLE_CARE_CHARGE_MANAGER,
  ROLE_FINANCE_APPROVER,
  ROLE_FINANCE,
};

const allRoles = [
  userRoles.ROLE_BROKERAGE,
  userRoles.ROLE_BROKERAGE_APPROVER,
  userRoles.ROLE_CARE_CHARGE_MANAGER,
  userRoles.ROLE_FINANCE_APPROVER,
  userRoles.ROLE_FINANCE,
];

export const roleAccessMatrix = {
  brokerage: allRoles,
  'brokerage_mosaicid_assign-packages': [userRoles.ROLE_BROKERAGE],
  'care-package_guid_approval': [userRoles.ROLE_BROKERAGE_APPROVER],
  'care-package_guid_broker-care-charges': [userRoles.ROLE_BROKERAGE],
  'care-package_guid_broker-fnc': [userRoles.ROLE_BROKERAGE],
  'care-package_guid_broker-package': [userRoles.ROLE_BROKERAGE],
  'care-package_guid_care-charge': [userRoles.ROLE_CARE_CHARGE_MANAGER],
  'care-package_guid_core-package': [userRoles.ROLE_BROKERAGE],
  'care-package_guid_details': allRoles,
  'care-package_guid_history': allRoles,
  'care-package_guid_payment-history': allRoles,
  'care-package_guid_review': [userRoles.ROLE_BROKERAGE, userRoles.ROLE_FINANCE, userRoles.ROLE_FINANCE_APPROVER],
  payruns: [userRoles.ROLE_FINANCE, userRoles.ROLE_FINANCE_APPROVER],
  payruns_guid: [userRoles.ROLE_FINANCE, userRoles.ROLE_FINANCE_APPROVER],
  payruns_guid_invoice_id: allRoles,
  'service-user_search': allRoles,
  'service-user_guid_care-charges': allRoles,
  'service-user_guid_packages': allRoles,
  approvals: allRoles,
  'care-charges': [userRoles.ROLE_BROKERAGE, userRoles.ROLE_BROKERAGE_APPROVER, userRoles.ROLE_CARE_CHARGE_MANAGER],
};
