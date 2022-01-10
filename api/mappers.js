export const optionsMapper = (fields, data = []) =>
  data.map((item) => {
    const mapObject = {};
    // TODO Fix the error
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const field in fields) {
      mapObject[field] = item[fields[field]];
    }
    return mapObject;
  });
