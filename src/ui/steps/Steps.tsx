import React, { ReactNode } from 'react';

import csx from './Steps.scss';

namespace Steps {
  export interface Item {
    label: string;
    progress?: number;
    status?: boolean;
    content?: ReactNode;
  }

  export interface Props {
    steps: Item[];
  }
}

const Steps = ({ steps }: Steps.Props) => {
  return (
    <nav className={csx.steps}>
      {steps.map(({ label, content, status, progress }, idx) => (
        <div
          key={label}
          data-idx={idx}
          className={`${csx.stepWrapper} ${
            status === undefined ? '' : status ? csx.valid : csx.invalid
          }`}
        >
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

export default Steps;
