import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Logo } from 'ui';

export default {
  title: 'ui/Logo',
  component: Logo,
} as Meta;

const Template: Story<any> = () => {
  //THIS PATH PROP IS ONLY FOR STORYBOOK PURPOSES

  return <Logo path="/images" />;
};

export const Default = Template.bind({});
Default.args = {};
