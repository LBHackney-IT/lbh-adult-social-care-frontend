const mapBrokerageSupplierOptions = (supplierOptions = []) =>
  supplierOptions.map((option) => ({
    text: option?.supplierName,
    value: option?.id,
  }));

const mapTypeHomeOptions = typeHomeOptions => typeHomeOptions.map((option) => ({
  text: option.typeOfCareHomeName,
  value: option.typeOfCareHomeId,
}));

const mapResidentialCareStageOptions = (stageOptions = []) =>
  stageOptions.map((option) => ({
    text: option?.stageName,
    value: option?.id,
  }));

export { mapTypeHomeOptions, mapBrokerageSupplierOptions, mapResidentialCareStageOptions };
