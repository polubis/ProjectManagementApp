import React from 'react';

import { IconButton } from '@material-ui/core';

import { StepsProps } from '.';

import csx from './Steps.scss';

export const Steps = ({ steps, onChange }: StepsProps) => {
  const handleStepClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onChange(+e.currentTarget.getAttribute('data-idx'));
  };

  return (
    <nav className={csx.steps}>
      {steps.map(({ label, content, status, progress }, idx) => (
        <div
          key={label}
          data-idx={idx}
          className={`${csx.stepWrapper} ${status ? csx[status] : ''}`}
          onClick={handleStepClick}
        >
          <div className={csx.step}>
            <IconButton>{content || idx + 1}</IconButton>
            <span>{label}</span>
          </div>
          {idx !== steps.length - 1 && (
            <svg className={csx.marker} width="100%" height="8">
              <line x1="100%" strokeWidth="8" />
              <line x1={`${progress}%`} strokeWidth="8" className={csx.markerValue} />
            </svg>
          )}
        </div>
      ))}
    </nav>
  );
};
