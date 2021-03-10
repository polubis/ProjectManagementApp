import React, { Component, CSSProperties } from 'react';
import { Subscription, Subject, fromEvent, Observable } from 'rxjs';
import { tap, takeUntil, concatMap, map } from 'rxjs/operators';

import { TRIGGER_TYPES } from './consts';
import { ResizeTrigger } from './models';

import csx from './GridItemResizer.scss';

interface State {
  style: CSSProperties;
  resizing: boolean;
  trigger: null | ResizeTrigger;
}

interface Cords {
  x: number;
  y: number;
}

const createCords = (e: React.MouseEvent<unknown, MouseEvent>): Cords => ({
  x: e.clientX,
  y: e.clientY,
});

const STYLE: CSSProperties = {
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
};

class GridItemResizer extends Component<any, State> {
  private _subs = new Subscription();

  private _start = new Subject<React.MouseEvent<HTMLDivElement, MouseEvent>>();
  private _start$ = this._start.asObservable();

  private _stop = new Subject<React.MouseEvent<HTMLDivElement, MouseEvent>>();
  private _stop$ = this._stop.asObservable();

  private _documentClick$ = (fromEvent(document, 'click') as unknown) as Observable<
    React.MouseEvent<HTMLDocument, MouseEvent>
  >;

  private _mouseMove$ = (fromEvent(document, 'mousemove') as unknown) as Observable<
    React.MouseEvent<HTMLDocument, MouseEvent>
  >;

  readonly state: State = {
    style: STYLE,
    resizing: false,
    trigger: null,
  };

  private _getDistance = (startCords: Cords, stopCords: Cords): number => {
    const distance = Math.abs(startCords.x - stopCords.x);
    return distance;
  };

  componentDidMount(): void {
    const initResizing = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
      const trigger = e.currentTarget.dataset.trigger as ResizeTrigger;
      this.setState({ resizing: true, trigger });
    };

    const start$ = this._start$.pipe(
      tap(initResizing),
      map(createCords),
      concatMap((startCords) =>
        this._mouseMove$.pipe(
          map(createCords),
          tap((moveCords) => {
            const distance = Math.abs(startCords.x - moveCords.x);
            const width = `calc(100% + ${distance}px)`;
            this.setState((prevState) => ({
              ...prevState,
              style: {
                ...prevState.style,
                width,
              },
            }));
          }),
          takeUntil(
            this._documentClick$.pipe(
              map(createCords),
              tap((stopCords) => {
                // FINISH CALCULATIONS
                console.log(this._getDistance(startCords, stopCords));
                this.setState({ style: STYLE, resizing: false });
              })
            )
          ),
          takeUntil(
            this._stop$.pipe(
              map(createCords),
              tap((stopCords) => {
                console.log(this._getDistance(startCords, stopCords));
                this.setState({ style: STYLE, resizing: false });
              })
            )
          )
        )
      )
    );

    this._subs.add(start$.subscribe());
  }

  componentWillUnmount(): void {
    this._subs.unsubscribe();
  }

  handleStart = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    e.stopPropagation();

    if (this.state.resizing) {
      this._stop.next(e);
    } else {
      this._start.next(e);
    }
  };

  render = (): JSX.Element => {
    const { style } = this.state;

    return (
      <div className={csx.resizer} style={style}>
        {TRIGGER_TYPES.map((trigger) => (
          <div
            key={trigger}
            className={`${csx.handler} ${csx[trigger]}`}
            data-trigger={trigger}
            onClick={this.handleStart}
          />
        ))}
      </div>
    );
  };
}

export default GridItemResizer;
