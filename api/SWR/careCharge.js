import { useFetchParams } from './useFetchParams';

export const useCareCharge = ({ params }) =>
  useFetchParams({ params, url: '/care-charges' })