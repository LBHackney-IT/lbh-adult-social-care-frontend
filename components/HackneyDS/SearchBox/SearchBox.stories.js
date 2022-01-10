import React, { useEffect, useState } from 'react';
import { SearchBox } from '../index';

export default {
  title: 'Hackney Design System/SearchBox',
  component: SearchBox,
  argTypes: {},
};

const Template = (args) => {
  const [value, setValue] = useState('');
  const clearFunc = () => setValue('');
  //  eslint-disable-next-line react/destructuring-assignment
  const localClear = args.clear && clearFunc;

  useEffect(() => {
    //  eslint-disable-next-line react/destructuring-assignment
    setValue(args.value);
    //  eslint-disable-next-line react/destructuring-assignment
  }, [args?.value]);

  return <SearchBox {...args} clear={localClear} value={value} onChangeValue={setValue} />;
};

export const Default = Template.bind({});
Default.args = {
  label: 'Search label',
  hint: 'Search hint',
  error: 'Search error',
  id: 'search',
  name: 'search',
  value: '',
  className: '',
  search: () => console.log('Searching'),
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
