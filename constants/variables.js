export const requestMethods = {
  put: 'PUT',
  get: 'GET',
  post: 'POST',
  delete: 'DELETE',
  patch: 'PATCH',
  head: 'HEAD',
};

export const dateDescending = {
  asc: 1, // 0, 1
  equal: 0, // 0, 0
  desc: -1, // 1, 0
};

export const tagColors = {
  new: 'green',
  'in progress': 'yellow',
  'waiting for approval': 'blue',
  'not approved': 'red',
  ended: 'red',
  cancelled: 'red',
  approved: 'gray',
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

export const collectingReasonOptions = [
  { text: 'Service user unable to manage finances', value: '1' },
  { text: 'Agreement with provider to pay gross', value: '2' },
  { text: 'Service user or family declining payment', value: '3' },
  { text: 'Finance managed by CFAT', value: '4' },
  { text: 'Other', value: '5' },
];
