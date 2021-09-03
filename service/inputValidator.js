// inputs example
// [
//  {name: 'firstName', value: 'FirstName', rules: ['empty', 'firstName']}
//  {name: 'secondName', value: 'SecondName', rules: ['empty']}
//  {name: 'password', value: 'SoMePASS', rules: ['empty', 'password']}
// ]

const fieldValidator = (inputs = [], additionalRules = [], generalRules = ['empty']) => {
  const validFields = {};
  let hasErrors = false;
  inputs.forEach((item) => {
    validFields[item.name] = '';
    if (generalRules.includes('empty') || item.rules.includes('empty')) {
      if (item.value === undefined || item.value === '') {
        validFields[item.name] = 'Required field';
        hasErrors = true;
      }
    }
    if (item.rules.includes('null')) {
      if (item.value === null) {
        validFields[item.name] = 'Required field';
        hasErrors = true;
      }
    }

    // additionalRules EXAMPLE
    // [
    //  {name: 'firstName', text: 'First name too low', valid: (item) => item.firstName.length > 3},
    //  {name: 'password', text: 'Password too low', valid: (item) => item.password.length > 10}
    // ]
    additionalRules.forEach((rule) => {
      if (item.rules.includes(rule.name)) {
        const additionalRuleValid = rule.valid(item);
        if (!additionalRuleValid) {
          validFields[item.name] = rule.text;
          hasErrors = true;
        }
      }
    });
  });
  return { validFields, hasErrors };
};

const checkEmptyFields = (filters) => {
  for(const field in filters) {
    if(filters[field]) {
      return false;
    }
  }
  return true;
};

export {
  checkEmptyFields,
};

export default fieldValidator;
