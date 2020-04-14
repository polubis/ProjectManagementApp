import React from 'react';

import { IconButton } from '@material-ui/core';

import { StepsProps } from '.';

import csx from './Steps.scss';

export const Steps = ({ activeStep, steps, onStepClick }: StepsProps) => {
  return (
    <nav className={csx.steps}>
      {steps.map(({ label, content }, idx) => (
        <div
          key={label}
          data-idx={idx}
          className={`${csx.stepWrapper} ${activeStep === idx ? csx.active : ''}`}
          onClick={onStepClick}
        >
          <div className={csx.step}>
            <IconButton>{content || idx + 1}</IconButton>
            <span>{label}</span>
          </div>
          {idx !== steps.length - 1 && (
            <svg className={csx.marker} width="100%" height="8">
              <line x1="100%" strokeWidth="8" />
            </svg>
          )}
        </div>
      ))}
    </nav>
  );
};
