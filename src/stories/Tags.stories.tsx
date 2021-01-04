import React, { useCallback, useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { GreyBackground } from './style';

import { Tags } from 'ui';

export default {
  title: 'ui/Tags',
  component: Tags,
} as Meta;

const ITEMS = ['Tag1', 'Tag2', 'Tag3', 'Tag4', 'Tag5'];

export const Template: Story<any> = () => {
  const [items, setItems] = useState(ITEMS);

  const handleOnClick = useCallback(
    (e) => {
      setItems(items.filter((item) => item !== e.target.innerHTML));
    },
    [items]
  );

  return (
    <GreyBackground>
      <Tags items={items} onClick={handleOnClick} />
    </GreyBackground>
  );
};
