import React from 'react';
import { Select, Timeline } from '../index';

export default {
  title: 'Hackney Design System/Info Text/Timeline',
  component: Timeline,
  argTypes: {
    timelines: { type: 'array' },
    className: { type: 'string' },
  },
};

const Template = (args) => <Timeline {...args} />;

export const Default = Template.bind({});

Default.args = {
  timelines: [
    { header: { text: 'With link button' }, innerElements: [ { text: 'First paragraph' }, { text: 'Continue', link: '#' }]},
    {
      header: { text: 'With action needed' },
      actionNeeded: true,
      innerElements: [ { text: 'First paragraph' }, { text: 'Continue', link: '#' }],
    },
    { header: { text: 'Component as props' }, innerElements: [ { component: <Select /> }, { text: 'The end' }]},
    { header: { text: 'With gap bellow' }, gapBelow: true, innerElements: [ { text: 'Boring text' }]},
    { header: { text: 'With major class' }, major: true, innerElements: [ { text: 'Major text' }]},
    { header: { text: 'With minor class' }, minor: true, innerElements: [ { text: 'Minor text' }]},
    { header: { text: 'Header link', link: '#'}, innerElements: [ { text: 'Minor text' }]},
    {
      header: { text: 'With rewrite class', rewriteClass: 'lbh-heading-h4' },
      innerElements: [ { text: 'Own class', rewriteClass: 'lbh-body-s' }]
    },
  ],
  className: '',
};