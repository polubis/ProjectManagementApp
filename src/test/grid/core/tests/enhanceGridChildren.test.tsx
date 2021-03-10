import React from 'react';

import { _GridItem_ } from '../../components/grid/tests/mocks';
import { enhanceGridChildren } from '../enhanceGridChildren';
import { _Dimension_, _Gap_, _Mask_ } from './mocks';

describe('enhanceGridChildren()', () => {
  it('adds style to every children', () => {
    const _GAP_ = _Gap_(0, 0);
    const _DIMENSION_ = _Dimension_(3, 3, _GAP_);
    const _MASK_ = _Mask_(_DIMENSION_);
    const _CHILDREN_ = [
      <_GridItem_ key={0} cellsIds="1,1">
        Children
      </_GridItem_>,
      <_GridItem_ key={1} cellsIds="2,2">
        Children
      </_GridItem_>,
    ];

    enhanceGridChildren(_CHILDREN_, _MASK_).forEach((children) => {
      expect(children.props.style).toBeTruthy();
    });
  });

  it('adds z-index property based on groupId property', () => {
    const _GAP_ = _Gap_(0, 0);
    const _DIMENSION_ = _Dimension_(3, 3, _GAP_);
    const _MASK_ = _Mask_(_DIMENSION_);
    const _CHILDREN_ = [
      <_GridItem_ key={0} cellsIds="1,1" groupId={1}>
        Children
      </_GridItem_>,
      <_GridItem_ key={1} cellsIds="2,2">
        Children
      </_GridItem_>,
    ];

    const enhancedChildren = enhanceGridChildren(_CHILDREN_, _MASK_);

    expect(enhancedChildren[0].props.style.zIndex).toBe(1);
    expect(enhancedChildren[1].props.style.zIndex).toBe(0);
  });
});
