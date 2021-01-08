import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { More } from 'ui';

export default {
  title: 'ui/More',
  component: More,
} as Meta;

export const Default: Story<any> = () => {
  return (
    <More>
      <div>
        <h2>Content</h2>
      </div>
    </More>
  );
};
