import React from 'react';
import Dropdown from './Dropdown';
import Input from './Input';
import { Button } from './Button';

/*
  EXAMPLE

  {
    inputs: {
      inputs: [
        {label: 'Search', placeholder: 'Search...', search: () => console.log('search for item'), className: 'mr-3'}
      ],
      dropdowns: [
        {options: [], initialText: 'Type of care', name: 'typeOfCare', className: 'mr-3'},
        {options: [], initialText: 'Stage', name: 'stage', className: 'mr-3'},
        {options: [], initialText: 'Social Worker', name: 'socialWorker', className: 'mr-3'},
        {options: [], initialText: 'Client', name: 'client', className: 'mr-3'},
      ],
    },
 */

const Inputs = ({ title, inputs, changeInputs, className = '', values }) => {
  const inputsComponent = [];
  Object.keys(inputs).forEach((key) => {
    // eslint-disable-next-line default-case
    switch (key) {
      case 'dropdowns': {
        inputs[key].forEach((item) => {
          inputsComponent.push(
            <Dropdown
              key={item.name}
              initialText={item.initialText}
              classes={item.className}
              options={item.options}
              selectedValue={values[item.name]}
              onOptionSelect={(option) => changeInputs(item.name, option)}
            />
          );
        });
        break;
      }
      case 'inputs': {
        inputs[key].forEach((item) => {
          inputsComponent.push(
            <Input
              key={item.name}
              classes={item.className}
              label={item.label}
              value={values[item.name]}
              search={item.search}
              placeholder={item.placeholder}
              onChange={(option) => changeInputs(item.name, option)}
            />
          );
        });
        break;
      }
      case 'buttons': {
        inputs[key].forEach((item) => {
          inputsComponent.push(
            <Button key={item.name} className={item.className} disabled={item.disabled} onClick={item.onClick}>
              {item.initialText}
            </Button>
          );
        });
      }
    }
  });

  return (
    <div className={`inputs-container ${className}`}>
      {title && <p className="inputs-container__title">{title}</p>}
      {inputsComponent}
    </div>
  );
};

export default Inputs;
