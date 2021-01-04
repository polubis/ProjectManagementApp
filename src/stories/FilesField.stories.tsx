import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { FilesField } from 'ui';

export default {
  title: 'ui/FilesField',
  component: FilesField,
} as Meta;

const FORMATS = 'png, jpeg';

const Template: Story<any> = (args) => {
  const [file, setFile] = useState<FilesField.LoadedFile[]>([]);

  return <FilesField formats={FORMATS} value={file} onChange={setFile} {...args} />;
};

export const Default = Template.bind({});
Default.args = {};

export const WithLabel = Template.bind({});
WithLabel.args = { label: 'Add an image' };

export const WithError = Template.bind({});
WithError.args = { label: 'Add an image', error: 'Oops, an error occured' };
