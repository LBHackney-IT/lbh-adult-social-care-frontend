import { getEnGBFormattedDate } from "../Utils/FuncUtils";
import { getInitDaysSelected } from "../Utils/CommonOptions";

const mapBrokerageSupplierOptions = (supplierOptions = []) => {
  return supplierOptions.map((option) => ({
    text: option?.supplierName,
    value: option?.id,
  }));
};

const mapNursingCareStageOptions = (stageOptions = []) => {
  return stageOptions.map((option) => ({
    text: option?.stageName,
    value: option?.id,
  }));
};

export {
  mapBrokerageSupplierOptions,
  mapNursingCareStageOptions,
};
