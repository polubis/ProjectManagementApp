import React, { FC, ReactNode } from 'react';

import csx from './SectionLayout.scss';

interface Props {
  className?: string;
  children: ReactNode;
  title: string;
}

const SectionLayout: FC<Props> = ({ children, className, title }) => {
  return (
    <section className={`${csx.sectionLayout} ${className}`}>
      <h3>{title}</h3>
      {children}
    </section>
  );
};

SectionLayout.defaultProps = {
  className: '',
};

export default SectionLayout;
