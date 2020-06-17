import React from 'react';

import { StepsProps } from '.';

import csx from './Steps.scss';

export const Steps = ({ steps }: StepsProps) => {
  return (
    <nav className={csx.steps}>
      {steps.map(({ label, content, status, progress }, idx) => (
        <div key={label} className={`${csx.stepWrapper} ${status ? csx[status] : ''}`}>
          <div className={csx.step}>
            <div>{content || idx + 1}</div>
            <span>{label}</span>
          </div>
          {idx !== steps.length - 1 && (
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
