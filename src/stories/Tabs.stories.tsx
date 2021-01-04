import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Tabs, Logo } from 'ui';

export default {
  title: 'ui/Tabs',
  component: Tabs,
} as Meta;

const ACTIVE_TAB = 'Tab1';

export const Default: Story<any> = () => {
  const [tab, setTab] = useState(ACTIVE_TAB);

  return (
    <>
      <Tabs active={tab} onClick={setTab}>
        <>Tab1</>
        <>Tab2</>
        <>Tab3</>
      </Tabs>

      {tab === 'Tab1' && <h2>Tab1 content</h2>}
      {tab === 'Tab2' && <p>Tab2 content</p>}
      {tab === 'Tab3' && (
        <>
          <Logo /> Tab3 content
        </>
      )}
    </>
  );
};
