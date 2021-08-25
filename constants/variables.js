const maxStringLength = 200;
const DEFAULT_PAGE_SIZE = 10;

const requestMethods = {
  put: 'PUT',
  get: 'GET',
  post: 'POST',
  delete: 'DELETE',
  patch: 'PATCH',
  head: 'HEAD',
};

const initialPagingOptions = {
  pagingMetaData: {},
  data: [],
}

const invoiceStatusIdByString = {
  accepted: 5,
  rejected: 2,
  hold: 1,
};

export {
  initialPagingOptions,
  maxStringLength,
  invoiceStatusIdByString,
  requestMethods,
  DEFAULT_PAGE_SIZE,
};
