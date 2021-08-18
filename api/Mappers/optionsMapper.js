const optionsMapper = (fields, data = []) => {
  return data.map(item => {
    const mapObject = {};
    for(const field in fields) {
      mapObject[field] = item[fields[field]];
    }
    return mapObject;
  })
};

export default optionsMapper;