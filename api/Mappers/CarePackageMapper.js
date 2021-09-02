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

const mapCareAdditionalNeedsEntries = (additionalNeedsEntries = []) =>
  additionalNeedsEntries.map(
    (additionalNeedsItem) => ({
      id: additionalNeedsItem?.id || null,
      isWeeklyCost: additionalNeedsItem?.isWeeklyCost || null,
      isOneOffCost: additionalNeedsItem?.isOneOffCost || null,
      needToAddress: additionalNeedsItem?.needToAddress || null,
  }));

export { mapCareApprovalHistoryItems, mapCareStageOptions, mapCareAdditionalNeedsEntries };
