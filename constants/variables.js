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

export const collectedByOptions = [
  { id: 'hackney', label: 'Hackney council (gross)' },
  { id: 'supplier', label: 'Supplier (net)' },
];
