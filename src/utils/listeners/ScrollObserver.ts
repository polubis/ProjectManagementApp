import { fromEvent } from 'rxjs';
import { debounceTime, map, skip } from 'rxjs/operators';
import { FromEventTarget } from 'rxjs/internal/observable/fromEvent';

class Position {
  bottom: boolean;

  constructor(offset: number) {
    this.bottom = this._calcBottom(offset);
  }

  private _calcBottom = (offset: number) =>
    window.innerHeight + window.scrollY >= document.body.offsetHeight - offset;
}

export default class ScrollObserver {
  static TIME = 250;

  static OFFSET = 800;

  constructor(
    private _target: FromEventTarget<Event>,
    private _time = ScrollObserver.TIME,
    private _offset = ScrollObserver.OFFSET
  ) {}

  private _toPosition = (): Position => new Position(this._offset);

  scrolled$ = fromEvent(this._target, 'scroll').pipe(
    skip(1),
    debounceTime(this._time),
    map(this._toPosition)
  );
}
