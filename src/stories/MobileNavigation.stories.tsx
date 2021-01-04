import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { MobileNavigation } from 'ui';

export default {
  title: 'ui/MobileNavigation',
  component: MobileNavigation,
} as Meta;

const Template: Story<any> = (args) => {
  return (
    <>
      <h2>Resize window to see menu</h2>

      <MobileNavigation {...args}>
        <h2>Content</h2>
        <h2>Content</h2>
        <h2>Content</h2>
        <h2>Content</h2>
      </MobileNavigation>
    </>
  );
};

export const DefaultMobile = Template.bind({});
DefaultMobile.args = {};

export const DefaultTablet = Template.bind({});
DefaultTablet.args = { viewport: 'tablet' };
