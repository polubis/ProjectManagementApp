import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { DatePicker } from 'ui';

export default {
  title: 'ui/DatePicker',
  component: DatePicker,
} as Meta;

const Template: Story<any> = (args) => {
  const [date, setDate] = useState(args.initDate);

  return <DatePicker {...args} value={date} onSave={setDate} />;
};

export const Default = Template.bind({});
Default.args = {};
