import React from "react";
import Dropdown from "./Dropdown";
import Input from "./Input";

const Inputs = ({ title, inputs, changeInputs, className = '', values }) => {
  const inputsComponent = [];
  Object.keys(inputs).forEach(key => {
    switch (key) {
      case 'dropdowns': {
        inputs[key].forEach(item => {
          inputsComponent.push(
            <Dropdown
              initialText={item.initialText}
              classes={item.className}
              options={item.options}
              selectedValue={values[item.name]}
              onOptionSelect={(option) => changeInputs(item.name, option)}
            />
          )
        })
        break;
      }
      case 'inputs': {
        inputs[key].forEach(item => {
          inputsComponent.push(<Input
            classes={item.className}
            label={item.label}
            value={values[item.name]}
            search={item.search}
            placeholder={item.placeholder}
            onChange={(option) => changeInputs(item.name, option)}
          />)
        })
        break;
      }
    }
  })

  return (
    <div className={`${className} inputs-container`}>
      {title && <p className='inputs-container__title'>{title}</p>}
      {inputsComponent}
    </div>
  )
};

export default Inputs;
