import React, { useState } from 'react';
import Dialog from '.';
import { Button } from '../index';
import DialogLayout from './DialogLayout';

export default {
  title: 'Hackney Design System/Modal/Dialog',
  component: Dialog,
  argTypes: {
    text: 'string',
  },
};

const Template = (args) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Emit Dialog</Button>
      <Dialog noBorder={args.noBorder} isOpen={isOpen} onClose={() => setOpen(false)}>
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
  submitLabel: 'Yes, delete',
  declineLabel: 'No, cancel',
};

export const WithoutBorder = Template.bind({});

WithoutBorder.args = {
  title: 'Are you sure?',
  body: 'The record will be permanently deleted.',
  submitLabel: 'Yes, delete',
  declineLabel: 'No, cancel',
  noBorder: true,
};
