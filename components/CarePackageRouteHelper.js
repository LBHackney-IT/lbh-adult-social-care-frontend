// Creates the parameter listing for care approve-package pages
const getBaseParams = (isImmediate, isS117, isFixedPeriod, startDate, endDate) =>
  `/${isImmediate}/${isS117}/${isFixedPeriod}/${startDate}/${endDate}`;

export default getBaseParams;
