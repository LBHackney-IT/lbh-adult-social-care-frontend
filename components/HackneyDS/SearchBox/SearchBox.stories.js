import React, { useEffect, useState } from 'react'
import { SearchBox } from '../index';

export default {
  title: 'Hackney Design System/Form/SearchBox',
  component: SearchBox,
  argTypes: {},
};

const Template = (args) => {
  const [value, setValue] = useState('');
  const clearFunc = () => setValue('');
  const localClear = args.clear && clearFunc;

  useEffect(() => {
    setValue(args.value);
  }, [args?.value]);

  return <SearchBox {...args} clear={localClear} value={value} onChangeValue={setValue} />;
}

export const Default = Template.bind({});
Default.args = {
  label: 'Search label',
  hint: 'Search hint',
  error: 'Search error',
  id: 'search',
  name: 'search',
  value: '',
  className: '',
  search: () => alert('Searching'),
  placeholder: 'Search...',
};

export const ClearButton = Template.bind({});
ClearButton.args = {
  label: 'Search label',
  hint: 'Search hint',
  error: 'Search error',
  id: 'search',
  value: 'clear me',
  clear: () => {},
  name: 'search',
  placeholder: 'Search...',
};