import React from 'react';
import { usePortal } from 'utils';

import csx from './Toolbar.scss';

const items = [
  'Carousel',
  'Content grid',
  'Activity Feed',
  'Other element',
  'Other element 2',
  'Other element 3',
  'Other element 3',
  'Other element 4',
  'Other element 5',
  'Other element 6'
];

interface Props {
  children: any[];
}

const Toolbar = ({ children }) => {
  const render = usePortal();

  return render(
    <div className={csx.toolbar}>
      <div className={csx.heading}>
        <p>Widget Toolbar</p>
        <span>Drag a widget into your page template</span>
      </div>

      <div className={csx.slider}>{children}</div>
    </div>
  );
};

export default Toolbar;
