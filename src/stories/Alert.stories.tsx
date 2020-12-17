import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Alert } from 'ui';

export default {
  title: 'ui/Alert',
  component: Alert,
} as Meta;

const Template: Story<any> = (args) => {
  return <Alert message="msg" onClose={() => {}} />;
};

export const Default = Template.bind({});
Default.args = {};
