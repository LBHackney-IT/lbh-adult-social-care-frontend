import React from 'react';
import CareCharges from './index';

// export default {
//   title: 'Pages/Brokerage/CareCharges',
//   component: CareCharges,
//   argTypes: {
//     controls: null,
//   },
// };

const Template = (args) => <CareCharges {...args} />;

export const Default = Template.bind({});
Default.args = {
  reasonsCollecting: [
    { text: 'Reason-1', value: 'reason-1' },
    { text: 'Reason-2', value: 'reason-2' },
    { text: 'Reason-3', value: 'reason-3' },
  ]
};
