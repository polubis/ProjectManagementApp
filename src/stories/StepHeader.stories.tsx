import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { StepHeader } from 'ui';

export default {
  title: 'ui/StepHeader',
  component: StepHeader,
} as Meta;

const LABEL = 'LABEL';
const DESCRIPTION = 'DESCRIPTION';

const Template: Story<any> = (args) => {
  return <StepHeader {...args} />;
};

export const Default = Template.bind({});
Default.args = { label: LABEL, description: DESCRIPTION };
