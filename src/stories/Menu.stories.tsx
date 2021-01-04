import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Menu, useMenu, Button } from 'ui';

export default {
  title: 'ui/Menu',
  component: Menu,
} as Meta;

const PAPER_PROPS = {
  style: {
    transform: 'translateX(50%) translateY(50%)',
  },
};

const BACKGROUND = 'yellow';

const BOX_SHADOW = '10px 10px 15px pink';

const Template: Story<any> = (args) => {
  const [anchorEl, menuOpen, openMenu, closeMenu] = useMenu();

  return (
    <>
      <h2>
        Anchor Origin: Vertical -
        {args.anchorOrigin?.vertical ? args.anchorOrigin.vertical : 'bottom'} Horizontal -
        {args.anchorOrigin?.horizontal ? args.anchorOrigin.horizontal : 'right'}
      </h2>

      <h2 style={{ marginBottom: 200 }}>
        Anchor Origin: Vertical -
        {args.transformOrigin?.vertical ? args.transformOrigin.vertical : 'top'} Horizontal -
        {args.transformOrigin?.horizontal ? args.transformOrigin.horizontal : 'right'}
      </h2>

      <Button onClick={openMenu}>{args.text ? args.text : 'Press to open menu'}</Button>

      {menuOpen && (
        <Menu anchorEl={anchorEl} onClose={closeMenu} {...args}>
          <h2>Sample menu</h2>
          <p>This is menu content</p>
        </Menu>
      )}
    </>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const WithWidthSet = Template.bind({});
WithWidthSet.args = { width: 500 };

export const WithPaperProps = Template.bind({});
WithPaperProps.args = { PaperProps: PAPER_PROPS };

export const WithBackground = Template.bind({});
WithBackground.args = { background: BACKGROUND };

export const WithBoxShadow = Template.bind({});
WithBoxShadow.args = { boxShadow: BOX_SHADOW };

export const AnchorBottomLeft = Template.bind({});
AnchorBottomLeft.args = {
  anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
  text: 'V: Bottom H: Left',
};

export const AnchorBottomCenter = Template.bind({});
AnchorBottomCenter.args = {
  anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
  text: 'V: Bottom H: Center',
};

export const AnchorCenterRight = Template.bind({});
AnchorCenterRight.args = {
  anchorOrigin: { vertical: 'center', horizontal: 'right' },
  text: 'V: Center H: Right',
};

export const AnchorCenterLeft = Template.bind({});
AnchorCenterLeft.args = {
  anchorOrigin: { vertical: 'center', horizontal: 'left' },
  text: 'V: Center H: Left',
};

export const AnchorCenterCenter = Template.bind({});
AnchorCenterCenter.args = {
  anchorOrigin: { vertical: 'center', horizontal: 'center' },
  text: 'V: Center H: Center',
};

export const AnchorTopRight = Template.bind({});
AnchorTopRight.args = {
  anchorOrigin: { vertical: 'top', horizontal: 'right' },
  text: 'V: Top H: Right',
};

export const AnchorTopLeft = Template.bind({});
AnchorTopLeft.args = {
  anchorOrigin: { vertical: 'top', horizontal: 'left' },
  text: 'V: Top H: Left',
};

export const AnchorTopCenter = Template.bind({});
AnchorTopCenter.args = {
  anchorOrigin: { vertical: 'top', horizontal: 'center' },
  text: 'V: Top H: Center',
};

//////////////////////////////////////

export const TransformBottomRight = Template.bind({});
TransformBottomRight.args = {
  transformOrigin: { vertical: 'bottom', horizontal: 'right' },
  text: 'V: Bottom H: Right',
};

export const TransformBottomLeft = Template.bind({});
TransformBottomLeft.args = {
  transformOrigin: { vertical: 'bottom', horizontal: 'left' },
  text: 'V: Bottom H: Left',
};

export const TransformBottomCenter = Template.bind({});
TransformBottomCenter.args = {
  transformOrigin: { vertical: 'bottom', horizontal: 'center' },
  text: 'V: Bottom H: Center',
};

export const TransformCenterRight = Template.bind({});
TransformCenterRight.args = {
  transformOrigin: { vertical: 'center', horizontal: 'right' },
  text: 'V: Center H: Right',
};

export const TransformCenterLeft = Template.bind({});
TransformCenterLeft.args = {
  transformOrigin: { vertical: 'center', horizontal: 'left' },
  text: 'V: Center H: Left',
};

export const TransformCenterCenter = Template.bind({});
TransformCenterCenter.args = {
  transformOrigin: { vertical: 'center', horizontal: 'center' },
  text: 'V: Center H: Center',
};

export const TransformTopLeft = Template.bind({});
TransformTopLeft.args = {
  transformOrigin: { vertical: 'top', horizontal: 'left' },
  text: 'V: Top H: Left',
};

export const TransformTopCenter = Template.bind({});
TransformTopCenter.args = {
  transformOrigin: { vertical: 'top', horizontal: 'center' },
  text: 'V: Top H: Center',
};
