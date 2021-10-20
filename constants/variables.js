export const maxStringLength = 200;
export const DEFAULT_PAGE_SIZE = 10;

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

export const initialPagingOptions = {
  pagingMetaData: {},
  data: [],
}

export const invoiceStatusIdByString = {
  accepted: 5,
  rejected: 2,
  hold: 1,
};
