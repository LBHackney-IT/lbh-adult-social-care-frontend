import React from 'react';
import Announcement from '.';

export default {
  title: 'Hackney Design System/Announcement',
  component: Announcement,
  argTypes: {
    title: { type: 'string' },
    content: { type: 'string' },
    isWarning: { type: 'boolean' },
  },
};

const Template = (args) => <Announcement {...args} />;

export const Default = Template.bind({});

Default.args = {
  title: 'Announcement Title',
  children:
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
};

export const Warning = Template.bind({});

Warning.args = {
  title: 'Announcement Title',
  children:
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
  isWarning: true,
};
