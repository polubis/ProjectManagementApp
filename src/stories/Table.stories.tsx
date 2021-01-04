import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { GreyBackground } from './style';

import { Table } from 'ui';

export default {
  title: 'ui/Table',
  component: Table,
} as Meta;

const CONFIG: Table.Config = {
  id: {
    size: {
      min: '60px',
      max: '60px',
    },
  },
  name: {
    size: {
      min: '200px',
      max: '200px',
    },
  },
  description: {
    size: {
      min: '300px',
      max: '1fr',
    },
  },
};

const DATA = [
  { id: 0, name: 'Sebastian', description: 'Great guy' },
  { id: 1, name: 'Bryan', description: 'Superb guy' },
  { id: 2, name: 'Jessica', description: 'Hot girl' },
];

const Template: Story<any> = (args) => {
  return (
    <GreyBackground style={{ width: '100%' }}>
      <Table config={CONFIG} data={DATA} {...args} />
    </GreyBackground>
  );
};

export const Default = Template.bind({});
Default.args = {};
