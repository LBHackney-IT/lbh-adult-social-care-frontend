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

export const roleAccessMatrix = {
  brokerage: ['Brokerage Approver', 'Brokerage', 'Care Charge Manager', 'Finance Approver', 'Finance'],
  'brokerage_mosaicid_assign-packages': [],
  'care-package_guid_approval': [],
  'care-package_guid_broker-care-charges': [],
  'care-package_guid_broker-fnc': [],
  'care-package_guid_broker-package': [],
  'care-package_guid_care-charge': [],
  'care-package_guid_core-package': [],
  'care-package_guid_details': [],
  'care-package_guid_history': [],
  'care-package_guid_payment-history': [],
  'care-package_guid_review': [],
  payruns: [],
  payruns_guid: [],
  payruns_guid_invoice_id: [],
  'service-user_search': [],
  'service-user_guid_care-charges': [],
  'service-user_guid_packages': [],
  approvals: [],
  'care-charges': ['Brokerage', 'Care Charge Manager'],
  index: [],
};
