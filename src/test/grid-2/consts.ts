import { ResizeTrigger } from './models';

export const TRIGGER: Record<ResizeTrigger, ResizeTrigger> = {
  top: 'top',
  right: 'right',
  bottom: 'bottom',
  left: 'left',
};

export const TRIGGER_TYPES = Object.keys(TRIGGER) as ResizeTrigger[];
