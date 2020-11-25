import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import { template } from 'testing/mocks';

import ForkTemplate from '..';

jest.mock('api', () => ({
  forkTemplate: () => Promise.resolve(),
}));

describe('<ForkTemplate> success', () => {
  it('shows loader', async () => {
    render(<ForkTemplate template={template} onClose={() => {}} />);

    await waitFor(() => {
      expect(screen.queryByText('RETRY')).not.toBeInTheDocument();
      expect(screen.queryByText('OK')).not.toBeInTheDocument();
    });
  });

  it('displays success screen', async () => {
    render(<ForkTemplate template={template} onClose={() => {}} />);

    await waitFor(() => {
      expect(screen.getByText('OK')).toBeInTheDocument();
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
