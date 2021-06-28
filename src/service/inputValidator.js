// inputs example
// [
//  {name: 'firstName', value: 'FirstName', rules: ['empty', 'firstName']}
//  {name: 'secondName', value: 'SecondName', rules: ['empty']}
//  {name: 'password', value: 'SoMePASS', rules: ['empty', 'password']}
// ]
const inputValidator = ({inputs = [], additionalRules = []}) => {
  const validFields = {};
  let hasErrors = false;
  inputs.forEach(item => {
    validFields[item.name] = [];
    if(item.rules.includes('empty')) {
      if(!item.value) {
        validFields[item.name].push('Required fields');
        hasErrors = true;
      }
    }

    // additionalRules EXAMPLE
    // [
    //  {name: 'firstName', valid: (item) => firstName.length > 3},
    //  {name: 'password', valid: (item) => password.length > 10}
    // ]
    additionalRules.forEach(rule => {
      if(item.rules.includes(rule.name)) {
        const additionalRuleValid = rule.valid(item);
        if(!additionalRuleValid) {
          validFields[item.name].push(additionalRuleValid);
          hasErrors = true;
        }
      }
    });
  })
  return { validFields, hasErrors };
}

export default inputValidator;
