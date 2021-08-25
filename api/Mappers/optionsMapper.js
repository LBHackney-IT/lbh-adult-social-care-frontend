import { getEnGBFormattedDate } from '../Utils/FuncUtils'

const optionsMapper = (fields, data = []) => {
  return data.map(item => {
    const mapObject = {};
    for(const field in fields) {
      mapObject[field] = item[fields[field]];
    }
    return mapObject;
  })
};

const mapTypeOfCareIdOptions = (options) =>
  options.map((option) => ({
    text: `${option.optionName} (${option.optionPeriod})`,
    value: option.typeOfStayOptionId,
}));

const mapCarePackageApprovalHistory = (approvalHistoryItems) => approvalHistoryItems.map((historyItem) => ({
    eventDate: getEnGBFormattedDate(historyItem.dateCreated),
    eventMessage: `${historyItem.logText}. ${historyItem.creatorRole}`,
    eventSubMessage: historyItem.logSubText,
  })) || [];

export default optionsMapper;

export {
  mapCarePackageApprovalHistory,
  mapTypeOfCareIdOptions,
};