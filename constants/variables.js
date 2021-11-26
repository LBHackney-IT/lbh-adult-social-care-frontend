export const requestMethods = {
  put: 'PUT',
  get: 'GET',
  post: 'POST',
  delete: 'DELETE',
  patch: 'PATCH',
  head: 'HEAD',
};

export const dateDescending = {
  asc: 1, // dateLeft < dateRight
  equal: 0, // dateLeft = dateRight
  desc: -1, // dateLeft > dateRight
};

export const collectedByType = {
  supplier: 'net',
  hackney: 'gross',
};

export const claimTypes = {
  careCharge: 1,
  fnc: 2,
};

export const RECLAIM_SUBTYPE_BY_NAME = {
  Provisional: 1,
  "Without Property 1-12 Weeks": 2,
  "Without Property 13+ Weeks": 3,
};

export const RECLAIM_SUBTYPE_BY_ID = {
  1: 'Provisional',
  2: "Without Property 1-12 Weeks",
  3: "Without Property 13+ Weeks",
};

export const claimCollector = {
  hackney: 2,
  supplier: 1,
};

export const tagColors = {
  new: 'green',
  'in progress': 'yellow',
  'waiting for approval': 'blue',
  'not approved': 'red',
  ended: 'red',
  end: 'red',
  cancelled: 'red',
  pending: 'blue',
  approved: 'gray',
  active: 'green',
};

export const userTagColors = {
  new: 'yellow',
  existing: 'gray',
};

export const costPeriods = {
  hourly: 1,
  weekly: 2,
  oneOff: 3,
  fixed: 4,
};

export const brokerageTypeOptions = {
  coreCost: 1,
  additionalNeed: 2,
};

export const careChargeFormKeys = {
  provisional: 'provisional',
  less12: 'residentialLess12',
  more12: 'residentialMore12',
};

export const careChargeAPIKeys = {
  provisional: 1,
  less12: 2,
  more12: 3,
};

export const TEXT_FILE_EXTENSIONS = ['pdf', 'doc', 'docx'];

export const collectingReasonOptions = [
  { text: 'Service user unable to manage finances', value: '1' },
  { text: 'Agreement with provider to pay gross', value: '2' },
  { text: 'Service user or family declining payment', value: '3' },
  { text: 'Finance managed by CFAT', value: '4' },
  { text: 'Other', value: '5' },
];

export const collectingReasonNameOptions = [
  { text: 'Service user unable to manage finances', value: 'Service user unable to manage finances' },
  { text: 'Agreement with provider to pay gross', value: 'Agreement with provider to pay gross' },
  { text: 'Service user or family declining payment', value: 'Service user or family declining payment' },
  { text: 'Finance managed by CFAT', value: 'Finance managed by CFAT' },
  { text: 'Other', value: 'Other' },
];


export const packageTypes = {
  residential: 2,
  nursing: 4,
};
