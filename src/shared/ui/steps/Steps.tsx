import React, { ReactNode } from 'react';

import { IconButton } from '@material-ui/core';

import csx from './Steps.scss';

namespace Steps {
  export interface Item {
    label: string;
    progress?: number;
    status?: boolean;
    content?: ReactNode;
  }

  export interface Props {
    items: Item[];
    onChange(item: number): void;
  }
}

const Steps = ({ items, onChange }: Steps.Props) => {
  const handleStepClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onChange(+e.currentTarget.getAttribute('data-idx'));
  };

  return (
    <nav className={csx.steps}>
      {items.map(({ label, content, status, progress }, idx) => (
        <div
          key={label}
          data-idx={idx}
          className={`${csx.stepWrapper} ${
            status === undefined ? '' : status ? csx.valid : csx.invalid
          }`}
          onClick={handleStepClick}
        >
          <div className={csx.step}>
            <IconButton>{content || idx + 1}</IconButton>
            <span>{label}</span>
          </div>
          {idx !== items.length - 1 && (
            <svg className={csx.marker} width="100%" height="8">
              <line x1="100%" strokeWidth="8" />
              {progress !== undefined && (
                <line x1={`${progress}%`} strokeWidth="8" className={csx.markerValue} />
              )}
            </svg>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Steps;
