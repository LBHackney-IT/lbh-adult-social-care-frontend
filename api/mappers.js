export const optionsMapper = (fields, data = []) =>
  data.map((item) => {
    const mapObject = {};
    for (const field in fields) {
      mapObject[field] = item[fields[field]];
    }
    return mapObject;
  });
