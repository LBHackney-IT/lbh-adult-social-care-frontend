const mapCareApprovalHistoryItems = (array = []) =>
  array.map((historyItem) => ({
    eventDate: new Date(historyItem.approvedDate).toLocaleDateString('en-GB'),
    eventMessage: historyItem.logText,
    eventSubMessage: undefined,
}));

const mapCareStageOptions = (stageOptions = []) =>
  stageOptions.map((option) => ({
    text: option?.packageAction,
    value: option?.packageStatusId
}));

const mapCareAdditionalNeedsEntries = (detailsForBrokerageOptions = []) =>
  detailsForBrokerageOptions.map(
    (additionalNeedsItem) => ({
      id: additionalNeedsItem.id,
      isWeeklyCost: additionalNeedsItem.isWeeklyCost,
      isOneOffCost: additionalNeedsItem.isOneOffCost,
      needToAddress: additionalNeedsItem.needToAddress,
  }));

export { mapCareApprovalHistoryItems, mapCareStageOptions, mapCareAdditionalNeedsEntries };
