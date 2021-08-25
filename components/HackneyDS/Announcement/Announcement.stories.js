import React from 'react';
import Announcement from '.';

export default {
  title: 'Hackney Design System/Announcement',
  component: Announcement,
  argTypes: {
    header: { type: 'string' },
    content: { type: 'string' },
  },
};

const Template = (args) => (
  <Announcement {...args}>
    <div slot="title" style={{ margin: '0 30px' }}>
      {args?.header || 'Site-wide announcement'}
    </div>
    <div slot="content" style={{ margin: '0 30px' }}>
      {args?.content ||
        `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
      aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo
      enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.`}
    </div>
  </Announcement>
);

export const Default = Template.bind({});

Default.args = {
  children: (
    <>
      <div slot="title" style={{ margin: '0 30px' }}>
        Site-wide announcement
      </div>
      <div slot="content" style={{ margin: '0 30px' }}>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
        aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo
        enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
      </div>
    </>
  ).props.children,
};
