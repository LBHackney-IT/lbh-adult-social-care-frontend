import useGetData from './useGetData';

const DAY_CARE_URL = '/day-care-packages';

const useDayCareApi = {
  termTimeConsiderationOptions: () => {
    const allData = useGetData(`${DAY_CARE_URL}/term-time-considerations`)
    const { data } = allData;
    const formattedData = data.map(option => ({
      text: option.optionName,
      value: option.optionId,
    }));
    return { ...allData, data: formattedData };
  },
  opportunityLengthOptions: () => {
    const allData = useGetData(`${DAY_CARE_URL}/opportunity-length-options`)
    const { data } = allData;
    const formattedData = data.map((option) => ({
      text: option.optionName,
      value: option.opportunityLengthOptionId,
      valueInMinutes: option.timeInMinutes,
    }));
    return { ...allData, data: formattedData };
  },
  opportunityTimesPerMonthOptions: () => {
    const allData = useGetData(`${DAY_CARE_URL}/opportunity-times-per-month-options`)
    const { data } = allData;
    const formattedData = data.map((option) => ({
      text: option.optionName,
      value: option.opportunityTimePerMonthOptionId,
    }));
    return { ...allData, data: formattedData };
  },
  colleges: () => useGetData(`${DAY_CARE_URL}/colleges`),
  approvalDetails: () => useGetData(`${DAY_CARE_URL}/approval-details`),
  detailsForBrokerage: (dayCareId) => useGetData(`${DAY_CARE_URL}/${dayCareId}/brokerage`),
  brokerAgeStages: () => useGetData(`${DAY_CARE_URL}/brokerage/stages`),
}

export default useDayCareApi;