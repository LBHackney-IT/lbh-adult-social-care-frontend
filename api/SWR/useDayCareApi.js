import useGetData from './useGetData';

const DAY_CARE_URL = '/day-care-packages';

const useDayCareApi = {
  termTimeConsiderationOptions: () => useGetData(`${DAY_CARE_URL}/term-time-considerations`),
  opportunityLengthOptions: () => {
    const allData = useGetData(`${DAY_CARE_URL}/opportunity-length-options`)
    const { data } = allData;
    const formattedData = data.map((option) => ({
      text: option.optionName,
      value: option.opportunityLengthOptionId,
      valueInMinutes: option.timeInMinutes,
    }));
    return {
      ...allData,
      data: formattedData,
    };
  },
  opportunityTimesPerMonthOptions: () => useGetData(`${DAY_CARE_URL}/opportunity-times-per-month-options`),
}

export default useDayCareApi;