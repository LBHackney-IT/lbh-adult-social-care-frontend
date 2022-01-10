import { useFetchWithParams } from './useFetchWithParams';

export const useCareCharge = ({ params }) => useFetchWithParams({ params, url: '/care-charges' });
