import React from 'react';
import { BrokerPackage } from './index';

// export default {
//   title: 'Pages/Brokerage/BrokerPackage',
//   component: BrokerPackage,
//   argTypes: {
//     controls: null,
//   },
// };

const Template = (args) => <BrokerPackage {...args} />;

export const Default = Template.bind({});
Default.args = {
  searchResults: {
    totalCount: 12,
    totalPages: 2,
    items: [
      {
        id: 123456789,
        name: 'Bupa',
        address: '15 Atherden Rd, Lower Clapton, London E5 0QP',
        sites: [
          {
            id: 1234567891,
            name: 'Bupa Care Home Luke Centre Site 1',
            address: '15 Atherden Rd, Lower Clapton, London E5 0QP',
          },
          {
            id: 1234567892,
            name: 'Bupa Care Home Luke Centre Site 1',
            address: '15 Atherden Rd, Lower Clapton, London E5 0QP',
          },
          {
            id: 1234567893,
            name: 'Bupa Care Home Luke Centre Site 1',
            address: '15 Atherden Rd, Lower Clapton, London E5 0QP',
          },
        ]
      },
      {
        id: 223456789,
        name: 'Bupa',
        address: '15 Atherden Rd, Lower Clapton, London E5 0QP',
      },
      {
        id: 323456789,
        name: 'Bupa',
        address: '15 Atherden Rd, Lower Clapton, London E5 0QP',
      },
      {
        id: 423456789,
        name: 'Bupa',
        address: '15 Atherden Rd, Lower Clapton, London E5 0QP',
        sites: [
          {
            id: 4234567891,
            name: 'Bupa',
            address: '15 Atherden Rd, Lower Clapton, London E5 0QP',
          },
          {
            id: 4234567892,
            name: 'Bupa',
            address: '15 Atherden Rd, Lower Clapton, London E5 0QP',
          },
          {
            id: 4234567893,
            name: 'Bupa',
            address: '15 Atherden Rd, Lower Clapton, London E5 0QP',
          },
        ]
      },
      {
        id: 523456789,
        name: 'Bupa',
        address: '15 Atherden Rd, Lower Clapton, London E5 0QP',
        sites: [
          {
            id: 5234567891,
            name: 'Bupa',
            address: '15 Atherden Rd, Lower Clapton, London E5 0QP',
          },
        ]
      },
    ]
  }
};
