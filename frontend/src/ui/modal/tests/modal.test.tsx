import React from 'react';
import { render, screen } from '@testing-library/react';

import { Modal } from '..';

describe('<Modal>', () => {
  const _LABEL_ = 'Content';

  it('renders content', () => {
    render(<Modal>{_LABEL_}</Modal>);

    expect(screen.getByText(_LABEL_).innerHTML).toBe(_LABEL_);
  });

  it('adds properties', () => {
    const _CLASS_ = 'custom-class';

    render(<Modal className={_CLASS_}>{_LABEL_}</Modal>);

    expect(screen.getByText(_LABEL_).className).toContain(_CLASS_);
  });
});
