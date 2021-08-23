const mapBrokerageSupplierOptions = (supplierOptions = []) => supplierOptions.map((option) => ({
  text: option?.supplierName,
  value: option?.id,
}));

const mapNursingCareStageOptions = (stageOptions = []) =>
  stageOptions.map((option) => ({
    text: option?.stageName,
    value: option?.id,
  }));

const mapDetailsForBrokerage = (detailsForBrokerageOptions = []) =>
  detailsForBrokerageOptions.map(
    (additionalneedsItem) => ({
      id: additionalneedsItem.id,
      isWeeklyCost: additionalneedsItem.isWeeklyCost,
      isOneOffCost: additionalneedsItem.isOneOffCost,
      needToAddress: additionalneedsItem.needToAddress,
    })
);

export { mapBrokerageSupplierOptions, mapNursingCareStageOptions, mapDetailsForBrokerage };
