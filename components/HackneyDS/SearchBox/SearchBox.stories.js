import React, { useState } from 'react'
import { SearchBox } from '../index';

export default {
  title: 'Hackney Design System/SearchBox',
  component: SearchBox,
  argTypes: {},
};

const Template = (args) => {
  const [value, setValue] = useState('');
  const clearFunc = () => setValue('');
  const localClear = args.clear && clearFunc;

  return <SearchBox {...args} clear={localClear} value={value} handler={setValue} />;
}

export const Default = Template.bind({});
Default.args = {
  label: 'Search',
  id: 'search',
  name: 'search',
  className: '',
  search: () => alert('Searching'),
  placeholder: 'Search...',
};

export const ClearButton = Template.bind({});
ClearButton.args = {
  label: 'Search',
  id: 'search',
  clear: () => {},
  name: 'search',
  placeholder: 'Search...',
};