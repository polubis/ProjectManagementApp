import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { GreyBackground } from './style';

import { Checkbox } from 'ui';

export default {
  title: 'ui/Checkbox',
  component: Checkbox,
} as Meta;

const Template: Story<any> = (args) => {
  return <Checkbox {...args} />;
};

export const Default = Template.bind({});
Default.args = { label: 'Label' };

export const Informing: Story<any> = (args) => {
  return (
    <GreyBackground>
      <Checkbox label={'Informing'} variant="informing" {...args} />
    </GreyBackground>
  );
};

export const Invalid = Template.bind({});
Invalid.args = { invalid: true, label: 'Invalid' };
