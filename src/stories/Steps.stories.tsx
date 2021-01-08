import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Steps, Logo } from 'ui';

export default {
  title: 'ui/Steps',
  component: Steps,
} as Meta;

const STEPS_DEFAULT: Steps.Item[] = [{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }];
const STEPS_ACTIVE: Steps.Item[] = [...STEPS_DEFAULT, { label: 'ACTIVE', status: true }];
const STEPS_PROGRESS: Steps.Item[] = [
  { label: 'IN PROGRESS', status: true, progress: 50 },
  ...STEPS_DEFAULT,
];
const STEPS_CONTENT: Steps.Item[] = [{ label: 'With content', content: <Logo /> }];

const Template: Story<any> = (args) => {
  return <Steps {...args} />;
};

export const Default = Template.bind({});
Default.args = { steps: STEPS_DEFAULT };

export const Active = Template.bind({});
Active.args = { steps: STEPS_ACTIVE };

export const WithProgress = Template.bind({});
WithProgress.args = { steps: STEPS_PROGRESS };

export const WithContent = Template.bind({});
WithContent.args = { steps: STEPS_CONTENT };
