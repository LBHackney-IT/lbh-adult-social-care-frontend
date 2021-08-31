import useGetData from './useGetData';

const HOME_CARE_URL = '/home-care-packages';
const HOME_CARE_TIME_SLOT_SHIFTS_URL = '/timeSlotShifts';
const HOME_CARE_SERVICE_URL = '/homeCareService';

const useHomeCareApi = {
  detailsForBrokerage: (homeCarePackageId) => useGetData(`${HOME_CARE_URL}/${homeCarePackageId}/brokerage`, '', {}),
  approvePackage: (homeCarePackageId) => useGetData(`${HOME_CARE_URL}/${homeCarePackageId}/approve-package`),
  getAllServices: () => useGetData(`${HOME_CARE_SERVICE_URL}/getall`),
  getAllTimeShiftSlots: () => useGetData(`${HOME_CARE_TIME_SLOT_SHIFTS_URL}/getall`),
}

export default useHomeCareApi;