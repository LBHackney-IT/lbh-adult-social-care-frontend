import fetcher from './fetcher';

const searchFetch = (url, params) => fetcher(url, { params });
export default searchFetch;