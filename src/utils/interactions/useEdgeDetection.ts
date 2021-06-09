import { useEffect, useMemo, useState } from 'react';

import { fromEvent } from 'rxjs';
import { tap, debounceTime, filter, map, skip } from 'rxjs/operators';

type Direction = 'top' | 'bot';

type Target = HTMLElement | Document;

type Reached = (target: Target, offset: number) => boolean;

type Differs = (prevDistance: number, target: Target) => boolean;

type DistancesCache = Record<string, number | undefined>;

interface Actions {
  reached: Reached;
  differs: Differs;
}

type Detector = {
  [K in Direction]: Actions;
};

interface Settings {
  delay: number;
  detector: Detector;
  direction: Direction;
  offset: number;
  target: Target;
}

type Config = Partial<Settings>;

const isDocument = (target: Target): target is Document => target.nodeName === '#document';

const isDocumentBottom = (offset: number): boolean =>
  window.innerHeight + window.scrollY >= document.body.offsetHeight - offset;

const isDocumentTop = (offset: number): boolean => window.scrollY <= offset;

const isHTMLElementBottom = (
  { offsetHeight, scrollTop, scrollHeight }: HTMLElement,
  offset: number
) => offsetHeight + scrollTop >= scrollHeight - offset;

const isHTMLElementTop = ({ scrollTop }: HTMLElement, offset: number): boolean =>
  scrollTop <= offset;

const getDistance = (target: Target): number =>
  isDocument(target) ? window.scrollY : target.scrollTop;

const toTarget = (e: Event): HTMLElement => e.target as HTMLElement;

const DETECTOR: Detector = {
  bot: {
    reached: (target, offset) =>
      isDocument(target) ? isDocumentBottom(offset) : isHTMLElementBottom(target, offset),
    differs: (prevDistance, target) => prevDistance === -1 || prevDistance <= getDistance(target),
  },
  top: {
    reached: (target, offset) =>
      isDocument(target) ? isDocumentTop(offset) : isHTMLElementTop(target, offset),
    differs: (prevDistance, target) => prevDistance === -1 || getDistance(target) <= prevDistance,
  },
};

const createSettings = ({ delay, detector, direction, offset, target }: Config): Settings => ({
  delay: delay ?? 300,
  detector: detector ?? DETECTOR,
  direction: direction ?? 'bot',
  offset: offset ?? 30,
  target: target ?? document,
});

const generateId = (): number => new Date().valueOf();

const increment = (value: number) => value + 1;

const DISTANCES_CACHE: DistancesCache = {};

export const useEdgeDetection = (config: Config = {}): number => {
  const [edgesCounter, setEdgesCounter] = useState(0);

  const id = useMemo(() => generateId(), []);

  useEffect(() => {
    DISTANCES_CACHE[id] = -1;

    return () => {
      DISTANCES_CACHE[id] = undefined;
    };
  }, []);

  useEffect(() => {
    const settings = createSettings(config);
    const { delay, detector, direction, offset, target } = settings;

    const sub = fromEvent(target, 'scroll')
      .pipe(
        skip(1),
        debounceTime(delay),
        map(toTarget),
        filter((target) => detector[direction].differs(DISTANCES_CACHE[id], target)),
        filter(() => detector[direction].reached(target, offset)),
        tap(() => setEdgesCounter(increment)),
        tap((target) => (DISTANCES_CACHE[id] = getDistance(target)))
      )
      .subscribe();

    return () => {
      sub.unsubscribe();
    };
  }, [config]);

  return edgesCounter;
};
