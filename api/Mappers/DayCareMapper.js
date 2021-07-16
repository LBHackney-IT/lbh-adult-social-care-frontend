import { getEnGBFormattedDate } from "../Utils/FuncUtils";
import { getSelectedDate } from "../Utils/CommonOptions";

const mapDayCarePackageDetailsForBrokerage = (dayCarePackage) => {
  const newApprovalHistoryItems = dayCarePackage?.packageApprovalHistory.map(
    (historyItem) => ({
      eventDate: getEnGBFormattedDate(historyItem.dateCreated),
      eventMessage: `${historyItem.logText}. ${historyItem.creatorRole}`,
      eventSubMessage: historyItem.logSubText,
    })
  );

  const newOpportunityEntries = dayCarePackage?.packageDetails.dayCareOpportunities.map(
    (opportunityItem) => ({
      id: opportunityItem.dayCarePackageOpportunityId,
      howLongValue: opportunityItem.howLong.optionName,
      timesPerMonthValue: opportunityItem.howManyTimesPerMonth.optionName,
      needToAddress: opportunityItem.opportunitiesNeedToAddress,
    })
  );

  return {
    newApprovalHistoryItems,
    newOpportunityEntries,
    currentDaysSelected: getSelectedDate(dayCarePackage),
  };
};

const mapBrokerageSupplierOptions = (supplierOptions = []) => {
  return supplierOptions.map((option) => ({
    text: option?.supplierName,
    value: option?.id,
  }));
};

const mapDayCareStageOptions = (stageOptions = []) => {
  return stageOptions.map((option) => ({
    text: option?.packageAction,
    value: option?.packageStatusId,
  }));
};

export {
  mapDayCarePackageDetailsForBrokerage,
  mapBrokerageSupplierOptions,
  mapDayCareStageOptions,
};
