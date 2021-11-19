import React, { useState } from 'react';
import { SingleAccordion } from '.';

export default {
  title: 'Hackney Design System/Accordion/SingleAccordion',
  component: SingleAccordion,
  argTypes: {
    controls: false,
  },
};

const Template = (args) => {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <SingleAccordion {...args} isOpened={isOpened} onClick={() => setIsOpened(!isOpened)}>
      <p>Any content</p>
    </SingleAccordion>
  );
};

export const Default = Template.bind({});
Default.args = {};
