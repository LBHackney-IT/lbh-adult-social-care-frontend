/* eslint-disable guard-for-in */
export const optionsMapper = (fields, data = []) =>
  data.map((item) => {
    const mapObject = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const field in fields) {
      mapObject[field] = item[fields[field]];
    }
    return mapObject;
  });
