import React from 'react';
import { Tip } from './index';

export default {
  title: 'Hackney Design System/Tip',
  component: Tip,
  argTypes: {
    interactive: { control: false },
    content: { control: false },
    children: { control: false },
  },
};

const Template = (args) => <div style={{width: '50%', display: 'flex'}}><Tip light {...args} /></div>;

export const Default = Template.bind({});
Default.args = {
  children: <p>Hello Tip</p>,
  content: (
    <>
      <h3 className="lbh-heading-h4">Jane Smith</h3>
      <p className="lbh-body-xs">Born 27 Oct 2009 (age 12)</p>
      <p className="lbh-body-xs">Referred 8 Nov 2019</p>
    </>
  ),
};

export const Interactive = Template.bind({});
Interactive.args = {
  children: <p>Hello Tip</p>,
  interactive: true,
  content: (
    <div className='text-align-left'>
      <h3 className="lbh-heading-h4">
        <a href="#" className="lbh-link lbh-link--no-visited-state">
          Jane Smith
        </a>
      </h3>
      <p className="lbh-body-xs">Born 27 Oct 2009 (age 12)</p>
      <p className="lbh-body-xs">Referred 8 Nov 2019</p>
    </div>
  ),
};