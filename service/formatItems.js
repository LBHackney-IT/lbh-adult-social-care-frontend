const formatApprovalHistory = (carePackage = []) => (
  carePackage.map((historyItem) => ({
  eventDate: new Date(historyItem.dateCreated).toLocaleDateString('en-GB'),
  eventMessage: `${historyItem.logText}. ${historyItem.creatorRole}`,
  eventSubMessage: historyItem.logSubText,
})));

const formatDayCareOpportunities = (carePackage = []) => (
  carePackage.map((opportunityItem) => ({
    id: opportunityItem.dayCarePackageOpportunityId,
    howLongValue: opportunityItem.howLong.optionName,
    timesPerMonthValue: opportunityItem.howManyTimesPerMonth.optionName,
    needToAddress: opportunityItem.opportunitiesNeedToAddress,
})));

export {
  formatApprovalHistory,
  formatDayCareOpportunities,
};