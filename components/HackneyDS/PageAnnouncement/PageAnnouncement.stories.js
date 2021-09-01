import React from 'react';
import PageAnnouncement from '.';

export default {
  title: 'Hackney Design System/PageAnnouncement',
  component: PageAnnouncement,
  argTypes: {
    warning: { type: 'boolean' },
    info: { type: 'boolean' },
  },
};

const Template = (args) => <PageAnnouncement {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: (
    <>
      <span slot="title">Page announcement</span>
      <span slot="content">More detail about the announcement.</span>
    </>
  ).props.children,
};

export const Warning = Template.bind({});

Warning.args = {
  children: (
    <>
      <span slot="title">Page announcement</span>
      <span slot="content">More detail about the announcement.</span>
    </>
  ).props.children,
  warning: true,
};

export const Info = Template.bind({});

Info.args = {
  children: (
    <>
      <span slot="title">Page announcement</span>
      <div slot="content">
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
          aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
        </p>
        <ul>
          <li>I am a list lorem ipsum dolor sit amet</li>
          <li>I am a list lorem ipsum dolor sit amet</li>
          <li>
            <a href="#">I am a link</a>
          </li>
        </ul>
      </div>
    </>
  ).props.children,
  info: true,
};
