import React, { useState } from 'react';
import { UploadGreenButton } from './index';

export default {
  title: 'Hackney Design System/Form/Upload Green Button',
  component: UploadGreenButton,
  argTypes: {
    controls: false,
  },
};

const Template = (args) => {
  const [file, setFile] = useState(null);

  return <UploadGreenButton {...args} setFile={setFile} file={file} />;
}

export const Default = Template.bind({});
Default.args = {
  label: 'Upload green button'
};