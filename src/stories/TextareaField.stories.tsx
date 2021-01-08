import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { TextareaField } from 'ui';

export default {
  title: 'ui/TextareaField',
  component: TextareaField,
} as Meta;

const Template: Story<any> = (args) => {
  return <TextareaField {...args} />;
};

export const Default = Template.bind({});
Default.args = { label: 'This is label' };

export const WithError = Template.bind({});
WithError.args = { label: 'This is label', error: 'Oops, something went wrong.' };

export const WithInputPropsDisabled = Template.bind({});
WithInputPropsDisabled.args = { label: 'This is label', disabled: true };
