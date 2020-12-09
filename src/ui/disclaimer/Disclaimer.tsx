import React from 'react';

import { Button } from '..';

import csx from './Disclaimer.scss';

namespace Disclaimer {
  export interface Props {
    className?: string;
    children?: React.ReactElement;
    description: string;
    title: string;
  }
}

const Disclaimer = ({
  className = '',
  children = null,
  description,
  title,
}: Disclaimer.Props): JSX.Element => (
  <div className={`${csx.disclaimer} ${className}`}>
    <h3>{title}</h3>
    <span>{description}</span>
    {children}
  </div>
);

Disclaimer.NoContent = (props: Omit<Disclaimer.Props, 'children'>): JSX.Element => (
  <Disclaimer {...props} />
);

Disclaimer.Error = ({
  onRetry,
  ...props
}: Omit<Disclaimer.Props, 'children' | 'className'> & { onRetry(): void }): JSX.Element => (
  <Disclaimer {...props} className={csx.error}>
    <Button onClick={onRetry}>TRY AGAIN</Button>
  </Disclaimer>
);

export default Disclaimer;
