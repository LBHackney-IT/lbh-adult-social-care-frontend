const mapBrokerageSupplierOptions = (supplierOptions = []) =>
  supplierOptions.map((option) => ({
    text: option?.supplierName,
    value: option?.id,
  }));

const mapResidentialCareStageOptions = (stageOptions = []) =>
  stageOptions.map((option) => ({
    text: option?.stageName,
    value: option?.id,
  }));

export { mapBrokerageSupplierOptions, mapResidentialCareStageOptions };
