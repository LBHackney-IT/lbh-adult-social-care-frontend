import React, { useState } from 'react';
import RadioGroup from './index';

export default {
  title: 'Hackney Design System/RadioGroup',
  component: RadioGroup,
  argTypes: {},
};

const Template = (args) => {
  const [value, setValue] = useState(args.value || 'item1');
  const [conditions, setConditions] = useState({
    phone: '8-800',
    email: 'test@mail.ru',
  });

  const changeConditions = (field, newValue) => {
    setConditions((prevState) => ({
      ...prevState,
      [field]: newValue,
    }));
  };

  const items = args.items[0]?.condition
    ? [
        {
          id: 'item1',
          label: 'Email',
          condition: {
            id: 'condition1',
            label: 'Email',
            type: 'email',
            value: conditions.email,
            handle: (newValue) => changeConditions('email', newValue),
          },
        },
        {
          id: 'item2',
          label: 'Phone',
          condition: {
            id: 'condition2',
            label: 'Phone Number',
            error: 'Wrong phone number',
            type: 'tel',
            value: conditions.phone,
            handle: (newValue) => changeConditions('phone', newValue),
          },
        },
        { id: 'item3', label: 'Item 3' },
      ]
    : args.items;

  const handle = (name) => {
    setValue(name);
  };

  return <RadioGroup {...args} handle={handle} value={value} items={items} />;
};

export const Default = Template.bind({});
Default.args = {
  name: 'radioGroup',
  items: [
    { id: 'item1', label: 'Item 1' },
    { id: 'item2', label: 'Item 2' },
    { id: 'item3', label: 'Item 3' },
  ],
  className: '',
};

export const HintRadioItem = Template.bind({});
HintRadioItem.args = {
  name: 'radioGroup',
  items: [
    { id: 'item1', label: 'Item 1' },
    { id: 'item2', label: 'Item 2', hint: 'Hint item 2' },
    { id: 'item3', label: 'Item 3' },
  ],
  className: '',
};

export const DisabledRadio = Template.bind({});
DisabledRadio.args = {
  name: 'radioGroup',
  items: [
    { id: 'item1', label: 'Item 1' },
    { id: 'item2', disabled: true, label: 'Item 2' },
    { id: 'item3', label: 'Item 3' },
  ],
};

export const Divider = Template.bind({});
Divider.args = {
  name: 'radioGroup',
  items: [
    { id: 'item1', label: 'Item 1' },
    { id: 'divider1', divider: 'I am divider' },
    { id: 'item2', label: 'Item 2' },
    { id: 'item3', label: 'Item 3' },
  ],
};

export const AllFieldsetAttributes = Template.bind({});
AllFieldsetAttributes.args = {
  error: 'Error',
  label: 'Label',
  hint: 'Hint',
  name: 'radioGroup',
  items: [
    { id: 'item1', label: 'Item 1' },
    { id: 'item2', label: 'Item 2' },
    { id: 'item3', label: 'Item 3' },
  ],
};

export const ConditionComponent = Template.bind({});
ConditionComponent.args = {
  label: 'Label',
  name: 'radioGroup',
  items: [
    {
      id: 'item1',
      label: 'Email',
      condition: {
        id: 'condition1',
        label: 'Email',
        type: 'email',
        value: 'test@mail.ru',
        handle: (value) => console.log(value),
      },
    },
    {
      id: 'item2',
      label: 'Phone',
      condition: {
        id: 'condition2',
        label: 'Phone Number',
        error: 'Wrong phone number',
        type: 'tel',
        value: '8-800',
        handle: (value) => console.log(value),
      },
    },
    { id: 'item3', label: 'Item 3' },
  ],
};

export const RadioGroupSmall = Template.bind({});
RadioGroupSmall.args = {
  label: 'Label',
  small: true,
  name: 'radioGroup',
  items: [
    { id: 'item1', label: 'Email' },
    { id: 'item2', label: 'Phone' },
    { id: 'item3', label: 'Item 3' },
  ],
};
