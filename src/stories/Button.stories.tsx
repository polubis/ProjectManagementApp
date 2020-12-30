import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import MessageIcon from '@material-ui/icons/Message';

import { Button } from 'ui';

export default {
  title: 'ui/Button',
  component: Button,
} as Meta;

const Template: Story<any> = (args) => {
  return <Button {...args}>{args.children}</Button>;
};

export const Default = Template.bind({});
Default.args = { children: 'Default' };

export const Disabled = Template.bind({});
Disabled.args = { children: 'Disabled', disabled: true };

export const Transparent = Template.bind({});
Transparent.args = { children: 'Transparent', theme: 'primaryTransparent' };

export const Danger = Template.bind({});
Danger.args = { children: 'Danger', theme: 'danger' };

export const Icon = Template.bind({});
Icon.args = { variant: 'icon', children: <MessageIcon /> };

export const IconTransparent = Template.bind({});
IconTransparent.args = { variant: 'icon', children: <MessageIcon />, theme: 'transparent' };

export const IconDanger = Template.bind({});
IconDanger.args = { variant: 'icon', children: <MessageIcon />, theme: 'danger' };
