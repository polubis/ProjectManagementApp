import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Alert } from 'ui';

export default {
  title: 'ui/Alert',
  component: Alert,
  argTypes: {
    message: { control: { disable: true } },
    type: { control: { disable: true } },
  },
} as Meta;

const Template: Story<any> = (args) => {
  return <Alert {...args} onClose={() => {}} />;
};

export const DefaultError = Template.bind({});
DefaultError.args = { message: `This is an alert of default type 'error'` };

export const Success = Template.bind({});
Success.args = { message: `This is an alert of type 'success'`, type: 'success' };

export const CustomDelay = Template.bind({});
CustomDelay.args = { message: `This is an alert of type 'success'`, type: 'success', delay: 1000 };
