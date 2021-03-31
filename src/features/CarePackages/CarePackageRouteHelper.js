// Creates the parameter listing for care package pages
const getBaseParams = (
  isImmediate,
  isS117,
  isFixedPeriod,
  startDate,
  endDate
) => `/${isImmediate}/${isS117}/${isFixedPeriod}/${startDate}/${endDate}`;

export default getBaseParams;
