import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Img } from 'ui';

export default {
  title: 'ui/Img',
  component: Img,
} as Meta;

const Template: Story<any> = (args) => {
  return (
    <Img
      src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
      size="120px:120px"
      {...args}
    />
  );
};

export const Default = Template.bind({});
Default.args = {};
