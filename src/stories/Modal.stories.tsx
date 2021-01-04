import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { GreyBackground } from './style';

import { Modal, Button } from 'ui';

export default {
  title: 'ui/Modal',
  component: Modal,
} as Meta;

export const Default: Story<any> = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>

      {open && (
        <Modal onClose={() => setOpen(false)}>
          <GreyBackground>
            <div>
              <h2>Content</h2>
              <h2>Content</h2>
              <h2>Content</h2>
              <h2>Content</h2>
            </div>
          </GreyBackground>
        </Modal>
      )}
    </>
  );
};
