import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import { _TEMPLATE_ } from 'testing/mocks';

import ForkTemplate from '..';

jest.mock('shared/services', () => ({
  forkTemplate: () => Promise.reject('Error occured'),
}));

describe('<ForkTemplate> failure', () => {
  it('displays error screen', async () => {
    render(<ForkTemplate template={_TEMPLATE_} onClose={() => {}} />);

    await waitFor(() => {
      expect(screen.getByText('RETRY')).toBeInTheDocument();
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
