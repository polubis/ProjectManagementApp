import { Positions, Position, Mask, Cells } from '../models/core';
import { createDictionary, Dictionary } from '../utils/createDictionary';
import { createCells } from './createCells';

type PositionsDictionary<T> = Dictionary<Position<T>>;

type CheckHasCollision<T> = (values: Positions<T>) => boolean;

interface ManagablePositions<T> {
  dictionary: PositionsDictionary<T>;
  values: Positions<T>;
  checkHasCollision: CheckHasCollision<T>;
}

class PositionsManager<T> implements ManagablePositions<T> {
  dictionary: PositionsDictionary<T>;
  values: Positions<T>;

  constructor(private _values: Positions<T>, private _mask: Mask) {
    this._validate(this._values);
    this._handleValuesAssign(this._values);
  }

  private _validate = (values: Positions<T>): void => {
    if (this.checkHasCollision(values)) {
      throw new Error('Collision in initial values');
    }
  };

  private _handleValuesAssign = (values: Positions<T>): void => {
    this.values = values;
    this.dictionary = createDictionary(values, 'cellsIds');
  };

  checkHasCollision: CheckHasCollision<T> = (values) => {
    const cellsList = values.map(({ cellsIds, groupId }) => {
      const cells = createCells(cellsIds, this._mask, groupId);
      return { groupId, range: cells.range };
    });

    const { length } = cellsList;
    
    for (let i = 0; i < length; i++) {
      const parent = cellsList[i];

      for (let j = 0; j < length; j++) {
        if (i !== j) {
          const child = cellsList[j];
          const hasCollisions = child.range.some((item) => parent.range.includes(item));

          if (hasCollisions && parent.groupId === child.groupId) {
            return true;
          }
        }
      }
    }

    return false;
  };
}

export const createPositionsManager = <T>(
  values: Positions<T>,
  mask: Mask
): ManagablePositions<T> => new PositionsManager<T>(values, mask);
