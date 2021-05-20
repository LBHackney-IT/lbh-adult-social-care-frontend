import { getEnGBFormattedDate } from "../Utils/FuncUtils";
import { getInitDaysSelected } from "../Utils/CommonOptions";

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

  let currentDaysSelected = getInitDaysSelected();

  let monday = {
    ...currentDaysSelected.find(
      (dayObj) => dayObj.long.toLowerCase() === "monday"
    ),
    checked: dayCarePackage?.packageDetails.monday,
  };
  let tuesday = {
    ...currentDaysSelected.find(
      (dayObj) => dayObj.long.toLowerCase() === "tuesday"
    ),
    checked: dayCarePackage?.packageDetails.tuesday,
  };
  let wednesday = {
    ...currentDaysSelected.find(
      (dayObj) => dayObj.long.toLowerCase() === "wednesday"
    ),
    checked: dayCarePackage?.packageDetails.wednesday,
  };
  let thursday = {
    ...currentDaysSelected.find(
      (dayObj) => dayObj.long.toLowerCase() === "thursday"
    ),
    checked: dayCarePackage?.packageDetails.thursday,
  };
  let friday = {
    ...currentDaysSelected.find(
      (dayObj) => dayObj.long.toLowerCase() === "friday"
    ),
    checked: dayCarePackage?.packageDetails.friday,
  };
  let saturday = {
    ...currentDaysSelected.find(
      (dayObj) => dayObj.long.toLowerCase() === "saturday"
    ),
    checked: dayCarePackage?.packageDetails.saturday,
  };
  let sunday = {
    ...currentDaysSelected.find(
      (dayObj) => dayObj.long.toLowerCase() === "sunday"
    ),
    checked: dayCarePackage?.packageDetails.sunday,
  };
  currentDaysSelected = [
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
  ];

  return {
    newApprovalHistoryItems,
    newOpportunityEntries,
    currentDaysSelected,
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
