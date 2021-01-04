import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { GreyBackground } from './style';

import { Tag } from 'ui';

export default {
  title: 'ui/Tag',
  component: Tag,
} as Meta;

const Template: Story<any> = (args) => {
  return (
    <GreyBackground>
      <Tag {...args} onClick={() => alert('Triggered onClick')} />
    </GreyBackground>
  );
};

export const Default = Template.bind({});
Default.args = { label: 'Tag label' };
