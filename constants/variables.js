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
