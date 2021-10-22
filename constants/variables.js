export const requestMethods = {
  put: 'PUT',
  get: 'GET',
  post: 'POST',
  delete: 'DELETE',
  patch: 'PATCH',
  head: 'HEAD',
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