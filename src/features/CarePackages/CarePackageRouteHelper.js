import { PERSONAL_CARE } from "../../routes/RouteConstants";

const getBaseParams = (
  isImmediate,
  isS117,
  isFixedPeriod,
  startDate,
  endDate
) => `/${isImmediate}/${isS117}/${isFixedPeriod}/${startDate}/${endDate}`;

// Method used to get route to personal care
const getPersonalCare = (
  isImmediate,
  isS117,
  isFixedPeriod,
  startDate,
  endDate
) => {
  // startDate = format(startDate, "yyyy-MM-dd");
  // endDate = format(endDate, "yyyy-MM-dd");
  return (
    PERSONAL_CARE +
    `/${isImmediate}/${isS117}/${isFixedPeriod}/${startDate}/${endDate}`
  );
};

export { getPersonalCare };
