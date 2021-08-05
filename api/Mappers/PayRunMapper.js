const mapPayRunTypeOptions = (options = []) =>
  options.map((option) => ({
    text: option?.typeName,
    value: `${option?.payRunTypeId} - `,
  }));

const mapPayRunSubTypeOptions = (options = []) =>
  options.map((option) => ({
    text: option?.subTypeName,
    value: `${option?.payRunTypeId} - ${option?.payRunSubTypeId}`,
  }));

const mapPayRunStatuses = (options = []) =>
  options.map((option) => ({
    text: option?.statusName,
    value: option?.payRunStatusId,
  }));

export { mapPayRunTypeOptions, mapPayRunSubTypeOptions, mapPayRunStatuses };
