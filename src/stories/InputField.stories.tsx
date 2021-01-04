import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { InputField } from 'ui';

export default {
  title: 'ui/InputField',
  component: InputField,
} as Meta;

const Template: Story<any> = (args) => {
  return <InputField {...args} />;
};

export const Default = Template.bind({});
Default.args = {};

export const WithLabel = Template.bind({});
WithLabel.args = { label: 'This is input label' };

export const WithError = Template.bind({});
WithError.args = { label: 'This is input label', error: 'Oops, an error occured' };
