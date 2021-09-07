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
    { key: 'Name', value: 'First Name', actions: [ { name: 'Edit' }, { name: 'Delete'} ]},
    { key: 'Date of birth', value: '13/08/1980', actions: [ { name: 'Change'} ]},
    {
      key: 'Contact information',
      value: ['email@email.com', 'Address 1', 'Address 2'],
      actions: [ { name: 'Edit' }, { name: 'Change'}]
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
    { key: 'Name', value: 'First Name', actions: [ { name: 'Edit' }, { name: 'Delete'} ] },
    { key: 'Date of birth', value: '13/08/1980' },
    { key: 'Contact information', value: ['email@email.com', 'Address 1', 'Address 2'] },
  ],
};

export const NoBorder = Template.bind({});
NoBorder.args = {
  noBorder: true,
  summaryList: [
    { key: 'Name', value: 'First Name', actions: [ { name: 'Edit' }, { name: 'Delete'} ] },
    { key: 'Date of birth', value: '13/08/1980' },
    { key: 'Contact information', value: ['email@email.com', 'Address 1', 'Address 2'] },
  ],
};

export const NoBorderCustomRow = Template.bind({});
NoBorderCustomRow.args = {
  summaryList: [
    { key: 'Name', value: 'First Name', actions: [ { name: 'Edit' }, { name: 'Delete'} ] },
    { key: 'Date of birth', value: '13/08/1980' },
    { key: 'Contact information', noRowBorder: true, value: ['email@email.com', 'Address 1', 'Address 2'] },
  ],
};

export const CustomActionHandler = Template.bind({});
CustomActionHandler.args = {
  summaryList: [
    { key: 'Name', value: 'First Name', actions: [ { name: 'Edit', handler: () => alert('Edit') }, { name: 'Delete', handler: () => alert('Delete')} ] },
    { key: 'Date of birth', value: '13/08/1980' },
    { key: 'Contact information', noRowBorder: true, value: ['email@email.com', 'Address 1', 'Address 2'] },
  ],
};

export const OverriddenWidths = Template.bind({});
OverriddenWidths.args = {
  summaryList: [
    {
      key: 'Name',
      keyClassName: 'govuk-!-width-one-half',
      valueClassName: 'govuk-!-width-one-quarter',
      actionsClassName: 'govuk-!-width-one-half',
      value: 'First Name',
      actions: [ { name: 'Edit' }, { name: 'Delete'} ]
    },
    {
      keyClassName: 'govuk-!-width-one-half',
      valueClassName: 'govuk-!-width-one-quarter',
      actionsClassName: 'govuk-!-width-one-half',
      key: 'Date of birth',
      value: '13/08/1980'
    },
    {
      keyClassName: 'govuk-!-width-one-half',
      valueClassName: 'govuk-!-width-one-quarter',
      actionsClassName: 'govuk-!-width-one-half',
      key: 'Contact information',
      noBorderRow: true,
      value: ['email@email.com', 'Address 1', 'Address 2']
    },
  ],
};
