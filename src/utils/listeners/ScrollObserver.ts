import { Subject, fromEvent, Subscription } from 'rxjs';
import { debounceTime, map, skip, tap } from 'rxjs/operators';
import { FromEventTarget } from 'rxjs/internal/observable/fromEvent';

namespace ScrollObserver {
  export type OnEmit = (position: Position) => void;

  export interface Position {
    bottom: boolean;
  }
}

class Position implements ScrollObserver.Position {
  bottom: boolean;

  constructor(offset: number) {
    this.bottom = this._calcBottom(offset);
  }

  private _calcBottom = (offset: number) =>
    window.innerHeight + window.scrollY >= document.body.offsetHeight - offset;
}

class ScrollObserver {
  static TIME = 200;

  static OFFSET = 800;

  private _position = new Subject<Position>();

  private _position$ = this._position.asObservable();

  private _subs = new Subscription();

  constructor(
    private _target: FromEventTarget<Event>,
    private _onEmit: ScrollObserver.OnEmit,
    private _offset = ScrollObserver.OFFSET,
    private _time = ScrollObserver.TIME
  ) {
    this._subs.add(this._handleScroll());
    this._subs.add(this._handleEmit());
  }

  private _emitPosition = (position: Position) => {
    this._position.next(position);
  };

  private _toPosition = () => new Position(this._offset);

  private _handleScroll = () =>
    fromEvent(this._target, 'scroll')
      .pipe(
        skip(1),
        debounceTime(this._time),
        map(this._toPosition),
        tap(this._emitPosition)
      )
      .subscribe();

  private _handleEmit = () => this._position$.subscribe(this._onEmit);

  unsubscribe = () => {
    this._subs.unsubscribe();
  };
}

export default ScrollObserver;
