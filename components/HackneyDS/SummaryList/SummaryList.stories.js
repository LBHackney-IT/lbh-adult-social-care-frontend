import React from 'react';
import { SummaryList } from '.';

export default {
  title: 'Hackney Design System/SummaryList',
  component: SummaryList,
  argTypes: {
    noBorder: {
      type: 'boolean',
    },
  },
};

const Template = (args) => <SummaryList {...args} />;

export const Default = Template.bind({});
Default.args = {
  summaryList: [
    { key: 'Name', value: 'First Name', actions: [{ name: 'Edit' }, { name: 'Delete' }] },
    { key: 'Date of birth', value: '13/08/1980', actions: [{ name: 'Change' }] },
    {
      key: 'Contact information',
      value: ['email@email.com', 'Address 1', 'Address 2'],
      actions: [{ name: 'Edit' }, { name: 'Change' }],
    },
  ],
};

export const WithoutActions = Template.bind({});
WithoutActions.args = {
  summaryList: [
    { key: 'Name', value: 'First Name' },
    { key: 'Date of birth', value: '13/08/1980' },
    { key: 'Contact information', value: ['email@email.com', 'Address 1', 'Address 2'] },
  ],
};

export const WithSomeActions = Template.bind({});
WithSomeActions.args = {
  summaryList: [
    { key: 'Name', value: 'First Name', actions: [{ name: 'Edit' }, { name: 'Delete' }] },
    { key: 'Date of birth', value: '13/08/1980' },
    { key: 'Contact information', value: ['email@email.com', 'Address 1', 'Address 2'] },
  ],
};

export const NoBorder = Template.bind({});
NoBorder.args = {
  noBorder: true,
  summaryList: [
    { key: 'Name', value: 'First Name', actions: [{ name: 'Edit' }, { name: 'Delete' }] },
    { key: 'Date of birth', value: '13/08/1980' },
    { key: 'Contact information', value: ['email@email.com', 'Address 1', 'Address 2'] },
  ],
};

export const NoBorderCustomRow = Template.bind({});
NoBorderCustomRow.args = {
  summaryList: [
    { key: 'Name', value: 'First Name', actions: [{ name: 'Edit' }, { name: 'Delete' }] },
    { key: 'Date of birth', value: '13/08/1980' },
    { key: 'Contact information', noRowBorder: true, value: ['email@email.com', 'Address 1', 'Address 2'] },
  ],
};

export const CustomActionHandler = Template.bind({});
CustomActionHandler.args = {
  summaryList: [
    {
      key: 'Name',
      value: 'First Name',
      actions: [
        { name: 'Edit', handler: () => console.log('Edit') },
        { name: 'Delete', handler: () => console.log('Delete') },
      ],
    },
    { key: 'Date of birth', value: '13/08/1980' },
    { key: 'Contact information', noRowBorder: true, value: ['email@email.com', 'Address 1', 'Address 2'] },
  ],
};

export const OverriddenWidths = Template.bind({});
OverriddenWidths.args = {
  summaryList: [
    {
      key: 'Name',
      keyClassName: 'width-50',
      valueClassName: 'width-25',
      actionsClassName: 'width-50',
      value: 'First Name',
      actions: [{ name: 'Edit' }, { name: 'Delete' }],
    },
    {
      keyClassName: 'width-50',
      valueClassName: 'width-25',
      actionsClassName: 'width-50',
      key: 'Date of birth',
      value: '13/08/1980',
    },
    {
      keyClassName: 'width-50',
      valueClassName: 'width-25',
      actionsClassName: 'width-50',
      key: 'Contact information',
      noBorderRow: true,
      value: ['email@email.com', 'Address 1', 'Address 2'],
    },
  ],
};
