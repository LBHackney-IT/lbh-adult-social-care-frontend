import React from 'react';
import { Conversation } from '../index';

export default {
  title: 'Hackney Design System/Info Text/Conversation',
  component: Conversation,
  argTypes: {
    conversation: { type: 'array' },
    className: { type: 'string' },
  },
};

const Template = (args) => <Conversation {...args} />;

export const Default = Template.bind({});

Default.args = {
  conversation: [
    {
      createdAt: new Date(),
      message: 'Hello. It\'s time to schedule a review of your plan. Is some time in the next week good?',
      messageFromId: null,
      userName: 'User 1',
    },
    {
      createdAt: new Date(),
      message: 'Sure - how about five o clock on Tuesday?',
      messageFromId: 'id1-qwe',
      userName: 'User 2',
      inBound: true,
    },
    {
      createdAt: new Date(),
      message: "That's great. I'll give you a call then.",
      messageFromId: null,
      userName: 'User 1',
    }
  ],
  className: '',
};

export const WithoutDetails = Template.bind({});

WithoutDetails.args = {
  hasDetails: false,
  conversation: [
    {
      createdAt: new Date(),
      message: 'Hello. It\'s time to schedule a review of your plan. Is some time in the next week good?',
      messageFromId: null,
      userName: 'User 1',
    },
    {
      createdAt: new Date(),
      message: 'Sure - how about five o clock on Tuesday?',
      messageFromId: 'id1-qwe',
      userName: 'User 2',
      inBound: true,
    },
    {
      createdAt: new Date(),
      message: "That's great. I'll give you a call then.",
      messageFromId: null,
      userName: 'User 1',
    }
  ],
  className: '',
};