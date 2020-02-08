import React from 'react';

import { StepperProps, StepProps } from '.';

import classes from './Stepper.scss';

export const Stepper = ({ step, onStepChange, children }: StepperProps) => {
  const renderMarker = (idx: number, progress = 0) => {
    const isLast = idx !== React.Children.toArray(children).length - 1;
    const offsetRight = 100 - progress;

    return (
      isLast && (
        <div className={classes.marker}>
          <span
            className={classes.progress}
            style={{ transform: `translateX(-${offsetRight}%)` }}
          />
        </div>
      )
    );
  };

  const renderChildren = () => {
    if (!children) {
      return null;
    }

    return React.Children.map(
      children,
      (child: React.ReactElement<StepProps>, idx) => {
        if (React.isValidElement(child)) {
          const btnClasses = `${classes.step} ${
            step === idx ? classes.active : ''
          }`;

          const element = (
            <React.Fragment>
              <button
                className={btnClasses}
                title={child.props.title}
                onClick={() => onStepChange(idx)}
              >
                {React.cloneElement(child)}
              </button>

              {renderMarker(idx, child.props.progress)}
            </React.Fragment>
          );

          return element;
        }
      }
    );
  };

  return <section className={classes.root}>{renderChildren()}</section>;
};
