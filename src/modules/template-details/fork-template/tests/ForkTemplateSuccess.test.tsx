import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import { _TEMPLATE_ } from '_mocks_';

import ForkTemplate from '..';

jest.mock('core/api', () => ({
  forkTemplate: () => Promise.resolve(),
}));

describe('<ForkTemplate> success', () => {
  it('shows loader', async () => {
    render(<ForkTemplate template={_TEMPLATE_} onClose={() => {}} />);

    await waitFor(() => {
      expect(screen.queryByText('RETRY')).not.toBeInTheDocument();
      expect(screen.queryByText('OK')).not.toBeInTheDocument();
    });
  });

  it('displays success screen', async () => {
    render(<ForkTemplate template={_TEMPLATE_} onClose={() => {}} />);

    await waitFor(() => {
      expect(screen.getByText('OK')).toBeInTheDocument();
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
