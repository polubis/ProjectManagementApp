import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { DateField } from 'ui';

export default {
  title: 'ui/DateField',
  component: DateField,
} as Meta;

const INIT_DATE = '01/01/2020';

const Template: Story<any> = (args) => {
  const [value, setValue] = useState(args.initDate);

  return <DateField {...args} value={value} onSelect={setValue} />;
};

export const Default = Template.bind({});
Default.args = { label: 'Choose your birthdate' };

export const WithInitialDate = Template.bind({});
WithInitialDate.args = { label: 'Choose your birthdate', initDate: INIT_DATE };

export const WithError = Template.bind({});
WithError.args = { label: 'Choose your birthdate', error: 'Something went wrong' };
