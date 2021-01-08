import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { GreyBackground } from './style';

import { Disclaimer } from 'ui';

export default {
  title: 'ui/Disclaimer',
  component: Disclaimer,
} as Meta;

const Template: Story<any> = (args) => {
  return (
    <GreyBackground>
      <Disclaimer {...args}>{args.children}</Disclaimer>
    </GreyBackground>
  );
};

export const Default = Template.bind({});
Default.args = { title: 'title', description: 'description' };

export const WithChildren = Template.bind({});
WithChildren.args = { title: 'title', description: 'description', children: 'Children' };
