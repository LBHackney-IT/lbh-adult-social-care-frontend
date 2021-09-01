import React, { useState } from 'react';
import Dialog from '.';
import { Button } from '../index';
import DialogLayout from './DialogLayout';

export default {
  title: 'Hackney Design System/Dialog',
  component: Dialog,
  argTypes: {
    text: 'string',
  },
};

const Template = (args) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <Button handler={() => setOpen(true)}>Emit Dialog</Button>
      <Dialog isOpen={isOpen} control={(e) => setOpen(e)}>
        <DialogLayout
          {...args}
          action={{
            submit() {
              alert('Submitted!');
              setOpen(false);
            },
            decline() {
              alert('Declined!');
              setOpen(false);
            },
          }}
        />
      </Dialog>
    </>
  );
};

export const Default = Template.bind({});

Default.args = {
  title: 'Are you sure?',
  body: 'The record will be permanently deleted.',
  'submit-label': 'Yes, delete',
  'decline-label': 'No, cancel',
};
