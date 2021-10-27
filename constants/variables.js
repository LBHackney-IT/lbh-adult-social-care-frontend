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

export const collectedByType = {
  supplier: 'net',
  hackney: 'gross',
};

export const reclaimType = {
  careCharge: 1,
  fnc: 2,
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