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
    (additionalNeedsItem) => ({
      id: additionalNeedsItem.id,
      isWeeklyCost: additionalNeedsItem.isWeeklyCost,
      isOneOffCost: additionalNeedsItem.isOneOffCost,
      needToAddress: additionalNeedsItem.needToAddress,
    })
);

export { mapBrokerageSupplierOptions, mapNursingCareStageOptions, mapDetailsForBrokerage };
